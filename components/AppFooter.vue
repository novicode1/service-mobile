<template>
  <footer>
    <img src="../images/icons/store-logo.png" alt="Логотип Service Mobile" class="footer-logo">
    <div class="working-hours">
      <img src="../images/icons/clock.svg" alt="Рабочие часы">
      Ежедневно 09:00 - 10:00
    </div>

    <div class="telephone-number">
      <img src="../images/icons/telephone-call.svg" alt="Рабочие часы">
      +380 63–333–99–93
    </div>

    <div class="location">
      <img src="../images/icons/map-point.svg" alt="Геолокация">
      <div class="location-text-wrapper">ул. Черноморского Казачества, 4<br> Одесса, Одесская область</div>
    </div>

    <div class="copyright">
      © 2019 Service Mobile. All rights reserved.
    </div>

  </footer>
</template>

<style scoped>
footer {
  display: -webkit-flex; /* Safari */
  -webkit-align-items: center; /* Safari 7.0+ */
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 300;
  padding: 0 40px;
  background: black;
  color: white;
  margin-top: 10px;
  width: 100%;
  height: auto;
  padding: 20px;
  text-align: right;
}

footer .footer-logo {
  display: none;
}

footer > div {
  text-align: center;
}

.telephone-number img {
  height: 20px;
}

footer img {
  vertical-align: middle;
}

.location img {
  margin-bottom: 6px;
}

footer .copyright {
  justify-content: flex-start;
}


@media (max-device-width: 610px) {
  footer .footer-logo {
    display: block;
    height: 2.5em;
    margin: auto;
  }

  footer {
    text-align: initial;
    display: initial;
    height: auto;
    width: auto;
    background: transparent;
  }

  footer .location {
    margin: 16px 0;
  }

  footer > div {
    margin: 16px 0;
  }
}
</style>
