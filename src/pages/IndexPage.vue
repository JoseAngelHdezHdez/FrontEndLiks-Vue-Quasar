<template>
  <q-page padding>
    <q-btn @click="access">Ingresar</q-btn>
    <q-btn @click="createLink">Crear Link</q-btn>
    {{ token }} - {{ expiresIn }}
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';


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

const token = ref('');
const expiresIn = ref('')

const access = async () => {
  try {
    const res = await api.post('/auth/login', {
      email: "joseangel@gmail.com  ",
      password: "1234567890"
    })
    console.log(res.data)
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime()
  } catch (error) {
    console.log(error)
  }
}

const createLink = async () => {
  try {
    const res = await api({
      method: 'POST',
      url: '/links',
      headers: {
        Authorization: 'Bearer '+ token.value
      },
      data: {
        longLink: 'https://vuejs.org/guide/components/registration.html'
      }
    })

    console.log(res.data)
  } catch (error) {
    console.log(error)
  }
}

const setTime = () => {
  setTimeout(() => {
    refreshToken()
   }, expiresIn.value * 1000 - 6000)
}

const refreshToken = async () => {
  try {
    const res = await api.get('/auth/refresh');
    console.log(res.data)
    token.value = res.data.token;
    expiresIn.value = res.data.expiresIn;
    setTime()
  } catch (error) {
    console.log(error)
  }
}

refreshToken()
</script>
