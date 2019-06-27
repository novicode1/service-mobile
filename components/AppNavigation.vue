<template>
  <header class="header">
    <nuxt-link exact to="/" class="logo">
      <img src="../images/icons/store-logo.png" class="main-logo" alt="Логотип Service Mobile">
      <img src="../images/icons/about-logo.svg" class="small-logo" alt="Логотип Service Mobile" width="40">
    </nuxt-link>

    <nav class="mainmenu " :class="{ 'responsive' : isActive }">
      <ul class="menu-list">
        <li class="menu-item telephone">
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
          <nuxt-link to="/" class="shop-link" v-if="page">
            Магазин
            <img src="../images/icons/shopping-cart.svg" alt="Иконка номера для звонка">
          </nuxt-link>

          <nuxt-link to="/cart" class="shop-link" v-if="!page">
            Корзина
            <img src="../images/icons/shopping-cart.svg" alt="Иконка номера для звонка">
          </nuxt-link>
        </li>
      </ul>

      <div role="button" @click="changeMenuState" aria-label="Menu" id="main-nav-toggle">
        Меню
        <span class="dropdown-icon"></span>
      </div>
    </nav>
  </header>
</template>

<script>

export default {
  props: ['page'],
  data() {
    return {
      isActive: true
    }
  },
  computed: {
    cartTotal() {
      return this.$store.state.cartTotal
    }
  },
  methods: {
    changeMenuState() {
      this.isActive = !this.isActive
    }
  }
};
</script>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  line-height: 4.375em;
  padding: 0 4.375em 0 1.563em;
  background-color: #232323;
  z-index: 6;
  border-radius: 4px 0 0 0;
  box-sizing: border-box;
}

.header .logo {
  display: inline-block;
}

.header .small-logo {
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

.mainmenu .menu-item a {
  line-height: 60px;
  display: block;
}

.mainmenu .tel-call-link img {
  height: 1.1em;
  margin: 0 5px -2px 0;
}

.mainmenu li + li {
  margin-left: 3.125em;
}

.mainmenu .shop-link {
  transition: all .15s ease-in-out;
  position: relative;
}

.mainmenu .shop-link::before {
  bottom: 15px;
  background-color: #FFB500;
  content: '';
  height: 1px;
  display: block;
  width: 100%;
  position: absolute;
}

.mainmenu .shop-link:hover {
  border-bottom:rgba(255, 183, 0, 0);
}

.mainmenu .shop-link img {
  margin-left: 10px;
  height: .9em;
}




.mainmenu .menu-item a:hover {
  color: #a6a6a6;
  transition: color 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

#main-nav-toggle {
  position: absolute;
  right: 32px;
  display: none;
  top: 0;
  color: #fff;
  font-weight: 400;
  font-size: 1em;
  line-height: 48px;
  box-sizing: border-box;
  overflow: hidden;
  margin: 0;
  padding: 0 3px 0 0;
  background: transparent;
  border: 0;
}

.mainmenu .dropdown-icon {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-bottom: 3px;
  margin-left: 3px;
  vertical-align: baseline;
  border-top: 1.5px solid #fff;
  border-right: 1.5px solid #fff;
  transform: rotate(135deg);
  transition: transform .3s;
}

@media (max-device-width: 900px) {
  .header {
    height: auto;
    padding: 0;
    overflow: auto;
    box-sizing: border-box;
    line-height: initial;
  }

  .header .logo {
    line-height: 48px;
    display: inline-block;
    padding-left: 32px;
  }

  .header .logo img {
    height: 2em;
  }

  #main-nav-toggle {
    position: relative;
    display: block;
  }

  .mainmenu {
    float: none;
  }

  .mainmenu .menu-item {
    display: none;
    line-height: 48px;
  }

  .mainmenu .menu-item a {
    display: block;
    line-height: inherit;
  }

  .mainmenu.responsive .menu-item {
    display: block;
    text-align: left;
    padding: 0;
    margin: 0 28px;
    font-weight: 500;
  }

  .mainmenu.responsive .menu-item a::after {
    content: "";
    display: block;
    float: right;
    margin-top: 22px;
    width: 5px;
    height: 5px;
    margin-bottom: 3px;
    margin-left: 3px;
    border-top: 1.2px solid rgba(255, 255, 255, 0.2);
    border-right: 1.2px solid rgba(255, 255, 255, 0.2);
    transform: rotate(45deg);
    transition: transform .3s;
  }

  .mainmenu.responsive .dropdown-icon {
    transform: rotate(-45deg);
    margin-left: 4px;
    margin-bottom: -1.5px;
    transition: all 0.35s cubic-bezier(0.165, 0.84, 0.44, 1);
  }

  .mainmenu.responsive .menu-list {
    background-color: #272727;
    padding: 40px 0;
  }

  .mainmenu.responsive .menu-item + .menu-item {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .mainmenu .shop-link {
    padding-bottom: 3px;
  }

  .mainmenu .shop-link::before {
    width: 6em;
  }

  #main-nav-toggle {
    float: right;
    display: block;
    position: absolute;
  }

  .mainmenu.responsive .telephone a::after {
    display: none;
  }
}


@media (max-device-width: 900px) {
  .header .small-logo {
    display: block;
  }

  .header .logo {
    padding: 10px 0 10px 32px;
  }

  .header .main-logo {
    display: none;
  }
}

</style>
