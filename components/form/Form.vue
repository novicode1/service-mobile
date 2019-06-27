<template>
    <form @submit.prevent="onCreateProduct" novalidate class="add-product-form">
        <h1>Добавить товар</h1>

        <label class="input-field" :class="{ 'input-field-error': $v.name.$error }">
            Название
            <input v-model.trim="name" @input="setName($event.target.value)"/>

            <span class="error" v-if="!$v.name.required">Field is required</span>
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

            <span class="error" v-if="!$v.price.required">Field is required</span>
        </label>


        <label class="input-field" :class="{ 'input-field-error': $v.category.$error }">
            Category
            <select :value="category" @change="setCategory($event.target.value)">
                <option value="macbook">macbook</option>
                <option value="iphone">iphone</option>
            </select>

            <span class="error" v-if="!$v.category.required">Field is required</span>
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
            File Attachment:
            <div class="input-type-file">
                <div class="input-wrapper">
                    <input
                        type="file"
                        @change="setImageUrl($event)"
                    >
                    <button type="button" tabindex="-1">Select file</button>
                </div>
            </div>
            <img :src="imageUrl" height="350" alt="Превью фото">
        </label>

        <button class="submit-button" :disabled="$v.$invalid">Submit</button>
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
            imageUrl: ''
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
                return alert('Please add a valid file!')
            }

            const fileReader = new FileReader()

            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })

            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        },

        onCreateProduct () {
            if (!this.image) {
                alert("Загрузите картинку и попробуйте еще раз")
                return
            }
            const productData = {
                name: this.name,
                price: this.price,
                category: this.category,
                code: this.code,
                image: this.image,
                used: this.used,
                sale: this.sale
            }

            this.$store.dispatch('createProduct', productData)
            alert("Добавлено")
        },
    }
}
</script>

<style scoped>
.add-product-form {
    display: inline-block;
}

.add-product-form {
    text-align: left;
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

input,
select,
textarea
{
    display: inline-block;
    width: auto;
    height: auto;
    line-height: 1.125em;
    font-size: 16px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    border-radius: 4px;
    color: #fff;
    padding: calc(1.125em / 2) 13px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.089);
    background-clip: padding-box;
}

input::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.input-field {
    display: block;
}

input:focus,
textarea:focus,
select:focus {
    outline: 1px dashed #888; /* border: ....... */
}

textarea {
    resize: vertical;
    min-height: 4.625em; /* rows * line-height + padding-top + paddint-bottom + borders */
    overflow: auto;
}

select {
    padding-left: 10px;
    padding-right: 6px;
    -webkit-appearance: none;
    background-image: url(./images/icon-select.svg);
    background-size: auto auto;
    background-position: calc(100% - 12px) ;
    background-repeat: no-repeat;
}

select::-ms-expand {
    display: none;
}


/* если чекбокс обычный, то оставляем только этот блок */
input[type="checkbox"],
input[type="radio"] {
    width: 1em;
    height: 1em;
    line-height: normal;
    font-size: 16px; /* стандартный размер для чекбокса в системах */
    border-radius: none;
    padding: 0;
    margin: 0;
    border: none;
    box-shadow: none;
    background: none;
    vertical-align: middle;
}

.input-type-checkbox {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: baseline;
    width: 1em;
    height: 1em;
    font-size: 18px;
    border-radius: 4px;
}

.input-type-checkbox > input {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
    -webkit-appearance: none;
    opacity: 0;
    z-index: 1;
}

.input-type-checkbox > .check-mark {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 100%;
    height: 100%;
    z-index: 0;
    border: 1px solid #d4d6db;
    background: #fff center center no-repeat;
    background-size: 0.555em 0.555em;
    border-radius: inherit;
}

.input-type-checkbox > input:checked + .check-mark {
    background-image: url(images/icon_checked.svg);
}

.input-type-checkbox > input:hover + .check-mark {
    box-shadow: 0 0 4px 0 rgba(242, 151, 35, 0.25);
    border-color: #f29723;
}

.input-type-checkbox > input:focus + .check-mark {
    outline: 1px dotted rgba(0,0,0,0.4);
}

.input-type-checkbox > input:focus:hover + .check-mark {
    outline: transparent;
}

.input-type-checkbox > input[disabled] + .check-mark {
    box-shadow: none;
    background-color: #f0f1f5;
    border-color: #d4d6db;
}

.input-type-checkbox > input[disabled]:checked + .check-mark {
    background-image: url(images/icon_checked-disabled.svg);
}

.input-type-file {
    display: inline-block;
    height: 38px;
    width: auto;
    z-index: 0;
    font-size: 16px;
}

.input-type-file > .input-wrapper {
    overflow: hidden;
    position: relative;
    display: block;
    width: 100%;
    height: 30px;
    padding-left: 1px;
    padding-top: 1px;
    margin-left: -1px;
    margin-top: -1px;
}

.input-type-file input[type="file"] {
    position: absolute;
    left: 0;
    top: 0;
    font-size: 1000px;
    padding: 0;
    opacity: 0;
    margin: 0;
    z-index: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.input-type-file button {
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    height: 2em;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    margin-right: 8px;
}

.input-type-file .file-name {
    display: inline-block;
    vertical-align: middle;
    color: #494949;
    white-space: nowrap;
}

label {
    display: inline-block;
    color: #fff;
    font-size: 14px;
    font-weight: 400;
    width: 310px;
    line-height: normal;
    vertical-align: bottom;
    margin-bottom: 22px;
}

label.required::before {
    content: "*";
}

label input,
label textarea,
label select,
label .input-type-file {
    display: block;
    width: 100%;
    margin-top: 2px;
    margin-right: 12px;
}

label input[type="checkbox"],
label input[type="radio"] {
    display: inline-block;
}


button {
    vertical-align: baseline;
    font-size: 24px;
    height: 1.5em;
    line-height: 1.166em; /* 28px */
    padding: 0.166px 18px;
    display: inline-block;
    color: #fff;
    font-family: inherit;
    font-weight: bold;
    border-radius: 5px;
    background: #0070c9;
    border: none;
    text-shadow: none;
    box-shadow: none;
    cursor: default;
    margin: 0;
}

button::-moz-focus-inner {
    border: 0;
    padding: 0;
}

.input-type-file input[type="file"] ~ button {
    background-color: #76bbe4;
}

.input-type-file input[type="file"]:hover ~ button,
button:hover {
    background-color: #76bbe4;
    background-image: none;
}

.input-type-file input[type="file"]:active ~ button,
button:active {
    box-shadow: 0 -1px 0 0 #4e4e4e;
    translate: translateY(1px);
}

.input-type-file input[type="file"]:focus ~ button,
button:focus {
    outline: 1px dotted #666;
}

input:focus:hover,
textarea:focus:hover,
select:focus:hover,
button:focus:hover {
    outline: transparent /* border: ....... */;
}

button:disabled {
    opacity: 0.7;
}

</style>
