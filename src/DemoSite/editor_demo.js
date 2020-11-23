// @flow

import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Select from "react-select"
import Code from "react-syntax-highlighter"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import MonacoEditor from "react-monaco-editor"
import Header from '../header'
const img0 = require('../Images/image0.jpg')
const img1 = require('../Images/image1.jpg')
const img2 = require('../Images/image2.jpg')
const img3 = require('../Images/image3.jpeg')



const useStyles = makeStyles({
  editBar: {
    padding: 10,
    borderBottom: "1px solid #ccc",
    backgroundColor: "#009487",
    color: 'white',
    display: "flex",
    alignItems: "center",
    "& .button": { margin: 5 },
  },
  select: { width: 240, fontSize: 14 },
  contentArea: {
    padding: 10,
  },
  specificationArea: {
    padding: 10,
  },
})

const loadSavedInput = () => {
  try {
    return JSON.parse(window.localStorage.getItem("customInput") || "{}")
  } catch (e) {
    return {}
  }
}

export const examples = {
  "Simple Bounding Box": () => ({
    taskDescription: "Annotate each image according to this _markdown_ specification.",
    regionTagList: ["Id-1","Id-2","Id-3","Id-4","Id-5"],
    regionClsList: ['Car', 'Bus', 'Truck', 'Motorcycle', 'Trailer', 'Person', 'Sidewalk', 'Wall', "Sign", "traffic Sign"],
    enabledTools: ["select", "create-box"],
    showTags: true  ,
    images: [
      {
        src: img0,
        name: "Image-0",
      },
      {
        src: img1,
        name: "Image-1",
      },
    ],
  }),
  "Simple Segmentation": () => ({
    taskDescription:
      "Annotate each image according to this _markdown_ specification.",
      // regionTagList: ["Tag1","Tag2","Tag3","Tag4","Tag5"],
    regionClsList: ['Car', 'Bus', 'Truck', 'Motorcycle', 'Trailer', 'Person', 'Sidewalk', 'Wall', "Sign", "traffic Sign"],
    enabledTools: ["select", "create-polygon"],
    images: [
      {
        src: img2,
        name: "Image-2",
      },
      {
        src: img3,
        name: "Image-3",
      },
      
    ],
  }),
  Custom: () => loadSavedInput(),
}
const customStyles = {
  color: 'red',
  control: base => ({
    ...base,
    borderColor: 'gray',

    '&:hover': {
      borderColor: 'red'
    }
  })
}
const Editor = ({ onOpenAnnotator, lastOutput }: any) => {
  const c = useStyles()
  
  const [currentError, changeCurrentError] = useState()
  const [selectedExample, changeSelectedExample] = useState(
    window.localStorage.getItem("customInput")
      ? "Custom"
      : "Simple Bounding Box"
  )
  const [outputDialogOpen, changeOutputOpen] = useState(false)
  const [currentJSONValue, changeCurrentJSONValue] = useState(
    JSON.stringify(examples[selectedExample](), null, "  ")
  )
  return (
    <div>
      <Header/>
      <div className={c.editBar}>
        <h3><i>[I]</i>LABEL</h3>
        <div style={{ flexGrow: 1 }} />
        <div>
          <div style={{ display: "inline-flex",color:'black' }}>
            <Select
            styles={customStyles}
              className={c.select}
              value={{ label: selectedExample, value: selectedExample }}
              options={Object.keys(examples).map((s) => ({
                label: s,
                value: s,
              }))}
              onChange={(selectedOption) => {
                changeSelectedExample(selectedOption.value)

                changeCurrentJSONValue(
                  JSON.stringify(
                    selectedOption.value === "Custom"
                      ? loadSavedInput()
                      : examples[selectedOption.value](),
                    null,
                    "  "
                  )
                )
              }}
            />
          </div>
          
          {/* view Output button */}

          <Button style={{color:'white'}}
            className="button"
            disabled={!lastOutput}
            onClick={() => changeOutputOpen(true)}
          >
            View Output
          </Button>
          <Button style={{background: 'white', color:'black'}}
            className="button"
            variant="outlined"
            disabled={Boolean(currentError)}
            onClick={() => {
              onOpenAnnotator(
                selectedExample === "Custom"
                  ? loadSavedInput()
                  : examples[selectedExample]
              )
            }}
          >
            Open Annotator
          </Button>
        </div>
      </div>
      {/* ========================== Json code Editor Start==================================== */}
      <div
        className={c.contentArea}
        style={
          currentError
            ? { border: "2px solid #f00" }
            : { border: "2px solid #fff" }
        }
      >
        <div>
          <MonacoEditor
            value={currentJSONValue}
            language="javascript"
            onChange={(code) => {
              try {
                window.localStorage.setItem(
                  "customInput",
                  JSON.stringify(JSON.parse(code))
                )
                changeCurrentError(null)
              } catch (e) {
                changeCurrentError(e.toString())
              }
              changeCurrentJSONValue(code)
            }}
            width="100%"
            height="550px"
          />
        </div>
      </div>
      {/* ========================== Json code Editor End==================================== */}

       {/* ========================= Only For Ilabel developers Start =============================== */}
       
      <div className={c.specificationArea}>
        <h2>React Image Annotate Format</h2>
        <Code language="javascript">{`
{
  taskDescription?: string, // markdown
  regionTagList?: Array<string>,
  regionClsList?: Array<string>,
  imageTagList?: Array<string>,
  imageClsList?: Array<string>,
  // all tools are enabled by default
  enabledTools?: Array< "select" | "create-point" | "create-box" | "create-polygon">,
  selectedImage?: string, // initial selected image
  images: Array<{
    src: string,
    thumbnailSrc?: string, // use this if you are using high-res images
    name: string,
    regions?: Array<{
      id: string | number,
      cls?: string,
      color?: string,
      tags?: Array<string>,

      // Point
      type: "point",
      x: number, // [0-1] % of image width
      y: number, // [0-1] % of image height

      // Bounding Box
      type: "box",
      x: number, // [0-1] % of image width
      y: number, // [0-1] % of image height
      w: number, // [0-1] % of image width
      h: number, // [0-1] % of image height

      // Polygon
      type: "polygon",
      open?: boolean, // should last and first points be connected, default: true
      points: Array<[number, number]> // [0-1] % of image width/height
    }>
  }>,
}
`}</Code>
      </div>
      {/* ========================= Only For Ilabel developers End =============================== */}

      {/* ====================== Custom code Editor start ================================ */}
      <Dialog fullScreen open={outputDialogOpen}>
        <DialogTitle>React Image Annotate Output</DialogTitle>
        <DialogContent style={{ minWidth: 400 }}>
          <MonacoEditor
            value={JSON.stringify(lastOutput, null, "  ")}
            language="javascript"
            width="100%"
            height="550px"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => changeOutputOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
      {/* ====================== Custom code Editor End ================================ */}
    </div>
  )
}

export default Editor
