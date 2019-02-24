<template>
  <div class="item">
    <span class="salepill" v-if="item.sale">Б/у</span>

    <div class="item-image-wrapper">
      <img :src="`/${item.img}`" :alt="`Image of ${item.name}`" class="item-image" @click="addItem">
    </div>

    <p class="item-name" @click="addItem">{{ item.name | truncate(44, ' ...')}}</p>
    <p class="item-price">{{ item.price | usdollar }}</p>

    <div class="item-stock">
      <div class="in-stock">
        <img src="../images/icons/in-stock.svg" alt="В наличии">
        В наличии
      </div>


      <!-- <div class="not-in-stock">
        <img src="../images/icons/not-in-stock.svg" alt="Нет в наличии">
        В наличии
      </div> -->

      <!-- <button class="add" @click="addItem">Add Item</button> -->
      <span class="item-code">
        Код: 44013
      </span>

    </div>

    <!-- <button class="item-add-btn" @click="addItem">Add Item</button> -->
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
  margin-bottom: 60px;
  border-radius: 10px;
  padding: 20px;
  line-height: 20px;
  background: white;
  float: left;
  margin-right: 15px;
  margin-left: 15px;
  width: 225px;
  position: relative;
}

.item .item-image-wrapper {
  height: 165px;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.item .item-image {
  left: 50%;
  position: absolute;
  top: 50%;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
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
  min-height: 40px;
  font-weight: 500;
  color: #0070C9;
  height: 40px;
  position: relative;
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
  display: inline-block;
  display: flex;
  justify-content: space-between;
  text-align: justify;
  margin-bottom: 5px;

  /* ie 7*/
  *width: 100%;
  *-ms-text-justify: distribute-all-lines;
  *text-justify: distribute-all-lines;
}

.item-stock img {
  vertical-align: top;
  margin-right: 2px;
}

.item-code {
  display: inline-block;
  vertical-align: baseline;

  /* ie 7*/
  *display: inline;
  *zoom:1;
  *text-align: right;
}

</style>
