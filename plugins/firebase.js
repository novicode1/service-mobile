import Vue from 'vue'
import { DB, storage } from '@/plugins/firebase-init'

const firebasePlugin = {
  install () {
    if (Vue.__nuxt_firebase_installed__) {
      return
    }
    Vue.__nuxt_firebase_installed__ = true

    if (!Vue.prototype.$DB) {
      Vue.prototype.$firestore = DB
      Vue.prototype.$storage = storage
    }
  }
}

Vue.use(firebasePlugin)

export default (ctx) => {
  const { app, store } = ctx

  app.$firestore = Vue.prototype.$firestore
  ctx.$firestore = Vue.prototype.$firestore

  app.$storage = Vue.prototype.$storage
  ctx.$storage = Vue.prototype.$storage

  if (store) {
    store.$firestore = Vue.prototype.$firestore
    store.$storage = Vue.prototype.$storage
  }
}
