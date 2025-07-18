
<script lang="ts" setup>
import { defineEmits, onMounted, ref, watch } from 'vue';
import { useCounterStore } from '@/stores/counter';
import { useRoute, useRouter } from 'vue-router';
import DatePickerComp from './DatePickerComp.vue';
import TextInputComp from './TextInputComp.vue';

const emits = defineEmits(['closeDialog']);

const route = useRoute();
const router = useRouter();

const store = useCounterStore();

const selectedDate = ref();
const titleInput = ref("");
const to = ref("");

const setNullDate = () => {selectedDate.value = null};

const validToSave = () => {
    return titleInput.value.length > 0 && selectedDate.value;
}

const editDate = () => {
    if (validToSave()) {
        store.changeData(titleInput.value, selectedDate.value, to.value);
        closeDialog();
    }
}

const isDisabled = ref(true);

watch([titleInput, selectedDate], () => {
    isDisabled.value = !validToSave();
})

function closeDialog(){
    titleInput.value = data.value.title;
    selectedDate.value = new Date(data.value.date).toISOString().split('T')[0];
    DeleteBtn.value = false;
    emits('closeDialog');
}


function handleClickOutside(){
    closeDialog();
}

const data = ref()

function getExistingData( ){
    data.value = store.Dates[store.findDateIndex(route.path)];

    titleInput.value = data.value.title;
    selectedDate.value = new Date(data.value.date).toISOString().split('T')[0];
    to.value = data.value.to;
}

onMounted(() => {
    getExistingData();
})

watch([route.path], () => {
    getExistingData();
})

let DeleteBtn = ref(false);

function toggleDelete(){
    DeleteBtn.value = !DeleteBtn.value
}

function deleteDate(){
    store.deleteDate(data.value.title);
    router.push('/');
    closeDialog();
}
</script>

<template>
    <div class="overlay">
        <div class="dialog" :class="{dark : store.isDark}" :style="store.isDark? 'background-color: #3a3844 !important; color: white; box-shadow: 0 0 10px 5px rgb(0, 0, 0);' : ''">
            <h4 class="title text-center">Edit Existing Date</h4>

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
            <div class="d-flex deleteCont align-center">
                <button v-if="!DeleteBtn" @click="toggleDelete" class="delete pr-1 fading">Delete Date</button>
                <div v-else class="d-flex align-center fading">
                    <p class="pr-1">Are you sure you want to <b>Delete Date?</b></p>
                    <button @click="toggleDelete" class="secondary ml-0-5">No</button>
                    <button @click="deleteDate()" class="delete ml-0-5">Yes</button>
                </div>
            </div>
            <div class="action-bar d-flex justify-end">
                <button @click="closeDialog" class="secondary ml-0-5" :class="{dark: store.isDark}" >Close</button>
                <button @click="editDate()" class="primary ml-0-5" :class="[{dark: store.isDark}, {disabledBtn: isDisabled}]" :disabled="isDisabled" >Save</button>
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
    background-color: rgb(33 33 37) !important;
    color: white;
    box-shadow: 0 0 10px 5px rgb(0, 0, 0);
}

.title{
    font-size: 1.5rem;
}

.action-bar{
    margin: 0.5rem 0 0 0;
}

.deleteCont{
    margin: 1rem 0.5rem;
}

.fading{
    transition: opacity;
    animation: fadeIn ease-in-out 1s;
}

.pr-1{
    padding-right: 1rem;
}

.pr-2{
    padding-right: 2rem;
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
</style>