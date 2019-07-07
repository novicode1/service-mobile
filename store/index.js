/* eslint-disable indent */
/* eslint-disable no-tabs */
import Vuex from 'vuex'

const store = () => new Vuex.Store({
	state: {
		cartTotal: 0,
		cart: {},
		sale: false,
		used: false,
		products: [],
		setCreatedProductKey: ''
	},
	actions: {
		loadProducts ({commit}) {
			this.$firestore.collection('products')
			.get()
			.then(querySnapshot => {
				let products = []
				querySnapshot.forEach(s => {
					const data = s.data()
					let product = {
						category: data.category,
						sale: data.sale,
						used: data.used,
						inStock: data.inStock,
						name: data.name,
						price: data.price,
						imageUrl: data.imageUrl,
						code: data.code,
						options: data.options
					}
					product.id = s.id
					products.push(product)
				})
				commit('setProducts', products)
			})
			.catch(error => console.log(error))
		},
		createProduct ({commit, getters}, payload) {
			const product = {
				name: payload.name,
				price: payload.price,
				category: payload.category,
				code: payload.code,
				used: payload.used,
				sale: payload.sale,
				inStock: true
			}

			let key
			this.$firestore.collection('products').add(product)
			.then(data => {
				key = data.id
				return key
			})
			.then(key => {
				const filename = payload.image.name
				const ext = filename.slice(filename.lastIndexOf('.'))
				commit('setCreatedProductKey', key)
				return this.$storage.ref('products/' + key + ext).put(payload.image)
			})
			.then(fileData => {
				let fullPath = fileData.metadata.fullPath
				return this.$storage.ref(fullPath).getDownloadURL()
			})
			.then(URL => {
				let imageUrl = URL
				let key = getters.createdProductKey
				return this.$firestore.collection('products').doc(key).update({imageUrl: imageUrl})
			})
			.then((imageUrl) => {
				commit('createProduct', {
					...product,
					imageUrl: imageUrl,
					id: key
				})
			})
			.catch((error) => {
				console.log(error)
			})
			this.$router.push({
				path: '/admin'
			})
		}

	},
	getters: {
		iphone: state => filter(state.products, 'category', 'iphone'),
		macbook: state => filter(state.products, 'category', 'macbook'),
		accessories: state => filter(state.products, 'category', 'accessories'),
		sale: state => filter(state.products, 'sale', true),
		used: state => filter(state.products, 'used', true),
		createdProductKey (state) {
			return state.createdProductKey
		},
		loadedProduct: state => {
			return (productId) => {
				return state.products.find((product) => {
					return product.id === productId
				})
			}
		}
	},
	mutations: {
		setProducts (state, products) {
			state.products = products
		},
		createProduct (state, payload) {
			state.products.push(payload)
		},
		switchSale: state => {
			state.sale = !state.sale
		},
		switchUsed: state => {
			state.used = !state.used
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
		},
		setCreatedProductKey (state, payload) {
			state.createdProductKey = payload
		}
	}
})

export default store

// helper
const filter = (array, key, value) => array.filter(item => item[key] === value)
