import mongoose, {Schema} from "mongoose"
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true
        },
        username: {
            type: String,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        // task: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: "Task"
        //     }
        // ]
    },
    {timestamps : true}
)

userSchema.pre("save", async function(next){

    //if password is not modified , it escapes following step
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10);
    next()
})

userSchema.methods.checkPassword = async function(newPassword) {

    return await bcrypt.compare(newPassword, this.password);
}

export const User = mongoose.model("User", userSchema);