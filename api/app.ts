/* eslint-disable import/no-import-module-exports */
import bodyParser from "body-parser"

const helmet = require("helmet")

const express = require("express")

const app = express()
const morgan = require("morgan")

app.use(morgan("[:date] :method :url :status :res[content-length] - :remote-addr - :response-time ms"))
app.set("trust proxy", "loopback, linklocal, uniquelocal")

app.use(express.json({ limit: "6mb" }))
app.use(express.urlencoded({ extended: false }))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "form-action": ["'none'"],
        "style-src": ["'none'"],
        "font-src": ["'none'"]
    }
}))

const submissionRouter = require("./routes/submission.route")

app.use("/forms", submissionRouter.default)

const port = process.env.PORT || "8000"
app.listen(port, () => {
    console.log(`server started at :${port}`)
})

module.exports = app
