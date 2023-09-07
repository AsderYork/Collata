<template>
    <div class="modal fade" :class="{show:isModalShown}" :id="modalName" tabindex="-1" :aria-labelledby="modalLabelName" style="display: block;" :style="{'pointer-events': isModalShown ? 'all' : 'none'} " @click.self="hideModal()">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-body p-0">
                    <slot/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const id = 1;
const modalName = 'modal' + id;
const modalLabelName = 'modal' + id + 'Label';

const emit = defineEmits(['onClose', 'onOpen']);

const passedEventHandle = ref(null);


const result = ref({});
const isModalShown = ref(false);
const modalDisplayProp = computed(() => {return isModalShown.value ? 'block' : 'none';})
const modalTitle = computed(() => {return props.title ?? 'default modal title';})

const props = defineProps({
    'shown': Boolean,
    'fields': Object,
})

isModalShown.value = props.shown;

function showModal(currentEventHandle = null) {
    passedEventHandle.value = currentEventHandle;
    isModalShown.value = true;
        emit('onOpen');
}

function hideModal() {
    if(isModalShown.value) {
        isModalShown.value = false;
        emit('onClose');
    }
}

defineExpose({showModal, hideModal});



</script>
