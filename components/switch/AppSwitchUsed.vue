<template>
  <div class="sidearea">
    <h4>Только б/у товары</h4>
    <div class="can-toggle demo-rebrand-2">
      <input id="e2" type="checkbox" v-model="trigger" @change="updateUsed">
      <label for="e2">
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
      return this.$store.state.used;
    }
  },
  methods: {
    updateUsed() {
      this.$store.commit('switchUsed');
    }
  }
};
</script>

<style scoped lang="scss">
@import "switch.scss";
.can-toggle {
  &.demo-rebrand-2 {
    @include can-toggle-branding (#888, #3e64ea, rgba(white, 0.7), ease);
  }
}

</style>
