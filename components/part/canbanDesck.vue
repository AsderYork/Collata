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
                                <b class="mb-0 d-flex justify-content-center flex-column w-100">
                                    <MiscEditinput v-model="cardblock.name" :spanclass="{'mx-1':true}" :inputclass="{'form-control-sm':true, 'form-control-outline-0':true, 'focus-ring':true}" :editable="true" :cantBeEmpty="true"/>
                                </b>
                               
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <font-awesome-icon :icon="['fas', 'ellipsis']" />
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li @click="removeCardblock(cardblock.id)"><a class="dropdown-item" href="#"><font-awesome-icon :icon="['fas', 'trash-alt']" /> Trash cardblock</a></li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <div class="cardstack-end px-1 py-1">
                            <a href="#" class="btn btn-outline-secondary p-1" @click="showCard()"><font-awesome-icon :icon="['fas', 'plus']"/> New Card</a>
                        </div>
                    </div>
                </template>
            </draggable>
        </client-only>

        <miscFormModalClean ref="elementsEditForm" @onOpen="cardbody.open()" :contentStyle="{height:'80vh'}">
            <PartCardBody ref="cardbody"></PartCardBody>
        </miscFormModalClean>

        

        

        <div class="cardstack card cardstack-new bg-secondary" >
            <div :class="{'d-none':newCardBlock.active}" class="btn btn-secondary" @click="addNewCardblockPlan()">
                <font-awesome-icon :icon="['fas', 'plus']" /> New Carstack
            </div>
            <div class="cardstack-end px-1 py-1 bg-white rounded" :class="{'d-none':!newCardBlock.active}">
                <div>
                    <input type="text" ref="CardBlockPlanInputRef" class="form-control form-control-sm form-control-outline-0 focus-ring" @keydown.enter="addNewCardblock"  @blur="newCardBlockLostFocus" @keydown.esq="stopNewCardBlockPlan">
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

const cardblocks = ref([]);

const newCardBlock = ref({});



const CardBlockPlanInputRef = ref(null);
const elementsEditForm = ref(null);
const cardbody = ref(null);

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

function removeCardblock(id) {
    cardblocks.value = cardblocks.value.filter(x => x.id !== id);
}

function showCard() {
    elementsEditForm.value.showModal()
}


</script>