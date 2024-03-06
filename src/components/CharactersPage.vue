<template>
    <div>
      <HeaderVue />
      <!-- Contenu de la page d'accueil ici -->
    </div>
    <div class="container">
      <h1> Personnages </h1>
    </div>
  </template>
  
  <script>
  import HeaderVue from './HeaderVue.vue';
  
  export default {
    name: 'CharactersPage',
    components: {
      HeaderVue
    }
  }
  </script>