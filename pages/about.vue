<template>
  <main class="wrapper" id="start">
    <app-navigation page="aboutUs"/>

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
          <app-send-question-form />

          <div class="contacts">
            <h4>Контакты</h4>
            <div class="maps-location">
              <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2746.4951061720544!2d30.7215689!3d46.4983091!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40c631c509279f4d%3A0xbf52593bac3bc3ba!2z0YPQuy4g0KfQtdGA0L3QvtC80L7RgNGB0LrQvtCz0L4g0JrQsNC30LDRh9C10YHRgtCy0LAsIDQsINCe0LTQtdGB0YHQsCwg0J7QtNC10YHRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCwgNjUwMDA!5e0!3m2!1sru!2sua!4v1548017707196" width="100%" height="150" frameborder="0" style="border:0" allowfullscreen></iframe>
              ул. Черноморского Казачества, 4 Одесса, Одесская область
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

<script>
import AppNavigation from './../components/AppNavigation.vue'
import AppSendQuestionForm from './../components/form/AppSendQuestionForm.vue'

export default {
  components: {
    AppNavigation,
    AppSendQuestionForm
  }
}
</script>

<style scoped>

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

.nav-hidden .menu-footer div {
  margin-bottom: 12px;
}
.wrapper {
  background-color: black;
  --wrapper-margin: 13%;
}

.content-about h2 {
  font-weight: bold;
  font-size: 2em;
  text-transform: uppercase;
  margin-bottom: 1.875em;
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
  background: url(../images/main-monkey.jpg) no-repeat 80% 100%;
  background-size: 70% auto;
  box-shadow: #FFB500;
  margin-left: var(--wrapper-margin);
}

.content-about h1 {
  font-size: 3.5em;
  margin-bottom: 0.5em;
  font-weight: bold;
  letter-spacing: normal;
  text-transform: uppercase;
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
  background: #000;
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
  margin-right: var(--wrapper-margin);
  background: url(../images/telephone-monkey.jpg) no-repeat 30% 50%;
  background-size: 60% auto;
}

.devices-repair {
  margin-left: var(--wrapper-margin);
  background: url(../images/laptop-monkey.jpg) no-repeat 75% 50%;
  background-size: 60% auto;
}

footer {
  margin: 0 calc(65px+1.3em) 0 var(--wrapper-margin);
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
  margin-bottom: 50px;
}

.feedback-form .submit-message-button[type="submit"] {
  display: block;
  margin: 0 auto;
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
  padding: 40px 0;
  margin: 0 auto;
  text-align: center;
  display: inline-block;
  vertical-align: top;
}

.contacts .contacts-list {
  list-style: none;
  text-align: left;
  width: 40%;
  padding-left: 0px;
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
  min-width: 200px;
  display: inline-block;
  line-height: 1.5em;
}

.contact-us .maps-location h5 {
  display: inline-block;
  font-weight: 300;
  margin-left: 7px;
  margin-bottom: 10px;
}

  @media (max-device-width: 1024px) {
    .header .mainmenu {
      display: none;
    }

    .promo-section:before {
      border-right: 0px;
    }

    .header .nav-hidden {
      display: block;
    }

    .promo-section {
      margin-bottom: 200px;
    }

    .content-about .our-services {
      height: auto;
      padding-bottom: 200px;
    }

    .content-about .devices-repair {
      height: auto;
      padding-bottom: 200px;
    }

    .contact-us .contacts {
      width: 100%;
      margin: 0 auto;
      display: block;
    }

    .contact-us .contact-form {
      display: block;
      margin-bottom: 60px;
    }

    .contact-form .form-control {
      width: 60%;
      min-width: 240px;
    }

    .contact-us .contact-form {
      width: 100%;
      max-width: 500px
    }

    .content-about .our-services {
      background-size: 400px auto;
    }

    .content-about .devices-repair {
      background-size: 400px auto;
      background-position: 90% 50%;
    }

    .contacts-list .contact-item {
      margin: 10px auto;
    }
  }

  @media (max-device-width: 768px) {
    .wrapper {
      --wrapper-margin: 8%;
    }

    .content-about .promo-section {
      background: none;
    }

    .promo-section .mouse-scroll-down {
      position: static;
      margin-top: 40px;
      display: block;
    }

    .content-about .our-services {
      background-size: 300px auto;
      background-position: 110% 40%;
      justify-content: start;
      margin-left: var(--wrapper-margin);
    }

    .content-about .devices-repair {
      background-size: 250px auto;
      background-position: 90% 50%;
    }

    .contacts .contacts-list {
      display: block;
      width: auto;
      text-align: center;
    }

    .contact-us .maps-location {
      margin-bottom: 40px;
      width: 80%;
    }

    .contact-us .maps-location iframe {
      height: 300px;
    }

    footer {
      margin: 6%;
    }

    @media (max-device-width: 610px) {
      .header .logo {
        display: none;
      }

      .wrapper .content-about {
        padding-top: 10vh;
      }

      .content-about .promo-section {
        height: auto;
        margin-bottom: 200px;
      }

      .content-about .our-services {
        background-size: 300px auto;
        background-position: 60% 85%;
        justify-content: flex-start;
        margin-left: var(--wrapper-margin);
      }

      .content-about .devices-repair {
        background-size: 250px auto;
        background-position: 40% 90%;
      }

      .content-about .our-services {
        padding-bottom: 300px;
      }

      .content-about .devices-repair {
        padding-bottom: 300px;
      }

      .content-about h1 {
        font-size: 2.5em;
      }

      .contact-us .maps-location iframe {
        height: 260px;
      }

      .contact-us .maps-location {
        width: 100%;
      }
    }
  }
</style>
