<template>
    <div>
      <HeaderVue />
      <!-- Contenu de la page d'accueil ici -->
    </div>
    <div class="container">
      <h1> Livres </h1>
    </div> 
  </template>
  
  <script>
  import HeaderVue from './HeaderVue.vue';
  
  export default {
    name: 'BooksPage',
    components: {
      HeaderVue
    }
  }
  </script>