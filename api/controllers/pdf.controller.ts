import * as express from "express"
import axios, { AxiosError, AxiosResponse } from "axios"
import { getToken } from "../services/common.service"
import { getCreatedFormsSubmission } from "../services/formsCreated.service"
import { getSubmission } from "../services/submissions.service"

const generatePDF = async (req: any, res: express.Response) => {
    try {
        console.log(req)
        const { id } = req.params
        console.log("FORM KEY IS")
        console.log(id)
        const formData = await getCreatedFormsSubmission(id)
        console.log((formData))
        if (!formData.clientApiKey) {
            return res.status(500).send("Internal Server Error")
        }
        const formId = new URL(formData.clientUrl).searchParams.get("f") || ""
        const submissionData = await getSubmission(formId, formData.clientApiKey, formData.clientSubmissionId)
        console.log(submissionData)
        // first need to get a token using the Common Services account //
        const token: String = await getToken()
        // console.log(token)
        const { data } = submissionData.submission.submission
        console.log(data)

        const templateConfig = {
            data: data,
            // eslint-disable-next-line max-len
            formatters: "{\"myFormatter\":\"_function_myFormatter|function(data) { return data.slice(1); }\",\"myOtherFormatter\":\"_function_myOtherFormatter|function(data) {return data.slice(2);}\"}",
            options: {
                cacheReport: false,
                convertTo: "pdf",
                overwrite: true,
                reportName: `${formData.code}_${data.firstName}_${data.lastName}.pdf`
            }
        }
        let templateHash = ""
        if (formData.formLanguage.toUpperCase() === "EN") {
            templateHash = formData.pdfHash
        } else if (formData.formLanguage.toUpperCase() === "FR") {
            templateHash = formData.pdfHashFR
        }

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
        res.setHeader("Content-Disposition", `attachment; filename=${formData.code}_${data.firstName}_${data.lastName}.pdf`)
        //console.log(cdogsResponse)
        return res.status(200).send(cdogsResponse.data)
    } catch (e: any) {
        console.log(e)
        throw new Error(e.response?.status)
    }
}

export default generatePDF
