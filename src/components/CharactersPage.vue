<template>
  <div>
    <HeaderVue />
    <div class="container">
      <h1>Personnages</h1>
      <input type="text" v-model="searchQuery" placeholder="Rechercher par nom...">
      <div class="character-grid" v-if="characters.length === 0">Aucun Résultat</div>
      <div class="character-grid" v-else>
        <div class="character-card" v-for="character in filteredCharacters" :key="character.id">
          <h2>{{ character.attributes.name }}</h2>
          <p><strong>Maison:</strong> {{ character.attributes.house }}</p>
          <p><strong>Année de naissance:</strong> {{ character.attributes.birth_year }}</p>
          <!-- Ajoutez d'autres informations du personnage ici -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import HeaderVue from './HeaderVue.vue';

export default {
  name: 'CharactersPage',
  components: {
    HeaderVue
  },
  data() {
    return {
      characters: [],
      searchQuery: ''
    };
  },
  computed: {
    filteredCharacters() {
      return this.characters.filter(character => {
        return character.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  mounted() {
    this.fetchCharacters();
  },
  watch: {
    searchQuery: function() {
      this.fetchCharacters();
    }
  },
  methods: {
    async fetchCharacters() {
      try {
        let url = 'https://api.potterdb.com/v1/characters';
        if (this.searchQuery) {
          url += `?filter[name_cont]=${encodeURIComponent(this.searchQuery)}`;
        }
        const response = await axios.get(url);
        this.characters = response.data.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des personnages', error);
      }
    },
  },
};
</script>



<style scoped>
.character-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Grille avec des colonnes de largeur égale */
  grid-gap: 20px; /* Espacement entre les éléments de la grille */
}

.character-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
}
</style>
