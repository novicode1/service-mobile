<template>
    <form @submit.prevent="onCreateProduct" novalidate class="order-form">
        <div class="content-wrapper">
            <label class="input-field" :class="{ 'input-field-error': $v.tel.$error }">
                <span class="label-text">Номер телефона</span>
                <input v-model.trim="tel" @input="setName($event.target.value)" placeholder="096 666 73 33"/>

                <span class="error" v-if="!$v.tel.required">Обязательное поле</span>
                <span class="error" v-if="!$v.tel.minLength">Минимально {{$v.tel.$params.minLength.min}} цифр.</span>
            </label>


            <label class="input-field">
                <span class="label-text">Комментарий</span>
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

    props: ["code"],

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
            let comment = 'Новый заказ 🎉\n\n<strong>Телефон:</strong> ' + this.tel + '\n<strong>Комментарий:</strong> ' + this.comment + '\n\n' + 'Код товара: ' + this.code + '\n' + window.location.href
            this.$axios.post('https://api.telegram.org/bot709794055:AAHXeUUQe1R4O3FEGMoH1ONsQtUlVO0FTRE/sendMessage', {
                chat_id: "-260327413",
                text: comment,
                parse_mode: 'HTML'
            })
            .catch(error => {
                console.log(error);
            })
			alert("Заказ успешно оформлен! Мы вам перезвоним.")
        }
    }
}
</script>

<style scoped>
@import './form.css';

.order-form {
    vertical-align: top;
    text-align: left;
    display: inline-block;
    border-top: 1px solid rgba(191, 192, 192, 0.25);
    border-bottom: 1px solid rgba(191, 192, 192, 0.25);
    padding: 18px 0 28px;
}

.item-aside h4 {
    font-size: 32px;
    color: #fff;
    font-weight: 400;
    margin-bottom: 18px;
}

input {
    line-height: 1.3em; /* 18px */
    font-size: 14px;
    font-weight: 300;
    border-radius: 10px;
    color: #000;
    padding: calc(1.125em / 2) 13px;
    border: 1px solid rgba(148, 148, 148, 0.438);
    box-sizing: border-box;
    background-color: inherit;
    background-clip: padding-box;
    box-shadow: none;
    color: #fff;
    resize: vertical;
    background: rgba(255, 255, 255, 0.05);
    margin-bottom: 2px;
}

.input-field .error {
    color: rgb(107, 107, 107);
    font-size: 12px;
}

.input-field {
    margin: 0 auto 16px;
    width: 240px;
}

.input-field .label-text {
    margin-bottom: 2px;
    display: inline-block;
    font-weight: 300;
}

.input-field-error input {
    border: 1px solid rgb(255, 117, 101);
}

.submit-button {
    display: inline-block;
    margin-top: 8px;
    padding: 4px;
    font-size: 0.875em;
    min-width: 50px;
    width: 100%;
    border-radius: 8px;
    background-color: #FA6400;
    height: 38px;
    text-transform: uppercase;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.2), 0 20px 40px rgba(0, 0, 0, 0.05);
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
    transition: all 0.05s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@media (max-device-width: 900px) {
    .order-form {
        box-sizing: border-box;
        display: block;
        width: auto;
        margin: 0 auto;
        text-align: center;
    }

    .order-form .content-wrapper {
        display: inline-block;
        text-align: left;
    }

    .order-form h1 {
        text-align: center;
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
