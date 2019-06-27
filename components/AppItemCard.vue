<template>
  <div class="item">
    <span class="salepill" v-if="item.sale">Б/у</span>

    <div class="item-image-wrapper">
      <nuxt-link :to="{ name: 'product-item', query: { id: item.id }}">
        <img :src="`${item.imageUrl}`" :alt="`Image of ${item.name}`" class="item-image">
      </nuxt-link>
    </div>

    <nuxt-link :to="{ name: 'product-item', query: { id: item.id }}">
      <p class="item-name">{{ item.name | truncate(44, ' ...')}}</p>
    </nuxt-link>
    <p class="item-price">{{ item.price | usdollar }}</p>

    <div class="item-stock">
      <div class="in-stock" v-if="item.inStock === true">
        <img src="../images/icons/in-stock.svg" alt="В наличии">
        В наличии
      </div>


      <div class="not-in-stock" v-if="item.inStock === false">
        <img src="../images/icons/not-in-stock.svg" alt="Нет в наличии">
        Нет в наличии
      </div>

    </div>
    <span class="item-code">
      Код: {{ item.code }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  filters: {
    usdollar: function(value) {
      return `$${value}`;
    }
  },
  methods: {
    addItem() {
      this.$store.commit('addItem', this.item);
    }
  }
};
</script>

<style scoped>

.item {
  flex-basis: 22%;
  border-radius: 10px;
  padding: 20px 16px;
  line-height: 20px;
  background: white;
  float: left;
  margin: 0 1% 60px;
  min-width: 100px;
  position: relative;
}

@media(max-width: 1333px) {
  .item {
    flex-basis: 23%;
  }
}
@media(max-width: 1073px) {
   .item {
    flex-basis: 23%;
  }
}
@media(max-width: 815px) {
  .item {
    flex-basis: 31.3%;
  }
}
@media(max-width: 555px) {
  .item {
    flex-basis: 48%;
    margin: 0 1% 12px;
  }
}

.item .item-image-wrapper {
  height: 165px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.item-image-wrapper img {
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
}

.item .item-image:hover {
  cursor: pointer;
}

.item .salepill {
  position: absolute;
  background-color: #0070C9;
  color: white;
  padding: 2px 10px;
  font-size: 13px;
  font-weight: 500;
  z-index: 2;
  border-radius: 1000px;
}

.item .item-name {
  font-weight: 500;
  height: 3em;
  color: #0070C9;
  position: relative;
  display: inline-block;
}

.item .item-name:hover {
  color: #1c99ff;
  cursor: pointer;
}

.item .item-price {
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #D1D1D1;
  padding-bottom: 12px;
  margin-bottom: 12px;
  color: #2E3142;
  margin-top: 9px;
}

.item .item-add-btn {
  display: block;
  margin: 0 auto;
}

.item-stock {
  font-weight: normal;
  font-size: 12px;
  color: #2E4058;
  float: left;
}

.item-stock > div {
  margin-right: 48px;
}

.item-stock img {
  vertical-align: top;
  margin-right: 2px;
}

.item-code {
  float: right;
  vertical-align: baseline;
  font-weight: normal;
  font-size: 12px;
  color: #2E4058;
}

</style>
