import React, { useEffect, useState } from 'react'
import FormAudioCutter from '../Form/FormAudioCutter'
import ListGroup from 'react-bootstrap/ListGroup';
import ReactAudioPlayer from 'react-audio-player';
import { useSelector} from 'react-redux'
import axios from 'axios';
const AudioCutter = () => {

  const [audioFiles, setAudioFiles] = useState([]);
  
  
  const getAudioFiles = () => {
    axios.get("http://localhost:5000/files/getaudiofiles")
    .then((response) => {
      //console.log(response.data)
      setAudioFiles(response.data)
    }).catch(error => {
      console.log(error)
    })
  }
useEffect(() => {
  getAudioFiles();
}, [<FormAudioCutter/>])
  
  return (
    <>
      <h2>Audio Cutter</h2>
      <FormAudioCutter/>
      <br/>
     
      <ListGroup>
        {audioFiles.map((audioFile) => (
          <ListGroup.Item>
            {audioFile.audioFileName}
            
            <br/>
            <ReactAudioPlayer
              src={audioFile.audioFilePath}
              autoPlay
              controls
            />
          </ListGroup.Item>

        ))}
       
      </ListGroup>
    </>
  )
}

export default AudioCutter
