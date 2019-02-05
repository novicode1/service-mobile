<template>
  <div class="navarea">
    <nav>
      <div class="capsule header">
        <nuxt-link exact to="/" class="logo">
          <img src="../images/icons/store-logo.png" alt="Логотип Service Mobile">
        </nuxt-link>
        <nav class="mainmenu">
          <ul class="menu-list">
            <li class="menu-item">
              <a href="tel:096-866-73-32" class="tel-call-link">
                <img src="../images/icons/telephone-call.svg" alt="Иконка номера для звонка">
                +38 063-333-99-93
              </a>
            </li>
            <li class="menu-item">
              <nuxt-link to="/about">О нас</nuxt-link>
            </li>
            <li class="menu-item">
              <nuxt-link to="/about#services">Услуги</nuxt-link>
            </li>
            <li class="menu-item">
              <nuxt-link to="/about#contacts">Контакты</nuxt-link>
            </li>
            <li class="menu-item">
              <nuxt-link to="/cart" class="shop-link">Корзина<img src="../images/icons/shopping-cart.svg" alt="Иконка номера для звонка"></nuxt-link>
            </li>
          </ul>
        </nav>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  computed: {
    cartTotal() {
      return this.$store.state.cartTotal;
    }
  }
};
</script>

<style scoped>

.navarea {
  overflow: hidden;
}

.header {
  width: 100%;
  line-height: 4.375em;
  padding: 0 4.375em 0 1.563em;
  background-color: #232323;
  margin-bottom: 60px;
}

.header .logo {
  display: inline-block;
}

.header .logo img {
  height: 2.5em;
  vertical-align: middle;
}

.mainmenu {
  float: right;
}

.mainmenu .menu-item {
  display: inline-block;
}

.mainmenu .tel-call-link img {
  height: 1.1em;
  margin: 0 5px -2px 0;
}

.menu-list li + li {
  margin-left: 3.125em;
}

.mainmenu .shop-link {
  border-bottom: 1px solid #FFB500;
  -webkit-transition: all .15s ease-in-out;
  -moz-transition: all .15s ease-in-out;
  -ms-transition: all .15s ease-in-out;
  -o-transition: all .15s ease-in-out;
  transition: all .15s ease-in-out;
  padding-bottom: 3px;
}

.mainmenu .shop-link:hover {
  border-bottom:rgba(255, 183, 0, 0);
}

.mainmenu .shop-link img {
  margin-left: 10px;
  height: .9em;
}
</style>
