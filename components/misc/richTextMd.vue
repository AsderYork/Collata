
    
    <template>
        <div>
        <div class="border" contenteditable="true" @keydown="processInput" ref="editorElement">
        </div>

        <div v-html="value" contenteditable="true"></div>

        </div>
    </template>

<script setup>
const { $mdRenderer } = useNuxtApp()
      
    const editorElement = ref(null);

    const value = ref('');


    function processInput(event) {
        var q = editorElement.value.innerText.replace(/\u00a0/g, " ");
        value.value = $mdRenderer.render(q)
    }

</script>