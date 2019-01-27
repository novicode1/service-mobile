<template>
  <main class="capsule wrapper">
    <app-navigation />
    <div class="contain">
      <app-sidebar :pricerange.sync="highprice" :sale="true"/>
      <transition-group name="items" tag="section" class="content">
        <app-item
          v-for="(item, index) in sProducts"
          :key="item"
          :item="item"
          :index="index"
        />
      </transition-group>
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
import AppMasthead from './../components/AppMasthead.vue';
import AppItem from './../components/AppItem.vue';

export default {
  components: {
    AppFooter,
    AppNavigation,
    AppSidebar,
    AppMasthead,
    AppItem
  },
  data() {
    return {
      highprice: 300
    };
  },
  computed: {
    sProducts() {
      return this.$store.getters.sale.filter(el => el.price < this.highprice);
    }
  }
};
</script>

<style>
.saleimg .ppl-banner {
  height: 105%;
}
</style>
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
