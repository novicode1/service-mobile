<template>
  <main class="capsule wrapper">
    <app-navigation />
    <div class="contain">
      <div class="side-block">
        <app-sidebar class="store-navigation" :active="true"/>
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
      highprice: 2700,
      item: this.$route.query
    };
  },
  computed: {
    wProducts() {
      if (this.$store.state.used || this.$store.state.sale || (this.$store.state.used && this.$store.state.sale)) {
        let items = this.$store.getters.accessories
        items = items.filter(item => Number(item.price) < this.highprice)
        console.log(items)


        let itemsUsed = items.filter(item => item.used === true)

        let itemsSale = items.filter(item => item.sale === true)

        let concatAndDeDuplicateObjects = (p, ...arrs) => [].concat(...arrs).reduce((a, b) => !a.filter(c => b[p] === c[p]).length ? [...a, b] : a, [])

        if (this.$store.state.used && this.$store.state.sale) {
          return concatAndDeDuplicateObjects('code', itemsUsed, itemsSale)
        }

        else if (this.$store.state.used) {
          return itemsUsed
        }

        else if (this.$store.state.sale) {
          return itemsSale
        }
      }

      else {
        let items = this.$store.getters.accessories
        return items.filter(item => Number(item.price) < this.highprice)
      }
    }
  }
};
</script>
