import * as express from 'express';
import { sync as glob } from 'glob';
import * as cors from "cors";
import * as cookieParser from "cookie-parser";
import * as session from "express-session";
import * as fileUpload from "express-fileupload";
import * as path from "path";

export const app = express();

export const init = (endpointFiles: string) => {
	app.use((req, res, next) => {
		console.log('New Inbound HTTP Request', {
			proto: req.connection.encrypted ? 'https' : 'http',
			method: req.method,
			path: req.path,
		});

		next();
	});

	app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE", "UPDATE"],
      credentials: true,
    })
  );

	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(cookieParser());

	// serving files
  app.use(express.static(path.join(__dirname, 'public')));

	// session config
	app.use(
    session({
      secret: "subscribe", // TODO: move to .env
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 24,
      },
    })
  );

	// file upload
  app.use(
    fileUpload()
  );

	// Load in all the endpoints
	glob(endpointFiles).forEach((file) => {
		console.log('file', file);
		require(file);
	});

	// Finally, have the server start listening
	app.listen(3001, () => {
		console.log(`HTTP server listening`, {
			address: '0.0.0.0',
			port: 3001
		});
	});
};