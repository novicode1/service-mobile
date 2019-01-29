<template>
  <main class="wrapper" id="start">
    <header class="header">
      <nuxt-link exact to="/about#start" class="logo">
        <img src="../images/icons/about-logo.png" alt="Логотип Service Mobile">
      </nuxt-link>
      <nav class="mainmenu">
        <ul class="menu-list">
          <li class="menu-item">
            <a href="tel:096-866-73-32" class="tel-call-link">
              <img src="../images/icons/telephone-call.svg" alt="Номер обратной связи">
              +38 063-333-99-93
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
          <li class="menu-item">
            <nuxt-link to="/" class="shop-link">Купить<img src="../images/icons/shopping-cart.svg" alt="перейти в магазин"></nuxt-link>
          </li>
        </ul>
      </nav>
    </header>

    <main class="content-about">

      <section class="promo-section">
        <div class="section-center-wrapper">
          <h1>Service Mobile</h1>
          <ul class="services-list">
            <li class="service-item">Продажа новой и б/у техники</li>
            <li class="service-item">Продажа аксессуаров и комплектующих</li>
            <li class="service-item">Ремонт техники</li>
            <li class="service-item">Выезд мастера на дом</li>
            <li class="service-item">Доставка курьером</li>
          </ul>
          <h3>Мы с Вами уже более 10 лет!</h3>
          <nuxt-link to="/" class="link-to-shop">Перейти к покупкам</nuxt-link>
          <img src="../images/icons/mouse-down.svg" class="mouse-scroll-down" alt="Перейти ниже">
        </div>
      </section>

      <section class="our-services" id="services">
        <div class="section-center-wrapper">
          <h2>Наши Услуги</h2>
          <ul class="services-list">
            <li class="service-item">Подбор и продажа новой техники</li>
            <li class="service-item">Продажа и обмен б/у техники</li>
            <li class="service-item">Гарантия для новой и б/у техники</li>
            <li class="service-item">Продажа аксессуаров</li>
            <li class="service-item">Подарочные сертификаты</li>
            <li class="service-item">Выезд курьера</li>
          </ul>
          <nuxt-link to="/sale" class="link-to-shop">Оставить заявку</nuxt-link>
        </div>
      </section>

      <section class="devices-repair">
        <div class="section-center-wrapper">
          <h2>Ремонт Техники</h2>
          <ul class="services-list">
            <li class="service-item">Замена экрана</li>
            <li class="service-item">Замена батареи</li>
            <li class="service-item">Ремонт ноутбуков</li>
            <li class="service-item">Восстановление потерянной информации</li>
            <li class="service-item">Предоставление гарантии</li>
            <li class="service-item">Перенос информации</li>
          </ul>
          <nuxt-link to="/sale" class="link-to-shop">Оставить заявку</nuxt-link>
        </div>
      </section>
      <footer>
        <section class="contact-us" id="contacts">
          <div class="contact-form">
            <h4>Напишите нам</h4>
            <form action="../../libs/mail/telegram.php" method="POST" class="feedback-form">
              <div class="form-group">
                <label>
                  <input type="text" class="form-control message-poiter-hidden" style="display: none" name="user_model" value="Armchairs">
                </label>
              </div>

              <div class="form-group">
                <label for="user_name"></label>
                  <input type="text" class="form-control" name="user_name" placeholder="Имя">
              </div>
              <div class="form-group">
                <label for="user_phone"></label>
                  <input type="text" class="form-control" name="user_phone" placeholder="Номер телефона">

              </div>
              <div class="form-group">
                <label for="user_email"></label>
                  <input type="text" class="form-control" name="user_email" placeholder="E-mail">

              </div>
              <div class="form-group">
                <label for="user_comment"></label>
                  <input type="text" class="form-control" name="user_comment" placeholder="Комментарий">
              </div>
              <button type="submit" class="submit-message-button">Отправить</button>
					  </form>
          </div>
          <div class="contacts">
            <h4>Контакты</h4>
            <div class="maps-location">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2746.4951061720544!2d30.7215689!3d46.4983091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631c509279f4d%3A0xbf52593bac3bc3ba!2z0YPQuy4g0KfQtdGA0L3QvtC80L7RgNGB0LrQvtCz0L4g0JrQsNC30LDRh9C10YHRgtCy0LAsIDQsINCe0LTQtdGB0YHQsCwg0J7QtNC10YHRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNjUwMDA!5e0!3m2!1sru!2sua!4v1548017707196" width="100%" height="150" frameborder="0" style="border:0" allowfullscreen></iframe>
              ул. Черноморского Казачества, 4 Одесса,Одесская область
            </div>
            <ul class="contacts-list">
              <li class="contact-item">
                <img src="../images/icons/telephone-call.svg" alt="Обратная связь">
                +380 63–333–99–93
              </li>
              <li class="contact-item">
                <img src="../images/icons/clock.svg" alt="Рабочие часы">
                Ежедневно 09:00 - 19:00
              </li>
              <li class="contact-item">
                <img src="../images/icons/inst.svg" alt="Мы в инстаграмме">
                service.mobile_od
              </li>
            </ul>
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
  background: url(../images/main-monkey.png) no-repeat 80% 100%;
  background-size: 70% auto;
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
  max-width: 25em;
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
  margin-bottom: 0.7em;
}

