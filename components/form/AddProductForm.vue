<template>
    <form @submit.prevent="onCreateProduct" novalidate class="add-product-form">
        <div class="content-wrapper">
            <h1>Добавить товар</h1>

            <label class="input-field" :class="{ 'input-field-error': $v.name.$error }">
                Название
                <input v-model.trim="name" @input="setName($event.target.value)"/>

                <span class="error" v-if="!$v.name.required">Обязательное поле</span>
                <span class="error" v-if="!$v.name.minLength">Name must have at least {{$v.name.$params.minLength.min}} letters.</span>
            </label>


            <label class="input-field" :class="{ 'input-field-error': $v.code.$error }">
                Код
                <input v-model.trim="code" @input="setCode($event.target.value)"/>

                <p class="error" v-if="!$v.code.minLength">Максимум {{$v.code.$params.maxLength.max}} символов.</p>
            </label>


            <label class="input-field" :class="{ 'input-field-error': $v.price.$error }">
                Цена
                <input v-model.trim="price" @change="setPrice($event.target.value)"/>

                <span class="error" v-if="!$v.price.required">Обязательное поле</span>
            </label>


            <label class="input-field" :class="{ 'input-field-error': $v.category.$error }">
                Category
                <select :value="category" @change="setCategory($event.target.value)">
                    <option :value="option.value" v-for="option in optionCategories" :key="option">{{option.name}}</option> 
                </select>

                <span class="error" v-if="!$v.category.required">Обязательное поле</span>
            </label>

            <label class="input-field">
                <span class="input-type-checkbox">
                    <input
                        v-model="used"
                        type="checkbox"
                        @change="$v.used.$touch()"
                    />
                    <span class="check-mark"></span>
                </span>
                Б/у
            </label>

            <label class="input-field">
                <span class="input-type-checkbox">
                    <input
                        v-model="sale"
                        type="checkbox"
                        @change="$v.sale.$touch()"
                    />
                    <span class="check-mark"></span>
                </span>
                Скидка
            </label>

            <label class="input-field">
                Фото товара:
                <div class="input-type-file">
                    <div class="input-wrapper">
                        <input
                            type="file"
                            @change="setImageUrl($event)"
                            accept="image/x-png,image/gif,image/jpeg,image/jpg"
                        >
                        <button type="button" tabindex="-1">Выберите файл</button>
                    </div>
                </div>
                <img :src="imageUrl" height="350" alt="Превью фото" v-if="imageUrl" accept="image/*">
            </label>
            <button class="submit-button" :disabled="$v.$invalid">Добавить товар</button>
        </div>
    </form>
</template>



<script>

import { required, minLength, maxLength, between, email, sameAs } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            name: '',
            image: null,
            sale: false,
            used: false,
            price: 0,
            category: '',
            code: '',
            imageUrl: '',
            optionCategories: [
                {
                    value: 'macbook',
                    name: 'macbook'
                },
                {
                    value: 'iphone',
                    name: 'iphone'
                },
                {
                    value: 'accessories',
                    name: 'аксессуары'
                }
            ]
        }
    },
    validations: {
        name: {
            required,
            minLength: minLength(4)
        },
        code: {
            required,
            maxLength: maxLength(20)
        },
        price: {
            required
        },
        category: {
            required
        }
    },

    methods: {
        setName(value) {
            this.name = value
            this.$v.name.$touch()
        },

        setPrice(value) {
            this.price = value
            this.$v.price.$touch()
        },

        setCategory(value) {
            this.category = value
            this.$v.category.$touch()
        },

        setUsed(value) {
            if (value == "on") {
                this.used = true
            }
            else {
                this.used = false
            }
            this.$v.used.$touch()
        },

        setSale(value) {
            if (value == "on") {
                this.sale = true
            }
            else {
                this.sale = false
            }
            this.$v.sale.$touch()
        },

        setCode(value) {
            this.code = value
            this.$v.code.$touch()
        },

        setImageUrl(event) {
            const files = event.target.files
            let filename = files[0].name


            if (filename.lastIndexOf('.') <= 0) {
                return alert('Ваш файл не подходит. Произошла ошибка')
            }

            const fileReader = new FileReader()

            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })

            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },

        onCreateProduct () {
            let fileType = this.image.type
            if ((!this.image) || (fileType === 'image/webp')) {
                alert("Вы загрузили неверную картинку. Формат должен быть в .jpg или .jpeg или .png")
                return
            }
            const productData = {
                name: this.name,
                price: Number(this.price),
                category: this.category,
                code: this.code,
                image: this.image,
                used: this.used,
                sale: this.sale
            }

            this.$store.dispatch('createProduct', productData)
            alert("Товар добавлен")
        },
    }
}
</script>

<style scoped>
@import './form.css';

.add-product-form {
    display: inline-block;
    text-align: left;
    margin: 0 100px;
}

.add-product-form .content-wrapper {
    padding: 40px 0;
}

h1 {
    margin-bottom: 40px;
    font-weight: 400;
}

.input-field .error {
    color: #888;
}

.input-field-error input {
    border: 1px solid rgb(255, 117, 101);
}

@media (max-device-width: 900px) {
    .add-product-form {
        box-sizing: border-box;
        display: block;
        width: auto;
        margin: 0 auto;
        text-align: center;
    }

    .add-product-form .content-wrapper {
        display: inline-block;
        text-align: left;
    }

    .add-product-form .pmsubmit-button {
        margin: 0 auto;
        display: block;
    }

    .add-product-form h1 {
        text-align: center;
    }
}

@media (max-device-width: 600px) {
    .add-product-form {
        margin: 0;
        padding-left: 32px;
        padding-right: 32px;
    }

    .add-product-form .submit-button {
        width: 100%;
        background-image: none;
        font-size: 20px;
        padding-right: 20px;
    }
}

@media (max-device-width: 518px) {
    .add-product-form {
        padding: 0;
    }

    .add-product-form h1 {
        text-align: left;
    }

    .add-product-form .content-wrapper {
        width: 100%;
        padding-left: 20px;
        padding-right: 20px;
        box-sizing: border-box;
    }

    .add-product-form h4 {
        font-size: 1.125em;
    }

    .add-product-form h5 {
        font-size: 0.875em;
        margin-bottom: 52px;
    }

    .add-product-form .input-field {
        width: 100%;
    }

}

</style>
