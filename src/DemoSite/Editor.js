// @flow

import React, { useEffect, useState } from "react"
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Select from "react-select"
import Code from "react-syntax-highlighter"
import Dialog from "@material-ui/core/Dialog"
import DialogTitle from "@material-ui/core/DialogTitle"
import DialogContent from "@material-ui/core/DialogContent"
import DialogActions from "@material-ui/core/DialogActions"
import MonacoEditor from "react-monaco-editor"


// import ImageUploading from './image_loading'
import LocalRendring from './localstorage_rendering'
import Header from '../header'
import logo_f from '../Images/i-label-white.png'
import { Link } from "react-router-dom"
const img0 = require('../Images/image0.jpg')
const img1 = require('../Images/image1.jpg')
const img2 = require('../Images/image2.jpg')
const img3 = require('../Images/image3.jpeg')
const img4 = require('../Images/annotationgif.gif')
const img5 = require('../Images/i-label.png')

/**
* 
* @param { Data set in LocalStorage } e 
*/


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
  select: { fontSize: 14, color: 'black', marginLeft: '80px' },
  // width: 200,
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
  "Bounding Box": () => ({
    taskDescription: "Annotate each image according to this _markdown_ specification.",
    regionTagList: ["Id-1", "Id-2", "Id-3", "Id-4", "Id-5"],
    regionClsList: JSON.parse(localStorage.getItem('Class')),
    enabledTools: ["select", "create-box"],
    showTags: true,
    images: JSON.parse(localStorage.getItem('Url')),
  }),
  "Segmentation": () => ({
    taskDescription:
      "Annotate each image according to this _markdown_ specification.",
    // regionTagList: ["Tag1","Tag2","Tag3","Tag4","Tag5"],
    regionClsList: JSON.parse(localStorage.getItem('Class')),
    enabledTools: ["select", "create-polygon"],
    images: JSON.parse(localStorage.getItem('Url')),
  }),
  // Custom: () => loadSavedInput(),
}

const Editor = ({ onOpenAnnotator, lastOutput }: any) => {
  const c = useStyles()
  const [currentError, changeCurrentError] = useState()
  const [selectedExample, changeSelectedExample] = useState(
    window.localStorage.getItem("customInput")
      ? "Custom"
      : "Bounding Box"
  )
  const [isDisabled, setisDisabled] = useState(false)
  let data = localStorage.getItem('Url');
 
  const [outputDialogOpen, changeOutputOpen] = useState(false)
  const [currentJSONValue, changeCurrentJSONValue] = useState(JSON.stringify(examples[selectedExample](), null, "  "))
   
  return (
    <div>
      <Header />

      {/* card Section Code */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-3 col-md-3 col-12">
          </div>

          <div className="col-lg-6 col-md-6 col-12">
            <div className="card mb-2">
              <img className="card-img-top" src={img4} alt="Card image cap" />
              {/* <div className="card-body">
               </div> */}
              <div className="card-body">
                <div className="mt-1 mb-1">
                  <h5 className="card-title"><img src={img5} width="30%" alt="ILABEL" /> Image Annotator Tool</h5>
                  <p className="card-text text-justify">This is our Demo version of our
                  <img src={img5} width="14%" alt="ILABEL" /> Tool. If You want to use ilabel annotator software Select your favourite mode and click on open annotator.</p>
                </div>
                <div className="row ml-5 mr-5">
                  <div className="col-md-12 col-lg-12 col-sm-6">
                    <LocalRendring />
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-md-6 col-lg-6 m-0 p-0 col-sm-12">
                    <Select
                      className={c.select}
                      value={{ label: selectedExample, value: selectedExample }}
                      options={Object.keys(examples).map((s) => ({
                        label: s,
                        value: s,
                      }))}
                      onChange={(selectedOption) => {
                        console.log("Option", selectedOption)
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
                  <div className="col-md-4 col-lg-4 col-sm-12 mt-md-0 mt-5">
                    <Link style={{ background: '#009487', color: 'white' }}
                      className="btn btn_box"
                      variant="outlined"
                      disabled={isDisabled ? true: false}
                      // disabled={Boolean(currentError)}
                      onClick={() => {
                        onOpenAnnotator(
                          selectedExample === "Custom"
                            ? loadSavedInput()
                            : examples[selectedExample]
                        )
                      }}
                    >
                      Open Annotator
                          <i className="fa fa-edit pl-2"></i>
                    </Link>
                  </div>
                </div>


              </div>
            </div>

          </div>
          <div className="col-lg-3 col-md-3 col-12">
          </div>

        </div>
      </div>
    </div>
  )
}

export default Editor
