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

        <responsive-nav class="nav-hidden">
          <div class="menu-header">
            <nuxt-link exact to="/" class="menu-logo">
              <img src="../images/icons/store-logo.png" alt="Логотип Service Mobile">
            </nuxt-link>
          </div>
          <ul class="menu-list">
            <li class="menu-item">
              <a href="tel:096-866-73-32" class="tel-call-link">
                Главная
              </a>
            </li>
            <li class="menu-item">
              <nuxt-link to="/about#start">О нас</nuxt-link>
            </li>
            <li class="menu-item">
              <nuxt-link to="/about#services">Услуги</nuxt-link>
            </li>
            <li class="menu-item">
              <nuxt-link to="/about#contacts">Контакты</nuxt-link>
            </li>

            <div class="menu-footer">

              <div class="location">
                <img src="../images/icons/map-point.svg" alt="Геолокация">
                <div class="location-text-wrapper">ул. Черноморского Казачества, 4<br> Одесса, Одесская область</div>
              </div>

              <div class="working-hours">
                <img src="../images/icons/clock.svg" alt="Рабочие часы">
                Ежедневно 09:00 - 10:00
              </div>

              <div class="telephone-number">
                <img src="../images/icons/telephone-call.svg" alt="Рабочие часы">
                +380 63–333–99–93
              </div>

            </div>
          </ul>

        </responsive-nav>
      </div>
    </nav>
  </div>
</template>

<script>
import ResponsiveNav from './../components/AppResponsiveNavigationAbout.vue';

export default {
  components: {
    ResponsiveNav
  },
  computed: {
    cartTotal() {
      return this.$store.state.cartTotal;
    }
  }
};
</script>

<style scoped>

.nav-hidden .menu-header {
  background-color: #232323;
  width: 320px;
  padding: 20px;
}

.nav-hidden .menu-logo img {
  width: 200px;
  margin: 0 auto;
  display: block;
}

.nav-hidden .shop-link img {
  margin-left: 4px;
}

.nav-hidden .menu-footer {
  display: block;
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 22px;
}


.menu-footer .telephone-number img {
  width: 18px;
}

.nav-hidden .menu-footer div {
  margin-bottom: 12px;
}

.header {
  width: 100%;
  height: 60px;
  line-height: 4.375em;
  padding: 0 4.375em 0 1.563em;
  background-color: #232323;
  margin-bottom: 60px;
  z-index: 6;
  border-radius: 4px 0 0 0;
}

.header .logo {
  display: inline-block;
}

.nav-hidden {
  display: none;
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

.mainmenu li + li {
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


@media (max-device-width: 1024px) {
  .mainmenu {
    display: none;
  }

  .header {
    position: fixed;
  }

  .nav-hidden {
    display: block;
  }
}

@media (max-device-width: 610px) {
  .logo {
    display: none !important;
  }
}
</style>
