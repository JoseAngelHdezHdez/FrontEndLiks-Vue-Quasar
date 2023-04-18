import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async () => {
    try {
      const res = await api.post("/auth/login", {
        email: "joseangel@gmail.com  ",
        password: "1234567890",
      });
      // console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user', true)
      setTime();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await api.get("/auth/logout");
    } catch (error) {
      console.log(error);
    } finally {
      resetStore();
      sessionStorage.removeItem('user');
    }
  };

  const setTime = () => {
    setTimeout(() => {
      refreshToken();
    }, expiresIn.value * 1000 - 6000);
  };

  const refreshToken = async () => {
    try {
      console.log("Refresh")
      const res = await api.get("/auth/refresh");
      console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user', true)
      setTime();
    } catch (error) {
      console.log(error);
      sessionStorage.removeItem('user');
    }
  };

  // const access = () => {
  //   console.log("Me caes re gordo jajaja ");
  //   axios
  //     .post('http://localhost:5000/api/v1/auth/login', {
  //       email: "joseangel@gmail.com  ",
  //       password: "  1234567890    "
  //     })
  //     .then(res => {
  //       console.log(res.data)
  //     })
  //     .catch(e => console.log(e))
  // }

  const resetStore = () => {
    token.value = null;
    expiresIn.value = null;
  }

  return {
    token,
    expiresIn,
    access,
    refreshToken,
    logout,
  };
});
