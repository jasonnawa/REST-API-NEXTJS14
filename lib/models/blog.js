import {Schema, model, models} from "mongoose"


const blogSchema = Schema({
    title : {type: "string", required: true},
    description : {type : "string"},
    user : {type : Schema.Types.ObjectId, ref: "User"},
    category : {type : Schema.Types.ObjectId,ref : "Category"}
},
{
    timestamps : true,
})

const Blog = models.Blog || model("Blog", blogSchema)

export default Blog;