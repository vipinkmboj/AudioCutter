import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import axios from 'axios';
const FormAudioCutter = () => {

  const [email, setEmail] = useState('');
  const [audioFile, setAudioFile] = useState('');

  const uploadAudioFile = async (e) => {

    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('audioFile', audioFile)

    //upload formData
    console.log(formData)
    axios.post("http://localhost:5000/files/uploadaudiofile", formData)
  }

  return (
    <>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Enter Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Email..." 
              style={{width: '80%', margin: 'auto'}}
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              />        
          </Form.Group> 
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Upload Audio (mp3 only)</Form.Label>
            <Form.Control 
              type="file" 
              placeholder="Upload Audio" 
              style={{width: '80%', margin: 'auto'}}
              name="audioFile"
              accept='audio/*'
              //value={audioFile}
              onChange={(e) => setAudioFile(e.target.files[0])}
              />
            <Form.Text className="text-muted">
              We'll never share your Audio with anyone else.
            </Form.Text>
          </Form.Group>      
            
          <Button variant="primary" className='m-3' onClick={uploadAudioFile}>
            Upload Audio
          </Button>
          <Button variant="primary" type="submit" className='m-3'>
            Split Audio
          </Button>
          <Button variant="danger" type="button">
            Cancel
          </Button>

    </Form>
   
    </>
    
    
  )
}

export default FormAudioCutter
