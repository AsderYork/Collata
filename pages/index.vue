<style>
.cardstack {
    width: 240px;
    
}

.cardstack-end .btn-outline-secondary {
    border: 0px;
}

.worktable, .active-cards {
    gap:10px;
    flex-wrap: wrap;
    align-items: flex-start;
    display: flex;
}

.form-control-outline-0:focus {
    box-shadow: none;
}

.sortable-ghost {
    opacity: 0.4;
    border: 3px dashed gray;
}



</style>

<template>
    <div class="worktable p-2">

        <client-only>
            <draggable v-model="cardblocks" item-key="id" group="elements" class="active-cards">
                <template #item="{element:cardblock}">
                    <div class="cardstack card">
                        <div class="cardstack-header py-1">
                            <div class="px-1 d-flex justify-content-between">
                                <b class="mb-0 d-flex justify-content-center flex-column">
                                    <Editinput v-model="cardblock.name" :spanclass="{'mx-1':true}" :inputclass="{'form-control-sm':true, 'form-control-outline-0':true, 'focus-ring':true}" :editable="true" :cantBeEmpty="true"/>
                                </b>
                               

                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <font-awesome-icon :icon="['fas', 'ellipsis']" />
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li><a class="dropdown-item" href="#">Action</a></li>
                                        <li><a class="dropdown-item" href="#">Another action</a></li>
                                        <li><a class="dropdown-item" href="#">Something else here</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div class="cardstack-end px-1 py-1">
                            <a href="#" class="btn btn-outline-secondary p-1"><font-awesome-icon :icon="['fas', 'plus']" /> New Card</a>
                        </div>
                    </div>
                </template>
            </draggable>
        </client-only>


        

        <div class="cardstack card cardstack-new bg-secondary" >
            <div :class="{'d-none':newCardBlock.active}" class="btn btn-secondary" @click="addNewCardblockPlan()">
                <font-awesome-icon :icon="['fas', 'plus']" /> New Carstack
            </div>
            <div class="cardstack-end px-1 py-1 bg-white rounded" :class="{'d-none':!newCardBlock.active}">
                <div>
                    <input type="text" ref="CardBlockPlanInputRef" class="form-control form-control-sm form-control-outline-0 focus-ring" @keydown.enter="addNewCardblock"  @blur="newCardBlockLostFocus">
                </div>
                <div class="mt-1 d-flex justify-content-between">
                    <div class="btn btn-sm btn-primary" @mousedown.left="addNewCardblock()"><font-awesome-icon :icon="['fas', 'plus']" />Add cardstack</div>
                    <div class="btn btn-sm btn-outline-danger" @click="stopNewCardBlockPlan()" title="Cancel adding new stack"><font-awesome-icon :icon="['fas', 'times']" /></div>
                </div>
            </div>
        </div>
    </div>




</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

useHead({script:{type:'module', 'src':'bootstrap/dist/js/bootstrap.bundle.min.js'}});



const cardblocks = ref([]);

const newCardBlock = ref({});

const CardBlockPlanInputRef = ref(null);

const cb = ref([{id:1, name:'nnn'}, {id:2, name:'aaq'}, {id:3, name:'sadqw'}, {id:4, name:'sdcvb54'}]);






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
            name:CardBlockPlanInputRef.value.value,
            id:uuidv4(),
        })
    }
    CardBlockPlanInputRef.value.value = '';

    stopNewCardBlockPlan();
    addNewCardblockPlan();
}

function newCardBlockLostFocus(event) {
    stopNewCardBlockPlan();
}







</script>
