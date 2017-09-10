/*============= IMPORT FROM PACKAGES =========================*/
import express 		from 	"express";

/*============= IMPORT FROM INTERNAL MODULES =================*/
import config 		from 	"../config";
import middleware	from 	"../middleware";
import initializeDb from 	"../db";


let router = express();

/*============= CONNECT TO DATABASE ==========================*/
initializeDb(db=> {

	//internal middleware
	router.use(middleware({config , db}));

	//api endpoint object1(/object1)
});


export default router;