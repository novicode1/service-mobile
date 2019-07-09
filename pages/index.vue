<template>
  <div>
    <main class="capsule wrapper">
      <app-navigation/>
      <div class="contain">
        <div class="side-block">
          <app-sidebar class="store-navigation" :active="false"/>
          <app-filter :pricerange.sync="highprice" class="store-filter" :active="false"/>
        </div>
        <div class="content" v-if="!products.length">
          <skeleton-card v-for="index in 10" :key="index"/>
        </div>
        <transition-group name="items" tag="section" class="content">
          <app-item-card v-for="(item, index) in products" :key="item" :item="item" :index="index"/>
        </transition-group>
        <div class="clear"></div>
        <div class="push"></div>
      </div>
    </main>
    <app-footer class="footer"/>
  </div>
</template>

<script>
import AppFooter from "./../components/AppFooter.vue";
import AppNavigation from "./../components/AppNavigation.vue";
import AppFilter from "./../components/AppFilter.vue";
import AppSidebar from "./../components/AppSidebar.vue";
import AppItemCard from "./../components/AppItemCard.vue";
import SkeletonCard from "./../components/skeleton/SkeletonCard.vue";

export default {
  components: {
    AppFooter,
    AppNavigation,
    SkeletonCard,
    AppSidebar,
    AppFilter,
    AppItemCard
  },
  data() {
    return {
      highprice: 2700
    };
  },
  computed: {
    products() {
      if (
        this.$store.state.used ||
        this.$store.state.sale ||
        (this.$store.state.used && this.$store.state.sale)
      ) {
        let itemsUsed = this.$store.getters.used;
        itemsUsed = itemsUsed.filter(
          item => Number(item.price) < this.highprice
        );

        let itemsSale = this.$store.getters.sale;
        itemsSale = itemsSale.filter(
          item => Number(item.price) < this.highprice
        );

        if (this.$store.state.used && this.$store.state.sale) {
          let concatAndDeDuplicateObjects = (p, ...arrs) =>
            []
              .concat(...arrs)
              .reduce(
                (a, b) =>
                  !a.filter(c => b[p] === c[p]).length ? [...a, b] : a,
                []
              );
          return concatAndDeDuplicateObjects("code", itemsUsed, itemsSale);
        } else if (this.$store.state.used) {
          return itemsUsed;
        } else if (this.$store.state.sale) {
          return itemsSale;
        }
      } else {
        let allItems = this.$store.state.products;
        return allItems.filter(item => item.price < this.highprice);
      }
    }
  }
};
</script>

<style scoped>
@supports (display: grid) {
  .capsule > * {
    width: auto;
    margin: 0;
  }
}
</style>
