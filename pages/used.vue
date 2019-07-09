<template>
  <main class="capsule wrapper">
    <app-navigation/>
    <div class="contain">
      <div class="side-block">
        <app-sidebar class="store-navigation" :active="false"/>
        <app-filter :pricerange.sync="highprice" class="store-filter" :active="false"/>
      </div>
      <div class="content" v-if="!sProducts.length">
        <skeleton-card v-for="index in 10" :key="index"/>
      </div>
      <transition-group name="items" tag="section" class="content">
        <app-item-card v-for="(item, index) in sProducts" :key="item" :item="item" :index="index"/>
      </transition-group>
      <div class="clear"></div>
      <div class="push"></div>
    </div>
    <app-footer class="footer"/>
  </main>
</template>

<script>
import AppFooter from "./../components/AppFooter.vue";
import AppNavigation from "./../components/AppNavigation.vue";
import AppFilter from "./../components/AppFilter.vue";
import AppSidebar from "./../components/AppSidebar.vue";
import AppMasthead from "./../components/AppMasthead.vue";
import AppItemCard from "./../components/AppItemCard.vue";
import SkeletonCard from "./../components/skeleton/SkeletonCard.vue";

export default {
  components: {
    AppFooter,
    AppNavigation,
    SkeletonCard,
    AppSidebar,
    AppFilter,
    AppMasthead,
    AppItemCard
  },
  data() {
    return {
      highprice: 2700
    };
  },
  computed: {
    sProducts() {
      return this.$store.getters.used.filter(el => el.price < this.highprice);
    }
  }
};
</script>
