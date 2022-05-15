/** @format */
const express =  require('express');
const mongoose =  require('mongoose');
const { APP_PORT, DB_URL } =  require('./config');
const errorHandler = require('./middlewares/errorHandler');
const cookieParser = require('cookie-parser');
const routes = require('./routes');
const dotenv = require("dotenv");
const port = process.env.APP_PORT || APP_PORT;
const app = express();
app.use(cookieParser());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

const cors = require("cors");
const corsOptions = {
	origin: '*',
	credentials: true,            //access-control-allow-credentials:true
	optionSuccessStatus: 200,
}

app.use(cors(corsOptions))
// database coonection

// option 1
// mongoose.connect(
//     DB_URL,
//     async(err)=>{
//         if(err) throw err;
//         console.log("conncted to db")
//     }
// )

// option 2
mongoose.connect(DB_URL, {
	// useCreatendex: true,
	// useFindAndModify: false,
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
	console.log('yes you are connecting in the database');
});

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);
app.use('/api', routes);
app.listen(port, () => {
	const url = `http://localhost:${port}/api/`;
	console.log(url);
});
