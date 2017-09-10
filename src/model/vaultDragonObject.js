import mongoose from "mongoose";

let Schema = mongoose.Schema;

let vaultDragonObjectSchema = new Schema({
	mykey : String ,
	 
});


module.exports = mongoose.model("VaultDragonObject" , vaultDragonObjectSchema);