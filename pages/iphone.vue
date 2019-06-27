<template>
  <main class="capsule wrapper">
    <app-navigation />
    <div class="contain">
      <div class="side-block">
        <app-sidebar class="store-navigation"/>
        <app-filter :pricerange.sync="highprice"/>
      </div>
      <transition-group name="items" tag="section" class="content">
        <app-item-card
          v-for="(item, index) in wProducts"
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
import AppFilter from './../components/AppFilter.vue';
import AppSidebar from './../components/AppSidebar.vue';
import AppMasthead from './../components/AppMasthead.vue';
import AppItemCard from './../components/AppItemCard.vue';

export default {
  components: {
    AppFooter,
    AppNavigation,
    AppFilter,
    AppSidebar,
    AppMasthead,
    AppItemCard
  },
  data() {
    return {
      highprice: 2700
    };
  },
  computed: {
    wProducts() {
      return this.$store.getters.iphone.filter(el =>
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
