<template>
  <div class="item">
    <span class="salepill salepill-used" v-if="item.used" :click="additem">Б/у</span>
    <span class="salepill salepill-sale" v-if="item.sale">Скидка</span>

    <div class="item-image-wrapper">
      <nuxt-link
        :to="{ name: 'product-item', query: { path: this.$route.name, id: item.id, category: category, name: item.name }}"
      >
        <img :src="`${item.imageUrl}`" :alt="`Image of ${item.name}`" class="item-image">
      </nuxt-link>
    </div>

    <nuxt-link
      :to="{
      name: 'product-item',
      query: {
        path: this.$route.name,
        id: item.id,
        category: category.category
      }}"
      class="item-name"
    >{{ item.name | truncate(34, ' ...')}}</nuxt-link>
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
    <span class="item-code">Код: {{ item.code | truncate(16, '...')}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      category: this.checkPageCategory()
    };
  },
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
    checkPageCategory() {
      return this.$route.query.category ? this.$route.query.category : "main";
    }
  }
};
</script>

<style scoped>
.item {
  flex-basis: 22%;
  border-radius: 10px;
  padding: 20px 16px 24px;
  line-height: 20px;
  background: white;
  float: left;
  margin: 0 1% 60px;
  min-width: 100px;
  position: relative;
}

@media (max-width: 1333px) {
  .item {
    flex-basis: 23%;
  }
}
@media (max-width: 1073px) {
  .item {
    flex-basis: 23%;
  }
}
@media (max-width: 815px) {
  .item {
    flex-basis: 31.3%;
  }
}
@media (max-width: 555px) {
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
  max-width: 100%;
  max-height: 95%;
}

.item .item-image:hover {
  cursor: pointer;
}

.item .salepill {
  position: absolute;
  top: 18px;
  color: white;
  padding: 2px 10px;
  font-size: 13px;
  font-weight: 500;
  z-index: 2;
  border-radius: 20px;
}

.item .salepill-used {
  background-color: #0070c9;
}

.item .salepill-sale {
  background-color: #ffb500;
  right: 16px;
}

.item .item-name {
  font-weight: 500;
  height: 2.86em;
  line-height: 1.43em;
  text-overflow: ellipsis;
  color: #0070c9;
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
  border-bottom: 1px solid #f6f6f6;
  padding-bottom: 12px;
  margin-bottom: 12px;
  color: #2e3142;
  margin-top: 9px;
}

.item .item-add-btn {
  display: block;
  margin: 0 auto;
}

.item-stock {
  font-weight: normal;
  font-size: 12px;
  color: #2e4058;
  margin-bottom: 4px;
}

.item-stock img {
  vertical-align: top;
  margin-right: 2px;
}

.item-code {
  line-height: 18px;
  display: block;
  font-weight: normal;
  position: absolute;
  bottom: 8px;
  right: 10px;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.5);
}

@media (max-device-width: 400px) {
  .item {
    flex-basis: 50%;
    border-radius: 0;
    margin: 0;
    position: relative;
    padding-bottom: 40px;
  }

  .item:nth-child(2n) {
    border-left: 1px solid #ebebeb;
  }
}
</style>
