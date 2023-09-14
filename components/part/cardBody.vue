<template>
    <div class="d-flex flex-column" style="height: 80vh;">
        <div class="p-1">
            <div class="d-flex border-bottom pb-1">
                <div class="w-100">
                    <MiscResizableScroll v-model="header" class="fw-bold rounded-bottom-0 rounded-end-0 px-1" ref="headerElement"></MiscResizableScroll>
                </div>
                <div class="btn btn-sm btn-outline-secondary rounded-start-0 rounded-bottom-0 mt-n1 me-n1 border-0">
                    <font-awesome-icon :icon="['fas', 'times']" />
                </div>
            </div>
            <div>
                <div>
                    <button class="btn btn-outline-secondary btn-sm border-0 rounded-top-0" title="Add mark" @click.prevent="addMarkModal.showModal()">
                        <font-awesome-icon :icon="['fa', 'bookmark']" /> <font-awesome-icon :icon="['fa', 'plus']" />
                    </button>
                </div>
            </div>
        </div>
        <AppTextEditor :content="text" style="height: 100%;" class="mb-3"></AppTextEditor>
    </div>
</template>

<script setup>

const addMarkModal = ref(null)
const headerElement =ref(null)

const header = ref('');
const text = ref('');



function open() {
    headerElement.value.focus();
}


defineExpose({open});


</script>
