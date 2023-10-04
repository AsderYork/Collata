<template>
    <div class="d-flex flex-column" style="height: 80vh; padding-bottom: 2px;">
        <div class="border-bottom">
            <div class="d-flex p-1">
                <div class="w-100 pe-1">
                    <MiscResizableScroll v-model="card.name" class="fw-bold rounded-bottom-0 rounded-end-0 px-1 my-0 card-header" ref="headerElement"></MiscResizableScroll>
                </div>

                <div class="dropdown d-flex">
                    <div class="btn btn-sm btn-outline-secondary rounded-0 mt-n1 me-n1 border-0 px-1" type="button" data-bs-toggle="dropdown" aria-expanded="false" style="width: 27px;">
                        <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" />
                    </div>
                    <ul class="dropdown-menu">
                        <li @click="deleteAskModal.showModal()"><a class="dropdown-item" href="#"><font-awesome-icon :icon="['fas', 'trash-alt']" /> Delete card</a></li>
                    </ul>
                </div>
                
                
                <div class="btn btn-sm btn-outline-secondary rounded-start-0 rounded-bottom-0 mt-n1 me-n1 border-0 card-header-angle-btn" @click="emit('requestClose')">
                    <font-awesome-icon :icon="['fas', 'times']" />
                </div>
            </div>
        </div>

        <div class="border-bottom">
            <div>
                <button tabindex="-1" class="btn btn-sm btn-outline-secondary border-0 rounded-top-0" title="Add mark" @click.prevent="addMarkModal.showModal()">
                    <font-awesome-icon :icon="['fa', 'bookmark']" /> <font-awesome-icon :icon="['fa', 'plus']" />
                </button>
            </div>
        </div>

        
        <div class="overflow-auto">
            <div class="m-1">
                <div v-if="!textEditStarted" class="empty-text-block rounded p-2" @click="startTextEditing()" tabindex="0" @focus="startTextEditing()">Add an extended description of a task...</div>
                <AppTextEditor v-if="textEditStarted" v-model="card.text" class="rounded" @focusout="stopTextEditing()"></AppTextEditor>
            </div>

            <div v-if="showComments">
                <div class="border-top ">
                    <div class="d-flex my-2 mx-2 border-bottom pb-1">
                        <div class="rounded-circle profile-picture text-center d-flex justify-content-center flex-column">
                            <div class="mb-1">A</div>
                        </div>
                        <div v-if="!newCommentStarted" tabindex="0" class="rounded bg-light ms-2 px-2 w-100 btn text-start text-muted" @click="startNewComment()">Write new comment...</div>
                        <div v-else class="w-100 ms-2" @focusout="stopAddingComment()">
                            <AppTextEditor v-model="newCommentText" class="rounded" :lockWritingMode="true" :focusOnMount="true" :readonly="!newCommentStarted"/>
                            <div class="btn btn-sm btn-primary" @click="saveNewComment()">save</div>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-column">
                    <div v-for="comment in card.cardsComments">
                        <div class="d-flex my-2 mx-2">
                            <div class="rounded-circle profile-picture text-center d-flex justify-content-center flex-column">
                                <div class="mb-1">A</div>
                            </div>
                            <div class="ms-2 w-100">
                                <div>
                                    <small class="text-muted" title="edit comment"><a class="text-muted" href="#" @click.prevent="startEditingComment(comment.id)"><font-awesome-icon :icon="['fas', 'pen']"/></a></small>
                                    <small class="text-muted ms-1" title="delete comment"><a class="text-muted" href="#" @click.prevent="deleteComment(comment.id)"><font-awesome-icon :icon="['fas', 'trash']" /></a></small>
                                    {{ comment.author.name }}
                                    <small class="text-muted ms-1" :title="regularTime(comment.createdAt)">{{ HRTime(comment.createdAt) }}</small>
                                </div>
                                <div v-if="commentUnderEdit === comment.id">
                                    <AppTextEditor v-model="editedCommentText" class="rounded" :focusOnMount="true" :lockWritingMode="true"/>
                                    <div class="mt-1">
                                        <div class="btn btn-sm btn-primary" @click="saveEditedComment()">Save</div>
                                        <div class="btn btn-sm btn-outline-secondary ms-2" @click="dropEditingComment()">Cancel</div>
                                    </div>
                                </div>
                                <div v-else class="rounded px-2 bg-light text-start pb-1">
                                    <AppTextEditor  v-model="comment.text" class="rounded" :readonly="true"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>



        <MiscFormModal ref="deleteAskModal" :title="'Delete card'" :buttons="[{text:'delete',click:() => {emit('requestCardDelete'); emit('requestClose')}, color:'danger'}]">
            <h2>Are you shure you want to delete this card?</h2>
        </MiscFormModal>


    </div>
</template>

<script setup>
import moment from 'moment'


const props = defineProps({
    modelValue: {type: Object, default: {name:'', text:''}}
})
const emit = defineEmits(['requestClose', 'save', 'update:modelValue', 'requestCardDelete', 'newComment', 'deleteComment', 'editComment'])



const addMarkModal = ref(null)
const headerElement = ref(null)
const deleteAskModal = ref(null)
const commentUnderEdit = ref(null);
const editedCommentText = ref(null);

const editorFocused = ref(false);
const textEditStarted = computed(() => editorFocused.value || (card.value?.text != '' && card.value?.text != null));

const newCommentText = ref('')
const newCommentStarted = ref(false);


const card = ref(props.modelValue);

const showComments = computed(() => props.modelValue?.id);

watch(() => props.modelValue, () => {
    card.value = props.modelValue;
})



function HRTime(time) {
    return moment(time).fromNow();
}

function regularTime(time) {
    return moment(time);
}



function open() {
    headerElement.value.focus();
}


defineExpose({open});

function startNewComment() {
    newCommentStarted.value = true;
}

function stopAddingComment() {
    if(newCommentText.value == '') {
        newCommentStarted.value = false;
    }
}

function startTextEditing() {
    editorFocused.value = true;
}

function stopTextEditing() {
    editorFocused.value = false;
}

function saveNewComment() {
    emit('save');//save before comment alter to preserve actual state
    emit('newComment', newCommentText.value);
    newCommentText.value = '';
    stopAddingComment();
}

function deleteComment(id) {
    emit('save');//save before comment alter to preserve actual state
    emit('deleteComment', id);
}

function startEditingComment(id) {
    commentUnderEdit.value = id;
    editedCommentText.value = card.value?.cardsComments?.find(x => x.id === id)?.text;
}

function dropEditingComment() {
    editedCommentText.value = '';
    commentUnderEdit.value = null;
}

function saveEditedComment() {
    emit('editComment', {id:commentUnderEdit.value, text:editedCommentText.value});
    console.log({id:commentUnderEdit.value, text:editedCommentText.value});
    editedCommentText.value = '';
    commentUnderEdit.value = null;
}




onMounted(() => {

    if(card.value && card.value?.text != null) {
        nextTick(() => {
            startNewComment();
        })
    } else {
        headerElement.value.focus();
    }

})

</script>
<style>
.tiptaptexteditor:not(.tiptaptexteditor-presentmode) {
    background: rgb(255, 255, 255);
}

.card-header {
    min-height: 24px!important;
}

.card-header-angle-btn {
    border-top-right-radius: 7px;
}

.profile-picture {
    width: 40px;
    height: 40px;
    background: rebeccapurple;
}

.empty-text-block {
    cursor: pointer;
    background-color: #091e420f;
}

.empty-text-block:hover {
    background-color: #05102234;
}




</style>

