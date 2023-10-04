<template>
    <div id="text-editor" class="d-flex flex-column border-0 tiptaptexteditor" :class="{'tiptaptexteditor-presentmode':writingModeState}" style="overflow: hidden;" @focusout="onFocusOut" ref="editorref">
      <div class="toolbar" v-if="editor && !writingModeState">
        <button
          v-for="({ slug, option, active, icon }, index) in textActions"
          class="btn btn-sm m-0 rounded-0"
          :class="{ active: editor.isActive(active) || (slug === 'code' && !editorVisible) }"
          @click="onActionClick(slug, option);"
          tabindex="0"
        >
          <i :class="icon"></i>
          <font-awesome-icon :icon="['fas', icon]" />
        </button>
      </div>

      <editor-content :editor="editor" v-if="editorVisible" tabindex="1" style="overflow-y: auto; overflow-x: hidden; height: 100%;" @click="makeEditable"/>
      <textarea class="w-100" v-model="innerValue" @keyup="rawTextClick" v-else style="height: 100%;"></textarea>
    </div>
  </template>
  
  <script>
  import { Editor, EditorContent } from '@tiptap/vue-3';
  import StarterKit from '@tiptap/starter-kit';
  import TextAlign from '@tiptap/extension-text-align';
  import Underline from '@tiptap/extension-underline';
  import Subscript from '@tiptap/extension-subscript';
  import Superscript from '@tiptap/extension-superscript';
  import CharacterCount from '@tiptap/extension-character-count';
  import { Markdown } from 'tiptap-markdown';
  import Link from '@tiptap/extension-link'
  
  export default {
    components: {
      EditorContent,
    },
    props: {
      modelValue: {
        type: String,
        default: '',
      },
      maxLimit: {
        type: Number,
        default: null,
      },
      lockWritingMode: {
        type: Boolean,
        default: false
      },
      focusOnMount: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        presentMode: true,
        innerValue: this.modelValue,
        editorVisible: true,
        editor: null,
        editable: true,
        textActions: [
          { slug: 'bold', icon: 'bold', active: 'bold' },
          { slug: 'italic', icon: 'italic', active: 'italic' },
          { slug: 'underline', icon: 'underline', active: 'underline' },
          { slug: 'strike', icon: 'strikethrough', active: 'strike' },
          {
            slug: 'align',
            option: 'left',
            icon: 'align-left',
            active: { textAlign: 'left' },
          },
          {
            slug: 'align',
            option: 'center',
            icon: 'align-center',
            active: { textAlign: 'center' },
          },
          {
            slug: 'align',
            option: 'right',
            icon: 'align-right',
            active: { textAlign: 'right' },
          },
          {
            slug: 'align',
            option: 'justify',
            icon: 'align-justify',
            active: { textAlign: 'justify' },
          },
          { slug: 'bulletList', icon: 'list', active: 'bulletList' },
          { slug: 'orderedList', icon: 'list-ol', active: 'orderedList' },
          { slug: 'subscript', icon: 'subscript', active: 'subscript' },
          { slug: 'superscript', icon: 'superscript', active: 'superscript'},
          { slug: 'undo', icon: 'rotate-left', active: 'undo' },
          { slug: 'redo', icon: 'rotate-right', active: 'redo' },
          { slug: 'code', icon: 'code', active: 'code' },
        ],
      };
    },
    computed: {
      charactersCount() {
        return this.editor.storage.characterCount.characters();
      },
      wordsCount() {
        return this.editor.storage.characterCount.words();
      },
      limitWarning() {
        const isCloseToMax = this.charactersCount >= this.maxLimit - 20;
        const isMax = this.charactersCount === this.maxLimit;
  
        if (isCloseToMax && !isMax) return 'warning';
        if (isMax) return 'danger';
  
        return '';
      },
      writingModeState() {
        return (this.presentMode && !this.lockWritingMode) || this.readonly;
      }
    },
    watch: {
      modelValue(value) {
        if (this.editor.storage.markdown.getMarkdown() === value) return;
        this.editor.commands.setContent(this.modelValue, false);
        this.innerValue = this.editor.storage.markdown.getMarkdown();
      },
      writingModeState(value) {
          this.editor.setOptions({editable: !value});        
      }
    },
    methods: {
      onActionClick(slug, option = null) {
        const self = this;
        const vm = this.editor.chain().focus();
        const actionTriggers = {
          bold: () => vm.toggleBold().run(),
          italic: () => vm.toggleItalic().run(),
          underline: () => vm.toggleUnderline().run(),
          strike: () => vm.toggleStrike().run(),
          bulletList: () => vm.toggleBulletList().run(),
          orderedList: () => vm.toggleOrderedList().run(),
          align: () => vm.setTextAlign(option).run(),
          subscript: () => vm.toggleSubscript().run(),
          superscript: () => vm.toggleSuperscript().run(),
          undo: () => vm.undo().run(),
          redo: () => vm.redo().run(),
          clear: () => {
            vm.clearNodes().run();
            vm.unsetAllMarks().run();
          },
          code: () => {
            self.toggleEditorVisibility(true);
          }
        };
        actionTriggers[slug]();
      },
      onHeadingClick(index) {
        const vm = this.editor.chain().focus();
        vm.toggleHeading({ level: index }).run();
      },
      toggleEditorVisibility() {
        this.editorVisible = this.editorVisible ? false : true;
      },
      rawTextClick() {
        this.editor.commands.setContent(this.innerValue, false);
        this.$emit('update:modelValue', this.editor.storage.markdown.getMarkdown());
      },
      makeEditable() {
          this.presentMode = false;
      },
      onFocusOut(event) {
        if(!(event.relatedTarget && this.editorref.contains(event.relatedTarget))) {
          this.presentMode = true;
        }
      }

    },
    mounted() {
      this.editor = new Editor({
        content: this.modelValue,
        extensions: [
          StarterKit,
          Underline,
          Subscript,
          Superscript,
          CharacterCount.configure({
            limit: this.maxLimit,
          }),
          TextAlign.configure({
            types: ['heading', 'paragraph'],
          }),
          Markdown.configure({
            tightLists: true,
            linkify: true,              // Create links from "https://..." text
            breaks: true,               // New lines (\n) in markdown input are converted to <br>
            transformPastedText: true,  // Allow to paste markdown text in the editor
            transformCopiedText: true,  // Copied text is transformed to markdown
          }),
          Link.configure({
            openOnClick: true,
          }),
        ],
        onFocus: () => {
          this.presentMode = false;
        },
        onUpdate: () => {
          this.innerValue = this.editor.storage.markdown.getMarkdown();
          this.$emit('update:modelValue', this.editor.storage.markdown.getMarkdown());
        },
      });

        this.editor.setOptions({editable: !this.writingModeState});

      if(this.focusOnMount) {
        nextTick(() => {
          this.editor.view.dom.focus()
        })
      }

    },
    beforeUnmount() {
      this.editor.destroy();
    },
    setup() {
      const editorref = ref(null);
      return {
        editorref
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  #text-editor {
    border: 1px solid #808080;
  
    .toolbar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      border-bottom: 1px solid #7c7c7c;
  
      > button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background: #fff;
        color: #333;
        border: none;
        border-radius: 2px;
        margin: 0.5em 4px;
        -webkit-appearance: none;
        cursor: pointer;
  
        &.active {
          background: #333;
          color: #fff;
        }
      }
    }
  
    .align-dropdown {
      position: relative;
      display: inline-block;
      margin: 0.5em 8px;
  
      > button {
        height: 24px;
        background: #fff;
        color: #333;
        border: none;
        border-radius: 2px;
        -webkit-appearance: none;
        cursor: pointer;
      }
  
      > .dropdown-content {
        display: none;
        position: absolute;
        left: 0;
        right: 0;
        border: 1px solid #333;
        outline: 1px solid #fff;
        border-radius: 2px;
        background-color: #fff;
        z-index: 1;
  
        a {
          display: block;
          padding: 2px 12px;
          text-align: center;
          cursor: pointer;
  
          &:hover,
          &.active {
            background: #333;
            color: #fff;
          }
        }
      }
  
      &:hover .dropdown-content {
        display: block;
      }
    }
  
    .divider {
      width: 1px;
      height: 24px;
      background: #333;
      margin-right: 6px;
    }
  
  
  
    .ProseMirror {
      height: 300px;
      overflow-y: auto;
      padding-left: 0.5em;
      padding-right: 0.5em;
      outline: none;
  
      > p:first-child {
        margin-top: 0.5em;
      }
  
      > h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        &:first-child {
          margin-top: 0.5em;
        }
      }
    }
  }
  </style>
  
<style>
    .ProseMirror-focused {
        outline: none!important;
    }
    .ProseMirror {
        padding: 3px;
    }
    .ProseMirror p {
        margin-bottom: 0px;
    }

    #text-editor textarea {
      outline: 0;
      margin-bottom: -6px;
    }
    
    .tiptap.ProseMirror {
      height: 100%;
    }

</style>
