
<script lang="ts" setup>
import { defineEmits, ref, watch } from 'vue';
import { useCounterStore, CounterDates } from '@/stores/counter';
import DatePickerComp from './DatePickerComp.vue';
import TextInputComp from './TextInputComp.vue';

const emits = defineEmits(['closeDialog']);

const store = useCounterStore();

const selectedDate = ref();
const titleInput = ref("");

const setNullDate = () => {selectedDate.value = null};

const validToSave = () => {
    return titleInput.value.length > 0 && selectedDate.value;
}

const saveDate = () => {
    if (validToSave()) {
        store.addDate(titleInput.value, selectedDate.value);
    }
}

const isDisabled = ref(true);

watch([titleInput, selectedDate], () => {
    isDisabled.value = !validToSave();
})

function closeDialog(){
    titleInput.value = "";
    selectedDate.value = null;
    emits('closeDialog');
}

</script>

<template>
    <div class="overlay">
        <div class="dialog" :class="{dark : store.isDark}">
            <h4 class="title">Title</h4>
            <TextInputComp
                title="New Date Title"
                v-model="titleInput"
                :minLength="4"
            />
            <DatePickerComp
                title="Date"
                v-model="selectedDate"
                @setNullDate="setNullDate"
            />
            <div class="action-bar d-flex justify-end">
                <button @click="closeDialog" class="secondary ml-0-5" :class="{dark: store.isDark}" >Close</button>
                <button @click="saveDate" class="primary ml-0-5" :class="[{dark: store.isDark}, {disabledBtn: isDisabled}]" :disabled="isDisabled" >Add</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

.overlay{
    background-color: rgba(0, 0, 0, 0.355);
    position: absolute;
    height: 100vh;
    width: 100%;
    z-index: +10;
    top: 0;
    left: 0;
    transition: 1s all ease-in-out;
    animation: fadeIn ease-in-out;
}

.dialog{
    position: absolute;
    top: 10rem;
    left: 30%;
    box-sizing: border-box;
    padding: 1rem;
    min-width: 40%;
    min-height: 10rem;
    border-radius: 1rem;
    background-color: white;
    box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.212);
    z-index: +13;
    transition: 1s all ease-in-out;
    animation: fadeIn ease-in-out;
}

.dark .dialog{
    background-color: #3a3844;
    color: white;
    box-shadow: 0 0 10px 5px rgb(0, 0, 0);
}

.title{
    font-size: 1.5rem;
}

.action-bar{
    margin: 0.5rem 0 0 0;
}

button{
    padding: 8px 14px;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    text-transform: capitalize;
    font-weight: 600;
    transition: 0.2s all ease-in-out;
    animation: fadeIn ease-in-out;
}

.primary{
    background-color: #ffbb72;
}

.primary:hover{
    background-color: #f5b571;
}

.primary:active{
    background-color: #e0a566;
}

.secondary{
    background-color: #fee6cd;
}

.secondary:hover{
    background-color: #ffddb6;
}

.secondary:active{
    background-color: #e8c7a1;
}

.dark button{
    background-color: gray;
    color: white;
}

.dark .primary{
    background-color: rgba(117, 112, 138, 0.75);
}

.dark .primary:hover{
    background-color: rgba(91, 87, 108, 0.75);
}

.dark .primary:active{
    background-color: rgba(64, 59, 84, 0.75);
}

.dark .secondary{
    background-color: #101013ab;
}

.dark .secondary:hover{
    background-color: #101013;
}

.dark .secondary:active{
    background-color: #000000;
}

.disabledBtn{
    background-color: #d1d1d1;
}

.disabledBtn:hover{
    background-color: #d1d1d1;
}

.dark .disabledBtn{
    background-color: #555555;
}

.dark .disabledBtn:hover{
    background-color: #555555;
}
</style>