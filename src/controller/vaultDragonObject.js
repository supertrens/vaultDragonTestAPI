import mongoose 			from 	"mongoose";
import {Router}  			from 	"express";
import VaultDragonObject 	from 	"../model/vaultDragonObject";
import bodyParser 			from 	"body-parser";

export default({config , db}) =>{

	let api = Router();

/*======================= CREATE ====================================*/

	//"/vaultDragonObject" -Post
	api.post("/" , (req , res) =>{

		let newVaulDragonObject 	= new VaultDragonObject();

		//Take the current key
		let myKey = Object.keys(req.body)[0];
		//take the value of the dynamic key
		let myValue = req.body[myKey];
		//timestamp
		let time = Date.now();

		newVaulDragonObject.key 	= myKey;
		newVaulDragonObject.value 	= myValue;
		newVaulDragonObject.time    = time;


		newVaulDragonObject.save(err => {
			if(err)
				res.json({'ERROR': err});

			res.json({key : myKey , value: myValue, timestamp : time})
		
		});
	});


/*======================= READ =====================================*/

	//"/vaultDragonObject" - Read all (get)
	api.get("/" , (req , res) =>{
		VaultDragonObject.find({} ,(err , vaultDragonObjects) =>{

			if(err)
				res.json({'ERROR': err});
			//Print out all the object in the db if there is no error
			res.json(vaultDragonObjects);
		});
	});


//"/vaultDragonObject/:myKey?timestamp" 
	api.get("/:myKey?timestamp" , (req ,res ) =>{

	    //the query from the key in the Url
		let query = {key : req.params.myKey};
		let time  = req.params.timestamp;

		console.log("The time" +time);

		//to precise that I only need the value field
		let field = {value :1 , _id : 0  };
	});


	//"/vaultDragonObject/:myKey" -Read 1 (get)
	api.get('/:myKey' , (req , res) => {

		//the query from the key in the Url
		let query = {key : req.params.myKey};

		//to precise that I only need the value field
		let field = {value :1 , _id : 0  };

		let mySort = {time : -1};

	
		

		VaultDragonObject.findOne(query, field).sort(mySort).exec (function (err ,vaultDragonObject){
			if(err)
				res.json({'ERROR': err});

			//Print out the object if there is no error
			//res.json({value :vaultDragonObject.value});
			res.json(vaultDragonObject);
		});
	});


	



/*======================= UPDATE =====================================*/

	//"/vaultDragon/:id"  -Put
	api.put("/:id" ,(req ,res) =>{
		VaultDragonObject.findById(req.params.id , (err ,vaultDragonObject) =>{
			if(err)
				res.json({'ERROR': err});

			//update the value
			vaultDragonObject.mykey = req.body.mykey;

			vaultDragonObject.save(err =>{
				if(err)
					res.json({'ERROR': err});

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
				res.json({'ERROR': err});

			//send a json mesage to inform that the object has been removed
			res.json({ mesage : "Object successfully removed!"});
		});
	});


	return api;
}