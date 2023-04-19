import { defineStore } from "pinia";
import { api } from "src/boot/axios";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const token = ref(null);
  const expiresIn = ref(null);

  const access = async (email, password) => {
    try {
      const res = await api.post("/auth/login", {
        email,
         password,
      });
      // console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user', true)
      setTime();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error". error.message);
      }
      console.log(error.config);
    }
  };

  const register = async (email, password, repassword) => {
    try {
      const res = await api.post("/auth/register", {
        email,
         password,
         repassword
      });
      // console.log(res.data);
      token.value = res.data.token;
      expiresIn.value = res.data.expiresIn;
      sessionStorage.setItem('user', true)
      setTime();
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        throw error.response.data;
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log("Error". error.message);
      }
      console.log(error.config);
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
    register
  };
});
