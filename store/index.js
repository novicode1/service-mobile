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
		setCreatedProductKey: '',
		user: null,
		status: null,
		loading: false,
		error: null,
		usd: null
	},
	actions: {
		async nuxtServerInit ({ dispatch, state }) {
			const user = this.$cookies.get('uid')
			if (user) {
				await dispatch('setUser', user)
			}
		},
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
					if (data.imagesUsed) {
                        product.imagesUsed = data.imagesUsed
					}
					product.id = s.id
					products.push(product)
				})
				commit('setProducts', products)
			})
			.catch(error => console.log(error))
		},

		getUsdValue ({commit}) {
			this.$firestore.collection('utils').doc('currencies')
			.get()
			.then(doc => {
				commit('setUsdValue', doc.data().usd)
			})
			.catch(error => console.log(error))
		},

		changeUsdToUah ({commit}, payload) {
			commit('setLoading', true)
			let usdValue = Number(payload)
			this.$firestore.collection('utils').doc('currencies').update({usd: usdValue}).then(() => {
				commit('setUsd', usdValue)
				commit('setLoading', false)
			})
		},

		createProduct ({commit, getters, state}, payload) {
			const product = {
				name: payload.name,
				price: payload.price,
				category: payload.category,
				code: payload.code,
				used: payload.used,
				sale: payload.sale,
				inStock: true
			}
			commit('setLoading', true)

			if (payload.options) {
				product.options = payload.options
			}

			let key
			this.$firestore.collection('products').add(product)
			.then(data => {
				key = data.id
				commit('setCreatedProductKey', key)
				return key
			})
			.then(key => {
				const filename = payload.image.name
				const ext = filename.slice(filename.lastIndexOf('.'))
				return this.$storage.ref('products/' + key + ext).put(payload.image)
			})
			.then(fileData => {
				let fullPath = fileData.metadata.fullPath
				let downloadUrl = this.$storage.ref(fullPath).getDownloadURL()

				return downloadUrl
			})
			.then(imageUrl => {
				let key = getters.createdProductKey
				if (payload.imagesUsed) {
					let imagesUsedList = []
					for (let i = 0; i < payload.imagesUsed.length; i++) {
						let promise = new Promise((resolve, reject) => {
							const filename = payload.imagesUsed[i].name
							const ext = filename.slice(filename.lastIndexOf('.'))
							let key = getters.createdProductKey
							let fileData = this.$storage.ref('products/' + key + i + ext).put(payload.imagesUsed[i])
							resolve(fileData)
						})

						promise.then(fileData => {
							let fullPath = fileData.metadata.fullPath
							this.$storage.ref(fullPath).getDownloadURL()
							.then(data => {
								imagesUsedList[i] = data
								let key = getters.createdProductKey
								this.$firestore.collection('products').doc(key).update({imagesUsed: imagesUsedList})
							})
							.catch((error) => {
								console.log(error)
							})
						})
					}
				}
				commit('setLoading', false)
				return this.$firestore.collection('products').doc(key).update({imageUrl: imageUrl})
			})
			.catch((error) => {
				console.log(error)
			})
		},
		signUserIn ({commit}, payload) {
			commit('setLoading', true)
			this.$auth.signInWithEmailAndPassword(payload.email, payload.password)
			.then((response) => {
				commit('setUser', response.user.uid)
				const token = response.user.uid
				this.$cookies.set('uid', token)
				commit('setStatus', 'success')
				commit('setError', null)
			})
			.catch((error) => {
				commit('setStatus', 'failure')
				commit('setError', error.message)
			})
			commit('setLoading', false)
		},

		saveUID ({commit}, uid) {
			commit('saveUID', uid)
		},

		setUser ({commit}, user) {
			commit('setUser', user)
		},

		setUsdValue ({commit}, usd) {
			commit('setUsdValue', usd)
		},

		updateProductData ({commit}, payload) {
			const updateObj = {}
			if (payload.name) {
				updateObj.name = payload.name
			}
			if (payload.price) {
				updateObj.price = payload.price
			}
			if (payload.code) {
				updateObj.code = payload.code
			}
			if (payload.category) {
				updateObj.category = payload.category
			}
			commit('setLoading', true)

			updateObj.used = payload.used
			updateObj.inStock = payload.inStock

			this.$firestore.collection('products').doc(payload.id).update(updateObj)
			.then(querySnapshot => {
				commit('setLoading', false)
			})
			.catch(error => {
				console.log(error)
			})
		}
	},
	getters: {
		iphone: state => filter(state.products, 'category', 'iphone'),
		macbook: state => filter(state.products, 'category', 'macbook'),
		accessories: state => filter(state.products, 'category', 'accessories'),
		appleWatch: state => filter(state.products, 'category', 'appleWatch'),
		ipad: state => filter(state.products, 'category', 'ipad'),
		airpods: state => filter(state.products, 'category', 'airpods'),
		mac: state => filter(state.products, 'category', 'mac'),
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
		},
		status (state) {
			return state.status
		},
		usd (state) {
			return state.usd
		},
		user (state) {
			return state.user
		},
		isAuthenticated (state) {
			return !!state.user && !!state.user.uid
		},
		error (state) {
			return state.error
		},
		loading (state) {
			return state.loading
		}
	},
	mutations: {
		setProducts (state, products) {
			state.products = products
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
		},
		setUser (state, payload) {
			state.user = payload
		},
		setUsd (state, payload) {
			state.usd = payload
		},

		setUsdValue (state, payload) {
			state.usd = payload
		},
		removeUser (state) {
			state.user = null
		},
		setStatus (state, payload) {
			state.status = payload
		},
		setError (state, payload) {
			state.error = payload
		},
		setLoading (state, payload) {
			state.loading = payload
		}
	}
})

export default store

// helper
const filter = (array, key, value) => array.filter(item => item[key] === value)
