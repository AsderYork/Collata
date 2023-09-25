<template>
    <div class="bg-white">
        <div v-for="item in data">
            <a href="#" @click="curr = item">{{ item.val }}</a>
        </div>
        <div>curr: {{ curr }}</div>
        <a href="#" @click="reset()">reset</a>
    </div>
</template>

<script setup>

const data = ref([{id:1, val:'a'}, {id:2, val:'b'}, {id:3, val:'c'}]);

watch(data, () => {
    console.log('deeper');
    console.log(curr.value);

    if(curr.value) {
        curr.value = data.value.find(x => x.id === curr.value.id);
        debugger;
    }

})

const curr = ref({});

function reset() {
    data.value = [{id:1, val:'aaa'}, {id:2, val:'bbb'}, {id:3, val:'ccc'}];
}



</script>
