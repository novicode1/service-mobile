<template>
    <form @submit.prevent="onCreateProduct" novalidate class="contact-form">
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

.contact-form {
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
    border: 1px solid #949494;
    box-sizing: border-box;
    background-color: inherit;
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
    padding: 4px 70px 4px 36px;
    font-size: 0.875em;
    min-width: 50px;
    border-radius: 20px;
    border: 2px solid #ffc636;
    background: #000;
    height: 44px;
    text-transform: uppercase;
    background: url(../../images/icons/arrow-right-link.svg) no-repeat 85% 50%;
    background-color: rgba(255, 255, 255, 0.05);
}

.submit-button:hover {
    border: 2px solid #fff;
}

@media (max-device-width: 900px) {
    .contact-form {
        box-sizing: border-box;
        display: block;
        width: auto;
        margin: 0 auto;
        text-align: center;
    }

    .contact-form .content-wrapper {
        display: inline-block;
        text-align: left;
    }

    .contact-form .pmsubmit-button {
        margin: 0 auto;
        display: block;
    }

    .contact-form h1 {
        text-align: center;
    }
}

@media (max-device-width: 600px) {
    .contact-form {
        margin: 0;
        padding-left: 32px;
        padding-right: 32px;
    }

    .contact-form .submit-button {
        width: 100%;
        background-image: none;
        font-size: 20px;
        padding-right: 20px;
    }
}

@media (max-device-width: 518px) {
    .contact-form {
        padding: 0;
    }

    .contact-form h1 {
        text-align: left;
    }

    .contact-form .content-wrapper {
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
    }

    .contact-form h5 {
        font-size: 0.875em;
        margin-bottom: 52px;
    }

    .contact-form .input-field {
        width: 100%;
    }

}

</style>
