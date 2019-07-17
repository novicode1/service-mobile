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
        <skeleton-card v-for="index in 10" :key="index"/>
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
import SkeletonCard from './../components/skeleton/SkeletonCard.vue';

export default {
  components: {
    AppFooter,
    AppNavigation,
    AppFilter,
    AppSidebar,
    SkeletonCard,
    AppMasthead,
    AppItemCard
  },
  scrollToTop: true,
  data() {
    return {
      highprice: 2700,
      item: this.$route.query
    };
  },
  computed: {
    wProducts() {
      if (this.$store.state.used || this.$store.state.sale || (this.$store.state.used && this.$store.state.sale)) {
        let items = this.$store.getters.iphone
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
        let items = this.$store.getters.iphone
        return items.filter(item => Number(item.price) < this.highprice)
      }
    }
  }
};
</script>
<style scoped>
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
