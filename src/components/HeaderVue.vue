<template>
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/potions">Potions</router-link> |
      <router-link to="/spells">Sorts</router-link> |
      <router-link to="/books">Livres</router-link> |
      <router-link to="/characters">Personnages</router-link>
    </nav>
  </template>
  
  <script>
  import '../../style/StylePages.css';
  export default {
    name: 'HeaderVue',
  }
  </script>