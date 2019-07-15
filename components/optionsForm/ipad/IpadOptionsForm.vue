<template>
    <div class="product-options-form">
        <h3>Выберите модель.</h3>
        <div class="content-wrapper" v-if="productOptions">
            <section class="product-options" v-for="(option, index) in productOptions" :key="option.id">
                <h4 class="category-name">
                    {{option.optionName}}
                </h4>
                <div class="option-field">
                    <div v-for="(optionItem, optionIndex) in option.optionsList" :key="optionItem.id" class="input-type-radio">
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
                            <span :style="{ backgroundColor: optionItem.color}" class="color-widget"></span>
                            <span class="option-name">
                                {{optionItem.name | truncate(16, ' ...')}}
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
            isOptionPicked: false,
            initialPrice: this.productPrice,
            currentPrice: 0,
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
    overflow: visible;
    white-space: nowrap;
    position: relative;
    margin-bottom: 60px;
    mask-image: linear-gradient(to right, #000 0%, #000 80%, transparent 100%);
    -webkit-mask-image: linear-gradient(
        to right,
        #000 0%,
        #000 72%,
        transparent 100%
    );
    -webkit-box-flex: 1;
}
.product-options:before,
.product-options:after {
  content: "";
  height: calc(100% - 2em);
  pointer-events: none;
  position: absolute;
  top: 1em;
  width: 10px;
  z-index: 2;
}

.option-field {
  display: flex;
  flex-wrap: nowrap;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
.input-type-radio {
  white-space: nowrap;
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
    top: 10px;
    height: auto;
}

.click-tip::before {
    content: url(../images/click-blur.svg);
    position: absolute;
    width: 26px;
    height: 21px;
    right: 26px;
    top: -1px;
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
    padding: 18px 0 25px;
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
    content: 'Много приложений';
}

.product-options:nth-child(3) h4::after {
    content: 'Забудь про iCloud :)';
}

.product-options:nth-child(4) h4::after {
    content: 'Крайне много пиложений';
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

.link-to-form-mobile {
    display: none;
}

.option-colors {
    text-align: center;
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
    display: inline-block;
    white-space: normal;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0.04px;
    text-align: center;
    max-width: 90%;
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
    height: 72px;
    font-size: 12px;
    border-radius: 4px;
    margin-right: 4px;
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
        border-bottom: 1px solid #D6D6D6;
    }

    .product-options {
        border: none;
    }

    .option-field {
        display: block;
        width: 100%;
        padding-bottom: 40px;
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
        content: "Цвет:" !important;
        font-weight: normal;
        margin-right: 24px;
        font-size: 14px;
        color: #333333;
        vertical-align: top;
        letter-spacing: -0.31px;
    }

    .price-section {
        position: absolute;
        float: none;
        height: auto;
        right: 0;
        top: 16px;
        text-align: right;
        background: none;
        width: auto;
        padding: 0;
    }

    h4::after {
        margin-bottom: 14px;
        font-weight: normal;
        font-size: 14px;
        color: #333333;
        letter-spacing: -0.31px;
    }

    .option-price {
        font-size: 18px;
        color: #111;
        font-weight: 500;
        letter-spacing: -0.48px;
    }

    .price-section::before {
        display: block;
        content: 'Цена';
        font-weight: normal;
        font-size: 12px;
        color: #888888;
        margin-bottom: 4px;
    }

    .link-to-form {
        display: none;
    }

    .link-to-form-mobile {
        display: block;
        background-color: #F96400;
        text-align: center;
        padding: 13px 0 14px;
        font-weight: 500;
        font-size: 14px;
        color: #FFFFFF;
        letter-spacing: -0.39px;
        border-radius: 4px;
        background-image: linear-gradient(-180deg, #3F9FEB 0%, #0071CA 100%);
        border: 1px solid #0070C9;
        margin-bottom: 70px;
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
