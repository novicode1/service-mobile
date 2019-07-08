<template>
  <main class="wrapper">
    <app-navigation/>
    <!-- <app-sidebar class="store-navigation side-block"/> -->
        <main class="product-content" v-if="product">
            <nav class="secondary-nav">
                <ul class="breadcrumbs">
                    <li class="breadcrumb">
                        <nuxt-link to="/">Главная</nuxt-link>
                    </li>

                    <li class="breadcrumb" v-if="category != 'main'">
                        <nuxt-link :to="`/${this.$route.query.path}`">{{ category }}</nuxt-link>
                    </li>

                    <li class="breadcrumb">
                        <a>{{ product.name | truncate(50, ' ...') }}</a>
                    </li>
                </ul>
            </nav>

            <article class="item-header">
                <img src="./../../images/icons/apple-logo.svg" alt="Apple logo">
                <h1>{{ product.name }}</h1>
                <p>С нашей программой Trade In вы можете получить скидку на новую технику, для этого просто свяжитесь с менеджером. </p>
                <p role="note">* Это полезно для вас и всей нашей планеты <span class="emoji-congartulation">🥳</span></p>
            </article>

            <div class="item-image-wrapper" v-if="product.category !== 'accessories'">
                <img :src="`${product.imageUrl}`" :alt="`Image of ${product.name}`" class="item-image">
            </div>

            <iphone-options-form
                v-if="product.options && product.category === 'iphone'"
                :productOptions="product.options"
                :productPrice="product.price"
                :productName="product.name"
                :code="product.code"
            />

            <accessories-options-form
                v-if="product.options && product.category == 'accessories'"
                :productOptions="product.options"
                :productPrice="product.price"
                :productName="product.name"
                :productImageUrl="product.imageUrl"
                :code="product.code"
            />

            <apple-watch-options-form 
                v-if="product.options && product.category === 'appleWatch'"
                :productOptions="product.options"
                :productPrice="product.price"
                :productName="product.name"
                :code="product.code"
            />
        </main>



        <div class="clear"></div>
        <div class="push"></div>
        <app-footer class="footer"/>
    </main>
</template>

<script>
import AppFooter from "./../../components/AppFooter.vue";
import AppNavigation from "./../../components/AppNavigation.vue";
import AppSidebar from "./../../components/AppSidebar.vue";
import IphoneOptionsForm from "./../../components/optionsForm/iphone/IphoneOptionsForm.vue";
import AccessoriesOptionsForm from "./../../components/optionsForm/accessories/AccessoriesOptionsForm.vue";
import AppleWatchOptionsForm from "./../../components/optionsForm/apple-watch/AppleWatchOptionsForm.vue";

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
        IphoneOptionsForm,
        AccessoriesOptionsForm,
        AppleWatchOptionsForm
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
.wrapper {
    background-color: #fff;
    color: #333;
}

.product-content {
    padding: 40px 0;
    margin: 0 auto;
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
    margin-bottom: 60px;
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
  border-top: 1px solid #737373;
  border-right: 1px solid #737373;
  transform: rotate(45deg);
  width: 8px;
  height: 8px;
  margin-right: 10px;
  vertical-align: center;
}

.breadcrumb {
    display: inline-block;
    vertical-align: baseline;
}

.breadcrumb a {
    font-size: 14px;
    font-weight: normal;
    color: #111;
}

.breadcrumb:last-child a {
    color: #0070C9;
}

.item-header {
    margin-bottom: 60px;
}

.item-header img {
    margin-bottom: 26px;
    max-width: 40px;
}

.item-header h1 {
    max-width: 300px;
    font-weight: 500;
    font-size: 38px;
    color: #111111;
    letter-spacing: -1.29px;
    line-height: 44px;
    margin-bottom: 10px;
}

.item-header p {
    font-size: 16px;
    color: #333333;
    letter-spacing: -0.13px;
    line-height: 25px;
    font-weight: normal;
    max-width: 490px;
}

.item-header .emoji-congartulation {
    font-size: 20px;
}

.item-image-wrapper {
    margin-right: 44px;
    max-width: 333px;
    box-sizing: border-box;
    display: inline-block;
}

.item-image-wrapper img {
    display: block;
    width: 100%;
}

@media(max-width: 1073px) {
    .product-content {
        padding: 40px 60px;
        width: 100%;
        display: block;
    }

    .item-header h1 {
        max-width: 90%;
    }

    .item-image-wrapper {
        width: 70%;
        max-width: 500px;
        margin: 0 auto;
        display: block;
        margin-bottom: 40px;
    }
}

@media(max-width: 600px) {
    .product-content {
        padding: 40px 32px;
        width: 100%;
        display: block;
    }
}
</style>
