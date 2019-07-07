<template>
    <form class="product-options-form">
        <h3>Выберите модель.</h3>
        <div class="content-wrapper" v-if="productOptions">
            <section class="product-options" v-for="(option, index) in productOptions" :key="option.id">
                <h4 class="category-name">
                    {{option.optionName}}gb
                </h4>
                <div class="option-field">
                    <div v-for="optionItem in option.optionsList" :key="optionItem.id" class="input-type-radio">
                        <input
                            type="radio"
                            name="color"
                            :value="optionItem.name"
                            @click="changeOptionPrice(optionItem, index)"
                        >

                        <div class="option-colors">
                            <span :style="{ backgroundColor: optionItem.color}" class="color-widget"></span>
                            <span class="option-name">
                                {{optionItem.name}}
                            </span>
                        </div>
                    </div>
                </div>

                <div class="price-section">
                    <span class="option-price">
                        ${{ getCurrentPrice(index) }}
                    </span>
                    <nuxt-link to="/" class="link-to-form">
                        Купить
                    </nuxt-link>
                </div>
            </section>

            <span class="option-price">
                Цена: ${{ lastSelectedOption.currentPrice }}
            </span>
        </div>
    </form>
</template>

<script>

export default {
    props: {
        productOptions: {
            type: Array,
            required: true
        },
        productPrice: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            initialPrice: this.productPrice,
            currentPrice: 0,
            selectedOptions: [],
            lastSelectedOption: {
                price: 0
            }
        }
    },

    methods: {
        changeOptionPrice(optionItem, index) {
            this.lastSelectedOption.currentPrice = parseInt(optionItem.price, 10)
            this.lastSelectedOption.name = optionItem.name

            let selectedOption = new Object

            selectedOption.price = parseInt(optionItem.price, 10)

            this.selectedOptions[index] = selectedOption
            this.$forceUpdate();
        },

        getCurrentPrice(index) {
            if (this.selectedOptions[index]) {
                return this.selectedOptions[index].price
            }
            else {
                return 0
            }
        }
    }
}
</script>

<style scoped>

@import '../form/form.css';

.product-options-form {
    display: inline-block;
    vertical-align: top;
    padding-top: 40px;
    width: 620px;
    color: #111;
    font-weight: 400;
}

.product-options {
    display: block;
    position: relative;
    width: 100%;
    border-top: 1px solid rgb(224, 224, 224);
}

.option-field {
    display: inline-block;
    padding: 18px 0 28px;
    vertical-align: top;
    width: 280px;
    color: #333333;
    margin: 0;
}

h3 {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 64px;
    font-weight: 500;
    font-size: 19px;
    color: #000000;
    letter-spacing: -0.5px;
}

.category-name {
    display: inline-block;
    vertical-align: middle;
    padding: 26px 0 38px;
    width: 140px;
    font-weight: 500;
    font-size: 30px;
    color: #111111;
    letter-spacing: -0.3px;
    text-transform: uppercase;
}

h4::after {
    content: 'Базовая';
    padding-top: 3px;
    font-weight: normal;
    font-size: 14px;
    color: #888888;
    text-transform: none;
    display: block;
    letter-spacing: -0.01px;
    line-height: 16px;
}

.product-options:nth-child(1) h4::after {
    content: 'Базовая';
}

.product-options:nth-child(2) h4::after {
    content: 'Много фото';
}

.product-options:nth-child(3) h4::after {
    content: 'Забудь про iCloud :)';
}

.product-options:nth-child(4) h4::after {
    content: 'Крайне много фоток';
}

.product-options:nth-child(5) h4::after {
    content: 'Лучший из лучших';
}

.product-options:first-child h4::before, .product-options:first-child .option-field::before {
    position: absolute;
    top: -24px;
    font-size: 14px;
    color: #333333;
    text-transform: none;
    font-weight: normal;
    letter-spacing: -0.31px;
}

.product-options:first-child h4::before {
    content: 'Память';
}

.product-options:first-child .option-field::before {
    content: 'Цвет (на выбор)';
}

.option-colors .color-widget {
    display: block;
    margin: 0 auto;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    margin-bottom: 8px;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.15);
}

.option-colors .option-name {
    text-align: center;
    display: block;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0.04px;
    text-align: center;
}

.price-section {
    float: right;
    height: 118px;
    width: 154px;
    padding: 34px 10px 0 0;
    box-sizing: border-box;
    background-color: #FBFBFB;
    text-align: center;
}

.option-price {
    font-size: 24px;
    color: #333333;
    letter-spacing: -0.28px;
    display: inline-block;
    margin-bottom: 10px;
}

.link-to-form {
    display: block;
    font-weight: normal;
    font-size: 14px;
    color: #0070C9;
    letter-spacing: -0.22px;
}

.link-to-form::after {
    content: '';
    display: inline-block;
    vertical-align: baseline;
    width: 8px;
    height: 8px;
    margin-left: -2px;
    transform: rotate(45deg);
    border-top: 1.5px solid #0070C9;
    border-right: 1.5px solid #0070C9;
}















.input-type-radio {
    position: relative;
    display: inline-block;
    box-sizing: content-box;
    vertical-align: baseline;
    width: 72px;
    height: 60px;
    font-size: 12px;
    border-radius: 4px;
    margin-right: 4px;
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

.input-type-radio > .option-colors {
    box-sizing: content-box;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    padding-top: 8px;
    background-size: 0.555em 0.555em;
    border-radius: inherit;
}

.input-type-radio > input:checked + .option-colors {
    border: 2px solid rgba(242, 152, 35, 0.9);
}

.input-type-radio > input:hover + .option-colors {
    border: 1px solid #888
}

.input-type-radio > input:checked:checked + .option-colors {
    border: 2px solid rgba(242, 152, 35, 0.9);
}

.input-type-radio > input:focus + .option-colors {
    outline: 3px solid rgb(196, 226, 255);
}

.input-type-radio > input:focus:hover + .option-colors {
    outline: transparent;
}

.input-type-radio > input[disabled] + .option-colors {
    box-shadow: none;
    background-color: #f0f1f5;
    border-color: #d4d6db;
}

.input-type-radio > input[disabled]:checked + .option-colors {
    opacity: 0.5;
}

</style>
