<template>
    <div class="p-4 d-flex">
        <a class="board d-flex" href="#" title="Add new board" @click.prevent="startNewBoard">
            <h1 class="m-auto text-primary">
                <font-awesome-icon :icon="['fas', 'plus']" size="2xl"  />
            </h1>
        </a>
    </div>

    <MiscFormModal ref="newBoardRef" title="New board" :buttons="[{text:'Add new board'}]">
        <form @submit.prevent="submitNewBoard">
            <label class="form-label w-100">New board name
                <input type="text" class="form-control" ref="newBoardNameElement" @focus="$event.target.select()" v-model="newBoardName">
            </label>
        </form>
    </MiscFormModal>

</template>

<script setup>

const newBoardRef = ref(null);
const newBoardNameElement = ref(null);
const newBoardName = ref(null);

function startNewBoard() {
    newBoardRef.value.showModal();
    nextTick(() => {
        newBoardNameElement.value.focus();
        if(newBoardName.value == null) {
            newBoardName.value = 'New board';
        }

    });
}

function mainAction() {
    startNewBoard(); 
}

async function submitNewBoard() {

    if(newBoardName.value) {
    
        var data = await $fetch( '/api/boards', {
            method: 'POST',
            body: {name:newBoardName.value}
        } );
        console.log(data);
    }

}


defineExpose({mainAction});

</script>

<style>

.board {
    width: 100px;
    height: 150px;
    background: repeating-linear-gradient(
    45deg,
    #6e728d50,
    #6e728d79 10px,
    #2c2e3a 10px,
    #2c2e3a 20px
    );
    border: black 4px;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(185, 185, 185, 0.2);
}

</style>

