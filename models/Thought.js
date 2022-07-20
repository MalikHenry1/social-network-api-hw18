const { Schema, model } = require("mongoose");
const requireSchema = require("./Reaction");

// Schema for Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            max_length: 200,
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now(),
            get: dateFormat,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema]
    },
    {
    toJSON: {
        virtuals: true,
        getters: true,
    },
}
);

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

// A function which takes in a given date and reformats it as a string
function dateFormat(date) { 
    const stringDate = date.toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return stringDate;
}

const Thought = model("thought", thoughtSchema);

module.exports = Thought;