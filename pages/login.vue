<template>
    <form @submit.prevent="onSetUser" novalidate class="login-form">
        <h2>Вход:</h2>
         <div class="content-wrapper">
            <label class="input-field" :class="{ 'input-field-error': $v.email.$error }">
                <span class="label-text" type="email">E-mail</span>
                <input v-model.trim="email" @input="setEmail($event.target.value)" placeholder="Email"/>

                <span class="error" v-if="!$v.email.required">Обязательное поле</span>
                <span class="error" v-if="!$v.email.minLength">Минимально {{$v.email.$params.minLength.min}} цифр.</span>
            </label>


            <label class="input-field" :class="{ 'input-field-error': $v.password.$error }">
                <span class="label-text" type="password">Password</span>
                <input v-model.trim="password" @input="setPassword($event.target.value)" placeholder="Password" type="password"/>

                <span class="error" v-if="!$v.password.required">Обязательное поле</span>
                <span class="error" v-if="!$v.password.minLength">Минимально {{$v.password.$params.minLength.min}} букв.</span>
            </label>
            <span class="error-login" v-if="error">Неправильный логин или пароль! <br> {{error}}</span>
            <button class="submit-button" :disabled="$v.$invalid">Войти</button>
        </div>
    </form>
</template>

<script>

import { required, minLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },

    validations: {
        email: {
            required: true,
            minLength: minLength(5)
        },
        password: {
            required: true,
            minLength: minLength(5)
        }
    },

    computed: {
        error() {
            return this.$store.getters.error
        },
        user () {
            return this.$store.getters.user
        }
    },

    watch: {
        user (value) {
            if (value !== null && value !== undefined) {
                this.$router.push('/admin')
            }
        }
    },

    methods: {
        setEmail(value) {
            this.email = value
            this.$v.email.$touch()
        },
        setPassword(value) {
            this.password = value
            this.$v.password.$touch()
        },
        onSetUser () {
            const user = {
                email: this.email,
                password: this.password
            }
            this.$store.dispatch('signUserIn', user)
        }
    }
}

</script>

<style scoped>
@import '../components/form/form.css';
.login-form {
    display: block;
    margin: 0 auto;
    padding-top: 40px;
}

h2 {
    font-weight: 500;
    font-size: 24px;
    color: #fff;
    letter-spacing: -0.72px;
    margin-bottom: 24px;
    line-height: 40px;
}

.submit-button {
    display: block;
    margin: 8px auto 0;
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 500;
    min-width: 50px;
    width: auto;
    border-radius: 4px;
    background: linear-gradient(-180deg, rgb(255, 130, 46) 0%, #FA6400 100%);
    border: 1px solid #FA6400;
    height: 40px;
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

.error-login {
    display: block;
    max-width: 310px;
    line-height: 1.3;
    padding: 8px;
    box-sizing: border-box;
    background-color: rgb(218, 91, 91);
    border-radius: 4px;
    text-align: center;
}
</style>
