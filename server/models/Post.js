import mongoose from "mongoose";

const postSchema = mongoose.Schema(
    {
      userId: {
        type: String,
        required: true,
      },
      FirstName: {
        type: String,
        required: true,
      },
      LastName: {
        type: String,
        required: true,
      },
      location: String,
      desciption: String,
      picturePath: String,
      userPicturePath: String,
      likes:{
        type: Map,
        of : Boolean,
      },
      comments:{
        types: Array,
        default: []
      },
    },
    {timestamps: true}
)
const Post = mongoose.model("Post",postSchema)

export default Post;