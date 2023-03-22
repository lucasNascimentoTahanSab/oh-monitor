import Editor from "@monaco-editor/react"
import { useRef } from "react"

function CodeEditor(props) {
  const editorRef = useRef(null)

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor
  }

  return (
    <div>
      <Editor
        height="90vh"
        defaultLanguage="java"
        defaultValue=""
        theme="vs-dark"
        onMount={handleEditorDidMount}
      />
    </div>
  )
}

export default CodeEditor