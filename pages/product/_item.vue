<template>
  <main class="capsule wrapper">
    <app-navigation/>
    <div class="contain">
      <div class="side-block">
        <app-sidebar class="store-navigation"/>
      </div>
      <div class="content" v-if="product">
        <div class="item-header">
          <h1>{{ product.name }}</h1>
        </div>

        <main class="item-description">
          <nav class="secondary-nav">
            <ul class="breadcrumbs">
              <li class="breadcrumb">
                <nuxt-link to="/">Главная</nuxt-link>
              </li>

              <li class="breadcrumb" v-if="category != 'main'">
                <nuxt-link :to="`/${this.$route.query.path}`">{{ category }}</nuxt-link>
              </li>

              <li class="breadcrumb">
                <nuxt-link to="/">{{ product.name | truncate(50, ' ...') }}</nuxt-link>
              </li>
            </ul>
          </nav>

          <div class="item-image-wrapper">
            <img :src="`${product.imageUrl}`" :alt="`Image of ${product.name}`" class="item-image">
          </div>

          <aside class="item-aside">
            <div class="item-main-info">
              <h2>{{ product.price | usdollar}}</h2>

              <div class="item-stock">
                <div class="in-stock" v-if="product.inStock === true">
                  <img src="../../images/icons/in-stock.svg" alt="В наличии">
                  В наличии
                </div>

                <div class="not-in-stock" v-if="product.inStock === false">
                  <img src="../../images/icons/not-in-stock.svg" alt="Нет в наличии">
                  Нет в наличии
                </div>
              </div>
            </div>

            <app-order-form :code="product.code"/>

            <ul class="services">
                <li class="guarantees">
                    <img src="../../images/icons/guarantee.svg" alt="Год гарантии на товар" height="30"
                    width="auto">
                    <span class="service-text">
                        Гарантия 12 мес
                    </span>
                </li>
                <li class="refund">
                    <img src="../../images/icons/refund.svg" alt="Год гарантии на товар" height="30"
                    width="32">
                    <span class="service-text">
                      Дней на возврат-обмен
                    </span>
                </li>
            </ul>
          </aside>


        </main>
		<iphone-options-form  v-if="product.options" :productOptions="product.options" :productPrice="product.price" />

      </div>
      <div class="clear"></div>
      <div class="push"></div>
    </div>
    <app-footer class="footer"/>
  </main>
</template>

<script>
import AppFooter from "./../../components/AppFooter.vue";
import AppNavigation from "./../../components/AppNavigation.vue";
import AppSidebar from "./../../components/AppSidebar.vue";
import IphoneOptionsForm from "./../../components/optionsForm/IphoneOptionsForm.vue";
import AppOrderForm from "../../components/form/AppOrderForm.vue";

export default {
    head() {
        return {
        	title: this.$route.query.name
        }
    },
    data() {
        return {
        	category: this.$route.query.category
        };
    },
    components: {
        AppFooter,
        AppNavigation,
        AppSidebar,
		AppOrderForm,
		IphoneOptionsForm
    },

    computed: {
        product() {
        	return this.$store.getters.loadedProduct(this.$route.query.id);
        }
    },
    filters: {
        usdollar: function(value) {
        	return `$${value}`;
        }
    }
};
</script>

<style scoped>
.content {
  color: #fff;
  background-color: #242424;
  margin: 0 auto;
  width: 79%;
  border-radius: 10px;
}

.item-header {
  padding: 0 24px;
  border-radius: 10px 10px 0 0;
  background-color: #4c4c4c;
  width: 100%;
}

.item-header h1 {
  font-size: 24px;
  line-height: 48px;
  display: inline-block;
}

.item-description {
  padding: 48px 60px;
}

.item-aside {
  display: inline-block;
  margin-bottom: 80px;
}

.item-aside h2 {
  font-size: 32px;
  color: #fff;
  font-weight: 400;
  margin-bottom: 18px;
}

.item-image-wrapper {
  height: 400px;
  width: 400px;
  background-color: #fff;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  float: left;
  margin-right: 60px;
}

.item-image-wrapper img {
  left: 50%;
  position: absolute;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
}

.breadcrumbs {
  list-style: none;
  line-height: 2em;
  margin-bottom: 28px;
  width: 100%;
  display: block;
  overflow: visible;
  white-space: nowrap;
}

.breadcrumbs .breadcrumb {
  display: inline-block;
  margin-right: 10px;
}

