/* eslint-disable indent */
export default function ({ store, redirect, route }) {
    store.dispatch('nuxtServerInit')
    if (isLogin(store) && route.name === 'login') {
        return redirect('/admin')
    }

    if (!isLogin(store) && isAdminRoute(route)) {
        return redirect('/login')
    }
}

const isAdminRoute = (route) => {
    if (route.matched.some(record => record.path === '/admin')) {
        return true
    }
}

const isLogin = (store) => {
    return (store && store.state && store.state.user)
}
