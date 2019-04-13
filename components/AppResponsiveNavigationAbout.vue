<template>
    <div class="responsive-nav" v-bind:class="{collapsed: collapsed}">
    <span class="hamburger pull-right" v-on:click="toggleActive(!collapsed)">
      <img src="../images/icons/burger-menu.svg" alt="Menu">
    </span>
    <slot v-on:click="toggleActive(false)"></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      collapsed: true
    }
  },
  methods: {
    toggleActive (flag) {
      this.collapsed = flag
    }
  }
};
</script>

<style scoped>

.menu-header {
  width: 100%;
  z-index: 4;
}



.nav-hidden .menu-list {
  font-weight: 300;
  padding: 32px 32px;
  list-style: none;
  position: absolute;
  background-color: #393939;
  width: 320px;
  border-radius: 0 0 0 4px;
  z-index: 3;

}

.menu-item .shop-link {
  border-bottom: 1px solid #FFB500;
  -webkit-transition: all .15s ease-in-out;
  -moz-transition: all .15s ease-in-out;
  -ms-transition: all .15s ease-in-out;
  -o-transition: all .15s ease-in-out;
  transition: all .15s ease-in-out;
  padding-bottom: 3px;
}

.nav-hidden .menu-item {
  font-weight: 400;
  line-height: 48px;
  display: block;
}

.nav-hidden .shop-link img {
  color: #000;
}

.nav-hidden .menu-item a {
  color: #fff;
}


.responsive-nav {
  float: right;
  width: 258px;
  transition: margin 0.2s ease-out;
  position: relative;
}


.responsive-nav.collapsed {
  margin-right: -324px;
  background: #fff;
}

.hamburger {
  position: absolute;
  left: -48px;
  margin-top: 12px;
  display: block;
  height: 32px;
  width: 32px;
}

.hamburger:focus {
  color: aqua;
}

</style>
