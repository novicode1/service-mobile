<template>
    <form @submit.prevent="onCreateProduct" novalidate class="order-form">
        <h4>Быстрый заказ 📦</h4>

        <ul class="selected-options" v-if="productDetails">
            <li class="option">
                {{productName}}
                <span class="option-description">Название</span>
            </li>
            <li class="option" v-if="productDetails.color">
                {{productDetails.color}}
                <span class="option-description">Цвет</span>
            </li>
            <li class="option" v-if="productDetails.currentPrice">
                {{productDetails.currentPrice}}$
                <span class="option-description">Цена</span>
            </li>
            <li class="option" v-if="productDetails.name">
                {{productDetails.name}}
                <span class="option-description">Память</span>
            </li>
        </ul>

        <div class="content-wrapper">
            <label class="input-field" :class="{ 'input-field-error': $v.tel.$error }">
                <span class="label-text">Номер телефона</span>
                <input v-model.trim="tel" @input="setName($event.target.value)" placeholder="096 666 73 33"/>

                <span class="error" v-if="!$v.tel.required">Обязательное поле</span>
                <span class="error" v-if="!$v.tel.minLength">Минимально {{$v.tel.$params.minLength.min}} цифр.</span>
            </label>


            <label class="input-field">
                <span class="label-text">Комментарий (по желанию)</span>
                <input v-model.trim="comment" @input="setCode($event.target.value)"/>
            </label>
            <button class="submit-button" :disabled="$v.$invalid">Быстрый заказ</button>
        </div>
    </form>
</template>



<script>

import { required, minLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            tel: '',
            comment: ''
        }
    },

    props: {
        code: {
            type: String
        },
        productName: {
            type: String
        },
        productDetails: {
            type: Object
        }
    },

    validations: {
        tel: {
            required,
            minLength: minLength(5)
        }
    },

    methods: {
        setName(value) {
            this.name = value
            this.$v.name.$touch()
        },

        setComment(value) {
            this.comment = value
            this.$v.comment.$touch()
        },

        onCreateProduct () {
            let options = ''
            if (this.productDetails.name) {
                options = '<strong>Опции:</strong>' + '\n- Название: ' + this.productName + '\n- Цена: ' + this.productDetails.currentPrice + '$' + '\n- Цвет: ' + this.productDetails.color + '\n- Память: ' + this.productDetails.name
            }

            let comment = 'Новый заказ 🎉\n\n<strong>Телефон:</strong> ' + this.tel + '\n<strong>Комментарий:</strong> ' + this.comment + '\n\n' + options + '\n\n<strong>Код товара:</strong> ' + this.code + '\n\n' + window.location.href

            this.$axios.post('https://api.telegram.org/bot709794055:AAHXeUUQe1R4O3FEGMoH1ONsQtUlVO0FTRE/sendMessage', {
                chat_id: "-260327413",
                text: comment,
                parse_mode: 'HTML'
            })
            .catch(error => {
                console.log(error);
            })
            alert("Заказ успешно оформлен! Мы вам перезвоним.")
			this.$router.push({
				path: '/'
			})
        }
    }
}
</script>

<style scoped>
@import '../../form/form.css';

h4 {
    font-weight: 500;
    font-size: 24px;
    color: #0070C9;
    letter-spacing: -0.72px;
    margin-bottom: 24px;
    text-align: left;
    line-height: 40px;
}

.order-form {
    text-align: left;
    display: block;
    width: 400px;
    padding: 18px 0 28px;
}


.selected-options {
    list-style: none;
    padding-top: 24px;
    border-bottom: 1px solid rgba(191, 192, 192, 0.25);
    border-top: 1px solid rgba(191, 192, 192, 0.25);
}

.selected-options .option {
    display: inline-block;
    font-weight: 500;
    vertical-align: top;
    font-size: 17px;
    color: #111111;
    letter-spacing: -0.57px;
    margin-bottom: 26px;
    width: 24%;
    line-height: 1.5;
}

.option .option-description {
    font-weight: normal;
    font-size: 17px;
    color: #888888;
    letter-spacing: -0.57px;
    display: block;
    padding-top: 3px;
}

.option:nth-child(2n-1) {
    margin-right: 20px;
    min-width: 240px;
}

.content-wrapper {
    padding-top: 24px;
}





.item-aside h4 {
    font-size: 32px;
    color: #fff;
    font-weight: 400;
    margin-bottom: 18px;
}

.order-form input {
    line-height: 1.222em; /* 22px */
    font-size: 18px;
    font-weight: 400;
    border-radius: 10px;
    color: #888888;
    letter-spacing: -0.54px;
    padding: 1em 13px;
    border: 1px solid #D6D6D6;
    box-sizing: border-box;
    background-color: inherit;
    background-clip: padding-box;
    box-shadow: none;
    resize: vertical;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.05);
    margin-bottom: 2px;
}

.input-field .error {
    color: rgb(107, 107, 107);
    font-size: 12px;
}

.input-field {
    margin: 0 auto 18px;
    width: 100%;
}

.input-field .label-text {
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 14px;
    color: #333333;
    letter-spacing: -0.31px;
    display: inline-block;
}

.input-field-error input {
    border: 1px solid rgb(255, 117, 101);
}

.submit-button {
    display: inline-block;
    margin-top: 8px;
    padding: 4px;
    font-size: 14px;
    font-weight: 500;
    min-width: 50px;
    width: 100%;
    border-radius: 4px;
    background: linear-gradient(-180deg, rgb(255, 130, 46) 0%, #FA6400 100%);
    border: 1px solid #FA6400;
    height: 58px;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.05);
    transition: all 0.12s cubic-bezier(0.455, 0.03, 0.515, 0.955);
}

.submit-button:disabled {
    opacity: 0.8;
}

.submit-button:hover {
    transform: translateY(-1px);
    transition: all 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.submit-button:active {
    transform: translateY(1px);
    box-shadow: none;
    transition: all 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media(max-width: 1073px) {
    .order-form {
        width: 100%;
        display: block;
    }

    .option:nth-child(2n-1) {
        min-width: 60%;
    }

    .option:nth-child(2n) {
        margin-right: 40px;
    }
}

@media (max-device-width: 900px) {
    .order-form h1 {
        text-align: center;
    }
}

@media (max-device-width: 450px) {
    .selected-options .option {
        max-width: 100%;
        box-sizing: border-box;
        margin-right: 0;
        width: 100%;
    }
}

@media (max-device-width: 690px) {
    .order-form {
        margin: 0;
        border-color: #d6d6d6;
        border-top: none;
    }

    .order-form h1 {
        text-align: left;
    }

    .order-form .content-wrapper {
        width: 100%;
        padding: 40px 0;
        box-sizing: border-box;
    }

    .order-form h5 {
        font-size: 0.875em;
        margin-bottom: 52px;
    }

    .order-form .input-field {
        width: 100%;
    }

    .input-field .error {
        color: rgb(121, 121, 121);
        font-size: 14px;
    }

    .input-field .label-text {
        font-weight: 500;
        font-size: 13px;
        color: #111;
    }

    .order-form input {
        font-size: 16px;
        padding: 0.7em 14px;
        line-height: 1.5em;
        border-radius: 4px;
        background-color: #fff;
        color: #000;
        border: 1px solid rgba(0,0,0,0.2);
    }

    .submit-button {
        font-size: 1em;
        height: 48px;
    }
}


</style>
