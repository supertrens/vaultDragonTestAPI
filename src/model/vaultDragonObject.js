import mongoose from "mongoose";

let Schema = mongoose.Schema;

let vaultDragonObjectSchema = new Schema({
	key   : String ,
	value : String , 
	time  :  {type:Number, default: Math.round(new Date().getTime()/1000)} 

});


module.exports = mongoose.model("VaultDragonObject" , vaultDragonObjectSchema);