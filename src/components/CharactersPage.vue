<template>
  <div>
    <HeaderVue />
    <div class="container">
      <h1>Personnages</h1>
      <input type="text" v-model="searchQuery" placeholder="Rechercher par nom...">
      <label for="pageSize">Nombre de personnages par page:</label>
      <select v-model="pageSize" @change="changePageSize">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="TicketContainer">
      <div class="character-grid" v-if="characters.length === 0">Aucun Résultat</div>
      <div class="character-grid" v-else>
        <div class="character-card" v-for="character in filteredCharacters" :key="character.id">
          <img :src="character.attributes.image || 'https://potterdb.com/images/missing_character.svg'" alt="Image du personnage" style="max-height: 250px;">
          <h2>{{ character.attributes.name }}</h2>
          <template v-if="character.attributes.gender">
            <p><strong>Sexe:</strong> {{ character.attributes.gender }}</p>
          </template>
          <template v-if="character.attributes.species">
            <p><strong>Espèce:</strong> {{ character.attributes.species }}</p>
          </template>
          <template v-if="character.attributes.born">
            <p><strong>Année de naissance:</strong> {{ character.attributes.born }}</p>
          </template>
          <template v-if="character.attributes.house">
            <p><strong>Maison:</strong> {{ character.attributes.house }}</p>
          </template>
        </div>
      </div>
      <!-- Ajout de la pagination -->
      <div class="pagination">
        <button @click="fetchPage('first')" :disabled="!paginationLinks.first">Première page</button>
        <button @click="fetchPage('prev')" :disabled="!paginationLinks.prev">Page précédente</button>
        <button @click="fetchPage('next')" :disabled="!paginationLinks.next">Page suivante</button>
        <button @click="fetchPage('last')" :disabled="!paginationLinks.last">Dernière page</button>
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
      searchQuery: '',
      paginationLinks: {
        first: null,
        prev: null,
        next: null,
        last: null
      },
      pageSize: 25
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
    },
    pageSize: function() {
      this.fetchCharacters();
    }
  },
  methods: {
    async fetchCharacters(url = 'https://api.potterdb.com/v1/characters') {
      try {
        let filters = [];

        if (this.searchQuery) {
          filters.push(`filter[name_cont]=${encodeURIComponent(this.searchQuery)}`);
        }

        filters.push(`page[size]=${this.pageSize}`);

        if (filters.length > 0) {
          url += `?${filters.join('&')}`;
        }

        const response = await axios.get(url);
        this.characters = response.data.data;

        // Mise à jour des liens de pagination
        this.paginationLinks = {
          first: response.data.links.first,
          prev: response.data.links.prev,
          next: response.data.links.next,
          last: response.data.links.last
        };
      } catch (error) {
        console.error('Erreur lors de la récupération des personnages', error);
      }
    },
    fetchPage(type) {
      // Charger la page en fonction du type (first, prev, next, last)
      if (this.paginationLinks[type]) {
        this.fetchCharacters(this.paginationLinks[type]);
      }
    },
    changePageSize() {
      this.fetchCharacters();
    }
  }
};
</script>
