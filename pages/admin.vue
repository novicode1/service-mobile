<template>
    <div class="wrapper">
        <app-navigation/>
        <div class="centered">
            <div class="content-wrapper contain">
                <h1>Добавить товар</h1>
                <label class="input-field category-choise">Категория
                    <select @change="setCategory($event.target.value)">
                        <option :value="option.value" v-for="(option, index) in optionCategories" :key="option+index">{{option.name}}</option>
                    </select>
                </label>

                <label class="input-field" v-if="category">
                    <span class="input-type-checkbox">
                        <input
                            v-model="withOptions"
                            type="radio"
                            name="optionChoise"
                            value="true"
                            @change="setWithoutOptions($event.target.value)"
                        />
                        <span class="check-mark"></span>
                    </span>
                    Без опций
                </label>

                <label class="input-field" v-if="category">
                    <span class="input-type-checkbox">
                        <input
                            v-model="withOptions"
                            type="radio"
                            name="optionChoise"
                            value="false"
                            @change="setWithoutOptions($event.target.value)"
                        />
                        <span class="check-mark"></span>
                    </span>
                    С опциями
                </label>

                <add-default-product-form v-if="withOptions === 'true'" :selectedCategory="category"/>

                <add-iphone v-if="withOptions === 'false' && category==='iphone'" :selectedCategory="category"/>
                <add-apple-watch v-if="withOptions === 'false' && category==='appleWatch'" :selectedCategory="category"/>
                <add-i-pad v-if="withOptions === 'false' && category==='ipad'" :selectedCategory="category"/>
                <add-mac v-if="withOptions === 'false' && category==='mac'" :selectedCategory="category"/>
                <add-macbook v-if="withOptions === 'false' && category==='macbook'" :selectedCategory="category"/>
                <add-accessories v-if="withOptions === 'false' && category==='accessories'" :selectedCategory="category"/>

                <div class="clear"></div>
                <div class="push"></div>
            </div>
        </div>
        <app-footer class="footer"/>
    </div>
</template>

<script>
import AddDefaultProductForm from './../components/form/addProductForms/AddDefaultProductForm.vue'

import AddIphone from './../components/form/addProductForms/AddIphone.vue'
import AddMac from './../components/form/addProductForms/AddMac.vue'
import AddMacbook from './../components/form/addProductForms/AddMacbook.vue'
import AddAppleWatch from './../components/form/addProductForms/AddAppleWatch.vue'
import AddAccessories from './../components/form/addProductForms/AddAccessories.vue'
import AddIPad from './../components/form/addProductForms/AddiPad.vue'


import AppFooter from './../components/AppFooter.vue'
import AppNavigation from './../components/AppNavigation'

export default {
    data() {
        return {
            category: 'iphone',
            withOptions: null,
            optionCategories: [
                {
                    value: 'iphone',
                    name: 'iphone'
                },
                {
                    value: 'macbook',
                    name: 'macbook'
                },
                {
                    value: 'appleWatch',
                    name: 'apple watch'
                },
                {
                    value: 'ipad',
                    name: 'ipad'
                },
                {
                    value: 'mac',
                    name: 'iMac / iMac Pro / Mac Pro / Mac mini'
                },
                {
                    value: 'accessories',
                    name: 'аксессуары'
                },
                {
                    value: 'airpods',
                    name: 'airpods'
                }
            ]
        }
    },
    components: {
        AddDefaultProductForm,
        AddIphone,
        AddAppleWatch,
        AddAccessories,
        AddIPad,
        AddMac,
        AddMacbook,

        AppNavigation,
        AppFooter,
    },
    computed: {
    user () {
        return this.$store.getters.user
    }
    },
    methods: {
        setCategory(value) {
            this.category = value
        },

        setWithoutOptions(value) {
            this.withOptions = value
        }
    }
}
</script>

<style scoped>
@import '../components/form/form.css';

h1 {
    margin-bottom: 40px;
    font-weight: 400;
}

.centered {
    text-align: center;
}

.category-choise {
    display: block;
}

.content-wrapper {
    display: inline-block;
    text-align: left;
    margin: 80px 100px;
}

@media (max-device-width: 600px) {
    .content-wrapper {
        margin: 40px 0;
        width: 100%;
        padding-left: 32px;
        padding-right: 32px;
    }
}

@media (max-device-width: 518px) {
    .content-wrapper .content-wrapper {
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
    }
    .content-wrapper .input-field {
        width: 100%;
    }
}
</style>
