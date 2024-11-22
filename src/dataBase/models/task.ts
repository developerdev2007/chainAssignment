import { Schema, Document, model } from "mongoose";

interface ITask extends Document {
    taskName: string;
    title: string;
    description: string;
    isCompleted: boolean;
}

const schema = new Schema<ITask>({
    taskName: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

export const Task = model<ITask>("Task", schema);