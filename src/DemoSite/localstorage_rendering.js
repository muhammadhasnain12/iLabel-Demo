import React, { Component } from 'react'

class LocalRendring extends Component {
    fileObj = [];
    // fileArray = [];

    constructor(props) {
        super(props)
        this.state = {
            file: [],
            imageFiles: []
        }
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.customChanging = this.customChanging.bind(this)
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
        // this.setState({ file }, () => {

        // })
        this.setState({
            file: fileArray
        })
    }
    /**
     * 
     * @param { Data set in LocalStorage } e 
     */

    customChanging() {
        const { imageFiles, file } = this.state
        let fileChange = file[0].substr(5)
        console.log('111', fileChange)
        let file_str = file[0].substr(54)
        imageFiles.push({ src: file, name: `image:${file_str}` })
        localStorage.setItem('Url', JSON.stringify(imageFiles))
        console.log('imageFiles', imageFiles)
    }
    
    render() {
        return (    
            <form>
                <div className="form-group">
                    <input type="file" className="form-control pb-4" onChange={this.uploadMultipleFiles} multiple required/>
                    {/* <input type="file" className="custom-file-input fa fa-upload" id="validatedCustomFile" multiple onChange={this.uploadMultipleFiles} required /> */}
                    {/* <label className="custom-file-label fa fa-upload" for="validatedCustomFile">Choose file...</label> */}
                    {/* <div class="invalid-feedback">Example invalid custom file feedback</div> */}
                </div>
                <button type="button" className="btn btn-block" style={{background: 'rgb(0, 148, 135)', color: 'white'}} onClick={this.customChanging}><i className="fa fa-upload mr-2"></i>Upload</button>
            </form >

        )
    }
}

export default LocalRendring;
