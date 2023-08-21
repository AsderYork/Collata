<style>
.cardstack {
    width: 240px;
    
}

.cardstack-end .btn-outline-secondary {
    border: 0px;
}

.worktable {
    gap:10px;
    flex-wrap: wrap;
    align-items: flex-start;
}

.form-control-outline-0:focus {
box-shadow: none;
}

</style>

<template>
    <div class="worktable p-2 d-flex">

        <div class="cardstack card" v-for="cardblock in cardblocks">
            <div class="cardstack-header px-1 py-1">
                <div class="px-1"><Editinput v-model="cardblock.name" :inputclass="{'form-control-sm':true, 'form-control-outline-0':true, 'focus-ring':true}" :editable="true" :cantBeEmpty="true"/></div>
            </div>
            <div class="cardstack-end px-1 py-1">
                <a href="#" class="btn btn-outline-secondary p-1">+ add Card</a>
            </div>
        </div>

        <div class="cardstack card" :class="{'d-none':!newCardBlock.active}">
            <div class="cardstack-end px-1 py-1">
                <div>
                    <input type="text" ref="CardBlockPlanInputRef" class="form-control form-control-sm form-control-outline-0 focus-ring" @blur="stopNewCardBlockPlan" @keydown.enter="addNewCardblock">
                </div>
                <div class="mt-1 d-flex justify-content-between">
                    <div class="btn btn-sm btn-primary" @click="addNewCardblock()">Add cardstack</div>
                    <div class="btn btn-sm btn-outline-danger" @click="stopNewCardBlockPlan()">X</div>
                </div>
            </div>
        </div>


        <div :class="{'d-none':newCardBlock.active}" class="cardstack cardstack-new btn btn-secondary" @click="addNewCardblockPlan()">
            + Add new Cardstack
        </div>

        <div class="text-primary debug">
            {{ cardblocks }}
        </div>

    </div>




</template>

<script setup>


const cardblocks = ref([]);

const newCardBlock = ref({});

const CardBlockPlanInputRef = ref(null);





function addNewCardblockPlan() {
    newCardBlock.value.active = true;
    nextTick(() => {
        CardBlockPlanInputRef.value.focus();
    });
}

function stopNewCardBlockPlan() {
    newCardBlock.value.active = false;
}

function addNewCardblock() {

    if(CardBlockPlanInputRef.value.value != '') {
        cardblocks.value.push({
            name:CardBlockPlanInputRef.value.value
        })
    }
    CardBlockPlanInputRef.value.value = '';

    stopNewCardBlockPlan();


}







</script>
