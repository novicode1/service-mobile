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

                    <form action="plugins/form.php" method="POST" class="contact-form">
                        <label>
                            Имя
                            <input type="text" placeholder="Например, Даниил" name="name" required>
                        </label>

                        <label>
                            Номер телефона
                            <input type="tel" placeholder="0976665544" name="phone" required>
                        </label>

                        <button type="submit" class="primary-button">Быстрый заказ</button>
                    </form>

                    <div class="guarantees">
                        <img src="../../images/icons/guarantee.svg" alt="В наличии">
                    </div>
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

export default {
    data () {
        return {
            item: this.$route.query
        }
    },
    components: {
        AppFooter,
        AppNavigation,
        AppSidebar
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

.contact-form {
    margin: 0 auto 80px;
    display: inline-block;
    border-top: 1px solid rgba(191, 192, 192, 0.25);
    border-bottom: 1px solid rgba(191, 192, 192, 0.25);
    padding: 18px 0 28px;
}

input,
textarea,
select {
    display: block;
    width: 250px;
    height: auto;
    margin: 0 auto;
    line-height: 1.3em; /* 18px */
    font-size: 14px;
    font-weight: 300;
    font-family: inherit;
    border-radius: 10px;
    color: #000;
    padding: calc(1.125em / 2) 13px;
    border: 1px solid #949494;
    box-sizing: border-box;
    background-color: inherit;
    color: #fff;
    resize: vertical;
    background: rgba(255, 255, 255, 0.05);
}

label {
    text-align: left;
    margin-bottom: 12px;
    display: block;
    line-height: 2em;
    color: #fff;
}

.primary-button {
    display: inline-block;
    margin-top: 8px;
    padding: 10px 70px 10px 36px;
    font-size: 0.875em;
    min-width: 50px;
    border-radius: 20px;
    border: 2px solid #ffc636;
    background: #000;
    text-transform: uppercase;
    background: url(../../images/icons/arrow-right-link.svg) no-repeat 85% 50%;
    background-color: rgba(255, 255, 255, 0.05);
}

.primary-button:hover {
    border: 2px solid #fff;
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
