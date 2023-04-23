import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { useUserStore } from "./user-store";
import { ref } from "vue";
import useQuasar from "quasar/src/composables/use-quasar.js";


export const useLinkStore = defineStore("url", () => {
  const userStore = useUserStore();
  const $q = useQuasar();

  const links = ref([]);

  const createLink = async (longLink) => {
    try {
      $q.loading.show();
      const res = await api({
        url: "/links",
        method: "POST",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
        data: {
          longLink,
        },
      });
      console.log(res.data);
      links.value.push(res.data.nweLink);
    } catch (error) {
      // console.log(error.response?.data || error)
      throw error.response?.data || error;
    }  finally {
      $q.loading.hide();
    }
  };

  const getLinks = async () => {
    try {
      $q.loading.show();
      console.log("llamando todos los links 🥳🥳");
      const res = await api({
        url: "/links",
        method: "GET",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      // console.log(res.data.links)
      links.value = res.data.links.map((item) => {
        return {
          longLink: item.longLink,
          _id: item._id,
          nanoLink: item.nanoLink,
        };
      });

      // links.value = [...res.data.links]
    } catch (error) {
       // console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  getLinks();

  const removeLink = async (_id) => {
    try {
      $q.loading.show();
      await api({
        url: `/links/${_id}`,
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + userStore.token,
        },
      });
      links.value = links.value.filter(item => item._id !== _id);
    } catch (error) {
      // console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  };

  const modifiedLink = async (newLink) => {
    try {
      $q.loading.show();
      await api ({
        url:`/links/${newLink._id}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${userStore.token}`
        },
        data: {
          longLink: newLink.longLink
        }
      })
      links.value = links.value.map((item) => item._id === newLink._id ? newLink : item);
    } catch (error) {
      // console.log(error.response?.data || error);
      throw error.response?.data || error;
    } finally {
      $q.loading.hide();
    }
  }

  return {
    createLink,
    getLinks,
    links,
    removeLink,
    modifiedLink,
  };
});
