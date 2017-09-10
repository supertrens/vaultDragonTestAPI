import mongoose 			from "mongoose";
import {Router}  			from "express";
import VaultDragonObject 	from "../model/vaultDragonObject";
import bodyParser 			from "body-parser";

export default({config , db}) =>{

	let api = Router();

	//"/v1/vaultDragonObject/add"
	api.post("/add" , (req , res) =>{

		let newVaulDragonObject = new VaultDragonObject();
		newVaulDragonObject.name = req.body.name;


		newVaulDragonObject.save(err => {
			if(err)
				res.send(err);
			res.json({message : "New object added"})
		});
	});



	return api;
}