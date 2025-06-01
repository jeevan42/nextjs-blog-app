import { Schema, model, models } from "mongoose";

const blogSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true,
});

const Blog = models.Blog || model("Blog", blogSchema);
export default Blog;