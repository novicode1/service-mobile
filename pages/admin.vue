<template>
<div>
    <app-navigation />

    <div class="content-wrapper">
        <app-add-product-form />
    </div>

    <app-footer class="footer"/>
</div>
</template>

<script>
import AppAddProductForm from './../components/form/AddProductForm.vue'
import AppFooter from './../components/AppFooter.vue'
import AppNavigation from './../components/AppNavigation'

export default {
    data() {

    },
    components: {
        AppAddProductForm,
        AppNavigation,
        AppFooter,
    }
}
</script>

<style scoped>
</style>
