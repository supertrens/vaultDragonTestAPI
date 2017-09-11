import mongoose from "mongoose";

let Schema = mongoose.Schema;

let vaultDragonObjectSchema = new Schema({
	key   : String ,
	value : String , 
	time  : Date 

});


module.exports = mongoose.model("VaultDragonObject" , vaultDragonObjectSchema);