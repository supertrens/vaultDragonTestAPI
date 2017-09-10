import mongoose 			from 	"mongoose";
import {Router}  			from 	"express";
import VaultDragonObject 	from 	"../model/vaultDragonObject";
import bodyParser 			from 	"body-parser";

export default({config , db}) =>{

	let api = Router();

/*======================= CREATE ====================================*/

	//"/vaultDragonObject" -Post
	api.post("/" , (req , res) =>{

		let newVaulDragonObject = new VaultDragonObject();
		newVaulDragonObject.mykey = req.body.mykey;


		newVaulDragonObject.save(err => {
			if(err)
				res.send(err);
			res.json({key : "myKey"} , {value:req.body.mykey}, {timestamp : "the time"})
		});
	});


/*======================= READ =====================================*/

	//"/vaultDragonObject" - Read all (get)
	api.get("/" , (req , res) =>{
		VaultDragonObject.find({} ,(err , vaultDragonObjects) =>{

			if(err)
				res.send(err);
			//Print out all the object in the db if there is no error
			res.json(vaultDragonObjects);
		});
	});


	//"/vaultDragon/:id" -Read 1 (get)
	api.get('/:id' , (req , res) => {

		VaultDragonObject.findById(req.params.id , (err ,vaultDragonObject) =>{
			if(err)
				res.send(err);

			//Print out the object if there is no error
			res.json(vaultDragonObject);
		});
	});


/*======================= UPDATE =====================================*/

	//"/vaultDragon/:id"  -Put
	api.put("/:id" ,(req ,res) =>{
		VaultDragonObject.findById(req.params.id , (err ,vaultDragonObject) =>{
			if(err)
				res.send(err);

			//update the value
			vaultDragonObject.mykey = req.body.mykey;

			vaultDragonObject.save(err =>{
				if(err)
					res.send(err);

				//If no error I send the Item updated
				res.json(vaultDragonObject);
		

			});
		});
	});


	/*======================= DELETE =====================================*/
	//Not required from Vault Dragon
	api.delete("/:id" , (req , res) => {
		VaultDragonObject.remove({
			_id: req.params.id
		}, (err, vaultDragonObject) => {
			if(err)
				res.send(err);

			//send a json mesage to inform that the object has been removed
			res.json({ mesage : "Object successfully removed!"});
		});
	});


	return api;
}