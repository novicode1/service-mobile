<template>
  <aside>
    <div class="sidearea">
        <div class="nav-hidden">
            <div class="nav-header" @click="toggleClass">
                Фильтр
                <img src="./../images/icons/nav-arrow-down.svg" alt="развернуть">
            </div>
            <div class="items-list" :style='{"display": (isActive? "none" : "block" ), "height": (isActive? "0" : "auto" )}'>

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

                <app-switch-sale />
                <app-switch-used />
            </div>
        </div>
    </div>
  </aside>
</template>

<script>
import AppSwitchSale from './switch/AppSwitchSale.vue';
import AppSwitchUsed from './switch/AppSwitchUsed.vue';
export default {
    props: {
      active: {
        type: Boolean,
        default: true
      },
      sale: {
      type: Boolean,
      default: false
    },
    used: {
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
        max: 3000,
        isActive: this.active
      };
  },

  methods: {
    toggleClass: function(event) {
       if(this.isActive){
         this.isActive = false;
       }else{
         this.isActive = true;
       }
    }
  },
  components: {
    AppSwitchSale,
    AppSwitchUsed
  }
}
</script>


<style lang="scss" scoped>
aside {
  display: block;
  margin-bottom: 30px;
  color: white;
  overflow: hidden;
  border-radius: 0px 10px 10px 0px;
}

@media (max-width: 1073px) {
    aside {
        border-radius: 10px 0px 0px 10px;
    }
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
    border-radius: inherit;
  }
}

.items-list {
  background-color: #1C1C1C;
  transition: .4s ease-in-out;
    transition-timing-function: cubic-bezier(0, 1, 0.1, 1);
  list-style: none;
  padding: 10px 14px 0;
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

.store-filter.hidden {
  .items-list * {
    height: auto;
  }
}

.store-filter .items-list {
  height: auto;
  opacity: 1;
}

.store-filter .items-list * {
  height: auto;
  display: block;
}

@media (max-width: 816px) {
  .nav-hidden img {
    margin: 0 !important;
  }
}

.items-list {
  display: block;
  color: #FFFFFF;
  background: #1C1C1C;
  margin-bottom: 20px;
  text-align: left;
}

.sidearea {
  border-bottom: 1px solid #3F3F3F;
  border-radius: inherit;
  &:last-of-type {
    border: none;
  }
}

.sidearea > span {
    display: inline-block;
}

.callout {
  padding: 20px 0;
  h4 {
    padding-bottom: 10px;
  }
}

/*--input range--*/

label {
  padding: 15px 0;
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
