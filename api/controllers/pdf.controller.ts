import * as express from "express"
import axios, { AxiosError, AxiosResponse } from "axios"
import getToken from "../services/common.service"

const generatePDF = async (req: any, res: express.Response) => {
    try {
        // first need to get a token using the Common Services account //
        const token: String = await getToken()
        console.log(token)

        // once we have the token, set up the template input and call the CDOGS render template endpoint //
        const templateParams = {
            firstName: "",
            lastName: "",
            caseNumber: 1,
            clientData: "Lorem Ipsum"
        }

        const templateConfig = {
            data: templateParams,
            // eslint-disable-next-line max-len
            formatters: "{\"myFormatter\":\"_function_myFormatter|function(data) { return data.slice(1); }\",\"myOtherFormatter\":\"_function_myOtherFormatter|function(data) {return data.slice(2);}\"}",
            options: {
                cacheReport: false,
                convertTo: "pdf",
                overwrite: true,
                reportName: "Sample_form.pdf"
            }
        }

        const templateHash = ""

        const cdogsResponse = await axios(
            { // need to use axios like this as otherwise it won't accept the Authorization header
                method: "post",
                url: `${process.env.CDOGS_URL}template/${templateHash}/render`,
                data: templateConfig,
                responseType: "arraybuffer",
                headers:
                    {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                        "Accept-Encoding": "gzip, deflate, br",
                        Accept: "application/pdf",
                        Connection: "keep-alive"
                    }
            }
        )
        res.setHeader("Content-Disposition", "attachment; filename=sample.pdf")
        console.log(cdogsResponse)
        return res.status(200).send(cdogsResponse.data)
    } catch (e: any) {
        console.log(e)
        throw new Error(e.response?.status)
    }
}

export default generatePDF
