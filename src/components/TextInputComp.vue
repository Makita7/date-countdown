<script setup lang="ts">
import { ref, defineComponent, defineProps, defineEmits } from 'vue';
import { useCounterStore } from '@/stores/counter';
import vFocus from '@/directives/vFocus';

defineComponent({
    name: "TextInputComp",
})

const props = defineProps({
    title: {
        type: String,
        default: "Input Label"
    },
    modelValue: String,
    minLength: {
        type: Number || String,
        default: 0,
    },
    vFocus: Boolean,
});

const emits = defineEmits(['update:modelValue']);

const store = useCounterStore();
let showError = ref(false);
let errorMessages = ref("The Title Must be at least 4 characters long");
let isValid = ref()

function checkInput(){
    if(props.modelValue.length >= props.minLength){
        isValid.value = true;
        showError.value = false;
    } else {
        isValid.value = false;
        showError.value = true;
    }
}

</script>


<template>
    <div class="input-container d-flex flex-col" :class="{dark : store.isDark}">
        <label for="text-input">{{ title }}</label>
        <input
            :value="modelValue"
            @input="e => emits('update:modelValue', e.target.value)"
            @change="checkInput"
            v-focus
            type="text" id="text-input" />
        <p v-show="showError" class="error">{{errorMessages}}</p>
    </div>
</template>

<style lang="css" scoped>
label{
    margin-bottom: 0.2rem;
}

input#text-input {
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    border: solid gray 1px;
    font-size: 0.9rem;
}

.dark input{
    background-color: #0f1621;
    color: white;
    border: #061429;
}

.dark input:active{
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
</style>