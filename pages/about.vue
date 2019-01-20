<template>
  <main class="wrapper">
    <header class="header">
      <a class="logo" href="index.html">
        <img src="../images/icons/about-logo.svg" alt="Логотип Service Mobile">
      </a>
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
            <nuxt-link to="/women">Услуги</nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/men">Контакты</nuxt-link>
          </li>
          <li class="menu-item">
            <nuxt-link to="/sale" class="shop-link">Купить<img src="../images/icons/shopping-cart.svg" alt="Иконка номера для звонка"></nuxt-link>
          </li>
        </ul>
      </nav>
    </header>

    <main class="content-about">

      <section class="promo-section">
        <div class="section-center-wrapper">
          <h1>Service Mobile</h1>
          <ul class="services-list">
            <li class="service-item">Продажа новой и б/у техники.</li>
            <li class="service-item">Продажа аксессуаров и комплектующих </li>
            <li class="service-item">Ремонт техники. </li>
            <li class="service-item">Выезд мастера на дом.</li>
            <li class="service-item">Доставка курьером.</li>
          </ul>
          <h3>Мы с Вами уже более 10 лет!</h3>
          <nuxt-link to="/sale" class="link-to-shop">Перейти к покупкам</nuxt-link>
          <img src="../images/icons/mouse-down.svg" class="mouse-scroll-down" alt="Перейти ниже">
        </div>
      </section>

      <section class="our-services">
        <div class="section-center-wrapper">
          <h2>Наши Услуги</h2>
          <ul class="services-list">
            <li class="service-item">Продажа новой и б/у техники.</li>
            <li class="service-item">Продажа аксессуаров и комплектующих </li>
            <li class="service-item">Ремонт техники. </li>
            <li class="service-item">Выезд мастера на дом.</li>
            <li class="service-item">Доставка курьером.</li>
          </ul>
          <nuxt-link to="/sale" class="link-to-shop">Оставить заявку</nuxt-link>
        </div>
      </section>

      <section class="devices-repair">
        <div class="section-center-wrapper">
          <h2>Наши Услуги</h2>
          <ul class="services-list">
            <li class="service-item">Продажа новой и б/у техники.</li>
            <li class="service-item">Продажа аксессуаров и комплектующих </li>
            <li class="service-item">Ремонт техники. </li>
            <li class="service-item">Выезд мастера на дом.</li>
            <li class="service-item">Доставка курьером.</li>
          </ul>
          <nuxt-link to="/sale" class="link-to-shop">Оставить заявку</nuxt-link>
        </div>
      </section>

      <footer>
        <section class="contact-us">
          <div class="contact-form">
            <h4>Напишите нам</h4>
            <form action="../../libs/mail/telegram.php" method="POST">
              <div class="form-group">
                <label>
                  <input type="text" class="form-control message-poiter-hidden" style="display: none" name="user_model" value="Armchairs">
                </label>
              </div>
              <div class="form-group">
                <label>
                  <p>Name</p>
                  <input type="text" class="form-control" id="" name="user_name" placeholder="Например, Иван">
                </label>
              </div>
              <div class="form-group">
                <label>
                  <p>Telephone number</p>
                  <input type="text" class="form-control" id="" name="user_phone" placeholder="+38 (067) 99 99 999">
                </label>
              </div>
              <div class="form-group">
                <label>
                  <p>Email</p>
                  <input type="text" class="form-control" id="" name="user_email" placeholder="mail@mail.ru">
                </label>
              </div>
              <div class="form-group">
                <label for="">
                  <p>Comment</p>
                  <input type="text" class="form-control" id="" name="user_comment" placeholder="comment">
                </label>
              </div>
              <button type="submit" class="btn btn-primary">Send</button>
					  </form>
          </div>

          <div class="contacts">

          </div>

        </section>
      </footer>
    </main>
  </main>
</template>

<style scoped>
.wrapper {
  background-color: black;
}

.content-about h2 {
  font-weight: bold;
  font-size: 2em;
  text-transform: uppercase;
  margin-bottom: 1.875em;
}

.header {
  font-size: 14px;
  width: 100%;
  position: fixed;
  line-height: 4.375em;
  padding: 0 4.375em 0 1.563em;
  background-color: rgba(0, 0, 0, 0.9);
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

.content-about > section {
  height: 100vh;
  display: flex;
  align-items: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
}

.content-about .promo-section {
  background: url(../images/main-monkey.png) no-repeat 90% 100%;
  background-size: auto 80%;
  box-shadow: #FFB500;
  margin-left: 13%;
}

.content-about h1 {
  font-size: 3.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
  letter-spacing: normal;
  text-transform: uppercase;
  white-space: nowrap;
}

.content-about .services-list {
  line-height: 2em;
  list-style: none;
  margin-bottom: 2em;
  padding-inline-start: 20px;
}

.content-about .service-item:before {
  content: "\2022";
  color: #FFB500;
  font-weight: bold;
  display: inline-block;
  width: 1em;
  padding-inline-start: 0px;
}

.content-about h2 {
  margin-bottom: 0.5em;
}

.content-about h3 {
  margin-bottom: 2.75em;
}

.link-to-shop {
  display: inline-block;
  padding: 10px 70px 10px 36px;
  font-size: 0.875em;
  border-radius: 20px;
  border: 2px solid white;
  background: url(../images/icons/arrow-right-link.svg) no-repeat 90% 50%;
  background-color: rgba(255, 255, 255, 0.05);
}

.promo-section .mouse-scroll-down {
  position: absolute;
  width: 1.3em;
  bottom: 10px;
  left: 2.1em;
}

.promo-section:before {
  content: '';
  position: fixed;
  height: 100vh;
  left: calc(65px+1.3em);
  border-right: 1px solid rgba(185, 185, 185, 0.164);
}

.content-about .our-services {
  justify-content: flex-end;
  margin-right: 13%;
  background: url(../images/telephone-monkey.png) no-repeat 30% 50%;
  background-size: auto 60%;
}

.devices-repair {
  margin-left: 13%;
  background: url(../images/laptop-monkey.png) no-repeat 75% 50%;
  background-size: auto 60%;
}

footer {
  margin: 0 calc(65px+1.3em) 0 13%;
  border-radius: 20px;
  border: 5px solid #181818;
}

footer .contact-us h4 {
  text-transform: none;
  font-weight: normal;
  font-size: 2em;
}

</style>
