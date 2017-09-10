import mongoose 			from "mongoose";
import {Router}  			from "express";
import VaultDragonObject 	from "../model/vaultDragonObject";

export default({config , db}) =>{

	let api = Router();

	//"/v1/restaurant/add"
	api.post("/add" , (req , res) =>{

		let newVaulDragonObject = new VaultDragonObject();
		newVaulDragonObject.name = req.body.name;
	})
}