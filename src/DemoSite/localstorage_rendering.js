import React, { Component } from 'react'
import { NotificationContainer, NotificationManager } from 'react-notifications';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
class LocalRendring extends Component {
    fileObj = [];
    typeObj = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [],
            imageFiles: [],
            classes: [],
            class_type: [],
            inputToken: '',
            inputTag: [],
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.customChanging = this.customChanging.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addToken = this.addToken.bind(this);
    }
    /**
     * 
     * @param {upload multiple file in array } e 
     */

    uploadMultipleFiles(e) {
        const { file } = this.state
        let fileArray = []
        this.fileObj.push(e.target.files)
        let data = e.target.files
        for (let i = 0; i < data.length; i++) {
            fileArray.push(URL.createObjectURL(data[0]))
        }
        this.setState({
            file: fileArray
        })
    }
    /**
     * 
     * @param { Data set in LocalStorage } e 
     */

    customChanging() {
        var len = localStorage.length
        const { imageFiles, file } = this.state
        let fileChange = file[0].substr(5)
        console.log('111', fileChange)
        let file_str = file[0].substr(54)
        imageFiles.push({ src: file, name: `image:${file_str}` })
        console.log("the length is ", len)
        if(len == 1){
            NotificationManager.error('No space more')
       
        }
        else{
            localStorage.setItem('Url', JSON.stringify(imageFiles))
            console.log('imageFiles', imageFiles)
        }
        
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    addToken(e) {
        if (e.key === "Enter") {
            const { inputTag, inputToken } = this.state
            if (inputTag.indexOf(inputToken) !== -1) {
                NotificationManager.error('This Class already exist. Please insert another class', 'Try again!')
                // alert('Class alredy exists')
            }
            else if (inputToken !== "") {
                inputTag.push(inputToken)
                console.log('array List', inputTag)
                localStorage.setItem("Class", JSON.stringify(inputTag))
                this.setState({
                    inputTag,
                    inputToken: ''
                })
            }
        }
    }

    removeTag(tag) {
        const { inputTag } = this.state
        var removeItem = inputTag.indexOf(tag)
        inputTag.splice(removeItem, 1);
        this.setState({
            inputTag
        })
    }


    render() {
        const { inputTag, inputToken } = this.state;
        return (
            <div>
                <div className="row mt-5">
                    <div className="col-md-12">
                        <div className="tokenfield form-control" >
                            <input type="text" className="form-control tokenfield" style={{ position: 'absolute', left: '-10000px' }} />
                            <input type="text" style={{ position: 'absolute', left: '-10000px' }} />
                            <input
                                type="text"
                                className="token-input"
                                name='inputToken'
                                value={inputToken}
                                onKeyPress={this.addToken}
                                onChange={this.handleInputChange}
                                placeholder="opt... "
                            // style={{minWidth: '100%, width: '100%', color: '#000000' }}
                            />
                            {
                                inputTag.map((tag, idx) => (
                                    <div className="token input-btn-theme" style={{ background: 'black', color: 'white' }} key={idx}>
                                        <span className="token-label" style={{ maxWidth: '726.891px' }}>{tag}</span>
                                        <a className="close text-white" onClick={this.removeTag.bind(this, tag)} >×</a>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>

                <div className="row mt-5 m-0 p-0">
                    <div className="col-md-6 col-lg-6 col-sm-12">
                        {/* <div className="form-group"> */}
                        {/* <input type="file" className="pb-4" aria-describedby="inputGroupFileAddon01" onChange={this.uploadMultipleFiles} multiple="multiple" required/> */}
                        <input type="file" className="custom-file-input" id="validatedCustomFile" multiple onChange={this.uploadMultipleFiles} required />
                        {/* <CloudUploadIcon/> */}
                        <label className="custom-file-label" for="validatedCustomFile"><i className="fa fa-upload pr-5" style={{ color: 'black', fontSize: '20px' }}></i></label>
                    </div>
                    <div className="col-md-4 col-lg-4 col-sm-12 mt-md-0 mt-5">
                        <button type="button" className="btn btn_box" style={{ background: 'rgb(0, 148, 135)', color: 'white' }} onClick={this.customChanging}>Upload<i className="fa fa-paper-plane"></i></button>
                    </div>
                </div>
                <NotificationContainer />
            </div>
        )
    }
}

export default LocalRendring;



{/* ===============================
                       Store Classes Name in State
                     =============================== */}
{/* <div className="row border border-white shadow-lg ">
                    <div className="col-md-8 col-lg-8 col-sm-12 p-2 ">
                        <input type="text" className="form-control " name="classes" value={this.state.classes} onChange={this.uploadInputFiles} placeholder="Enter Class" />
                    </div>

                    <div className="col-md-4 col-lg-4 col-sm-12 mt-md-0 mt-5 p-2">
                        <button type="button" className="btn btn-block" style={{ background: 'rgb(0, 148, 135)', color: 'white' }} onClick={this.typeChanging}>Upload<i className="fa fa-file-text pl-2"></i></button>

                    </div>
                    <div className="p-2">
                        {
                            this.state.class_type.map((type, ind) => {
                                return (<span class="badge text-white ml-2" style={{ background: 'black' }} key={ind}>{type}</span>)
                            })
                        }
                    </div>
                </div> */}
{/* ============ Basic Operations =================
                uploadInputFiles(e) {
                    let type = e.target.value;
                    // let typeArray = []
                    this.typeObj.push(type)
                    this.setState({ classes: type })
                    console.log("the file type is", this.state.classes)
                }
                typeChanging() {
                    const { class_type, classes } = this.state
                    class_type.push(classes)
                    localStorage.setItem('Type', JSON.stringify(class_type))
                    console.log('typeChange', class_type)
                } */}