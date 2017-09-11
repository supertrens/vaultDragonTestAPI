/*============= IMPORT FROM PACKAGES =========================*/
import http 		from 	"http";
import express 		from 	"express";
import bodyParser 	from 	"body-parser";
import mongoose 	from 	"mongoose";
import logger       from    "morgan";

/*============= IMPORT FROM INTERNAL MODULE ==================*/
import config 		from "./config";
import routes 		from "./routes";


let app = express();
app.server = http.createServer(app);


/*============== MIDDLEWARE ==================================*/
app.use(logger('dev')); //to log the path in dev

/*============== parse application json ======================*/
app.use(bodyParser.json({
	limit : config.bodyLimit
}));


/*============= PASSPORT CONFIG ==============================*/


/*============= API ENDPOINT =================================*/
app.use( routes);


/*============= LAUNCH THE SERVER ============================*/
app.server.listen(config.port);
console.log(`Server started on port ${app.server.address().port} `);


export default app;
