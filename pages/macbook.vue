<template>
  <main class="capsule wrapper">
    <app-navigation/>
    <div class="contain">
      <div class="side-block">
        <app-sidebar class="store-navigation" :active="false"/>
        <app-filter :pricerange.sync="highprice" class="store-filter" :active="false"/>
      </div>
      <div class="content">
        <section class="category-promo">
          <div class="header-wrapper">
            <img
              src="../images/categories/macbook-logo.svg"
              alt="Apple macbook logo"
              width="148"
              height="auto"
              class="macbook-logo"
            >
            <img
              src="../images/categories/macbook-name.svg"
              alt="Apple macbook logo"
              height="auto"
              class="macbook-name"
            >

            <span class="promo-text">Просто. Стильно. Тонко.</span>
          </div>
          <img
            src="../images/categories/macbook-promo.jpg"
            alt="Apple macbook promo"
            width="auto"
            height="178"
            class="macbook-promo"
          >
        </section>
      </div>
      <div class="content" v-if="!mProducts.length">
        <skeleton-card v-for="index in 12" :key="index+'index'"/>
      </div>
      <transition-group name="items" tag="section" class="content">
        <app-item-card
          v-for="(item, index) in mProducts"
          :key="item+index"
          :item="item"
          :index="index"
        />
      </transition-group>

      <div
        class="button-wrapper"
        :style='{"display": (isAllItemsAreShown ? "none" : "block" )}'
        v-if="mProducts.length > 20"
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
import AppFooter from './../components/AppFooter.vue';
import AppNavigation from './../components/AppNavigation.vue';
import AppFilter from './../components/AppFilter.vue';
import AppSidebar from './../components/AppSidebar.vue';
import AppItemCard from './../components/AppItemCard.vue';
import SkeletonCard from './../components/skeleton/SkeletonCard.vue';

export default {
  components: {
    AppFilter,
    AppFooter,
    SkeletonCard,
    AppNavigation,
    AppSidebar,
    AppItemCard
  },
  data() {
    return {
      highprice: 2700,
      item: this.$route.query,
      limit: 12,
      isAllItemsAreShown: false
    };
  },
  methods: {
    showMoreItems () {
      this.limit += 20
      if (this.mProducts.length != this.limit) {
        this.isAllItemsAreShown = true
      }
    }
  },
  computed: {
    mProducts() {
      if (this.$store.state.used || this.$store.state.sale || (this.$store.state.used && this.$store.state.sale)) {
        let items = this.$store.getters.macbook
        items = items.filter(item => Number(item.price) < this.highprice)



        let itemsUsed = items.filter(item => item.used === true)

        let itemsSale = items.filter(item => item.sale === true)

        let concatAndDeDuplicateObjects = (p, ...arrs) => [].concat(...arrs).reduce((a, b) => !a.filter(c => b[p] === c[p]).length ? [...a, b] : a, [])

        if (this.$store.state.used && this.$store.state.sale) {
          return this.limit ? concatAndDeDuplicateObjects("code", itemsUsed, itemsSale).slice(0,this.limit) : concatAndDeDuplicateObjects("code", itemsUsed, itemsSale);
        }

        else if (this.$store.state.used) {
          return this.limit ? itemsUsed.slice(0,this.limit) : itemsUsed;
        }

        else if (this.$store.state.sale) {
          return this.limit ? itemsSale.slice(0,this.limit) : itemsSale;
        }
      }

      else {
        let items = this.$store.getters.macbook
        return this.limit ? items.filter(item => Number(item.price) < this.highprice).slice(0,this.limit) : items.filter(item => Number(item.price) < this.highprice)
      }
    }
  }
};
</script>

<style scoped>
.button-wrapper {
  padding-left: 19.1489%;
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
.category-promo {
  display: block;
  width: 100%;
  background-color: #fff;
  overflow: auto;
  box-sizing: border-box;
  border-radius: 6px;
  margin: 0 10px 1%;
}

.header-wrapper {
  display: inline-block;
  padding-left: 32px;
}

.macbook-logo {
  display: inline-block;
  padding-top: 38px;
  margin-bottom: 64px;
}

.macbook-name {
  display: block;
  margin-bottom: 12px;
}

.promo-text {
  display: block;
  font-weight: normal;
  font-size: 16px;
  color: #8d8d8d;
  letter-spacing: -0.49px;
  line-height: 22px;
}

.macbook-promo {
  float: right;
  margin-right: 32px;
  padding: 70px 56px 54px 0;
  box-sizing: content-box;
}

@media (max-width: 1073px) {
  .button-wrapper {
    padding: 0;
  }
}

@media (max-device-width: 900px) {
  .macbook-promo {
    margin-right: 0;
  }
}

@media (max-device-width: 820px) {
  .category-promo {
    overflow-x: hidden;
  }
  .macbook-promo {
    margin-right: -100px;
  }
}

@media (max-device-width: 750px) {
  .macbook-promo {
    margin-right: -180px;
  }
}

@media (max-device-width: 650px) {
  .macbook-promo {
    float: none;
    margin: 0 auto;
    display: block;
    width: 90%;
    height: auto;
    padding-right: 0;
  }
}

@media (max-device-width: 556px) {
  .category-promo {
    margin: 0;
    border-radius: 0;
  }
}

@media (max-device-width: 450px) {
  .macbook-logo {
    display: block;
    margin: 0 auto 44px;
  }

  .macbook-name {
    margin: 0 auto 16px;
  }

  .header-wrapper {
    margin-bottom: 20px;
    text-align: center;
    padding-left: 0;
    display: block;
    width: 100%;
  }
}
</style>
