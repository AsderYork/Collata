<template>
    <div class="d-flex flex-column" style="height: 80vh; padding-bottom: 2px;">
        <div class="p-1 border-bottom">
            <div class="d-flex border-bottom">
                <div class="w-100 pe-1">
                    <MiscResizableScroll v-model="header" class="fw-bold rounded-bottom-0 rounded-end-0 px-1 my-0 card-header" ref="headerElement"></MiscResizableScroll>
                </div>
                <div class="btn btn-sm btn-outline-secondary rounded-start-0 rounded-bottom-0 mt-n1 me-n1 border-0 card-header-angle-btn" @click="emit('requestClose')">
                    <font-awesome-icon :icon="['fas', 'times']" />
                </div>
            </div>
            <div>
                <div>
                    <button class="btn btn-sm btn-outline-secondary border-0 rounded-top-0" title="Add mark" @click.prevent="addMarkModal.showModal()">
                        <font-awesome-icon :icon="['fa', 'bookmark']" /> <font-awesome-icon :icon="['fa', 'plus']" />
                    </button>
                </div>
            </div>
        </div>
        <AppTextEditor :content="text" style="height: 100%;" class="rounded m-1"></AppTextEditor>

        <div>
            <button class="btn btn-sm btn-primary rounded-top-0 rounded">Save</button>
        </div>

    </div>
</template>

<script setup>

const addMarkModal = ref(null)
const headerElement =ref(null)

const header = ref('');
const text = ref('');

const emit = defineEmits(['requestClose'])


function open() {
    headerElement.value.focus();
}


defineExpose({open});


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

