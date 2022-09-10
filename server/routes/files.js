import express from 'express';

import { uploadAudioFile, getAudioFiles } from '../controllers/files.js'

import { audioUpload } from '../helpers/audiofilehelper.js';
const router = express.Router();

//upload audio file
router.post('/uploadaudiofile', audioUpload.single('audioFile'), uploadAudioFile)

//get audiofiles
router.get("/getaudiofiles", getAudioFiles)

export default router