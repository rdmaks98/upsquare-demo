import express, { Request, Response } from "express";
import { createConnection } from "typeorm";
import {
    TYPEORM_CONNECTION, TYPEORM_HOST, TYPEORM_DATABASE, TYPEORM_USER, TYPEORM_PASSWORD,
    TYPEORM_DBPORT, PORT, TYPEORM_SYNCHRONIZE, TYPEORM_LOGGING
} from "../../Config";
import {User} from "../entity"
import {Avtar} from "../entity/avtar"
const app = express();
const port = PORT || 2024;

app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`)
})

const connection = createConnection({
    type: "mysql",
    host: "localhost",
    port: 3308,
    username: "root",
    password: "",
    database: "typeormmern",
    entities:[
        User
    ],
    synchronize:false,
    logging:true
}).then(() => {
    console.log("db conn")
}).catch((err) => {
    console.log(err)
});