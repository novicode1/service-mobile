<template>
  <main class="wrapper">
    <header class="header">
      <a class="logo" href="index.html">
        <img src="../images/icons/about-logo.svg" alt="Service Mobile logo">
      </a>
      <nav class="mainmenu">
        <ul class="menu-list">
          <nuxt-link to="/about"><li>+38 063-333-99-93</li></nuxt-link>
          <nuxt-link to="/about"><li>О нас</li></nuxt-link>
          <nuxt-link to="/women"><li>Услуги</li></nuxt-link>
          <nuxt-link to="/men"><li>Контакты</li></nuxt-link>
          <nuxt-link to="/sale"><li>Купить</li></nuxt-link>
        </ul>
      </nav>
    </header>

    <main class="about-content">
      <h1>Service Mobile</h1>
      <ul class="services-list">
        <li class="service-item">Продажа новой и б/у техники.</li>
        <li class="service-item">Продажа аксессуаров и комплектующих </li>
        <li class="service-item">Ремонт техники. </li>
        <li class="service-item">Выезд мастера на дом.</li>
        <li class="service-item">Оптовые продажи.</li>
        <li class="service-item">Доставка курьером.</li>
      </ul>
      <h3>Мы с Вами уже более 10 лет!</h3>
      <nuxt-link to="/sale" class="link-to-shop">Купить</nuxt-link>
    </main>
  </main>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {

  }
};
</script>

<style scoped>

</style>
