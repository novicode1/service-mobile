<template>
  <main class="wrapper">
    <div class="contain">
      <div class="item-title">
        <h1>Apple Macbook Pro 2017</h1>
      </div>

      <div class="item-content">
        <ul class="breadcrumbs">
          <li class="breadcrumb">Главная</li>
          <li class="breadcrumb">Ноутбуки</li>
          <li class="breadcrumb">Macbook</li>
        </ul>
      </div>

      <div class="item-image-wrapper">
        <img src="./../static/ipad-pro-2018.png" alt="Image" class="item-image">
      </div>
    </div>
  </main>
</template>


<style scoped>
  .contain {
    margin-right: 4.375em;
    background-color: #242424;
    color: white;
    border-radius: 10px;
  }

  .item-title {
    padding: 12px 24px;
    background-color: #4C4C4C;
    border-radius: 10px 10px 0 0;
  }

  .item-title h1 {
    font-size: 22px;
  }

  .item-content {
    padding: 48px 56px;
  }

  .breadcrumbs {
    list-style: none;
    font-size: 14px;
    font-weight: 400;
  }

  .breadcrumbs li {
    display: inline-block;
    margin-right: 24px;
  }

  .breadcrumbs li+li:before {
    position: absolute;
    content: " ";
    background-image: url("./../images/icons/nav-item-arrow-right.svg");
    background-repeat: no-repeat;
    width: 7px;
    height: 13px;
    margin-left: -16px;
    margin-top: 2px;
  }
</style>
