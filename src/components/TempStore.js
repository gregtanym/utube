import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { MdUpload } from 'react-icons/md';
import axios from "axios";

import {useDropzone} from 'react-dropzone';


const DragDropFile = () => {
        // drag state
    const [dragActive, setDragActive] = React.useState(false);
    // ref
    const inputRef = React.useRef(null);
    const [selectedFile, setSelectedFile] = React.useState(null);
    
    // handle drag events
    const handleDrag = function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
        } else if (e.type === "dragleave") {
        setDragActive(false);
        }
    };
    
    // triggers when file is dropped
    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        localStorage.fileuploaded = e.target.files;
        // handleFiles(e.dataTransfer.files);
        console.log('file detected!')
        }
    };
    
    // triggers when file is selected with click
    const handleChange = async (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            console.log('file detected with click!')
            setSelectedFile(e.target.files[0])
            console.log(selectedFile)
            const data = new FormData()
            data.append('file', selectedFile)
            try {
                const response = await axios({
                  method: "post",
                  url: "http://127.0.0.1:8000/utube/video/upload",
                  data: data,
                  headers: { "Content-Type": "multipart/form-data" },
                });
              } catch(error) {
                console.log(error)
            }
        }
    };

    function getFile() {
        console.log('file incoming')
        console.log(selectedFile)
    }
    
    // triggers the input when the button is clicked
    const onButtonClick = () => {
        inputRef.current.click();
    };
    
    return (
        <Box className='upload-box-styling'>
            <form id="form-file-upload" onDragEnter={handleDrag} onSubmit={(e) => e.preventDefault()}>
                <input ref={inputRef} type="file" id="input-file-upload" onChange={handleChange} />
                <label id="label-file-upload" htmlFor="input-file-upload" className={dragActive ? "drag-active" : "" }>
                    <div className='upload-box-styling'>
                        <div className='upload-icon-styling'>
                            <MdUpload size={80} style={{opacity: '0.7'}}/>
                        </div>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Drag and drop video files to upload
                        </Typography>
                        <Button variant='contained' style={{marginTop: '1rem'}} className="upload-button" onClick={onButtonClick}>SELECT FILES</Button>
                    </div> 
                </label>
                { dragActive && <div id="drag-file-element" onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}></div> }
            </form>
            <button onClick={getFile}>get file again</button>
        </Box>
    );
}

export default DragDropFile