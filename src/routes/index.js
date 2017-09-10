/*============= IMPORT FROM PACKAGES =========================*/
import express 		from 	"express";

/*============= IMPORT FROM INTERNAL MODULES =================*/
import config 				from 	"../config";
import middleware			from 	"../middleware";
import initializeDb 		from 	"../db";
import VaultDragonObject 	from 	"../controller/vaultDragonObject";


let router = express();

/*============= CONNECT TO DATABASE ==========================*/
initializeDb(db=> {

	//internal middleware
	router.use(middleware({config , db}));

	//api endpoint v1(/v1)
	router.use("/vaultDragonObject" , VaultDragonObject({config , db}));
});


export default router;