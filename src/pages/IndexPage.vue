<template>
  <q-page padding>
    <add-links/>
    <pre>
      {{ useLink.links }}
    </pre>
    <template
    v-for="link in useLink.links"
    :key="link._id"
    >
    <link-card/>
    </template>
  </q-page>
</template>

<script setup>
import AddLinks from 'src/components/AddLinks.vue';
import LinkCard from 'src/components/LinkCard.vue';
import { useLinkStore } from 'src/stores/link-store';


const useLink = useLinkStore();
</script>
