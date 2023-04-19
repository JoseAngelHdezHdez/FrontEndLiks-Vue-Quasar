<template>
  <q-page class="row justify-center">
    <div class="col-12 col-sm-6 col-md-5">
      <h3>Register</h3>
      <q-form
      @submit.prevent="handleSubmit"
      >
        <q-input
        v-model="email"
        label="Ingrese email"
        type="text"
        :rules="[
          (val) => (val && /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/.test(val)) || 'Escriba un email correcto',
        ]"
        ></q-input>

        <q-input
        v-model="password"
        label="Ingrese contraseña"
        type="password"
        :rules="[
          (val) => val && val.length > 6 || 'Contraseña minimo de 6 caracteres',
        ]"
        ></q-input>

        <q-input
        v-model="repassword"
        label="Ingrese contraseña"
        type="password"
        :rules="[
          (val) => val && val === password || 'La contraseñas no concuerdan',
        ]"
        ></q-input>

        <div>
          <q-btn label="Crear" type="submit"></q-btn>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { useUserStore } from 'src/stores/user-store';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import useQuasar from 'quasar/src/composables/use-quasar.js';

const router = useRouter();
const $q = useQuasar();
const userStore = useUserStore();

const email = ref('');
const password = ref('');
const repassword = ref('')

const handleSubmit = async () => {
  try {
    console.log("Paso las validaciones")
    await userStore.register(email.value, password.value, repassword.value);
    router.push('/');
    email.value = '';
    password.value = '';
  } catch (error) {
    console.log("error", error.error)
    if (error.error) {
      alertDialogBackend(error.error)
    } else if (error.errors[0].msg){
      alertDialogBackend(error.errors[0].msg)
    } else {
      alertDialogBackend()
    }
  }
};

const alertDialogBackend = (message = 'Error en el servidor') => {
  $q.dialog({
    title: "Error",
    message
  })
}

</script>

<style scoped></style>
