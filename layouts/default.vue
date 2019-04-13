<template>
  <div>
    <div class="wrapper">
      <nuxt class="site-content"/>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    name: "footer"
  }
};
</script>

<style>
html,
body {
    display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
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

/* sticky footer stuff */
.wrapper {
  min-height: 100vh;
  margin-bottom: -60px;
}

.footer,
.push {
  height: 50px;
  margin-top: 10px;
}

  @media (max-device-width: 1024px) {
    .contain {
      padding-top: 80px;
    }
  }
</style>
