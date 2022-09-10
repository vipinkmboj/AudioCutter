import audioFileModel from "../models/audiofileschema.js"

export const uploadAudioFile = async (req, res, next) => {

    //upload audio file
    try {
        //const email = req.body.email;
        const date = new Date();
        const fullYear = date.getFullYear();
        const fullMonth = date.getMonth();
        const dateOnly = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliSeconds = date.getMilliseconds();

        const audioFileDetail = new audioFileModel({
            email: '',//email,
            audioFileName: `${fullYear}/${fullMonth}/${dateOnly}_${hours}:${minutes}:${seconds}:${milliSeconds}_${req.file.originalname}`,//"Audio File Name",
            audioFilePath: req.file.path,//"Audio File Path",
            audioFileType: req.file.mimetype,//"Audio File Type",
            audioFileSize: fileSizeFormatter(req.file.size, 2)//"Audio File Size"

        });

        await audioFileDetail.save();        
        
        res.status(201).send("Audio Uploaded Successfully")
    } catch (error) {
        res.status(400).send(error.message)
    }
       
}


export const getAudioFiles = async (req, res, next) => {

    //upload audio file
    try {
        const audioFiles = await audioFileModel.find();       
        
        res.status(201).json(audioFiles)
    } catch (error) {
        res.status(400).json(error.message)
    }
       
}

//file size formatter...
export const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB']
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];
}   