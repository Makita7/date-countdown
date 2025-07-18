import { ref, onMounted } from 'vue';
import { defineStore } from 'pinia';

export const useDialogsStore = defineStore('dialosStore', () => {
    const addDialog = ref(false);
    const toggleAddDialog = () => { addDialog.value = !addDialog.value };

    const editDialog = ref(false);
    const toggleEditDialog = () => { editDialog.value = !editDialog.value };

    return {addDialog, toggleAddDialog, editDialog, toggleEditDialog}
})