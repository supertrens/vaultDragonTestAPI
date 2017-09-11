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
	

		newVaulDragonObject.key 	= myKey;
		newVaulDragonObject.value 	= myValue;

		//default tiem from the schema
		let time = newVaulDragonObject.time ;   


		newVaulDragonObject.save(err => {
			if(err)
				res.json({'ERROR': err});

			//If no error we send this json response the client
			res.json({key : myKey , value: myValue, timestamp : time})
		
		});
	});


/*======================= READ =====================================*/

	//**** "/vaultDragonObject" - Read all (get)
	api.get("/" , (req , res) =>{
		VaultDragonObject.find({} ,(err , vaultDragonObjects) =>{

			if(err)
				res.json({'ERROR': err});

			//Print out all the object in the db if there is no error
			res.json(vaultDragonObjects);
		});
	});




	//**** "/vaultDragonObject/:myKey" -Read 1 (get)
	api.get('/:myKey' , (req , res) => {

		// we try to get the timestamp from the query string if any
		let timestamp = req.query.timestamp;

		/*
		 * This ternaire expression is really important
		 * the variable query represents the query string that will be sent to the db.
		 * If from the url there is a query string i.e (timestamp != undefined)
		 * we will query the latest value of the given key before the given time.
		 * otherwise we just query for the latest value of the given key from the endpoint
		 */
		let query = (timestamp === undefined) ?
					{key : req.params.myKey}  :
					{key : req.params.myKey , time : {$lte : timestamp}};


		// to precise that we only need the value field
		let field = {value :1 , _id : 0  };

         //condition to have the result sorting from most recent to the latest one
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

   //not required from Vault Dragon for the test
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