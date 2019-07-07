<template>
  <div class="sidearea">
    <h4>Только cо скидкой</h4>
    <div class="can-toggle demo-rebrand-2">
      <input id="e" type="checkbox" v-model="trigger" @change="updateSale">
      <label for="e">
        <div class="can-toggle__switch" data-checked="Да" data-unchecked="Нет"></div>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trigger: this.checked
    };
  },
  computed: {
    checked() {
      return this.$store.state.sale;
    }
  },
  methods: {
    updateSale() {
      this.$store.commit('switchSale');
    }
  }
};
</script>

<style scoped lang="scss">
@import "switch.scss";
 
</style>
