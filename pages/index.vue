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
        <div class="content">
          <section class="category-promo">
              <div class="header-wrapper">
                <span class="promo-text">
                  Ищите технику Apple по разумной цене?
                </span>
                <span class="geolocation">
                    <img src="../images/categories/productnav/map.svg" alt="Мы на крате" width="18" height="auto" class="map geopoint">
                    <span class="geolocation-text">ул. Черноморского Казачества, 4. Одесса, Одесская область</span>
                </span>
              </div>
              <nav class="categories-row">
                <ul class="categories">
                  <li class="category">
                    <nuxt-link to='/apple-watch'>
                    <img src="../images/categories/productnav/watch.png" alt="Apple watch">Apple watch</nuxt-link>
                  </li>
                  <li class="category">
                    <nuxt-link to='/iphone'>
                        <img src="../images/categories/productnav/iphone.png" alt="iPhone">iPhone</nuxt-link>
                  </li>
                  <li class="category">
                    <nuxt-link to='/ipad'>
                    <img src="../images/categories/productnav/ipad.png" alt="iPad">iPad</nuxt-link>
                  </li>
                  <li class="category">
                    <nuxt-link to='/macbook'>
                    <img src="../images/categories/productnav/macbook.svg" alt="MacBook">MacBook</nuxt-link>
                  </li>
                  <li class="category">
                    <nuxt-link to='/mac'>
                    <img src="../images/categories/productnav/imac.png" alt="Mac">Mac</nuxt-link>
                  </li>
                  <li class="category">
                    <nuxt-link to='/apple-tv'>
                    <img src="../images/categories/productnav/tv.png" alt="Apple TV">Apple TV</nuxt-link>
                  </li>
                  <li class="category">
                    <nuxt-link to='/airpods'>
                    <img src="../images/categories/productnav/airpods.png" alt="Airpods">Airpods</nuxt-link>
                  </li>
                </ul>
              </nav>
          </section>
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
  scrollToTop: true,
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

.category-promo {
    display: block;
    width: 100%;
    background-color: #fff;
    overflow: auto;
    box-sizing: border-box;
    padding: 56px 52px;
    margin: 0 10px 1%;
}

.header-wrapper {
    display: inline-block;
    vertical-align: middle;
}

.promo-text {
    display: inline-block;
    font-weight: 500;
    font-size: 28px;
    color: #111111;
    max-width: 330px;
    letter-spacing: -0.22px;
    margin-bottom: 46px;
}

.geolocation {
    display: block;
}

.geolocation img {
    display: inline-block;
    vertical-align: middle;
}

.geolocation-text {
    display: inline-block;
    vertical-align: middle;
    font-weight: normal;
    font-size: 14px;
    color: #777777;
    letter-spacing: -0.41px;
    line-height: 18px;
    max-width: 226px;
    margin-left: 6px;
}

.categories-row {
    display: block;
    float: right;
    padding-top: 20px;
    position: relative;
}

.categories-row:before,
.categories-row:after {
  content: "";
  height: calc(100% - 2em);
  pointer-events: none;
  position: absolute;
  top: 1em;
  width: 10px;
  z-index: 2;
}
.categories-row:before {
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 100%);
  right: 0;
}
.categories-row:after {
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, white 100%);
  left: 0;
}

.categories-row ul li {
  white-space: nowrap;
}
.categories-row ul li a,
.categories-row ul li a:visited {
  display: inline-block;
}

.categories {
    list-style: none;
    overflow: visible;
    white-space: nowrap;
}

.category {
    display: inline-block;
    vertical-align: bottom;
    text-align: center;
    max-width: 72px;
}

.category + .category {
    margin-left: 40px;
}

.category a {
    font-weight: normal;
    font-size: 13px;
    color: #333333;
    letter-spacing: -0.11px;
}

.category img {
    width: 68px;
    height: auto;
    display: block;
    margin: 0 auto;
    margin-bottom: 14px;
}

@media (max-device-width: 1320px) {
    .category + .category {
        margin-left: 24px;
    }
}

@media (max-device-width: 1230px) {
    .category-promo {
        padding: 56px 24px 56px 30px;
    }
}

@media (max-device-width: 1160px) {
    .categories-row {
        float: initial;
        mask-image: linear-gradient(to right, #000 0%, #000 72%, transparent 100%);
        -webkit-mask-image: linear-gradient(
            to right,
            #000 0%,
            #000 72%,
            transparent 100%
        );
        -webkit-box-flex: 1;
        margin: 0 auto;
        display: block;
    }

    .categories {
        text-align: center;
        display: inline-block;
        width: 100%;
    }

    .geolocation {
        margin-bottom: 40px;
    }
}

@media (max-device-width: 750px) {
    .categories-row ul {
        display: flex;
        flex-wrap: nowrap;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
    }

    .categories {
      padding-bottom: 20px;
    }
}

@media (max-device-width: 556px) {
    .category-promo {
        margin: 0;
        border-radius: 0;
        border-top: 18px solid #F2F2F2;
    }

    .geolocation {
        margin-bottom: 20px;
    }
}
</style>
