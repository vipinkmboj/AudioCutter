import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import ProgressBar from 'react-bootstrap/ProgressBar';

import axios from 'axios';
const FormAudioCutter = () => {

  const [email, setEmail] = useState('');
  const [audioFile, setAudioFile] = useState('');
  const [message, setMessage] = useState(null);

  const [audioFileName, setAudioFileName ] = useState(null);
  const [audioFileSize, setAudioFileSize] = useState(null);
  //progress bar
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const options = {
    onUploadProgress: (progressEvent) => {
      const {loaded, total} = progressEvent;
      let percent = Math.floor((loaded * 100) / total );
      console.log(`${loaded}kb of ${total}kb | ${percent}%`)

      if(percent < 100) {
        setUploadPercentage(percent)
      }
    }
  }
  //selectAudio  
  const uploadAudioFile = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    //formData.append('email', email);
    formData.append('audioFile', audioFile)

    //upload formData    
    //axios.post("http://localhost:5000/files/uploadaudiofile", formData, options).then(res => {

    if(formData.get('audioFile').size > 50000000) {
      setMessage("File Size must be equal to or less than 50mb")     

    } else if(formData.get('audioFile').type != 'audio/mpeg') {
      setMessage("Only mp3 files are allowed")

    } else {
      axios.post("http://localhost:5000/files/uploadaudiofile", formData, options).then(res => {

      console.log(res);
      setMessage(res.data);
      setUploadPercentage(100);
      setAudioFileName(formData.get('audioFile').name);
      setAudioFileSize(formData.get('audioFile').size)

      setTimeout(() => {
        setMessage(null);
        setUploadPercentage(0);
        setAudioFileName(null)
        setAudioFileSize(null)
      }, 4000)     
      console.log(formData.get('audioFile').size) 
      /* console.log(formData.get('audioFile'))
      console.log(formData.get('audioFile').name)
      console.log(formData.get('audioFile').size) */
      //console.log(formData.get('audioFile').type)
      
    })
    }
      
    

    //clear file input
    
  }

  return (
    <>
        <Form>
         {/* <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Email..." 
              style={{width: '80%', margin: 'auto'}}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />        
          </Form.Group>  */}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Upload Audio (mp3 only)</Form.Label>
            <Form.Control 
              type="file" 
              placeholder="Upload Audio" 
              style={{width: '80%', margin: 'auto'}}
              name="audioFile"
              accept='audio/*'
              //value={audioFile}
              onChange={(e) => setAudioFile(e.target.files[0]) }              
              />
            <Form.Text className="text-muted">
              We'll never share your Audio with anyone else.
            </Form.Text>
          </Form.Group>
          <br/>      
          <strong>{ message }</strong>          
          <br/>
          {uploadPercentage > 0 && 
          <ProgressBar 
            style={{width: '80%', height: '2rem', margin: 'auto'}}
            now={uploadPercentage} 
            active
            label={`${uploadPercentage}%`}
          />
          }
          {audioFileName !== null ? (
            <>
            <div>
              <strong>File Name: </strong> {audioFileName}
            </div>
            <div>
              <strong>File Size: </strong> {audioFileSize}
            </div>
            </>
          ) : (
            null
          )}
          <Button 
            id='upload-button'
            variant="primary" 
            className='m-3' 
            onClick={uploadAudioFile}
            disabled={audioFile == '' ? true : false }
          >
            Upload Audio
          </Button>
          {/* <Button variant="primary" type="submit" className='m-3'>
            Split Audio
          </Button>
          <Button variant="danger" type="button">
            Cancel
          </Button> */}

    </Form>
   
    </>
    
    
  )
}

export default FormAudioCutter
