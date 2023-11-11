<style>
.cardstack {
    width: 240px;
}

@media (max-width: 480px) {
    .cardstack {
        width: 100%;
    }
    .active-cards {
        width: 100%;
    }
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

.cardstack-card {
    font-size: 120%;
    border-width: 2px!important;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(185, 185, 185, 0.2);
}


</style>

<template>
    <div class="worktable p-2">
        <client-only>
            <draggable v-model="cardblocks" item-key="id" group="elements" class="active-cards d-flex" delay="100" delayOnTouchOnly="true" @end="cardblockReorder">
                <template #item="{element:cardblock}">
                    <div class="cardstack card">
                        <div class="cardstack-header py-1">
                            <div class="px-1 d-flex justify-content-between">
                                <b class="mb-0 d-flex justify-content-center flex-column w-100">
                                    <MiscEditinput v-model="cardblock.name" :spanclass="{'mx-1':true}" :inputclass="{'form-control-sm':true, 'form-control-outline-0':true, 'focus-ring':true}" :editable="true" :cantBeEmpty="true" @blur="updateCardstack(cardblock)"/>
                                </b>
                               
                                <div class="dropdown">
                                    <button class="btn btn-sm btn-outline-secondary border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <font-awesome-icon :icon="['fas', 'ellipsis']" />
                                    </button>
                                    <ul class="dropdown-menu">
                                        <li @click="removeCardblock(cardblock)"><a class="dropdown-item" href="#"><font-awesome-icon :icon="['fas', 'trash-alt']" /> Trash cardblock</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="d-flex flex-column">
                            <draggable v-model="cardblock.cards" item-key="id" group="cards" delay="100" delayOnTouchOnly="true" @end="cardblockReorder">
                                <template #item="{element:card}">
                                    <div class="cardstack-card border rounded m-1 p-1 card" @click.prevent="showCard(card, cardblock)">
                                        <b>{{card.name}}</b>
                                    </div>
                                </template>
                            </draggable>
                            
                        </div>
                        


                        <div class="cardstack-end px-1 py-1">
                            <a href="#" class="btn btn-outline-secondary p-1" @click="showCard(null, cardblock)"><font-awesome-icon :icon="['fas', 'plus']"/> New Card</a>
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
                    <input type="text" ref="CardBlockPlanInputRef" class="form-control form-control-sm form-control-outline-0 focus-ring" @keydown.enter="addNewCardblock"  @blur="newCardBlockLostFocus" @keydown.esq="stopNewCardBlockPlan">
                </div>
                <div class="mt-1 d-flex justify-content-between">
                    <div class="btn btn-sm btn-primary" @mousedown.left="addNewCardblock()"><font-awesome-icon :icon="['fas', 'plus']" />Add cardstack</div>
                    <div class="btn btn-sm btn-outline-danger" @click="stopNewCardBlockPlan()" title="Cancel adding new stack"><font-awesome-icon :icon="['fas', 'times']" /></div>
                </div>
            </div>
        </div>

        
        <miscFormModalClean ref="elementsEditForm" :contentStyle="{height:'80vh', background:'#efefef'}" @onClose="hideCurrentCard" @onOpen="emit('cardOpen', currentCard)">
            <PartCardBody
            @requestClose="elementsEditForm.hideModal()" 
            @save="saveCard" 
            @requestCardDelete="deleteCard"
            @newComment="newComment"
            @deleteComment="deleteComment"
            @editComment="editComment"
            v-model="currentCard"/>
        </miscFormModalClean>

    </div>




</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

const props = defineProps({
    boardId: {type:Number},
    cardstacks: {type:Object},
    newCardIdLink: {type:Object},//When we create new card, it's id is unknown. To recognize it after update, user must provide {id, tmpId} object, linking new card to it's new id
})

const emit = defineEmits(['newCardstack', 'updateCardstack', 'deleteCardstack', 'reorderCardstack', 'saveCard', 'deleteCard', 'newComment', 'deleteComment', 'editComment', 'cardOpen', 'cardClose'])

const cardblocks = ref(props.cardstacks);
const newCardBlock = ref({});

const CardBlockPlanInputRef = ref(null);
const elementsEditForm = ref(null);

//After we make a new card, we must change our state to show, that this new card is now a regular card with id stored in newCardIdLink
watch(() => props.newCardIdLink, () => {
    if(props.newCardIdLink && props.newCardIdLink.id && newCard.value !== null) {
        currentCardId.value = props.newCardIdLink.id;
        newCard.value = null;
    }
})

watch(() => props.cardstacks, () => {cardblocks.value = props.cardstacks;})


const allCards = computed(() => {
    return [].concat(...cardblocks.value.map(x => x.cards.map(c => Object.assign(c, {cardstack: x}))));
})


var currentCardId = ref(null);
var newCard = ref(null);
var currentCard = computed(() => newCard.value ?? allCards.value.find(x => x.id === currentCardId.value));

function showCard(card, cardstack) {
    if(card === null) {
        newCard.value = {cardstack:cardstack, tmpId: uuidv4()};
    } else {
        currentCardId.value = card.id;
    }
    elementsEditForm.value.showModal()
}

function hideCurrentCard() {
    saveCard();
    currentCardId.value = null;
    emit('cardClose');
}


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

        var newCardstack = {
            name:CardBlockPlanInputRef.value.value,
            order:cardblocks.value.length,
            board:props.boardId
        };

        emit('newCardstack', newCardstack);
        //cardblocks.value.push(newCardstack);
    }
    CardBlockPlanInputRef.value.value = '';

    stopNewCardBlockPlan();
    addNewCardblockPlan();
}

function newCardBlockLostFocus(event) {
    stopNewCardBlockPlan();
}

function removeCardblock(cardstack) {
    emit('deleteCardstack', cardstack)
}

function updateCardstack(cardstack) {
    emit('updateCardstack', cardstack);
}

function newComment(comment) {
    emit('newComment', {card:currentCard.value?.id, text:comment});
}

function deleteComment(id) {
    emit('deleteComment', {id:id});
}

function editComment(data) {
    emit('editComment', data);
}

function cardblockReorder() {

    var toSend = [];
    for(var i in cardblocks.value) {
        cardblocks.value[i].order = i;
        toSend.push({id:cardblocks.value[i].id, order: cardblocks.value[i].order, cards:[]});
        for(var j in cardblocks.value[i].cards) {
            cardblocks.value[i].cards[j].order = j;
            toSend[i].cards.push({id:cardblocks.value[i].cards[j].id, order: cardblocks.value[i].cards[j].order});
        }
    }
    emit('reorderCardstack', {'cardstacks': toSend});
}

async function saveCard() {
    emit('saveCard', currentCard.value);
}

function deleteCard() {
    emit('deleteCard', {id:currentCard.value.id});
}

onMounted(() => {
    document.addEventListener('keyup', function (evt) {
        if (evt.target.tagName === 'BODY' && evt.code === 'Space' && cardblocks.value.length > 0) {
            showCard(null, cardblocks.value[0]);
        }
    });
});



</script>