import mongoose  from "mongoose";


async function main() {

    try{
    await mongoose.connect("mongodb://127.0.0.1:27017/auth");
    mongoose.set("debug", true);

    const userSchema = new mongoose.userSchema({
        username : {type: "String", required:true},
        password : {type : "String", required : true},
        lastLoginAt:{type : "date", default : date.now()}
    },{
        Timestamp:true,
    })


}catch(error){
console.error("error : ", error);
}finally{
    process.exit();
}
}