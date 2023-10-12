import mongoose from "mongoose";

export const validdateMongoDbId = (id) => {
    const isVaild = mongoose.Types.ObjectId.isValid(id);
    if(!isVaild) throw new Error ("This id is not Vaild or Not Found")
}