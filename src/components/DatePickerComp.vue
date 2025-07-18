
<script setup lang="ts">
import { defineComponent, defineEmits, defineProps, ref } from 'vue';
import { useCounterStore } from '@/stores/counter';

defineComponent({
    name: "DatePickerComp",
})

const props = defineProps({
    title: {
        type: String,
        default: "Date Picker Label"
    },
    modelValue: String,
})

const emits = defineEmits(['update:modelValue', 'setNullDate']);

const store = useCounterStore();

let dateIsValid = ref(false);
const currentDate = new Date();
const minDate = ref(currentDate.toISOString().split('T'));
let errorDateInput = ref();

function ValidateDateInput() {
    dateIsValid.value = props.modelValue > minDate.value[0];

    if(dateIsValid.value === false){
        emits('setNullDate');
        errorDateInput.value = "The input must be a future date";
    }else{
        errorDateInput.value = null;
    }
}

</script>

<template>
    <div class="input-container d-flex flex-col" :class="{dark : store.isDark}">
        <label for="date-picker">{{ props.title }}</label>
        <input
            :value="props.modelValue"
            @click="e => e.currentTarget.showPicker()"
            @input="e => emits('update:modelValue', e.target.value)"
            @change="ValidateDateInput()"
            type="date"
            id="date-picker"
        />
        <p v-show="!dateIsValid" class="error">{{errorDateInput}}</p>
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
    background-color: #0f1621;
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