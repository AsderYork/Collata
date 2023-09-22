<template>
    <div class="d-flex flex-column" style="height: 80vh; padding-bottom: 2px;">
        <div class="p-1 border-bottom">
            <div class="d-flex border-bottom">
                <div class="w-100 pe-1">
                    <MiscResizableScroll v-model="card.name" class="fw-bold rounded-bottom-0 rounded-end-0 px-1 my-0 card-header" ref="headerElement"></MiscResizableScroll>
                </div>
                <div class="btn btn-sm btn-outline-secondary rounded-start-0 rounded-bottom-0 mt-n1 me-n1 border-0 card-header-angle-btn" @click="emit('requestClose')">
                    <font-awesome-icon :icon="['fas', 'times']" />
                </div>
            </div>
            <div>
                <div>
                    <button tabindex="-1" class="btn btn-sm btn-outline-secondary border-0 rounded-top-0" title="Add mark" @click.prevent="addMarkModal.showModal()">
                        <font-awesome-icon :icon="['fa', 'bookmark']" /> <font-awesome-icon :icon="['fa', 'plus']" />
                    </button>
                </div>
            </div>
        </div>
        <AppTextEditor v-model="card.text" style="height: 100%;" class="rounded m-1"></AppTextEditor>

        <div>
            <button class="btn btn-sm btn-primary rounded-top-0 rounded rounded-end-1" @click.prevent="saveCard()">Save</button>
        </div>

    </div>
</template>

<script setup>

const props = defineProps({
    modelValue: {type: Object, default: {name:'', text:''}}
})
const emit = defineEmits(['requestClose', 'save', 'update:modelValue'])



const addMarkModal = ref(null)
const headerElement =ref(null)

const card = ref(props.modelValue);

watch(card, () => {
    emit('update:modelValue', card);
})


function open() {
    headerElement.value.focus();
}


defineExpose({open});

onMounted(() => {
    headerElement.value.focus();
})

function saveCard() {
    emit('save');
    emit('requestClose');
}



</script>
<style>
.tiptaptexteditor:not(.tiptaptexteditor-presentmode) {
    background: rgb(255, 255, 255);
}

.card-header {
    min-height: 24px!important;
}

.card-header-angle-btn {
    border-top-right-radius: 7px;
}


</style>

