<template>
  <q-form @submit.prevent="addLink">
    <q-input
      v-model.trim="link"
      label="Ingrese link aqui"
      placeholder="Ingrese su link aqui 🫠"
      :rules="[
        (val) => (val && val.trim() !== '') || 'Escbribe algo porfavor 👏',
      ]"
    ></q-input>
    <q-btn
      class="q-mt-sm full-width"
      label="Agregar link"
      color="primary"
      type="submit"
      :loading="loading"
    ></q-btn>
  </q-form>
</template>

<script setup>
import { useLinkStore } from "src/stores/link-store";
import { ref } from "vue";
import { useNotify } from "../composables/notifyHook"

const useLink = useLinkStore();
const { showNotify } = useNotify();

const link = ref([]);
const loading = ref(false)

const addLink = async () => {
  console.log("hola");
  try {
    loading.value = true;
    await useLink.createLink(link.value);
    showNotify('Se ha creado un nuevo link', 'green')
    link.value = '';
  } catch (error) {
    console.log(error);
    if(error.error){
      return error.error?.forEach(item => {
        showNotify(item.msg)
      });
    }
    showNotify('Error al agregar');
  } finally {
    loading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
