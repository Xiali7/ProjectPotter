<template>
  <div>
    <HeaderVue />
    <div class="container">
      <h1>Potions</h1>
      <input type="text" v-model="searchQuery" placeholder="Rechercher par nom..."><br>
      <label for="pageSize">Nombre de potions par page:   </label>
      <select v-model="pageSize" @change="changePageSize">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="TicketContainer">
      <div class="character-grid" v-if="potions.length === 0">Aucun Résultat</div>
      <div class="character-grid" v-else>
        <div class="character-card" v-for="potion in filteredPotions" :key="potion.id">
          <img :src="potion.attributes.image || 'https://potterdb.com/images/missing_potion.svg'" alt="Image de la potion" style="max-height: 250px;">
          <h2>{{ potion.attributes.name }}</h2>
          <p><strong>Caractéristiques:</strong> {{ potion.attributes.characteristics }}</p>
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
  name: 'PotionsPage', // Nom de la nouvelle page
  components: {
    HeaderVue
  },
  data() {
    return {
      potions: [],
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
    filteredPotions() {
      return this.potions.filter(potion => {
        return potion.attributes.name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  mounted() {
    this.fetchPotions();
  },
  watch: {
    searchQuery: function() {
      this.fetchPotions();
    },
    pageSize: function() {
      this.fetchPotions();
    }
  },
  methods: {
    async fetchPotions(url = 'https://api.potterdb.com/v1/potions') {
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
        this.potions = response.data.data;

        // Mise à jour des liens de pagination
        this.paginationLinks = {
          first: response.data.links.first,
          prev: response.data.links.prev,
          next: response.data.links.next,
          last: response.data.links.last
        };
      } catch (error) {
        console.error('Erreur lors de la récupération des potions', error);
      }
    },
    fetchPage(type) {
      // Charger la page en fonction du type (first, prev, next, last)
      if (this.paginationLinks[type]) {
        this.fetchPotions(this.paginationLinks[type]);
      }
    },
    changePageSize() {
      this.fetchPotions();
    }
  }
};
</script>
