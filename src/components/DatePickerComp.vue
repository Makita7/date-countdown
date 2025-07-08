
<script setup lang="ts">
import { defineComponent, defineProps, ref } from 'vue';
import { errorMessages } from 'vue/compiler-sfc';
import { useCounterStore } from '@/stores/counter';

defineComponent({
    name: "DatePickerComp"
})

defineProps({
    title: {
        type: String,
        default: "Date Picker Label"
    },
})

const store = useCounterStore();
const selectedDate = ref();

const currentDate = new Date();
const minDate = currentDate.toISOString().split('T');

let isValid = ref(false);
let errorMessages = ref();

function Validate() {
    debugger;
    isValid.value = selectedDate.value > minDate;

    if(isValid.value === false){
        selectedDate.value = null;
        errorMessages.value = "The input must be a future date";
    }else{
        errorMessages.value = null;
    }
}

</script>

<template>
    <div class="input-container d-flex flex-col" :class="{dark : store.isDark}">
        <label for="date-picker">{{ title }}</label>
        <input v-model="selectedDate" @click="(e) => e.currentTarget.showPicker()" @change="Validate()" type="date" id="date-picker" />
        <p v-show="errorMessages" class="error">{{errorMessages}}</p>
    </div>
</template>

<style lang="css" scoped>

label{
    margin-bottom: 0.2rem;
}

input#date-picker {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: solid gray 1px !important;
    font-size: 0.9rem;
}

.dark input#date-picker{
    background-color: #061429;
    color: white;
    border: #061429;
}

.dark input#date-picker:active{
    background-color: #061429;
    color: white;
    border: #23334c solid 1px;
}

.error{
    color: rgb(112, 14, 14);
    padding-top: 0.2rem;
    transition: 0.5s all ease-in-out;
    animation: fadeIn 2s ease-in-out;
}

.dark .error{
    color: rgb(249, 162, 162);
}

.errorFadeout{
    animation: fadeIn 3s reverse ease-in-out;
}
</style>