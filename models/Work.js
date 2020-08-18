const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: Date,

    exercises: [
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }
    ],

    totalDuration: {
        type: Number,
        default: 0
    }
});

const Work = mongoose.model("Work", WorkoutSchema);
module.exports = Work; 
