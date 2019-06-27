<template>
<div>
  <app-navigation />
  <div class="capsule cart">
    <div v-if="cartTotal > 0">
      <h1>Корзина</h1>
      <div class="cartitems" v-for="item in cart" :key="item">
        <div class="carttext">
          <h4>{{ item.name }}</h4>
          <p>{{ item.price | usdollar }} x {{ item.count }}</p>
          <p>Цена: <strong>{{ item.price * item.count | usdollar }}</strong></p>
        </div>
        <img class="cartimg" :src="`/${item.img}`" :alt="`Image of ${item.name}`">
      </div>
      <div class="total">
        <h3>Сумма: <strong>{{ total | usdollar }}</strong></h3>
      </div>
      <app-checkout :total="total" @successSubmit="success = true"></app-checkout>
    </div>

    <div v-else-if="cartTotal === 0 && success === false" class="empty">
      <h1>Cart</h1>
      <h3>Your cart is empty.</h3>
      <nuxt-link exact to="/"><button>Fill er up!</button></nuxt-link>
    </div>

    <div v-else>
      <app-success @restartCart="success = false"/>
      <h2>Success!</h2>
      <p>Your order has been processed, it will be delivered shortly.</p>
    </div>
  </div>
  <app-footer class="footer"/>
</div>
</template>

<script>
import AppCheckout from './../components/AppCheckout.vue';
import AppFooter from './../components/AppFooter.vue';
import AppSuccess from './../components/AppSuccess.vue';
import AppNavigation from './../components/AppNavigation';

export default {
  data() {
    return {
      success: false
    };
  },
  components: {
    AppCheckout,
    AppSuccess,

    AppNavigation,
    AppFooter,
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    cartTotal() {
      return this.$store.state.cartTotal;
    },
    total() {
      return Object.values(this.cart)
        .reduce((acc, el) => acc + (el.count * el.price), 0)
        .toFixed(2);
    }
  },
  filters: {
    usdollar: function(value) {
      return `$${value}`;
    }
  }
};
</script>

<style scoped>
.cart > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  padding: 50px;
  background: white;
  border-radius: 3px;
  margin-top: 10px;
  padding-bottom: 80px;
}

.cart h1 {
  margin-bottom: 15px;
}

.cart.empty h1,
.cart.empty h3 {
  margin-bottom: 15px;
}

.cartitems {
  padding: 30px;
  border-bottom: 1px #D1D1D1 solid;
  width: 500px;
}

.carttext {
  width: 250px;
  float: left;
}

.carttext p,
.carttext h4 {
  padding: 5px;
}

.cartimg {
  width: 100px;
  float: right;
}

.total {
  margin: 20px;
}
</style>
