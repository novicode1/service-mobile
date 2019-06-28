<template>
    <form @submit.prevent="onCreateProduct" novalidate class="contact-form">
        <div class="content-wrapper">
            <h4>Напишите нам</h4>
            <label class="input-field" :class="{ 'input-field-error': $v.tel.$error }">
                <span class="label-text">Номер телефона</span>
                <input v-model.trim="tel" @input="setName($event.target.value)" placeholder="096 666 73 33"/>

                <span class="error" v-if="!$v.tel.required">Обязательное поле</span>
                <span class="error" v-if="!$v.tel.minLength">Минимально {{$v.tel.$params.minLength.min}} букв.</span>
            </label>


            <label class="input-field">
                <span class="label-text">Комментарий</span>
                <input v-model.trim="comment" @input="setCode($event.target.value)"/>
            </label>
            <button class="submit-button" :disabled="$v.$invalid">Отправить</button>
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
            let comment = '<i>Вопрос 💬</i>\n\n<strong>Телефон:</strong> ' + this.tel + '\n<strong>Комментарий:</strong> ' + this.comment
            this.$axios.post('https://api.telegram.org/bot709794055:AAHXeUUQe1R4O3FEGMoH1ONsQtUlVO0FTRE/sendMessage', {
                chat_id: "-260327413",
                text: comment,
                parse_mode: 'HTML'
            })
            .catch(error => {
                console.log(error);
            })
			alert("Сообщение успешно отправлено!")
        }
    }
}
</script>

<style scoped>
@import './form.css';

.contact-form {
    vertical-align: top;
    display: inline-block;
    width: 45%;
    text-align: left;
}

h4 {
    font-weight: normal;
    font-size: 2em;
    margin-bottom: 1em;
    text-align: center;
}

.contact-form .content-wrapper {
    padding: 40px 0;
}

input {
  border-radius: 10px;
  border: 1px solid #707070;
}

.input-field .error {
    color: #888;
}

.input-field {
    margin: 0 auto 16px;
}

.input-field .label-text {
    margin-bottom: 2px;
    display: inline-block;
}

.input-field-error input {
    border: 1px solid rgb(255, 117, 101);
}

.submit-button {
    display: block;
    margin: 0 auto;
    padding: 0 100px 0 36px;
    box-sizing: border-box;
    margin-top: 1.875em;
    height: 44px;
    font-size: 16px;
    border-radius: 20px;
    color: white;
    font-weight: 300;
    min-width: 50px;
    border: 2px solid white;
    background: url(../../images/icons/arrow-right-link.svg) no-repeat 90% 50%;
    background-color: rgba(255, 255, 255, 0.05);
}

.submit-button:hover {
    color: #d6d6d6;
    border: 2px solid #ffc636;
    cursor: pointer;
    background: none;
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
