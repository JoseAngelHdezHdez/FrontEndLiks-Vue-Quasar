<template>
  <q-card class="my-card q-mb-sm">
    <q-card-section>
      <div class="text-overline">{{ link.nanoLink }}</div>
      {{ link }}
    </q-card-section>

    <q-separator />

    <q-card-actions>
      <q-btn
        flat
        round
        icon="mdi-trash-can-outline"
        color="red"
        @click="deleteLink(link._id)"
      />
      <q-btn flat round icon="mdi-pencil-outline" @click="updateLink(link)" />
      <q-btn flat color="primary" @click="copyLink(link.nanoLink)"> Copy </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";
import { useNotify } from "src/composables/notifyHook";
import useQuasar from "quasar/src/composables/use-quasar.js";

const $q = useQuasar();
const { successNotify, errorNotify } = useNotify()

const useLink = useLinkStore();

defineProps({
  link: Object,
});

const deleteLink = async (_id) => {
  $q.dialog({
    title: "Alerta !!!!!! 😱😱 ",
    message: "Seguro que quiere eliminar el elemento 😱",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await useLink.removeLink(_id);
      successNotify("Ya me encarge de este link 😎👍🔪")
    } catch (error) {
      // console.log(error);
      if (error.error) {
        return error.error.forEach((item) => {
          errorNotify(item.msg)
        });
      }
      errorNotify(error);
    }
  });
};

const updateLink = (link) => {
  $q.dialog({
    title: 'Vamos a editar este link 😮😮',
    message: 'Vamos modifique ese link ✒️',
    prompt: {
      model: link.longLink ,
      type: 'text'
    },
    cancel: true,
    persistent: true
  }).onOk(async (data) => {
    try {
      console.log(data);
      const newLink = {...link, longLink: data }
      await useLink.modifiedLink(newLink);
      successNotify("Se actualizo el link 😎👍👍");
    } catch (error) {
      if (error.error) {
        return error.error.forEach((item) => {
          errorNotify(item.msg)
        });
      }
      errorNotify(error);
    }
  })
}

const copyLink = async (nanoLink) => {
  try {
    const path = `${process.env.FRONT_URI}${nanoLink}`
    await navigator.clipboard.writeText(path);
    successNotify("Se copio el link broo ✂️✌️😎")
  } catch (error) {
    console.log(error);
    errorNotify(error)
  }
}
</script>

<style scoped></style>
