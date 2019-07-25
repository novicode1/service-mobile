<template>
  <div>
    <div class="wrapper">
      <app-loader v-if="loading === true" />
      <nuxt class="site-content" />
    </div>
  </div>
</template>

<script>
import AppLoader from "../components/AppLoader.vue";

export default {
  created() {
    this.$store.dispatch("loadProducts")
    if (this.$store) {
      try {
        this.$store.dispatch('nuxtServerInit')
        this.$store.dispatch("getUsdValue")
      } catch (err) {
        console.debug('Error occurred when calling nuxtServerInit: ', err.message)
        throw err
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  components: {
    AppLoader
  }
};
</script>

<style>

.autocomplete {
  width: 260px;
  display: inline-block;
  margin-left: 40px;
  vertical-align: top;
  line-height: 1.3;
  font-size: 14px;
  font-weight: 400;
  color: #111;
  margin-top: 5px;
}

.autocomplete-input {
  background-color: transparent;
  color: #fff;text-overflow: ellipsis;
  font-size: 17px;
  border: 1px solid #444;
  font-weight: 400;
  letter-spacing: -0.5px;
  padding: 8px 10px 6px 48px;
}

.autocomplete-input:focus, .autocomplete-input[aria-expanded=true] {
  color: #444;
}

@media (max-device-width: 1100px) {
  .autocomplete-input {
    padding: 4px 10px 6px 48px;
    font-size: 14px;
  }

  .autocomplete {
    margin-top: 4px;
  }
}

@media (max-device-width: 574px) {
  .autocomplete {
    display: block;
    width: calc(100% - 64px);
    margin: 14px auto 14px;
  }
}

@media (max-device-width: 450px) {
  .autocomplete {
    width: calc(100% - 32px);
    margin-top: 10px;
  }
}

html,
body {
  height: 100%;
  margin: 0;
}

body {
  display: flex;
  flex-direction: column;
}

footer {
  margin: auto auto 0 auto;
}

.wrapper {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.capsule {
  color: black;
}

.footer,
.push {
  height: 50px;
  margin-top: 10px;
}
.contain {
  padding-top: 80px;
}

@media (max-device-width: 1024px) {
  .contain {
    padding-top: 80px;
  }
}

@media (max-device-width: 900px) {
  .contain {
    padding-top: 40px;
  }
}
</style>
