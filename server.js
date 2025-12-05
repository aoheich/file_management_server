import express from "express"
import router from "./src/routes/routes.js"
import { errhandler } from "./src/utils/errHandler.js"

const port = process.env.PORT

const app = express()
app.use(express.json())
app.use(errhandler)
app.use("/api", router)

app.listen(port, () => {
    console.log(`Running on PORT: ${port}`)
})