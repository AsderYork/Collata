<template>
<div >
    <input 
        ref="inputRef" 
        :class="Object.assign({'d-none':!isEditing}, inputclass)" 
        class="form-control" 
        type="text" 
        v-model="value" 
        @blur="focusLost" 
        v-bind="$attrs"
        @keydown.enter="focusLost">
    <div :class="Object.assign({'d-none':isEditing}, spanclass)" @click="turnToEdit">{{ value }}</div>
</div>
</template>
<script setup>


const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: String,
    editable:Boolean,
    inputclass:Object,
    cantBeEmpty:Boolean,
    spanclass:Object,
})

const inputRef = ref(null);


const value = ref(props.modelValue);
const safeValue = ref(props.modelValue);
const isEditing = ref(false);

watch(() => props.modelValue, () => {value.value = props.modelValue;})


function turnToEdit() {
    isEditing.value = (!isEditing.value) && props.editable;
    safeValue.value = value.value;
    nextTick(() => {
        inputRef.value.focus();
    });
}

function focusLost() {
    if(isEditing) {
        isEditing.value = false;
        if(props.cantBeEmpty && value.value == '') {
            value.value = safeValue.value;
        }
        emit('update:modelValue', value.value);
    }
}






</script>