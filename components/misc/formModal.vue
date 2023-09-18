<template>
    <div class="modal fade" :class="{show:isModalShown}" :id="modalName" tabindex="-1" :aria-labelledby="modalLabelName" :style="{display: modalDisplayProp}" @mousedown.self="hideModal">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header p-1 px-2">
                <slot name="header">
                    <h5 class="modal-title" :id="modalLabelName">{{modalTitle}}</h5>
                </slot>
                    <button type="button" class="btn-close" @click="hideModal()" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <slot>
                    <div class="mb-3" v-for="(value, name) in fields">
                        <label class="col-form-label w-100">name:
                            <input v-if="value === 'String'" type="text" class="form-control" v-model="result[name]">
                        </label>
                    </div>
                </slot>
                
            </div>
            <div class="modal-footer p-1" v-if="!noButtons">
                <button type="button" class="btn btn-sm btn-secondary" @click="hideModal()">Close</button>
                <button v-for="button in activeButtons" type="button" class="btn btn-sm" :class="[('btn-' + (button.color ?? 'primary'))]" @click="button.click ? button.click : buttonClicked(button)">{{button.text}}</button>
            </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const id = 1;
const modalName = 'modal' + id;
const modalLabelName = 'modal' + id + 'Label';

const passedEventHandle = ref(null);


const result = ref({});
const isModalShown = ref(false);
const modalDisplayProp = computed(() => {return isModalShown.value ? 'block' : 'none';})
const modalTitle = computed(() => {return props.title ?? 'default modal title';})

const props = defineProps({
    'title': String,
    'shown': Boolean,
    'fields': Object,
    'noButtons': Boolean,
    'buttons': Array,
})

isModalShown.value = props.shown;

const emit = defineEmits(['save', 'buttonClicked', 'onClose'])

const activeButtons = computed(() => {return props.buttons ? props.buttons : [{click:save, text:'Save changes'}]});


function save() {
    emit('save', result);
    result.value = {};
    hideModal();
}

function buttonClicked(button) {
    if(passedEventHandle.value) {
        passedEventHandle.value(button);
        passedEventHandle.value = null;
    }
    emit('buttonClicked', button);
}


function showModal(currentEventHandle = null) {
    passedEventHandle.value = currentEventHandle;
    isModalShown.value = true;
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
