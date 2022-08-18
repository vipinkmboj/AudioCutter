import express from 'express';

import { uploadAudioFile } from '../controllers/files.js'

import { audioUpload } from '../helpers/audiofilehelper.js';
const router = express.Router();

//upload audio file
router.post('/uploadaudiofile', audioUpload.single('audioFile'), uploadAudioFile)


export default router