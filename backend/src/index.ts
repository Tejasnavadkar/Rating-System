import express, {Request,Response} from "express"
import cors from "cors"
import dotenv from "dotenv"

// configures dotenv to work in your application
dotenv.config();
const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json()); // for body parsing


app.get("/", (request:Request, response:Response) => { 
  response.status(200).send("Hello World");
}); 

app.listen(PORT, () => { 
  console.log("Server running at PORT: ",PORT ); 
}).on("error", (error) => {
  // gracefully handle error
  throw new Error(error.message);
})
