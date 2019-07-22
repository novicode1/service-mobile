<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <form class="modal-container" @submit.prevent="onCreateProduct" novalidate>
                    <div class="modal-header">
                        <button class="delete-product-button" type="button" @click="deleteProduct"></button>
                    </div>
                    <div class="modal-body">
                        <label class="input-field">
                            <span class="label-text">Название</span>
                            <input type="text" v-model="editedName" placeholder="Название">
                        </label>

                        <label class="input-field category-choise">
                            <span class="label-text">Категория</span>
                            <select @change="setCategory($event.target.value)">
                                <option :value="option.value" v-for="(option, index) in optionCategories" :key="option+index" :selected="option.value === product.category ? true : false">{{option.name}}</option>
                            </select>
                        </label>

                        <label class="input-field">
                            <span class="label-text">Минимальная цена</span>
                            <input type="number" v-model="editedPrice" placeholder="Цена">
                        </label>

                        <label class="input-field">
                            <span class="label-text">Код</span>
                            <input type="text" v-model="editedCode" placeholder="Код">
                        </label>

                        <label class="input-field">
                            <span class="input-type-checkbox">
                                <input
                                    v-model="editedInStock"
                                    type="checkbox"
                                />
                                <span class="check-mark"></span>
                            </span>
                            <span class="label-text">В наличии</span>
                        </label>

                        <label class="input-field">
                            <span class="input-type-checkbox">
                                <input
                                    v-model="editedUsed"
                                    type="checkbox"
                                />
                                <span class="check-mark"></span>
                            </span>
                            <span class="label-text">Б/у</span>
                        </label>
                    </div>

                    <div class="modal-footer">
                        <button class="modal-cancel-button" @click="hideModal()" type="button">
                            Отменить
                        </button>
                        <button class="modal-submit-button" @click="hideModal()" type="submit">
                            Подтвердить
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        product: {
            required: true
        }
    },
    data () {
        return {
            editedName: this.product.name,
            editedUsed: this.product.used,
            editedCode: this.product.code,
            editedPrice: this.product.price,
            editedInStock: this.product.inStock,
            editedCategory: this.product.category,
            optionCategories: [
                {
                    value: 'iphone',
                    name: 'iphone'
                },
                {
                    value: 'macbook',
                    name: 'macbook'
                },
                {
                    value: 'appleWatch',
                    name: 'apple watch'
                },
                {
                    value: 'ipad',
                    name: 'ipad'
                },
                {
                    value: 'mac',
                    name: 'iMac / iMac Pro / Mac Pro / Mac mini'
                },
                {
                    value: 'accessories',
                    name: 'аксессуары'
                },
                {
                    value: 'airpods',
                    name: 'airpods'
                }
            ]
        }
    },
    methods: {
        onCreateProduct() {
            if (
                toString(this.editedName).trim() === ''
                || toString(this.editedPrice).trim() === ''
                || toString(this.editedCode).trim() === ''
                || toString(this.editedUsed).trim() === ''
                || toString(this.editedInStock).trim() === ''
                || toString(this.editedCategory).trim() === ''
            ) {return}

            this.$store.dispatch('updateProductData', {
                id: this.product.id,
                name: this.editedName,
                price: parseInt(this.editedPrice, 10),
                code: this.editedCode,
                used: this.editedUsed,
                inStock: this.editedInStock,
                category: this.editedCategory
            })

            setTimeout(function() {
                this.$emit('close');
            }, 700);

            setTimeout(function() {
                alert("Изменено успешно!");
            }, 1500);
        },

        setCategory(value) {
            this.editedCategory = value
        },

        hideModal () {
            this.$emit('close');
        },

        deleteProduct() {
            var isAdmin = confirm("Вы действительно хотите удалить " + this.product.name + " ?");
            if (isAdmin) {
                this.$store.commit('setLoading', true)
                this.$firestore.collection("products").doc(this.product.id).delete().then(function() {
                    console.log("Successful delete")
                }).catch(function(error) {
                    alert("Произошла ошибка: "+ error);
                });
                this.$store.commit('setLoading', false)

                this.$emit('close');

                this.$router.push({
                    path: '/'
                })
            }
        }
    }
}
</script>

<style scoped>

input,
select,
textarea
{
    display: inline-block;
    width: 100%;
    height: auto;
    line-height: 16px;
    font-size: 16px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    border-radius: 6px;
    color: #111;
    padding: 0px 1px;
    overflow: auto;
    border: 1px solid rgba(255, 255, 255, 0.2);
    box-sizing: border-box;
    box-shadow: none;
    background: rgba(255, 255, 255, 0.089);
    background-clip: padding-box;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}

select {
    padding: 6px 0;
}

.input-field {
    margin-bottom: 14px;
    display: block;
    line-height: 16px;
    color: #111;
    font-weight: 400;
    font-size: 16px;
    border-bottom: 1px solid #eee;
}

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
    margin-bottom: 14px;
}

.input-type-checkbox ~ .label-text {
    display: inline-block;
    vertical-align: top;
    line-height: 20px;
    margin-left: 4px;
    color: #111;
    font-weight: 400;
    font-size: 14px;
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
    background-image: url(../../components/form/images/icon_checked.svg);
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
    background-image: url(../../components/form/images/icon_checked-disabled.svg);
}

.label-text {
    font-size: 12px;
    font-weight: 400;
    color: rgb(0, 103, 187);
}





.modal-mask {
  width: 100%;
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  width: 100px;
}

.modal-container {
  width: 500px;
  margin: 0 auto 80px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  box-sizing: border-box;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-footer {
    text-align: right;
}

.modal-cancel-button {
    font-weight: 400;
    display: inline-block;
    margin-right: 20px;
}


.modal-submit-button {
    display: inline-block;
    text-align: center;
    padding: 6px 8px;
    font-weight: 500;
    font-size: 14px;
    color: #FFFFFF;
    letter-spacing: -0.39px;
    border-radius: 4px;
    background-image: linear-gradient(-180deg, #3F9FEB 0%, #0071CA 100%);
    border: 1px solid #0070C9;
    margin-bottom: 70px;
    line-height: 16px;
    margin: 0;
}

.modal-header {
    text-align: right;
}

.delete-product-button {
    display: inline-block;
    text-align: center;
    height: 40px;
    padding: 20px;
    font-weight: 400;
    font-size: 14px;
    color: #111;
    letter-spacing: -0.39px;
    border-radius: 4px;
    background-image: url(delete.svg);
    background-size: 24px, auto;
    border: 1px solid rgb(224, 224, 224);
    background-position: center center;
    background-repeat: no-repeat;
    margin-bottom: 70px;
    line-height: 16px;
    margin: 0;
}


.delete-product-button:hover {
   background-color: rgb(219, 219, 219);
}

.modal-submit-button:hover {
    background-image: linear-gradient(-180deg, rgb(105, 179, 240) 0%, rgb(55, 135, 196) 100%);
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

@media(max-width: 600px) {
    .modal-container {
        width: 100vmin;
        margin-left: -32px;
    }

    .modal-cancel-button {
        display: block;
        float: none;
        width: 100%;
        margin-bottom: 14px;
        padding: 10px 12px;
    }

    .modal-submit-button {
        display: block;
        width: 100%;
        margin: 0;
        padding: 10px 12px;
    }

    .input-field {
        margin-bottom: 18px;
    }

    .modal-footer {
        padding-top: 32px;
    }
}
</style>
