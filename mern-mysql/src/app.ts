import express from "express";
import Logger from "../Config/Logger";
import "./Database";
import { PORT } from "../Config";
import { userRoutes,authenticationRoutes } from "./Routes";
import { avtarRoutes } from "./Routes/"
import { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } from "../Config";
import cors from "cors";
import errorDetails from "./Middleware/error";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
const app = express();
const NAMESPACE = "SERVER";
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({ useTempFiles: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', avtarRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1', authenticationRoutes);


// todo:  Middleware for Error
app.use(errorDetails);

process.on("uncaughtException", (error: any) => {
  console.log(
    `Shutting down the server due to uncaught exception:${error.message}`
  );
  process.exit(1);
});



let cname = CLOUD_NAME as string;
let ckey = CLOUD_API_KEY as string;
let csecret = CLOUD_API_SECRET as string;

// Cloudinary Configuration
//@ts-ignore
cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

let port = "2020";
let server = app.listen(port, () => {
  Logger.info(NAMESPACE, `Server Listing At http://localhost:${port}`);
})


process.on("unhandledRejection", (error: any) => {
  console.log(
    `Shutting down the server due to unhandled promise rejection  : ${error.message}`
  );
  // @ts-ignore
  server.close(() => {
    process.exit(1);
  });
});
