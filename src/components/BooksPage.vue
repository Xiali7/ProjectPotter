<template>
  <div>
    <HeaderVue />
    <div class="container">
      <h1>Livres</h1>
      <input type="text" v-model="searchQuery" placeholder="Rechercher par titre...">
      <label for="pageSize">Nombre de livres par page:</label>
      <select v-model="pageSize" @change="changePageSize">
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
    <div class="TicketContainer">
      <div class="character-grid" v-if="books.length === 0">Aucun Résultat</div>
      <div class="character-grid" v-else>
        <div class="character-card" v-for="book in filteredBooks" :key="book.id">
          <img :src="book.attributes.cover || 'https://placeholder.com/150'" alt="Couverture du livre" style="max-height: 300px;">
          <h2>{{ book.attributes.title }}</h2>
          <template v-if="book.attributes.author">
            <p><strong>Auteur:</strong> {{ book.attributes.author }}</p>
          </template>
          <template v-if="book.attributes.release_date">
            <p><strong>Date de publication:</strong> {{ book.attributes.release_date }}</p>
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
  name: 'BooksPage',
  components: {
    HeaderVue
  },
  data() {
    return {
      books: [],
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
    filteredBooks() {
      return this.books.filter(book => {
        return book.attributes.title.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  mounted() {
    this.fetchBooks();
  },
  watch: {
    searchQuery: function() {
      this.fetchBooks();
    },
    pageSize: function() {
      this.fetchBooks();
    }
  },
  methods: {
    async fetchBooks(url = 'https://api.potterdb.com/v1/books') {
      try {
        let filters = [];

        if (this.searchQuery) {
          filters.push(`filter[title_cont]=${encodeURIComponent(this.searchQuery)}`);
        }

        filters.push(`page[size]=${this.pageSize}`);

        if (filters.length > 0) {
          url += `?${filters.join('&')}`;
        }

        const response = await axios.get(url);
        this.books = response.data.data;

        // Mise à jour des liens de pagination
        this.paginationLinks = {
          first: response.data.links.first,
          prev: response.data.links.prev,
          next: response.data.links.next,
          last: response.data.links.last
        };
      } catch (error) {
        console.error('Erreur lors de la récupération des livres', error);
      }
    },
    fetchPage(type) {
      // Charger la page en fonction du type (first, prev, next, last)
      if (this.paginationLinks[type]) {
        this.fetchBooks(this.paginationLinks[type]);
      }
    },
    changePageSize() {
      this.fetchBooks();
    }
  }
};
</script>
