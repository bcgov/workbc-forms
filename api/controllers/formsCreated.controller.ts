import * as express from "express"
import * as createdForms from "../services/formsCreated.service"

const submissionService = require("../services/submissions.service")

export const getFormsCreated = async (req: any, res: express.Response) => {
    try {
        const formsCreated = await createdForms.getCreatedForms()
        console.log(formsCreated)
        const params = {
            fields: "firstName,lastName,caseNumber,token"
        }
        const result = formsCreated.content
        formsCreated.content.forEach(async (form: any, i: number) => {
            // console.log(form)
            // console.log(formsCreated.keys[i])
            // check if form has been created
            const providerId = new URL(form.providerUrl).searchParams.get("f")
            const clientId = new URL(form.clientUrl).searchParams.get("f")
            // console.log(providerId)
            // console.log(clientId)
            // console.log(formsCreated.keys[i].providerApiKey)
            // if form is marked as not created check
            if (!form.isCreated) {
                const providerSubmissions = await submissionService.getFormSubmissions(providerId, formsCreated.keys[i].providerApiKey, params)
                console.log(providerSubmissions)
                // look for token in provider submissions
                const providerForm = providerSubmissions.find((s: any) => s.token === form.key) || null
                console.log(providerForm)
                // update provider form
                if (providerForm) {
                    console.log("updating DB entry")
                    const updated = await createdForms.setFormCreated(form.key, providerForm)
                    if (updated) {
                        result[i].isCreated = true
                    }
                }
            }
            // if form is not complete (by client) check
            if (!form.isCompleted) {
                const clientSubmissions = await submissionService.getFormSubmissions(clientId, formsCreated.keys[i].clientApiKey, params)
                console.log(clientSubmissions)
                const clientForm = clientSubmissions.find((s: any) => s.token === form.key) || null
                // update client form
                if (clientForm) {
                    console.log("updating client DB entry")
                    console.log(form.key)
                    const updated = await createdForms.setFormComplete(form.key)
                    if (updated) {
                        result[i].isCompleted = true
                    }
                }
            }
        })
        console.log("RESULT")
        console.log(result)
        res.set(
            {
                "Access-Control-Expose-Headers": "Content-Range",
                "Content-Range": `0 - ${formsCreated.count} / ${formsCreated.count}`
            }
        )
        return res.status(200).send(result)
    } catch (e: any) {
        console.log(e)
        return res.status(500).send("Internal Server Error")
    }
}

export const createForm = async (req: any, res: express.Response) => {
    try {
        console.log(req.body)
        res.status(200)
        const created =
                    await createdForms.insertForm(req.body.formKey, req.body.code, req.body.catchmentNo, req.body.storeFrontName, req.body.userName)
        console.log("created is")
        console.log(created)
        if (created) {
            return res.status(200).send({ id: created })
        }
        return res.status(500).send("Internal Server Error")
    } catch (e: any) {
        console.log(e)
        return res.status(500).send("Internal Server Error")
    }
}
