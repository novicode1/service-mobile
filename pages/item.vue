<template>
  <main class="capsule wrapper">
    <app-navigation />
    <div class="contain">
      <div class="side-block">
        <app-sidebar class="store-navigation hidden" />
      </div>

      <app-item class="content"/>

      <div class="clear"></div>
      <div class="push"></div>
    </div>
    <app-footer class="footer"/>
  </main>
</template>

<script>
import AppFooter from './../components/AppFooter.vue';
import AppNavigation from './../components/AppNavigation.vue';
import AppSidebar from './../components/AppSidebar.vue';

import AppItem from './../components/AppItem.vue';

export default {
  components: {
    AppFooter,
    AppNavigation,
    AppSidebar,
    AppItem
  },
  data() {
    return {
      highprice: 2700
    };
  },
  computed: {
    mProducts() {
      return this.$store.getters.men.filter(el =>
        this.$store.state.sale
          ? el.price < this.highprice && el.sale
          : el.price < this.highprice
      );
    }
  }
};
</script>

<style>
/* sticky footer stuff */
.wrapper {
  min-height: 100vh;
  margin-bottom: -60px;
}

.footer,
.push {
  height: 50px;
  margin-top: 10px;
}
</style>
