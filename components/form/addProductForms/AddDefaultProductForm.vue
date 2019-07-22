<template>
    <form @submit.prevent="onCreateProduct" novalidate class="add-product-form">
        <div class="content-wrapper">

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
                Главное фото товара:
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
                <img :src="imageUrl" height="auto" alt="Превью фото" v-if="imageUrl" accept="image/*" class="promo-picked-image">
            </label>


            <div class="option-add" v-if="used === true">
                <h2>Опции</h2>
                <div class="sub-option" v-for="(option, index) in imagesUsed" :key="option+index">
                    <label class="input-field">
                        <span class="label-text">Картинка:</span>
                        <input @change="setImageUsedUrl($event.target.value, index)" placeholder="https://image.png"/>
                    </label>
                    <span @click="deleteOption(index)" class="delete-option">Удалить</span>
                </div>
                <button @click="addOption" class="add-option" type="button">+</button>
            </div>

            <button class="submit-button" :disabled="$v.$invalid">Добавить товар</button>
        </div>
    </form>
</template>



<script>

import { required, minLength, maxLength, between, email, sameAs } from 'vuelidate/lib/validators'

export default {
    props: {
        selectedCategory: {
            required: true
        }
    },
    data() {
        return {
            name: '',
            image: null,
            sale: false,
            used: false,
            price: 0,
            category: this.selectedCategory,
            code: '',
            imageUrl: '',
            imagesUsed: [
                ''
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
        }
    },

    methods: {
        addOption() {
            this.imagesUsed.unshift('')
        },

        deleteOption(index) {
            this.imagesUsed.splice(index, 1)
        },

        setName(value) {
            this.name = value
            this.$v.name.$touch()
        },

        setPrice(value) {
            this.price = value
            this.$v.price.$touch()
        },

        setImageUsedUrl(value, index) {
            this.imagesUsed[index] = value
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
                category: this.selectedCategory,
                code: this.code,
                image: this.image,
                used: this.used,
                sale: this.sale
            }

            if ((this.imagesUsed[0] !== '') && (this.used === true)) {
                productData.imagesUsed = this.imagesUsed
            }

            this.$store.dispatch('createProduct', productData)
            setTimeout(function() { alert("Товар добавлен"); }, 2000);
        },
    }
}
</script>

<style scoped>
@import '../form.css';
.add-product-form {
    display: inline-block;
    text-align: left;
}

.add-product-form .content-wrapper {
    padding: 40px 0 60px;
}

h2 {
    display: block;
    padding: 20px 0 10px;
    font-weight: 600;
    font-size: 14px;
    text-transform: uppercase;
    margin: 40px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.option-add {
    position: relative;
}

.delete-category {
    position: absolute;
    right: -44px;
    top: 20px;
    background: rgb(230, 39, 87);
    padding: 0;
    border-radius: 50%;
    width: 32px;
    height: 32px;
}

.delete-category:hover {
    background-color: rgb(255, 179, 198);
}

.promo-picked-image {
    max-width: 100%;
}

.delete-category:hover::after {
    content: '';
    display: block;
    border: 1px solid rgb(230, 39, 87);
    z-index: -1;
    box-sizing: border-box;
    position: absolute;
    width: 330px;
    height: 300px;
    top: -30px;
    right: -10px;
    bottom: -10px;
    left: -333px;
    border-radius: 10px;
}

.option-add span.delete-option {
    display: inline-block;
    width: auto;
    padding-top: 4px;
    display: inline-block;
    color: rgb(219, 73, 109);
    margin-left: 80px;
    font-weight: 400;
}

.delete-option:hover {
    color: rgb(255, 179, 198);
}


.delete-option:hover::after {
    content: '';
    display: block;
    border: 1px solid rgb(230, 39, 87);
    z-index: -1;
    box-sizing: border-box;
    position: absolute;
    top: -10px;
    right: -10px;
    bottom: -10px;
    left: 70px;
    border-radius: 10px;
}

.add-option {
    background: #72d12e7c;
    border-radius: 4px;
    width: calc(100% - 80px);
    margin-left: 80px;
    display: block;
    height: 40px;
    border: 1px solid rgb(44, 44, 44);
    margin-bottom: 40px;
}

.add-option:hover {
    background-color: rgb(95, 192, 50);
}

.add-category {
    display: block;
    width: 100%;
}

.add-category:hover {
    background-color: rgb(32, 141, 230);
}

.sub-option {
    margin-bottom: 28px;
    position: relative;
}

.sub-option .input-field {
    padding-left: 80px;
    margin-bottom: 6px;
}

.label-text {
    display: block;
    width: 100%;
    height: auto;
    margin-bottom: 2px;
}

.submit-button {
    background: linear-gradient(-180deg, rgb(255, 130, 46) 0%, #FA6400 100%);
    width: 100%;
    display: block;
    border: 1px solid #FA6400;
}

.input-field .error {
    color: #888;
}

.input-field-error input {
    border: 1px solid rgb(255, 117, 101);
}

input[type="color"] {
    height: 40px;
    padding: 0;
    margin: 0;
    -webkit-appearance: none;
    border-radius: 0;
}

@media (max-device-width: 900px) {
    .add-product-form {
        margin: 0 100px;
        box-sizing: border-box;
        display: block;
        width: auto;
        margin: 0 auto;
        text-align: center;
    }

    .add-product-form .content-wrapper {
        display: block;
        width: 100%;
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
    .add-product-form .submit-button {
        width: 100%;
        font-size: 20px;
        padding-right: 20px;
    }
}

@media (max-device-width: 518px) {
    .delete-category:hover::after {
        display: none;
    }

    .delete-option:hover::after {
        display: none;
    }

    .add-product-form {
        padding: 0;
    }

    .add-product-form h1 {
        text-align: left;
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
    .delete-category {
        width: 24px;
        height: 24px;
        right: -28px;
        top: 24px;
    }
}


</style>
