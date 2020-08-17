const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String, 
        // required: "Workout name is required",
        trim: true
    },

    exercises: 
        {
            type: Schema.Types.ObjectId,
            ref: "Exercise"
        }



    // type: {
    //     type: String,
    //     // required: "Please specify which type of workout this is",
    //     trim: true
    // },
    // weight: {
    //     type: Number,
    //     // required: "Please specify the weight used in exercise",
    //     trim: true
    // },
    // sets: {
    //     type: Number,
    //     // required: "How many sets did you perform?",
    //     trim: true
    // }, 
    // reps: {
    //     type: Number,
    //     // required: "How many repetitions in each set did you perform?",
    //     trim: true
    // }

});

const Workout = mongoose.model("Workout", WorkoutSchema);
module.exports = Workout;
