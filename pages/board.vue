<template>
    <div>
    <PartCanbanDesck 
    @newCardstack="x => passEvent(x, 'cardstacks', 'post')" 
    @updateCardstack="x => passEvent(x, 'cardstacks', 'post')" 
    @deleteCardstack="x => passEvent(x, 'cardstacks', 'post')"
    @reorderCardstack="x => passEvent(x, 'cardstacks/order', 'post')"
    @saveCard="saveCard"
    @deleteCard="x => passEvent(x, 'cards', 'delete')"
    @newComment="x => passEvent(x, 'comments', 'post')"
    @deleteComment="x => passEvent(x, 'comments', 'delete')"
    :boardId="boardId"
    :newCardIdLink = "newCardIdLink"
    :cardstacks="cardstacks"/>
    </div>
</template>

<script setup>

const route = useRoute();
const boardId = parseInt(route?.query?.id);

const newCardIdLink = ref(null);

async function passEvent(dataToSend, endpoint, method = 'post') {
    var data = await $fetch(`/api/${endpoint}`, {
            method: method,
            body: dataToSend,
        });
    cardstackRefresh();
    return data;
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

const {data:cardstacks, error:cardstackError, refresh:cardstackRefresh} = await useFetch(`/api/cardstacks?board=${boardId}`);


</script>
