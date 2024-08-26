import {Schema, model, models} from "mongoose"

const CategorySchema = Schema({
    title : {type: "string" , required : "true"},
    user: {type: Schema.Types.ObjectId, ref: "User"},

},{
    timestamps : true,
});

const Category = models.Category || model("Category", CategorySchema)


export default Category;