import audioFileModel from "../models/audiofileschema.js"

export const uploadAudioFile = async (req, res, next) => {

    //upload audio file
    try {
        const email = req.body.email;
        const audioFileDetail = new audioFileModel({
            email: email,
            audioFileName: "Audio File Name",
            audioFilePath: "Audio File Path",
            audioFileType: "Audio File Type",
            audioFileSize: "Audio File Size"

        });

        await audioFileDetail.save();
        console.log('upload Audio File')
        
        res.status(201).send("Audio Uploaded Successfully")
    } catch (error) {
        res.status(400).send(error.message)
    }
       
}