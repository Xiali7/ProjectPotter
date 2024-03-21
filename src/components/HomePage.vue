<template>
<div>
    <HeaderVue />
    <div class="container">
      <h1>Bienvenue dans le Monde des sorciers !</h1>
      <p>Plongez-vous dans l'univers envoûtant de la saga Harry Potter grâce à l'API PotterDB. Explorez chaque recoin du monde des sorciers. Redécouvrez ses personnages emblématiques, ses potions et sorts mystérieux ainsi que tous les livres de la saga de K.K. Rowling.</p>

      <p>Que vous soyez un moldu curieux ou un sorcier chevronné, prenez vos baguettes et laissez vous emporter dans les pages de cet univers unique !
      Préparez-vous à vivre une aventure extraordinaire, où la magie et l'imagination se rencontrent. Rejoignez-nous et embarquez pour un voyage inoubliable dans le monde fantastique d'Harry Potter.</p>

      <h3>Bonne visite !</h3>

      <a href="https://potterdb.com/" >Visitez l'API PotterDB</a>
      <br>
      <a href="https://docs.potterdb.com/fr" >Doc PotterDB</a>
    </div>
</template>

<script>
import HeaderVue from './HeaderVue.vue';

export default {
  name: 'HomePage',
  components: {
    HeaderVue
  }
}
</script>