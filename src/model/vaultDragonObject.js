import mongoose from "mongoose";

let Schema = mongoose.Schema;

let vaultDragonObjectSchema = new Schema({
	name : String 
});


module.exports = mongoose.model("VaultDragonObject" , vaultDragonObjectSchema);