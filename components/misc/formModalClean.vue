<template>
    <div class="modal fade" :class="{show:isModalShown}" :id="modalName" tabindex="-1" :aria-labelledby="modalLabelName" style="display: block;" :style="{'pointer-events': isModalShown ? 'all' : 'none'} " @mousedown.self="hideModal">
        <div class="modal-dialog" v-if="isModalShown">
            <div class="modal-content" :style="contentStyle">
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


const isModalShown = ref(false);
const props = defineProps({
    'shown': Boolean,
    'fields': Object,
    'contentStyle': Object,
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

onMounted(() => {
    document.addEventListener('keyup', function (evt) {
        if (evt.keyCode === 27) {
            hideModal();
        }
    });
});


defineExpose({showModal, hideModal});



</script>
