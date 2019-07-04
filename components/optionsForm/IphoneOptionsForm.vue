<template>
    <form class="product-options">
        <div class="content-wrapper">
            <section class="product-colors" v-if="colors">
                <h3>Выберите цвет.</h3>
                <label class="option-field" v-for="optionColor in colors" :key="optionColor.id">
                    <div v-for="optionField in optionColor" :key="optionField.id" class="input-type-radio">
                        <input
                            type="radio"
                            name="color"
                            :value="Object.keys(optionColor)[0]"
                            @click="changeColorsCurrentPrice(optionField)"
                        >
                        <div class="option-content">
                            <span class="option-name">
                                {{ optionField.name }}
                            </span>
                            <span class="total-price">
                                ${{ parseInt(initialPrice, 10) +  parseInt(optionField.price, 10) }}
                            </span>
                        </div>
                    </div>
                </label>
            </section>

            <section class="product-capacity" v-if="capacity">
                <h3>Выберите емкость памяти.</h3>
                <label class="option-field" v-for="optionCapacity in capacity" :key="optionCapacity.id">
                    <div v-for="optionField in optionCapacity" :key="optionField.id" class="input-type-radio">
                        <input
                            type="radio"
                            name="capacity"
                            :value="Object.keys(optionCapacity)[0] + 'gb'"
                            @click="changeCapacityCurrentPrice(optionField)"
                        >
                        <div class="option-content">
                            <span class="option-name">
                                {{ Object.keys(optionCapacity)[0] }}<small>gb</small>
                            </span>
                            <span class="total-price">
                                ${{ parseInt(initialPrice, 10) +  parseInt(optionField, 10) + optionsPrice.colorsCurrentPrice}}
                            </span>
                        </div>
                    </div>
                </label>
            </section>

            <span class="total-price">Total price: {{ totalPrice }}</span>
        </div>
    </form>
</template>

<script>

export default {
    props: {
        productOptions: {
            type: Object,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            colors: this.productOptions.colors,
            capacity: this.productOptions.capacity,

            optionsPrice: {
                colorsCurrentPrice: Number,
                capacityCurrentPrice: Number
            },

            initialPrice: this.productPrice
        }
    },
    methods: {
        changeColorsCurrentPrice(optionField) {
            this.optionsPrice.colorsCurrentPrice = parseInt(optionField.price, 10)
        },

        changeCapacityCurrentPrice(optionField) {
            this.optionsPrice.capacityCurrentPrice = parseInt(optionField, 10)
            // alert(this.optionsPrice.capacityCurrentPrice)
        }
    },
    computed: {
        totalPrice: function() {
            let optionsPrice = 0
            let options = this.optionsPrice
            for (let option in options) {
                if (options.hasOwnProperty(option)) {
                    let optionPrice = parseFloat(options[option])
                    if (Number.isNaN(optionPrice)) {
                        optionPrice = 0
                    }
                    optionsPrice += optionPrice
                }
            }

            return this.initialPrice + optionsPrice
        }
    }
}
</script>

<style scoped>

@import '../form/form.css';

.product-options {
    background-color: #fff;
    color: #111;
    font-weight: 400;
    display: block;
    width: 100%;
    padding: 80px 0;
    text-align: center;
}

.product-options .content-wrapper {
    text-align: left;
    display: inline-block;
    margin: 0 120px;
    width: 410px;
}

.content-wrapper section {
    padding: 32px 0;
}

.content-wrapper > section + section {
    border-top: 1px solid #D6D6D6;
}

.product-options h3 {
    font-weight: 500;
    font-size: 18px;
    letter-spacing: -0.5px;
    margin-bottom: 18px;
}

.option-field {
    color: #333333;
    --option-margin: 16px;
    width: calc(50% - var(--option-margin) / 2);
}

.option-fiels .label-text {
    color: #333333;
    display: inline-block;
    vertical-align: middle;
}

.option-field:nth-child(2n) {
    margin-right: var(--option-margin);
}

.product-capacity .option-content, .product-colors .option-content {
    text-align: center;
    padding-top: 20px;
}

.product-capacity .option-name, .product-colors .option-name {
    display: inline-block;
    font-size: 30px;
    font-weight: 500;
    letter-spacing: -1px;
    margin-bottom: 2px;
}

.product-capacity .option-name small {
    text-transform: uppercase;
    font-size: 20px;
    font-weight: bold;
}

.product-capacity .total-price, .product-colors .total-price {
    font-size: 16px;
    font-weight: 400;
    display: block;
}

.product-colors .option-name {
    font-size: 24px;
}

.product-colors .option-content {
    text-align: center;
    padding-top: 26px;
}




.input-type-radio {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: baseline;
    width: 100%;
    height: 106px;
    font-size: 12px;
    border-radius: 4px;
}

.input-type-radio > input {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    opacity: 0;
    z-index: 1;
}

.input-type-radio > .option-content {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    border: 1px solid #d4d6db;
    background: #fff center center no-repeat;
    background-size: 0.555em 0.555em;
    border-radius: inherit;
}

.input-type-radio > input:checked + .option-content {
    border: 2px solid #f29723;
}

.input-type-radio > input:hover + .option-content {
    border: 1px solid #888
}

.input-type-radio > input:checked:checked + .option-content {
    border: 2px solid #f29723;
}

.input-type-radio > input:focus + .option-content {
    outline: 3px solid rgb(196, 226, 255);
}

.input-type-radio > input:focus:hover + .option-content {
    outline: transparent;
}

.input-type-radio > input[disabled] + .option-content {
    box-shadow: none;
    background-color: #f0f1f5;
    border-color: #d4d6db;
}

.input-type-radio > input[disabled]:checked + .option-content {
    opacity: 0.5;
}

</style>
