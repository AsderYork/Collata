<template>
    <div>
    <PartCanbanDesck 
    @newCardstack="cardStackEnshure" 
    @updateCardstack="cardStackEnshure" 
    @deleteCardstack="deleteCardstack"
    @reorderCardstack="reorderCardstack"
    @saveCard = "saveCard"
    :cardstacks="cardstacks"/>
    </div>
</template>

<script setup>

const route = useRoute();
const boardId = route?.query?.id;


async function cardStackEnshure(data) {

    var dataToSend = Object.assign({}, data, {board:boardId});

    var data = await $fetch('/api/cardstacks', {
            method: 'POST',
            body: dataToSend,
        });
        
    cardstackRefresh();
}

async function deleteCardstack(data) {
    var data = await $fetch('/api/cardstacks', {
            method: 'DELETE',
            body: data,
        });
    cardstackRefresh();

}

async function reorderCardstack(data) {

    var data = await $fetch('/api/cardstacks/order', {
            method: 'POST',
            body: {cardstacks:data},
        });
    cardstackRefresh();
}

async function saveCard(data) {
    if(data.name != null) {
    var dataToSend = Object.assign({}, data, {cardstack:data.cardstack.id});
    var data = await $fetch('/api/cards', {
            method: 'POST',
            body: dataToSend,
        });
    }
    cardstackRefresh();
}





const {data:cardstacks, error:cardstackError, refresh:cardstackRefresh} = await useFetch(`/api/cardstacks?board=${boardId}`);


</script>
