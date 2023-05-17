import React, {useState, useEffect} from 'react';
import Searchbar from './Searchbar';
import { AiOutlineMenu, AiFillYoutube } from 'react-icons/ai';
import { RiVideoUploadLine, RiAccountCircleFill } from 'react-icons/ri';
import { IoMdNotificationsOutline } from 'react-icons/io';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import DragDropFile from './DragDropFile';
import { useGlobalContext } from '../context';
import { TextField, FormControl, Select, MenuItem } from '@mui/material';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import nothumbnail from '../media/nothumbnail.jpg'


const style = {
  position: 'absolute',
  color: 'white',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60rem',
  height: '40rem',
  backgroundColor: '#282828',
  borderRadius: '5px',
  border: 'none',
  boxShadow: 24,
  p: 4,
};


const UploadFormHandler = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [uploadedThumbnail, setUploadedThumbnail] = useState(null)
  const [thumbnailPreview, setThumbnailPreview] = useState({file: null})
  const {uploadedVideo} = useGlobalContext()

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData();
        formData.append("file", uploadedVideo[0]);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("category", category);
        formData.append("thumbnail", uploadedThumbnail.selectedFile);
        console.log('this is uploaded thumbnail', uploadedThumbnail.selectedFile)
        try {
            const response = await axios({
            method: "post",
            url: "http://127.0.0.1:8000/utube/video/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
            });
        } catch(error) {
            console.log(error)
        }
}

  if (uploadedVideo.length > 0) {
    return(
      <Box sx={style} className='modal-box-styling'>
        <Typography id="modal-modal-title" variant="h5" component="h2" sx={{fontWeight: 'bold'}}>
          {title ? title : uploadedVideo[0].name}
        </Typography>
        <Box className='upload-form-box-styling'>
          <Typography id="modal-modal-title-details" variant="h5" component="h2">
            Details
          </Typography>
          <FormControl className='upload-form-styling' >
            <TextField 
            id="outlined-basic" 
            label="Title" 
            variant="outlined"
            margin="normal" 
            required 
            InputLabelProps={{className: 'textfield__label'}} 
            InputProps={{className: 'input-label'}} 
            autoComplete='off' 
            focused
            onChange={(e) => setTitle(e.target.value)}
            />
            <TextField 
            id="outlined-basic" 
            label="Description" 
            variant="outlined" 
            multiline 
            autoComplete='off' 
            margin="normal" 
            required 
            rows={5} 
            focused 
            InputLabelProps={{className: 'textfield__label'}} 
            InputProps={{className: 'input-label'}}
            onChange={(e) => setDescription(e.target.value)}
            />
            <TextField 
            id="outlined-basic" 
            label="Catergory" 
            variant="outlined" 
            select 
            margin="normal" 
            required 
            focused 
            InputLabelProps={{className: 'textfield__label'}} 
            InputProps={{className: 'input-label'}}
            onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={'GM'}>Gaming</MenuItem>
              <MenuItem value={'MV'}>Movies</MenuItem>
              <MenuItem value={'ED'}>Education</MenuItem>
              <MenuItem value={'MC'}>Music</MenuItem>
              <MenuItem value={'TE'}>Technology</MenuItem>
              <MenuItem value={'NW'}>News</MenuItem>
              <MenuItem value={'SP'}>Sports</MenuItem>
              <MenuItem value={'FB'}>Fashion & Beauty</MenuItem>
            </TextField>
            <Button
              className='upload-form-button'
              variant="contained"
              marrgin='normal'
              component="label"
            >
              Upload Thumbnail File
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  setThumbnailPreview({file: URL.createObjectURL(e.target.files[0])})
                  setUploadedThumbnail({selectedFile: e.target.files[0]})
                }}
              />
            </Button>
            <Button
            type='submit'
            onClick={handleSubmit}
            >Submit</Button>
          </FormControl>
          {thumbnailPreview['file'] ? <img src={thumbnailPreview['file']} style={{width: '16rem', height: '10rem', borderRadius:'5px', marginLeft: '3rem', marginTop:'1rem'}}/> : <img src={nothumbnail} style={{width: '16rem', height: '10rem', borderRadius:'5px', marginLeft: '3rem', marginTop:'1rem'}}/>}
          
        </Box>
      </Box>
    )
  }
  else {
    return (
      <Box sx={style} className='modal-box-styling'>
        <Typography id="modal-modal-title" variant="h5" component="h2">
          Upload Video
        </Typography>
        <DragDropFile/>
      </Box>
    )
  }
}

const Header = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {searchTerm, setSearchTerm, fetchFilteredVideos, searchValue, isHomeClicked, setIsHomeClicked, setShowDropdown} = useGlobalContext()
  const navigate = useNavigate()

  const onclick = () =>{
      setSearchTerm('')
      searchValue.current.value = ''
        // ishomeclicked is just a switch to trigger fetchfilteredvideos. the boolean value does not matter coz i am only looking out of its change of state
      setIsHomeClicked(!isHomeClicked)
  }

  useEffect(()=>{
    fetchFilteredVideos()
    setShowDropdown(false)
  }, [isHomeClicked])
  return (
    <div className='header-container'>
        <div className='header-container-left'>
            <AiOutlineMenu color='white' size={25}/>
            {/* <AiFillYoutube color='red' size={25}/> */}
            <Link to='/' style={{textDecoration: 'none', display: 'flex', alignItems: 'center'}} onClick={onclick}>
              <AiFillYoutube color='red' size={25}/>
            </Link>
        </div>

        <div className='header-container-center'>
            <Searchbar/>
            
        </div>

        <div className='header-container-right'>
            <RiVideoUploadLine color='white' size={25} cursor={'pointer'} onClick={handleOpen}/>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <UploadFormHandler/>
            </Modal>
            <IoMdNotificationsOutline color='white' size={25}/>
            <RiAccountCircleFill color='white' size={25}/>
        </div>
    </div>
  )
}

export default Header