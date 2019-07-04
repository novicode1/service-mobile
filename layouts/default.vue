<template>
  <div>
    <div class="wrapper">
      <nuxt class="site-content"/>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("loadProducts").then(() => {
      console.log("Successful dispatch")
    })
  },
  components: {
    name: "footer"
  }
};
</script>

<style>
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
