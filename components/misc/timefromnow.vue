<template>
    <span>{{ HRTime(props.value) }}</span>
</template>

<script setup>
import moment from 'moment'
const props = defineProps({
    value:{type:String}
})

function HRTime(time) {
    return moment(time).fromNow();
}
</script>
