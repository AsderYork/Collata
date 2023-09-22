<template>
    <textarea v-model="value" class="form-control form-control-plaintext" ref="textelement" :style="{'height':refsize+'px'}" style="resize: none; overflow: hidden;"></textarea>
</template>

<script setup>


const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: String,
})


const textelement = ref(null);
const value = ref(props.modelValue);

const refsize = ref(0);

watch(value, () => {
    refsize.value = 0;
    nextTick(() => {
    refsize.value = textelement.value.scrollHeight;
    });

    emit('update:modelValue', value.value);
})

watch(() => props.modelValue, () => {
    value.value = props.modelValue;
})


function focus() {
    if(textelement.value) {
        textelement.value.focus();
    }
}


defineExpose({focus});




</script>
