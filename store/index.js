import Vuex from 'vuex'

const createStore = () => {
  return new Vuex.Store({
    state: {
      cartTotal: 0,
      cart: {},
      sale: false,
      products: [
        {
          name: 'Беспроводные наушники Apple AirPods MMEF2',
          price: 180,
          category: 'women',
          sale: true,
          article: 'shoe',
          img: 'airpods-1.png'
        },
        {
          name: 'Apple iPad 9.7" Wi-Fi 32GB Space Gray (MR7F2)',
          price: 450,
          category: 'women',
          sale: false,
          article: 'shoe',
          img: 'ipad-pro-2018.png'
        },
        {
          name: 'Apple iPhone XS 64GB Space Gray (MT9E2)',
          price: 1200,
          category: 'men',
          sale: true,
          article: 'jacket',
          img: 'iphone-xs-max.png'
        },
        {
          name: 'Apple MacBook Air 13" 256Gb Gold (MREE2) 2018',
          price: 1640,
          category: 'men',
          sale: true,
          article: 'hats',
          img: 'macbook-air-2018.png'
        },
        {
          name: 'Apple MacBook Pro Retina 13" 256GB Space Gray (MPX111) 2018',
          price: 1770,
          category: 'women',
          sale: false,
          article: 'sweater',
          img: 'macbook-pro-13-2017.png'
        }
        // {
        //   name: 'Long Linen-blend Shirt',
        //   price: 18.99,
        //   category: 'men',
        //   sale: false,
        //   article: 'shirt',
        //   img: 'shirt1.png'
        // },
        // {
        //   name: 'Knit Orange Sweater',
        //   price: 28.99,
        //   category: 'men',
        //   sale: false,
        //   article: 'sweater',
        //   img: 'sweater2.png'
        // },
        // {
        //   name: 'Cotton Band-collar Blouse',
        //   price: 49.99,
        //   category: 'men',
        //   sale: false,
        //   article: 'shirt',
        //   img: 'shirt2.png'
        // },
        // {
        //   name: 'Camo Fang Backpack Jungle',
        //   price: 59.99,
        //   category: 'women',
        //   sale: true,
        //   article: 'jacket',
        //   img: 'jacket3.png'
        // },
        // {
        //   name: 'Golden Pilot Jacket',
        //   price: 129.99,
        //   category: 'women',
        //   sale: false,
        //   article: 'jacket',
        //   img: 'jacket4.png'
        // },
        // {
        //   name: 'Spotted Patterned Sweater',
        //   price: 80.99,
        //   category: 'women',
        //   sale: false,
        //   article: 'jacket',
        //   img: 'sweater4.png'
        // },
        // {
        //   name: 'Double Knit Sweater',
        //   price: 59.99,
        //   category: 'men',
        //   sale: true,
        //   article: 'jacket',
        //   img: 'sweater5.png'
        // }
      ]
    },
    getters: {
      women: state => filter(state.products, 'category', 'women'),
      men: state => filter(state.products, 'category', 'men'),
      sale: state => filter(state.products, 'sale', true)
    },
    mutations: {
      switchSale: state => {
        state.sale = !state.sale
      },
      clearCartCount: state => {
        state.cartTotal = 0
      },
      clearCartContents: state => {
        state.cart = {}
      },
      addItem: (state, item) => {
        state.cartTotal++
        if (item.name in state.cart) {
          state.cart[item.name].count++
        } else {
          let stateItem = Object.assign({}, item)
          stateItem.count = 1
          state.cart[item.name] = stateItem
        }
      }
    }
  })
}

export default createStore

// helper
const filter = (array, key, value) => array.filter(item => item[key] === value)
