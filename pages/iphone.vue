<template>
  <main class="capsule wrapper">
    <app-navigation/>
    <div class="contain">
      <div class="side-block">
        <app-sidebar class="store-navigation" :active="false" />
        <app-filter :pricerange.sync="highprice" class="store-filter" :active="false"/>
      </div>
      <div class="content">
        <section class="category-promo">
            <div class="header-wrapper">
                <img src="../images/categories/iphone-logo.png" alt="Apple iphone logo" width="126" height="auto" class="iphone-logo">
                <img src="../images/categories/iphone-name.svg" alt="Apple iphone logo" width="180" height="auto" class="iphone-name">

                <span class="promo-text">
                    Какой из них подходит для вас?
                </span>
            </div>
            <img src="../images/categories/iphone-promo.jpg" alt="Apple iphone promo" width="480" height="auto" class="iphone-promo">
            <img src="../images/categories/iphone-mobile-promo.jpg" alt="Apple iphone promo" width="280" height="auto" class="iphone-promo-mobile">
        </section>
      </div>
      <div class="content" v-if="!wProducts.length">
        <skeleton-card v-for="index in 12" :key="index+'index'"/>
      </div>
      <transition-group name="items" tag="section" class="content">
        <app-item-card
          v-for="(item, index) in wProducts"
          :key="item+index"
          :item="item"
          :index="index"
        />
      </transition-group>

      <div class="button-wrapper" :style='{"display": (isAllItemsAreShown ? "none" : "block" )}'  v-if="wProducts.length > 11">
        <button @click="showMoreItems" class="show-more">Показать еще </button>
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
    AppFooter,
    AppNavigation,
    AppFilter,
    AppSidebar,
    SkeletonCard,
    AppItemCard
  },
  scrollToTop: true,
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
      if (this.wProducts.length != this.limit) {
        this.isAllItemsAreShown = true
      }
    }
  },
  computed: {
    wProducts() {
      if (this.$store.state.used || this.$store.state.sale || (this.$store.state.used && this.$store.state.sale)) {
        let items = this.$store.getters.iphone
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
        let items = this.$store.getters.iphone
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
    background-image: linear-gradient(-180deg, #3F9FEB 0%, #0071CA 100%);
    border: 1px solid #0070C9;
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
    background-color: #FAFAFA;
    overflow: auto;
    box-sizing: border-box;
    border-radius: 6px;
    margin: 0 10px 1%;
}

.header-wrapper {
    display: inline-block;
    padding-left: 32px;
}

.iphone-logo {
    display: inline-block;
    padding-top: 38px;
    margin-bottom: 50px;
}

.iphone-name {
    display: block;
    margin-bottom: 16px;
}

.promo-text {
    display: block;
    font-weight: normal;
    font-size: 16px;
    color: #8d8d8d;
    letter-spacing: -0.49px;
    line-height: 22px;
}

.iphone-promo {
    float: right;
    margin-right: 102px;
}

.iphone-promo-mobile {
    display: none;
}

@media (max-width: 1073px) {
  .button-wrapper {
    padding: 0;
  }
}

@media (max-device-width: 900px) {
    .category-promo {
        overflow-x: hidden;
    }
    .iphone-promo {
        margin-right: 36px;
    }
}

@media (max-device-width: 800px) {
    .iphone-promo {
        width: 440px;
        padding-top: 20px;
        margin-right: 20px;
    }
}

@media (max-device-width: 750px) {
    .iphone-promo {
        margin-right: -120px;
    }
}

@media (max-device-width: 650px) {
    .category-promo {
        background: #FAFAFA;
    }
    .iphone-promo {
        float: none;
        margin-right: 0;
        display: block;
        width: 95%;
        margin-left: 15px;
    }
}

@media (max-device-width: 556px) {
    .category-promo {
        margin: 0;
        border-radius: 0;
    }
}

@media (max-device-width: 450px) {
    .iphone-promo {
        display: none;
    }

    .iphone-promo-mobile {
        display: block;
        margin: 0 auto;
    }

    .iphone-logo {
        display: block;
        margin: 0 auto 44px;
    }

    .iphone-name {
        margin: 0 auto 14px;
    }

    .promo-text {
        margin-bottom: 40px;
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
