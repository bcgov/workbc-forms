/* eslint-disable import/no-import-module-exports */
import bodyParser from "body-parser"

const helmet = require("helmet")
const cors = require("cors")
const express = require("express")

const app = express()
const morgan = require("morgan")

app.use(cors())
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

// const submissionRouter = require("./routes/submission.route")
const formTemplatesRouter = require("./routes/formTemplates.route")
const formsCreated = require("./routes/formsCreated.route")
const client = require("./routes/client.route")
const pdf = require("./routes/pdf.route")
const common = require("./routes/common.route")

app.use("/Forms", formsCreated.default)
app.use("/FormTemplates", formTemplatesRouter.default)
app.use("/Client", client.default)
app.use("/Common", common)
app.use("/", pdf.default)

const port = process.env.PORT || "8000"
app.listen(port, () => {
    console.log(`server started at :${port}`)
})

module.exports = app
