import mongoose from "mongoose";

// Declare the Schema of the Mongo model

const blogSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      numViews: {
        type: Number,
        default: 0,
      },
      isLiked: {
        type: Boolean,
        default: false,
      },
      isDisliked: {
        type: Boolean,
        default: false,
      },
      likes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
      dislikes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
      ],
  
      author: {
        type: String,
        default: "Admin",
      },
      images: [],
    },
    {
      toJSON: {
        virtuals: true,
      },
      toObject: {
        virtuals: true,
      },
      timestamps: true,
    }
  );



//Export the model
export default mongoose.model('Blogs', blogSchema);