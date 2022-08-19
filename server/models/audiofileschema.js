import mongoose from "mongoose";

const audioFileSchema = mongoose.Schema({
        email: {
            type: String,
            //required: true
        },        
        audioFileName: {
            type: String,
            required: true
        },
        audioFilePath: {
            type: String,
            required: true
        },
        audioFileType: {
            type: String,
            required: true
        },
        audioFileSize: {
            type: String,
            required: true
        },        
        
},
    {timestamps: true}
);

const audioFileModel = mongoose.model('audiofiles', audioFileSchema);

export default audioFileModel;



