<template>
    <div>
      <HeaderVue />
      <!-- Contenu de la page d'accueil ici -->
    </div>
    <div class="container">
      <h1> Potions </h1>
    </div>

  </template>
  
  <script>
  import HeaderVue from './HeaderVue.vue';
  
  export default {
    name: 'PotionsPage',
    components: {
      HeaderVue
    }
  }
  </script>