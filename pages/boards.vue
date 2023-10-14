<template>

    <div class="p-4 d-flex flex-wrap" style="gap: 2rem;">
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
            <div class="text-primary border rounded-bottom px-1 board-title text-center border-top-0 d-flex justify-content-between" v-if="board.name">
                <div class="text-truncate">{{ board.name }}</div>
                <div class="border-start ps-1" style="cursor: pointer;"><font-awesome-icon :icon="['fas', 'pen']" @click.prevent="showBoard(board.id)"/></div>
            </div>
        </div>
    </div>


    <MiscFormModal ref="boardEditRef" :title="boardEditModalHeader" :buttons="boardEditModalButtons" @onClose="editorClose">
        <form @submit.prevent="saveBoard">
            <label class="form-label w-100">Name
                <input type="text" class="form-control" ref="boardNameElementRef" @focus="$event.target.select()" v-model="currentBoard.name">
            </label>

            <div v-if="currentBoard.id">
                <div class="btn btn-danger" @click="deletePromptModal.showModal()"><font-awesome-icon :icon="['fas', 'trash']"/> Delete board</div>
            </div>

        </form>
    </MiscFormModal>
    <MiscFormModal ref="deletePromptModal" title="Are you sure?" :buttons="[{click:deleteCurrentBoard, text:'Delete board', color:'danger'}]">Are you sure you want to delete board '{{ currentBoard.name }}'?</MiscFormModal>

</template>

<script setup>


const boardEditModalHeader = ref(null);
const boardEditModalButtons = ref(null);

const deletePromptModal = ref(null);
const boardEditRef = ref(null);
const boardNameElementRef = ref(null);

const currentBoard = ref({});


const AugmentedBoardsList = computed(() => {
    return [{id:null}].concat(boardsList.value ?? []);
})


function startNewBoard() {
    boardEditModalHeader.value = 'New board';
    boardEditModalButtons.value = [{click:saveBoard, text:'Add new board', color:'success'}];

    boardEditRef.value.showModal();
    nextTick(() => {
        boardNameElementRef.value.focus();
        if(currentBoard.value == null || currentBoard.value.name == null) {
            currentBoard.value.name = 'New board';
        }

    });
}

async function deleteCurrentBoard() {

    await $fetch( '/api/boards', {
            method: 'DELETE',
            body: {id:currentBoard.value.id}
        } );
        boardsRefresh();
        boardEditRef.value.hideModal();
        deletePromptModal.value.hideModal()
}

function editorClose() {
    currentBoard.value = {};
}

function mainAction() {
    startNewBoard(); 
}

async function saveBoard() {

    var data = Object.assign({}, currentBoard.value);

    if(data.name) {

        var body = data;
        if(data.id) {
            body = {id:data.id, data:{name:data.name}};
        }
    
        var data = await $fetch( '/api/boards', {
            method: 'POST',
            body: body
        } );
        boardsRefresh();
        boardEditRef.value.hideModal();
    }

}

async function showBoard(boardId) {
    var board = await $fetch(`/api/boards?id=${boardId}`);
    currentBoard.value = board;

    boardEditModalHeader.value = board.name;
    boardEditModalButtons.value = [{click:saveBoard, text:'Save'}];

    boardEditRef.value.showModal();
}



defineExpose({mainAction});

const {data:boardsList, error:boardsError, refresh:boardsRefresh} = await useFetch('/api/boards');


</script>

<style>

.board {
    height: 150px;
}

.board .board-body {
    width: 150px;
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
    width: 150px;
    -webkit-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    -moz-box-shadow: 4px 4px 8px 0px rgba(240, 240, 240, 0.2);
    box-shadow: 4px 4px 8px 0px rgba(185, 185, 185, 0.2);
    background: #26272b;
    border-color: #9580b26e!important;
}

</style>