.content-about h3 {
  margin-bottom: 2.75em;
}

.content-about .link-to-shop {
  display: inline-block;
  padding: 10px 70px 10px 36px;
  font-size: 0.875em;
  min-width: 50px;
  border-radius: 20px;
  border: 2px solid white;
  background: url(../images/icons/arrow-right-link.svg) no-repeat 90% 50%;
  background-color: rgba(255, 255, 255, 0.05);
}

.content-about .link-to-shop:hover {
  border: 2px solid #ffc636;
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
  background-size: 60% auto;
}

.devices-repair {
  margin-left: 13%;
  background: url(../images/laptop-monkey.png) no-repeat 75% 50%;
  background-size: 60% auto;
}

footer {
  margin: 0 calc(65px+1.3em) 0 13%;
  -webkit-border-radius: 20px;
  -moz-border-radius: 20px;
  border-radius: 20px;
  border: 5px solid #181818;
  padding: 1.875em 0 2.813em;
}

footer .contact-us h4 {
  text-transform: none;
  font-weight: normal;
  font-size: 2em;
  margin-bottom: 1em;
}

.contact-us .contact-form {
  width: 45%;
  margin: 0 auto;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}

.contact-form .form-control {
  height: 1.875em;
  margin-bottom: 5px;
  padding: 15px 13px;
  width: 300px;
  color: white;
  font-size: 1em;
  font-family: 'Roboto', sans-serif;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.035);
  border: 1px solid #707070;
}

.feedback-form .submit-message-button[type="submit"] {
  display: inline-block;
  padding: 10px 100px 10px 36px;
  margin-top: 1.875em;
  font-size: 0.875em;
  border-radius: 20px;
  color: white;
  font-weight: 300;
  min-width: 50px;
  border: 2px solid white;
  background: url(../images/icons/arrow-right-link.svg) no-repeat 90% 50%;
  background-color: rgba(255, 255, 255, 0.05);
}

.feedback-form .submit-message-button:hover {
  color: #d6d6d6;
  border: 2px solid #ffc636;
  cursor: pointer;
}

.contact-us .contacts {
  width: 55%;
  margin: 0 auto;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}

.contacts .contacts-list {
  list-style: none;
  text-align: left;
  width: 40%;
  padding-left: 10px;
  display: inline-block;
  vertical-align: top;
}

.contacts-list .contact-item {
  margin: 1em 0 0 1em;
  line-height: 1.8em;
}

.contacts-list img {
  width: 1.375em;
  vertical-align: middle;
}

.contacts h5 {
  font-size: 1.313em;
  text-align: center;
}

.contact-us .maps-location {
  width: 40%;
  display: inline-block;
  line-height: 1.5em;
}

.contact-us .maps-location h5 {
  display: inline-block;
  font-weight: 300;
  margin-left: 7px;
  margin-bottom: 10px;
}
/*
@media (max-device-width: 1024px) {
  .header .mainmenu {
    display: none;
  }
} */


</style>
