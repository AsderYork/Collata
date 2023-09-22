<template>

    <div class="p-4 d-flex" style="gap: 2rem;">
        <div class="board d-flex flex-column" v-for="board in AugmentedBoardsList" :title="board.id === null ? 'Add new board' : board.name">
            <a v-if="board.id" class="board-body d-flex" :href="`/board?id=${board.id}`">
                <h1 class="m-auto text-primary">
                    <font-awesome-icon v-if="board.id === null" :icon="['fas', 'plus']" size="2xl"  />
                </h1>
            </a>
            <a v-else class="board-body d-flex" href="#" @click.prevent="startNewBoard()">
                <h1 class="m-auto text-primary">
                    <font-awesome-icon v-if="board.id === null" :icon="['fas', 'plus']" size="2xl"  />
                </h1>
            </a>
            <div class="text-primary text-truncate border rounded-bottom px-1 board-title text-center border-top-0" v-if="board.name">
                {{ board.name }}
            </div>
        </div>
    </div>

    <MiscFormModal ref="newBoardRef" title="New board" :buttons="[{click:submitNewBoard, text:'Add new board'}]">
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

const AugmentedBoardsList = computed(() => {
    return [{id:null}].concat(boardsList.value);
})


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

const {data:boardsList} = await useFetch('/api/boards');


</script>

<style>

.board {
    height: 150px;
}

.board .board-body {
    width: 100px;
    height: 100%;
    background: repeating-linear-gradient(
    45deg,
    #6e728d50,
    #6e728d79 10px,
    #2c2e3a 10px,
    #2c2e3a 20px
    );
    -webkit-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(185, 185, 185, 0.2);
    
    border: black 4px;
}

.board-title {
    width: 100px;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(185, 185, 185, 0.2);
    background: #26272b;
    border-color: #9580b26e!important;
}



</style>

