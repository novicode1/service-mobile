<template>
<div class="autocomplete">
    <autocomplete
        :search="search"
        placeholder="Поиск ..."
        aria-label="Поиск ..."
        :get-result-value="getResultValue"
        @submit="onSubmit"
        class="field"
        auto-select
    >
    </autocomplete>
</div>
</template>

<script>

export default {
    data: {
        data: [],
    },
    name: 'TheSearchbar',
    methods: {
        search(input) {
            this.data = this.$store.state.products
            if (input.length < 2) { return [] }
            return this.data.filter(product => {
                return product.name.toLowerCase().includes(input.toLowerCase())
            })
        },

        getResultValue(result) {
            return result.name
        },

        onSubmit(result) {
            let url
            if (!result) {
                return[]
            }
            if (location.hostname === "localhost") {
                url = 'http://localhost:3000/'
            }
            else {
                url = 'https://service-mobile-21c17.firebaseapp.com/'
            }

            window.open(`${url}product?id=${encodeURI(result.id)}&name=${result.name}`)
        }
    }
}
</script>

<style scoped>

</style>
