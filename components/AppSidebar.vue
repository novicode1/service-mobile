<template>
  <aside>
    <div class="sidearea">
      <div class="nav-hidden">
        <div class="nav-header">
          <img src="./../images/icons/nav-arrow-down.svg" alt="развернуть">
          Каталог товаров
          <img src="./../images/icons/nav-arrow-down.svg" alt="развернуть">
        </div>
        <ul class="items-list">
          <nuxt-link to="/women">
            <li class="list-item">
            iPhone
            </li>
          </nuxt-link>

          <nuxt-link to="/men">
            <li class="list-item">
              Samsung
            </li>
          </nuxt-link>

          <nuxt-link to="/women">
            <li class="list-item">
              Meizu
            </li>
          </nuxt-link>

          <nuxt-link to="/sale">
            <li class="list-item">
              Ноутбуки
            </li>
          </nuxt-link>

          <nuxt-link to="/sale">
            <li class="list-item">
              Аудио
            </li>
          </nuxt-link>

          <nuxt-link to="/sale">
            <li class="list-item">
              Компьютеры и периферия
            </li>
          </nuxt-link>

          <nuxt-link to="/sale">
            <li class="list-item">
              Гироскутеры
            </li>
          </nuxt-link>

          <nuxt-link to="/sale">
            <li class="list-item">
              Гаджеты
            </li>
          </nuxt-link>

          <nuxt-link to="/sale">
            <li class="list-item">
              Аксессуары
            </li>
          </nuxt-link>

          <nuxt-link to="/sale">
            <li class="list-item">
              Ремонт и услуги
            </li>
          </nuxt-link>

          <nuxt-link to="/sale">
            <li class="list-item">
              Б/у техника
            </li>
          </nuxt-link>
        </ul>
      </div>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  display: block;
  margin-bottom: 30px;
  color: white;
}

.nav-hidden {
  background-color: #272828;
  border-radius: 0 10px 10px 0;

  img {
    margin: 0 10px;
  }

  .nav-header {
    text-align: center;
    padding: 17px 0;
  }
}

.items-list {
  background-color: #1C1C1C;
  transition: .4s ease-in-out;
	transition-timing-function: cubic-bezier(0, 1, 0.1, 1);
  list-style: none;
  padding: 0px 24px;
  border-radius: 0 0 10px 0;

  * {
    height: 0;
    display: none;
  }

  .list-item {
    border-bottom: 1px solid #252626;
    line-height: 32px;
    position: relative;
  }

  .list-item:after {
    position: absolute;
    content: " ";
    background-image: url("./../images/icons/nav-item-arrow-right.svg");
    background-repeat: no-repeat;
    width: 7px;
    top: 10px;
    right: 1px;
    height: 13px;
  }
}

.store-navigation.hidden {
  .items-list {
    padding: 8px 24px 24px;
  }

  .items-list * {
    height: auto;
    display: block;
  }
}

.store-navigation:hover .items-list {
  height: auto;
  opacity: 1;
  padding: 8px 24px 24px;
}

.store-navigation:hover .items-list * {
  height: auto;
  display: block;
}

.store-navigation:hover .nav-hidden {
  border-radius: 0 10px 10px 0;
}


</style>
