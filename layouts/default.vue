<template>
  <div>
    <div class="wrapper">
      <nuxt/>
      <div class="clear"></div>
      <div class="push"></div>
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
  height: 100%;
  margin: 0;
}

.clear {
  clear: both;
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