.secondary-nav {
  position: relative;
  mask-image: linear-gradient(to right, #000 0%, #000 72%, transparent 100%);
  -webkit-mask-image: linear-gradient(
    to right,
    #000 0%,
    #000 72%,
    transparent 100%
  );
  -webkit-box-flex: 1;
}
.secondary-nav:before,
.secondary-nav:after {
  content: "";
  height: calc(100% - 2em);
  pointer-events: none;
  position: absolute;
  top: 1em;
  width: 10px;
  z-index: 2;
}
.secondary-nav:before {
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, white 100%);
  right: 0;
}
.secondary-nav:after {
  background: linear-gradient(to left, rgba(255, 255, 255, 0) 0%, white 100%);
  left: 0;
}
.secondary-nav ul {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.secondary-nav ul li {
  white-space: nowrap;
}
.secondary-nav ul li a,
.secondary-nav ul li a:visited {
  display: inline-block;
}

.breadcrumbs .breadcrumb + .breadcrumb::before {
  content: "";
  display: inline-block;
  border-top: 1px solid #eee;
  border-right: 1px solid #eee;
  transform: rotate(45deg);
  width: 8px;
  height: 8px;
  margin-right: 10px;
  vertical-align: center;
}

.breadcrumbs .breadcrumb:last-child a {
  color: #ffb500;
}

.item-stock {
  font-weight: normal;
  font-size: 14px;
  color: #7ebb55;
  vertical-align: middle;
  margin-bottom: 20px;
}

.item-stock img {
  vertical-align: middle;
}

.services {
    list-style: none;
    color: #fff;
    padding-top: 8px;
}

.services > li {
    display: inline-block;
    vertical-align: top;
}

.services li + li {
    margin-left: 20px;
}

.services .service-text {
    display: inline-block;
    margin-left: 8px;
    line-height: 1.4em;
}

.guarantees .service-text {
    max-width: 60px;
}

.refund .service-text {
    max-width: 100px;
}

@media (max-device-width: 1074px) {
  .contain .content {
    width: calc(100% - 64px);
  }
}

@media (max-device-width: 900px) {
  .item-description {
    width: 100%;
  }
  .item-image-wrapper {
    width: 340px;
    height: 340px;
  }

  .item-image-wrapper img {
    max-width: 96%;
    max-height: 96%;
  }
}

@media (max-device-width: 838px) {
  .item-description {
    padding-left: 32px;
    padding-right: 32px;
  }
  .item-image-wrapper {
    margin-right: 32px;
  }
  .item-image-wrapper img {
    max-width: 96%;
    max-height: 96%;
  }

  .contain .content {
    width: 100%;
  }
  .item-header {
    border-radius: initial;
  }
}

@media (max-device-width: 690px) {
  .contain {
    padding-top: 0;
    border-top: 1px solid rgb(54, 54, 54);
  }
  .wrapper {
    background-color: #ffffff;
  }
  .item-header {
    padding: 6px 20px;
    line-height: 28px;
    color: #111;
    background-color: #fff;
  }
  .item-header h1 {
    font-weight: 500;
    font-size: 28px;
    line-height: 1.3em;
    letter-spacing: -1px;
  }
  .item-main-info {
    width: calc(100%+40px);
    box-sizing: border-box;
    margin-left: -20px;
    padding: 40px 20px;
    background-color: #f8f8fb;
    text-align: center;
  }
  .secondary-nav {
    margin-bottom: 60px;
    mask-image: linear-gradient(to right, #000 0%, #000 90%, transparent 100%);
  }

  .breadcrumbs .breadcrumb + .breadcrumb::before {
    border-color: rgba(136, 136, 136, 0.753);
    margin-left: 3px;
  }

  .breadcrumbs .breadcrumb {
    margin-right: 4px;
  }
  .breadcrumbs .breadcrumb a {
    color: #888;
    font-weight: 400;
  }

  .item-image-wrapper {
    width: 100%;
    height: 450px;
    margin: 0 auto 80px;
    display: block;
    float: none;
  }
  .item-aside h2 {
    color: #111;
    font-weight: 500;

    height: initial;
    display: block;
    line-height: initial;
    font-size: 3em;
  }
  .item-image-wrapper img {
    max-width: 90%;
    max-height: 90%;
  }

  .item-aside {
    display: block;
    width: 100%;
  }

  .item-stock {
    font-size: 14px;
    margin-bottom: 0;
  }

  .store-navigation {
    width: 100%;
    border-radius: 0;
    margin-right: 0;
  }
  .store-navigation .nav-hidden {
    border-radius: 0;
  }
  .sidearea .nav-header img:first-child {
    display: none;
  }
  .item-stock {
    font-weight: 500;
  }
  .item-description {
    padding: 12px 20px 48px;
    background-color: #fff;
  }
}

@media (max-device-width: 440px) {
  .secondary-nav {
    display: block;
  }
  .breadcrumbs {
    margin-bottom: 10px;
  }
  .item-image-wrapper {
    height: 340px;
    width: calc(100% + 40px);

    margin-left: -20px;
    border-radius: 0;
  }
}
</style>
