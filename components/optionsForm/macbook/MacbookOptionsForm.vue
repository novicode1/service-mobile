<template>
    <div class="product-options-form">
        <h3>Выберите модель.</h3>
        <div class="content-wrapper" v-if="productOptions">
            <section class="product-options" v-for="(option, index) in productOptions" :key="option+index">
                <h4 class="category-name">
                    {{option.optionName}}
                </h4>
                <div class="option-field">
                    <div v-for="(optionItem, optionIndex) in option.optionsList" :key="optionIndex" class="input-type-radio">
                        <input
                            type="radio"
                            name="color"
                            :value="optionItem.name"
                            @click="changeOptionPrice(optionItem, index, option.optionName)"
                        >

                        <div class="option-colors">
                            <div
                                class="click-tip"
                                :style='{"display": ((isOptionPicked===false && index===0 && optionIndex===0) ? "block" : "none" )}'
                            >
                                <img
                                    class=""
                                    src="../images/click.svg"
                                />
                            </div>
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
                    <a href="#order-form-anchor" class="link-to-form">
                        Купить
                    </a>
                </div>
                <a href="#order-form-anchor" class="link-to-form-mobile">
                    Купить
                </a>
            </section>
        </div>
        <app-order-form :productName="productName" :productDetails="lastSelectedOption" :code="code" id="order-form-anchor"/>
    </div>
</template>

<script>
import AppOrderForm from "./AppOrderForm.vue";

export default {
    components: {
		AppOrderForm
    },
    props: {
        productOptions: {
            type: Array,
            required: true
        },
        productName: {
            type: String
        },
        productPrice: {
            type: Number,
            required: true
        },
        code: {
            type: String
        }
    },
    data() {
        return {
            initialPrice: this.productPrice,
            currentPrice: 0,
            isOptionPicked: false,
            selectedOptions: [],
            lastSelectedOption: {
                currentPrice: 0
            }
        }
    },

    methods: {
        changeOptionPrice(optionItem, index, name) {
            this.lastSelectedOption.currentPrice = parseInt(optionItem.price, 10)
            this.lastSelectedOption.color = optionItem.name
            this.lastSelectedOption.name = name

            let selectedOption = new Object

            selectedOption.price = parseInt(optionItem.price, 10)

            this.selectedOptions[index] = selectedOption
            this.isOptionPicked = true
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
.option-field {
    margin-bottom: 60px;
}

.content-wrapper {
    display: block;
    width: 100%;
    margin-bottom: 80px;
}

.click-tip {
    position: absolute;
    width: 40px;
    right: -20px;
    top: -28px;
    height: auto;
    z-index: 999;
    transform: rotate(-50deg);
}

.click-tip::before {
    content: url(../images/click-blur.svg);
    position: absolute;
    width: 26px;
    height: 21px;
    right: 24px;
    top: -4px;
}

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
    padding: 32px 0 25px;
    vertical-align: top;
    width: 360px;
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
    text-transform: uppercase;
    font-size: 30px;
    color: #111111;
    letter-spacing: -0.3px;
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
    content: 'ROM';
}

.product-options:first-child .option-field::before {
    content: 'Опции (на выбор)';
}

.link-to-form-mobile {
    display: none;
}

.option-colors {
    text-align: center;
}

.option-colors .option-name {
    text-align: center;
    display: inline-block;
    white-space: normal;
    font-size: 17px;
    font-weight: 500;
    color: #333333;
    letter-spacing: 0.04px;
    text-align: center;
    max-width: 98%;
}

.price-section {
    float: right;
    height: 118px;
    width: 80px;
    padding: 34px 10px 0 0;
    box-sizing: border-box;
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
    display: block;
    box-sizing: content-box;
    width: 100%;
    height: 80px;
    font-size: 12px;
    border-radius: 4px;
    margin-right: 4px;
    margin-bottom: 12px;
    overflow: visible;
    white-space: nowrap;
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
    border: 1px solid #D6D6D6;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    padding: 0px 12px;
    line-height: 80px;
    box-sizing: border-box;
    height: 100%;
    z-index: 0;
    background-size: 0.555em 0.555em;
    border-radius: inherit;
    text-align: left;
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
    outline: 2px solid rgb(196, 226, 255);
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

@media(max-width: 1073px) {
    h3 {
        font-size: 22px;
    }

    .product-options-form {
        display: block;
        width: 100%;
        padding: 40px 80px 0;
    }
}

@media(max-width: 900px) {
    .product-options-form {
        width: 100%;
        padding: 40px 0;
    }
}

@media(max-width: 700px) {
    .category-name {
        padding: 0;
        display: block;
        width: 100%;
    }

    .product-options {
        border: none;
    }

    .option-field {
        display: block;
        width: 100%;
        padding-bottom: 20px;
    }

    .option-colors .color-widget {
        margin: 0 auto 8px;
    }

    .product-options:first-child h4::before, .option-field:first-child:before, .option-field::before {
        display: none;
    }

    .option-field::before {
        display: inline-block;
        position: static !important;
        content: "Опции:" !important;
        font-weight: normal;
        margin-right: 24px;
        font-size: 14px;
        color: #333333;
        vertical-align: top;
        letter-spacing: -0.31px;
        margin-bottom: 4px;
    }

    .price-section {
        padding-top: 20px;
        height: auto;
        width: 100%;
        display: block;
        background: none;
        padding: 0;
        text-align: left;
    }

    h4::after {
        margin-bottom: 14px;
        font-weight: normal;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.31px;
    }

    .option-price {
        font-size: 24px;
        color: #111;
        font-weight: 500;
        letter-spacing: -0.48px;
        display: block;
    }

    .price-section::before {
        display: block;
        content: 'Цена';
        font-weight: normal;
        font-size: 14px;
        color: #888888;
        margin-bottom: 6px;
    }

    .link-to-form {
        display: none;
    }

    .link-to-form-mobile {
        display: block;
        background-color: #F96400;
        text-align: center;
        padding: 13px 0 14px;
        overflow: hidden;
        font-weight: 500;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: -0.39px;
        border-radius: 4px;
        background-image: linear-gradient(-180deg, #3F9FEB 0%, #0071CA 100%);
        border: 1px solid #0070C9;
        margin-bottom: 80px;
        line-height: 16px;
    }
}

@media (max-device-width: 350px) {
    .option-field::before {
        margin-right: 10px;
        display: block;
        margin-bottom: 8px;
    }
}

</style>
