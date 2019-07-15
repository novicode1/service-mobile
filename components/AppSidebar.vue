<template>
  <aside>
    <div class="sidearea">
      <div class="nav-hidden">
        <div class="nav-header" @click="toggleClass">
          Каталог товаров
          <img src="./../images/icons/nav-arrow-down.svg" alt="развернуть">
        </div>
        <ul class="items-list" :style='{"display": (isActive? "none" : "block" ), "height": (isActive? "0" : "auto" )}'>

          <li class="list-item" v-for="link in links" :key="link.id">
            <nuxt-link :to="{ path:`${link.url}`, query: { category: link.name }}">
              {{ link.name }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </aside>
</template>

<script>
export default {
    props: {
      active: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        links: [
          {
            name: 'iPhone',
            url: '/iphone'
          },
          {
            name: 'Macbook',
            url: '/macbook'
          },
          {
            name: 'iPad',
            url: '/ipad'
          },
          {
            name: 'Apple Watch',
            url: '/apple-watch'
          },
          {
            name: 'Airpods',
            url: '/airpods' 
          },
          {
            name: 'Аксессуары',
            url: '/accessories'
          },
          {
            name: 'Mac',
            url: '/mac'
          },
          {
            name: 'Скидки',
            url: '/sale'
          },
          {
            name: 'Б/у техника',
            url: '/used'
          }
        ],
        isActive: this.active
      };
  },
  mounted: function() {
    this.onResize()
  },

  destroyed: function() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    toggleClass: function(event) {
       if(this.isActive){
         this.isActive = false;
       }else{
         this.isActive = true;
       }
    },
    onResize() {
      if (window.innerWidth > 1077) {
        this.isActive = false
      } else {
        this.isActive = true
      }
    }
  }
}
</script>


<style lang="scss" scoped>
aside {
  display: block;
  margin-bottom: 30px;
  color: white;
  overflow: hidden;
  border-radius: 0 10px 10px 0;
}

.nav-hidden {
  background-color: #272828;
  border-radius: inherit;

  img {
    margin: 0 10px;
  }

  .nav-header {
    text-align: center;
    padding: 17px 0;
  }
}

.items-list {
  background-color: #1C1C1C;
  transition: .4s ease-in-out;
	transition-timing-function: cubic-bezier(0, 1, 0.1, 1);
  list-style: none;
  padding: 0px 24px;
  border-radius: 0 0 10px 0;

  * {
    height: 0;
    display: none;
  }

  .list-item {
    border-bottom: 1px solid #252626;
    line-height: 32px;
    position: relative;
  }

  .list-item:after {
    position: absolute;
    content: " ";
    background-image: url("./../images/icons/nav-item-arrow-right.svg");
    background-repeat: no-repeat;
    width: 7px;
    top: 10px;
    right: 1px;
    height: 13px;
  }
}

.store-navigation.hidden {
  .items-list {
    padding: 8px 24px 24px;
  }

  .items-list * {
    height: auto;
  }
}

.store-navigation .items-list {
  height: auto;
  opacity: 1;
  padding: 8px 24px 24px;
}

.store-navigation .items-list * {
  height: auto;
  display: block;
}

@media (max-width: 816px) {
  .nav-hidden img {
    margin: 0 !important;
  }
}

</style>
