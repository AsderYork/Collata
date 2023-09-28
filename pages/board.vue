<template>
    <div>
    <PartCanbanDesck 
    @newCardstack="cardStackEnshure" 
    @updateCardstack="cardStackEnshure" 
    @deleteCardstack="deleteCardstack"
    @reorderCardstack="reorderCardstack"
    @saveCard="saveCard"
    @deleteCard="deleteCard"
    @newComment="newComment"
    @deleteComment="deleteComment"
    :newCardIdLink = "newCardIdLink"
    :cardstacks="cardstacks"/>
    </div>
</template>

<script setup>

const route = useRoute();
const boardId = route?.query?.id;

const newCardIdLink = ref(null);


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
        var newCard = false;
        if(data.tmpId) {
            newCard = data.tmpId;
            delete data.tmpId;
        }

        var dataToSend = Object.assign({}, data, {cardstack:data.cardstack.id});
        var data = await $fetch('/api/cards', {
                method: 'POST',
                body: dataToSend,
            });

        if(newCard) {
            newCardIdLink.value = {id:data.id, tmpId:newCard};
        }

    }      

    cardstackRefresh();
}

async function deleteCard(data) {
    var data = await $fetch('/api/cards', {
            method: 'DELETE',
            body: {id:data.id},
        });
    cardstackRefresh();
}

async function newComment(data) {
    var data = await $fetch('/api/comments', {
            method: 'post',
            body: data,
        });
    cardstackRefresh();
}

async function deleteComment(data) {
    var data = await $fetch('/api/comments', {
            method: 'DELETE',
            body: data,
        });
    cardstackRefresh();
}







const {data:cardstacks, error:cardstackError, refresh:cardstackRefresh} = await useFetch(`/api/cardstacks?board=${boardId}`);


</script>
