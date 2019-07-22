<template>
  <main class="capsule wrapper">
    <app-navigation/>
    <div class="contain">
      <div class="side-block">
        <app-sidebar class="store-navigation" :active="false"/>
        <app-filter :pricerange.sync="highprice" class="store-filter" :active="false"/>
      </div>
      <div class="content" v-if="!sProducts.length">
        <skeleton-card v-for="index in 12" :key="index+'index'"/>
      </div>
      <transition-group name="items" tag="section" class="content">
        <app-item-card v-for="(item, index) in sProducts" :key="item" :item="item" :index="index"/>
      </transition-group>

      <div
        class="button-wrapper"
        :style='{"display": (isAllItemsAreShown ? "none" : "block" )}'
        v-if="sProducts.length > 20"
      >
        <button @click="showMoreItems" class="show-more">Показать еще</button>
      </div>
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
      highprice: 2700,
      limit: 12,
      isAllItemsAreShown: false
    };
  },
  methods: {
    showMoreItems () {
      this.limit += 20
      if (this.sProducts.length != this.limit) {
        this.isAllItemsAreShown = true
      }
    }
  },
  computed: {
    sProducts() {
      return this.limit ? this.$store.getters.used.filter(el => el.price < this.highprice).slice(0,this.limit) : this.$store.getters.used.filter(el => el.price < this.highprice);
    }
  }
};
</script>
<style scoped>
.button-wrapper {
  padding-left: 19.1489%;
}

@media (max-width: 1073px) {
  .button-wrapper {
    padding: 0;
  }
}

.show-more {
  display: block;
  margin: 0 auto;
  margin-top: 8px;
  padding: 12px 6px;
  font-size: 14px;
  font-weight: 500;
  min-width: 50px;
  width: auto;
  border-radius: 4px;
  background-image: linear-gradient(-180deg, #3f9feb 0%, #0071ca 100%);
  border: 1px solid #0070c9;
  color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.05);
  transition: all 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.show-more:disabled {
  opacity: 0.8;
}

.show-more:hover {
  transform: translateY(-1px);
  transition: all 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.show-more:active {
  transform: translateY(1px);
  box-shadow: none;
  transition: all 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>
