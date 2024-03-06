// Importer les méthodes nécessaires de 'vue' et 'vue-router'
import { createRouter, createWebHistory } from 'vue-router';

// Importer les composants
import HomePage from './components/HomePage.vue';
import PotionsPage from './components/PotionsPage.vue';
import SpellsPage from './components/SpellsPage.vue';
import BooksPage from './components/BooksPage.vue';
import CharactersPage from './components/CharactersPage.vue';

// Définir les routes
const routes = [
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/potions',
        name: 'Potions',
        component: PotionsPage
    },
    {
        path: '/spells',
        name: 'Spells',
        component: SpellsPage
    },
    {
        path: '/books',
        name: 'Books',
        component: BooksPage
    },
    {
        path: '/characters',
        name: 'Characters',
        component: CharactersPage
    }
];

// Créer l'instance du routeur
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;