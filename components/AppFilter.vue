<template>
  <aside>
    <div class="sidearea">
      <label for="pricerange">Максимальная цена: <span>${{ pricerange }}</span></label>
      <input
        class="slider"
        id="pricerange"
        type="range"
        :value="pricerange"
        :min="min"
        :max="max"
        step="0.1"
        @input="$emit('update:pricerange', $event.target.value)"
      />
      <span class="min">${{ min }}</span>
      <span class="max">${{ max }}</span>
    </div>
    <app-switch v-if="!sale" />
    <div class="sidearea callout">
      Not ready
    </div>
  </aside>
</template>

<script>
import AppSwitch from './AppSwitch.vue';

export default {
  props: {
    sale: {
      type: Boolean,
      default: false
    },
    pricerange: {
      type: [Number, String],
      default: 2800
    }
  },
  data() {
    return {
      min: 0,
      max: 3000
    };
  },
  components: {
    AppSwitch
  }
};
</script>

<style lang="scss" scoped>
aside {
  display: block;
  color: #FFFFFF;
  background: #1C1C1C;
  padding: 25px;
  border-radius: 0px 10px 10px 0px;
  margin-bottom: 20px;
}

.sidearea {
  border-bottom: 1px solid #3F3F3F;
  &:last-of-type {
    border: none;
  }
}

.callout {
  padding: 20px 0;
  h4 {
    padding-bottom: 10px;
  }
}

label {
  font-family: 'Roboto', sans-serif;
  padding: 15px 0;
  text-align: center;
}

/*--input range--*/
.sidearea:first-of-type {
  padding-bottom: 40px;
}

label {
  font-family: 'Roboto', sans-serif;
  padding: 15px 0;
  text-align: center;
}

span {
  font-family: 'Roboto', sans-serif;
}

.max {
  font-size: 12px;
  float: right;
  color: #565656;
}

.min {
  float: left;
  font-size: 12px;
  color: #565656;
}
</style>
