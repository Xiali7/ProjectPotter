<template>
<div>
    <HeaderVue />
    <div class="container">
      <h1>Accueil</h1>
      <p>Bienvenue dans l'univers magique de Harry Potter ! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam hendrerit diam non nisi posuere, sit amet ullamcorper sapien lacinia. Proin euismod, ligula vel finibus pharetra, ligula odio hendrerit felis, sed ultricies risus est non lacus. Duis vel semper velit, id varius lectus. Sed pretium lacus id ipsum volutpat scelerisque.</p>
      <p>Vestibulum consectetur, sapien vitae dapibus convallis, ipsum metus fringilla urna, nec ultricies ligula lacus eget nisi. Nullam eget libero non odio iaculis tincidunt. Nulla facilisi. Integer vitae malesuada eros. Aliquam erat volutpat. Suspendisse potenti. Ut fringilla fringilla dolor, sed viverra mi tincidunt vel.</p>
      <p class="example-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Phasellus et lacinia orci. Morbi ultricies nunc ac turpis fermentum, in dignissim est aliquet. Cras auctor, mauris sed tempor hendrerit, sem quam tristique ligula, nec gravida velit libero sit amet leo. Nulla sed mauris dui.</p>
    </div>
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