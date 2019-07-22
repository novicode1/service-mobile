<template>
<div class="form-wrapper">
    <div class="item-image-wrapper">
        <img :src="`${lastSelectedOption.imageUrl}`" :alt="`Image of ${productName}`" class="item-image">
    </div>

    <div class="product-options-form">
        <h3>Выберите цвет.</h3>
        <div class="content-wrapper" v-if="productOptions">
            <section class="product-options">
                <div class="input-type-radio" v-for="(option, index) in productOptions" :key="option+index">
                    <input
                        type="radio"
                        name="color"
                        :value="option.name"
                        @click="changeOptionPrice(option, index, option.name)"
                    >

                    <div class="option-colors">
                        <div
                            class="click-tip"
                            :style='{"display": ((isOptionPicked===false && index===0 ) ? "block" : "none" )}'
                        >
                            <img
                                class=""
                                src="../images/click.svg"
                            />
                        </div>
                        <span :style="{ backgroundColor: option.color}" class="color-widget"></span>
                        <span class="option-name">{{option.name | truncate(16, '...')}}</span>
                    </div>
                </div>
            </section>

            <div class="price-section">
                <span class="option-price">
                    <span class="option-price-text">Цена</span>${{ lastSelectedOption.currentPrice }}
                </span>
                <a href="#order-form-anchor" class="link-to-form-mobile">
                    Быстрый заказ
                </a>
            </div>
        </div>
        <app-order-form :productName="productName" :productDetails="lastSelectedOption" :code="code" id="order-form-anchor"/>
    </div>
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
        },
        productImageUrl: {
            type: String
        }
    },
    data() {
        return {
            isOptionPicked: false,
            lastSelectedOption: {
                currentPrice: 0,
                imageUrl: this.productImageUrl
            }
        }
    },

    methods: {
        changeOptionPrice(option, index, name) {
            this.lastSelectedOption.currentPrice = parseInt(option.price, 10)
            this.lastSelectedOption.color = option.name
            this.lastSelectedOption.imageUrl = option.imageUrl
            this.lastSelectedOption.name = name
            this.isOptionPicked = true
            this.$forceUpdate();
        }
    }
}
</script>

<style scoped>

.form-wrapper {
    padding-top: 40px;
}


.item-image-wrapper {
    margin-right: 44px;
    max-width: 333px;
    max-height: 500px;
    box-sizing: border-box;
    display: inline-block;
}

.item-image-wrapper img {
    display: block;
    width: 100%;
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
    width: 620px;
    color: #111;
    font-weight: 400;
}

.product-options {
    display: block;
    position: relative;
    width: 100%;
    margin-bottom: 32px;
}

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
    display: inline-block;
    padding: 18px 0 25px;
    vertical-align: top;
    width: 280px;
    color: #333333;
    margin: 0;
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

h3 {
    display: inline-block;
    vertical-align: middle;
    margin-bottom: 32px;
    font-weight: 500;
    font-size: 19px;
    color: #000000;
    letter-spacing: -0.5px;
}

.link-to-form-mobile {
    display: inline-block;
    background-image: linear-gradient(-180deg, #3F9FEB 0%, #0071CA 100%);
    border: 1px solid #0070C9;
    border-radius: 4px;
    font-weight: 500;
    font-size: 13px;
    padding: 8px 28px;
    color: #FFFFFF;
    letter-spacing: -0.39px;
    text-align: center;
    line-height: 16px;
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
    display: inline-block;
    white-space: normal;
    font-size: 12px;
    color: #333333;
    letter-spacing: 0.04px;
    text-align: center;
    word-wrap: normal;
    margin: 0 auto;
    max-width: 90%;
}

.price-section {
    display: block;
}

.option-price {
    font-weight: 500;
    font-size: 19px;
    color: #111;
    letter-spacing: -0.57px;
    display: block;
    margin-bottom: 20px;
}

.option-price-text {
    font-weight: normal;
    font-size: 14px;
    color: #888888;
    display: block;
    letter-spacing: normal;
    margin-bottom: 7px;
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
    margin: 0 4px 10px 0;
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


    .item-image-wrapper {
        width: 70%;
        max-width: 500px;
        margin: 0 auto;
        display: block;
        margin-bottom: 40px;
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
@media (max-device-width: 600px) {
    h3 {
        font-size: 18px;
        margin-bottom: 26px;
    }
    .product-options {
        width: calc(100% + 64px);
        padding: 20px;
        background-color: #F6F6F6;
        margin-left: -32px;
    }
}

@media (max-device-width: 500px) {
    .item-image-wrapper {
        margin: 0;
        width: 100%;
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
