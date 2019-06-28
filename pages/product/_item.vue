<template>
  <main class="capsule wrapper">
    <app-navigation />
    <div class="contain">
        <div class="side-block">
            <app-sidebar class="store-navigation"/>
        </div>
        <div class="content" v-if="product">
            <header class="item-header">
                <h1>{{ product.name }}</h1>
            </header>

            <main class="item-description">
                <ul class="breadcrumbs">
                    <li class="breadcrumb">
                        <nuxt-link to="/">Главная</nuxt-link>
                    </li>

                    <li class="breadcrumb">
                        <nuxt-link to="/">Ноутбуки</nuxt-link>
                    </li>

                    <li class="breadcrumb">
                        <nuxt-link to="/">{{ product.name | truncate(50, ' ...') }}</nuxt-link>
                    </li>
                </ul>

                <div class="item-image-wrapper">
                    <img :src="`${product.imageUrl}`" :alt="`Image of ${product.name}`" class="item-image">
                </div>

                <aside class="item-aside">
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

                    <app-order-form :code="product.code" />

                    <!-- <div class="guarantees">
                        <img src="../../images/icons/guarantee.svg" alt="В наличии">
                    </div> -->
                </aside>
            </main>
        </div>
        <div class="clear"></div>
        <div class="push"></div>
    </div>
    <app-footer class="footer"/>
  </main>
</template>

<script>
import AppFooter from './../../components/AppFooter.vue';
import AppNavigation from './../../components/AppNavigation.vue';
import AppSidebar from './../../components/AppSidebar.vue';
import AppOrderForm from '../../components/form/AppOrderForm.vue';

export default {
    data () {
        return {
            item: this.$route.query
        }
    },
    components: {
        AppFooter,
        AppNavigation,
        AppSidebar,
        AppOrderForm
    },
    computed: {
        product () {
            return this.$store.getters.loadedProduct(this.item.id)
        }
    },
    filters: {
        usdollar: function(value) {
            return `$${value}`;
        }
    },
}
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
    margin-right: 48px;
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
}

.breadcrumbs .breadcrumb {
    display: inline-block;
    margin-right: 10px;
}

.breadcrumbs .breadcrumb+.breadcrumb::before {
    content: "";
    display: inline-block;
    background: url("../../images/icons/breadcrumb-icon.svg") no-repeat top right;
    width: 8px;
    height: 14px;
    margin-bottom: -3px;
    margin-right: 12px;
    vertical-align: center;
}

.breadcrumbs .breadcrumb:last-child a {
    color: #FFB500;
}



.item-stock {
    font-weight: normal;
    font-size: 14px;
    color: #2E4058;
    color: #7EBB55;
    vertical-align: middle;
    margin-bottom: 20px;
}

.item-stock img {
    vertical-align: middle;
}
</style>
