<template>
        <div v-for="item in data" :key="item.id">
            <a href="#" @click="curr = item">{{ item.val }}</a>
        </div>
        <div>curr: {{ curr }}</div>
        <a href="#" @click="reset()">reset</a>
</template>

<script setup>
const data = ref([{id:1, val:'a'}, {id:2, val:'b'}, {id:3, val:'c'}]);
const curr = ref({});
function reset() {
    var newData = [{id:1, val:'aaa'}, {id:2, val:'bbb'}, {id:3, val:'ccc'}];
    debugger;
    for(let item of newData) {
        let oldItemId = data.value.findIndex((x) => x.id === item.id);
        data.value[oldItemId] = Object.assign(data.value[oldItemId], item);
    }
    //data.value = [{id:1, val:'aaa'}, {id:2, val:'bbb'}, {id:3, val:'ccc'}];
}
</script>

<style>
body {
    background: wheat;
}
</style>
