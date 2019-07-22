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
              src="../images/categories/accessories-logo.svg"
              alt="Apple accessories logo"
              width="29"
              height="auto"
              class="accessories-logo"
            >
            <img
              src="../images/categories/accessories-name.svg"
              alt="Apple accessories logo"
              height="auto"
              class="accessories-name"
            >

            <span class="promo-text">На вкус и цвет.</span>
          </div>
          <img
            src="../images/categories/accessories-promo.jpeg"
            alt="Apple accessories promo"
            width="745"
            height="auto"
            class="accessories-promo"
          >
          <img
            src="../images/categories/airpods-left.png"
            alt="Airpods left"
            width="84"
            height="auto"
            class="airpods-left"
          >
          <img
            src="../images/categories/airpods-right.png"
            alt="Airpods right"
            width="94"
            height="auto"
            class="airpods-right"
          >
        </section>
      </div>
      <div class="content" v-if="!wProducts.length">
        <skeleton-card v-for="index in 12" :key="option+index"/>
      </div>
      <transition-group name="items" tag="section" class="content">
        <app-item-card v-for="(item, index) in wProducts" :key="item" :item="item" :index="index"/>
      </transition-group>
      <div
        class="button-wrapper"
        :style='{"display": (isAllItemsAreShown ? "none" : "block" )}'
        v-if="wProducts.length > 11"
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
    AppFilter,
    AppSidebar,
    SkeletonCard,
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
    showMoreItems() {
      this.limit += 20;
      if (this.wProducts.length != this.limit) {
        this.isAllItemsAreShown = true;
      }
    }
  },
  computed: {
    wProducts() {
      if (
        this.$store.state.used ||
        this.$store.state.sale ||
        (this.$store.state.used && this.$store.state.sale)
      ) {
        let items = this.$store.getters.accessories;
        items = items.filter(item => Number(item.price) < this.highprice);

        let itemsUsed = items.filter(item => item.used === true);

        let itemsSale = items.filter(item => item.sale === true);

        let concatAndDeDuplicateObjects = (p, ...arrs) =>
          []
            .concat(...arrs)
            .reduce(
              (a, b) => (!a.filter(c => b[p] === c[p]).length ? [...a, b] : a),
              []
            );

        if (this.$store.state.used && this.$store.state.sale) {
          return this.limit
            ? concatAndDeDuplicateObjects("code", itemsUsed, itemsSale).slice(
                0,
                this.limit
              )
            : concatAndDeDuplicateObjects("code", itemsUsed, itemsSale);
        } else if (this.$store.state.used) {
          return this.limit ? itemsUsed.slice(0, this.limit) : itemsUsed;
        } else if (this.$store.state.sale) {
          return this.limit ? itemsSale.slice(0, this.limit) : itemsSale;
        }
      } else {
        let items = this.$store.getters.accessories;
        return this.limit
          ? items
              .filter(item => Number(item.price) < this.highprice)
              .slice(0, this.limit)
          : items.filter(item => Number(item.price) < this.highprice);
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
  background-color: #ccfcf6;
  overflow: auto;
  box-sizing: border-box;
  border-radius: 6px;
  margin: 0 10px 1%;
  overflow-x: hidden;
  position: relative;
}

.header-wrapper {
  display: inline-block;
  padding-left: 32px;
}

.accessories-logo {
  display: inline-block;
  padding-top: 38px;
  margin-bottom: 44px;
}

.accessories-name {
  display: block;
  margin-bottom: 12px;
}

.promo-text {
  display: block;
  font-weight: normal;
  font-size: 16px;
  color: #666;
  letter-spacing: -0.49px;
  line-height: 22px;
}

.accessories-promo {
  float: right;
  margin-right: 32px;
  padding: 54px 0 0 0;
  margin-left: -180px;
  box-sizing: content-box;
}

.airpods-left {
  position: absolute;
  top: 38px;
  right: 134px;
}

.airpods-right {
  position: absolute;
  top: 82px;
  right: 50px;
}

@media (max-device-width: 1200px) {
  .accessories-promo {
    margin-right: -12px;
  }
}

@media (max-width: 1073px) {
  .button-wrapper {
    padding: 0;
  }
}

@media (max-device-width: 900px) {
  .accessories-promo {
    margin-right: -40px;
  }

  .airpods-left {
    top: 30px;
    right: 124px;
  }

  .airpods-right {
    top: 82px;
    right: 20px;
  }

  .accessories-logo {
    margin-bottom: 34px;
  }
}

@media (max-device-width: 820px) {
  .category-promo {
    overflow-x: hidden;
  }
  .accessories-promo {
    margin-right: -20px;
    width: auto;
    height: 200px;
    padding-top: 100px;
  }

  .airpods-left {
    width: 58px;
  }

  .airpods-right {
    width: 64px;
    right: 40px;
  }
}

@media (max-device-width: 750px) {
  .accessories-promo {
    margin-right: -70px;
  }

  .airpods-left {
    top: 30px;
    right: 90px;
    width: 60px;
  }

  .airpods-right {
    top: 62px;
    right: 20px;
    width: 60px;
  }
  .accessories-logo {
    margin-bottom: 26px;
  }
}

@media (max-device-width: 650px) {
  .accessories-promo {
    float: none;
    margin: 0 auto 0 -40px;
    display: block;
    width: 130%;
    height: auto;
    padding: 0;
  }

  .airpods-left {
    top: 60px;
    right: 110px;
  }

  .airpods-right {
    top: 82px;
    right: 40px;
  }
}

@media (max-device-width: 556px) {
  .category-promo {
    margin: 0;
    border-radius: 0;
  }
}

@media (max-device-width: 450px) {
  .accessories-logo {
    display: block;
    margin: 0 auto 28px;
  }

  .accessories-name {
    margin: 0 auto 16px;
  }

  .promo-text {
    margin-bottom: 100px;
    color: rgb(143, 143, 143);
  }

  .header-wrapper {
    margin-bottom: 20px;
    text-align: center;
    padding-left: 0;
    display: block;
    width: 100%;
  }

  .airpods-left {
    top: 200px;
    left: 25%;
    width: 60px;
  }

  .airpods-right {
    top: 200px;
    right: 25%;
    width: 70px;
  }

  .accessories-promo {
    width: 180%;
    margin-left: -120px;
  }
}
</style>
