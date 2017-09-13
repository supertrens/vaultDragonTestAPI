import mongoose from "mongoose";

let Schema = mongoose.Schema;

let vaultDragonObjectSchema = new Schema({
	key   : String ,
	value : String , 
	time  :  {type:Number, default: new Date().getTime()/1000} 

});


module.exports = mongoose.model("VaultDragonObject" , vaultDragonObjectSchema);