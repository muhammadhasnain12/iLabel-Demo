// @flow
import React, { useState } from "react"
import ReactDOM from "react-dom"
import { Link } from 'react-router-dom'
import Editor, { examples } from "./Editor"
import Annotator from "../Annotator"
import ErrorBoundaryDialog from "./ErrorBoundaryDialog.js"

export default () => {
  const [annotatorOpen, changeAnnotatorOpen] = useState(false)
  const [annotatorProps, changeAnnotatorProps] = useState(examples)
  const [lastOutput, changeLastOutput] = useState()
  // console.log("Current component is",annotatorOpen)
  // console.log("Current component is",annotatorProps)
  // console.log("Current component is",lastOutput)
  return (
    <div>
      {annotatorOpen ? (
        
          <Annotator
            {...(annotatorProps: any)}
            onExit={(output) => {
              delete (output: any)["lastAction"]
              changeLastOutput(output)
              changeAnnotatorOpen(false)
            }}
          />
        
        // </ErrorBoundaryDialog>
      ) : (
        <Editor
          lastOutput={lastOutput}
          onOpenAnnotator={(props) => {
            changeAnnotatorProps(props)
            changeAnnotatorOpen(true)
          }}
        />
      )}
    </div>
  )
}
