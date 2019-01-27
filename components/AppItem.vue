<template>
  <div class="item">
    <span class="salepill" v-if="item.sale">Sale</span>
    <img :src="`/${item.img}`" :alt="`Image of ${item.name}`" class="item-image">
    <p>{{ item.name }}</p>
    <p>{{ item.price | usdollar }}</p>
    <button class="item-add" @click="addItem">Add Item</button>
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
  background: white;
  float: left;
  margin-right: 15px;
  margin-left: 15px;
  width: 225px;
  height: 350px;
}

.item .item-image {
  display: block;
  margin: 0 auto;
  max-width: 175px;
  max-height: 165px;
}

.item .salepill {
  background: rgb(232, 35, 25);
  color: white;
  font-family: 'Barlow', sans-serif;
  right: 30px;
  top: 60px;
  padding: 2px 10px 4px;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 700;
  border-radius: 1000px;
}

p {
  font-size: 18px;
}
</style>
