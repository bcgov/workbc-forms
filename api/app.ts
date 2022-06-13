/* eslint-disable import/no-import-module-exports */
import bodyParser from "body-parser"

const helmet = require("helmet")
const cors = require("cors")
const express = require("express")
const Keycloak = require("keycloak-connect")

const app = express()
const morgan = require("morgan")

const kcConfig = {
    clientId: process.env.AUTH_KEYCLOAK_CLIENT,
    bearerOnly: process.env.AUTH_KEYCLOAK_BEARER_ONLY,
    serverUrl: process.env.AUTH_KEYCLOAK_SERVER_URL,
    realm: process.env.AUTH_KEYCLOAK_REALM
}

console.log(kcConfig)

const keycloak = new Keycloak({}, kcConfig)

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
app.use(keycloak.middleware())

// const submissionRouter = require("./routes/submission.route")
const formTemplatesRouter = require("./routes/formTemplates.route")
const formsCreated = require("./routes/formsCreated.route")
const client = require("./routes/client.route")
const provider = require("./routes/provider.route")
const pdf = require("./routes/pdf.route")
const common = require("./routes/common.route")

app.use("/Provider", provider.default)
app.use("/Client", client.default)
app.use("/Common", common.default)
app.use("/Forms", keycloak.protect(), formsCreated.default)
app.use("/FormTemplates", keycloak.protect(), formTemplatesRouter.default)
//app.use("/", keycloak.protect(), pdf.default)

const port = process.env.PORT || "8000"
app.listen(port, () => {
    console.log(`server started at :${port}`)
})

module.exports = app
