import React from 'react';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import { Controlled as ControlledEditor } from 'react-codemirror2';

export default function CodingEditor(props) {

  console.log('codingEditor Props', props);

  const { value, onChange } = props;

  function handleChange(editor, data, value) {
    onChange(value)
  }

  function runJS(JS) {
    console.log('JS', JS)
  }

  const srcDoc = `
    <html>
      <body>
        <h1 class='hello'>HIIII</h1>
      </body>
      <script>

        document.querySelector('.hello').textContent = 'Not HI';

      </script>
    </html>
  `

  return (
    <div className="coding-space-wrapper">
      <div className='coding-editor-container'>
        <div className="coding-editor-title">Code Editor</div>
        <div className="coding-editor-editor">
          <ControlledEditor
            className='controlled-editor'
            onBeforeChange={handleChange}
            value={value}
            options={{
              lineWrapping: true,
              lint: true,
              mode: 'javascript',
              lineNumbers: true,
              theme: 'material'
            }}
          />
        </div>
        <div className="coding-editor-run-container">
          <div className="editor-run-btn" onClick={() => runJS(value)}>Run Code</div>
        </div>
      </div>
      <div className="coding-editor-runner">
        <iframe
          title='output'
          frameborder="0"
          sandbox='allow-scripts'
          width='100%'
          height='100%'
          srcDoc={srcDoc}
        >
        </iframe>
      </div>
    </div>
  )


}