import e, * as express from "express"
import * as createdForms from "../services/formsCreated.service"

const submissionService = require("../services/submissions.service")

export const getFormsCreated = async (req: any, res: express.Response) => {
    try {
        // console.log(req.headers)
        // console.log(req.kauth.grant)
        const { sort, filter } = req.query
        const filters = filter ? JSON.parse(filter) : {}
        const sorted = sort ? sort.replace(/[^a-zA-Z0-9,]/g, "").split(",") : ["id", "ASC"]
        const formsCreated = await createdForms.getCreatedForms(sorted[0], sorted[1])
        // console.log(formsCreated)
        const params = {
            fields:
                `
                firstName,lastName,caseNumber,token,
                address,cityTown,province,postalCode,telephone,emailAddress,
                workBcCentreName,workBcCentreAddress,workBcCentreTelephoneNumber,
                dataGrid,dataGrid1,dataGrid2, 
                nonExistent
                `
        }
        let result = formsCreated.content
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
                // console.log(providerSubmissions)
                // look for token in provider submissions
                const providerForm = providerSubmissions.find((s: any) => s.token === form.key) || null
                // console.log(providerForm)
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
                // console.log(clientSubmissions)
                const clientForm = clientSubmissions.find((s: any) => s.token === form.key) || null
                // console.log(clientForm)
                // update client form
                if (clientForm) {
                    // console.log("updating client DB entry")
                    // console.log(form.key)
                    const updated = await createdForms.setFormComplete(form.key, clientForm.submissionId)
                    if (updated) {
                        result[i].isCompleted = true
                    }
                }
            }
        })

        // console.log("RESULT")
        // console.log(result)

        console.log(filters.q)
        if (filters.q) {
            result = result.filter((e: any) => (
                (e.firstName && e.firstName.toUpperCase().search(filters.q.toUpperCase()) > -1) ||
                (e.lastName && e.lastName.toUpperCase().search(filters.q.toUpperCase()) > -1) ||
                ((`${e.firstName} ${e.lastName}`).toUpperCase().search(filters.q.toUpperCase()) > -1)))
        }
        if (filters.isInICM) {
            result = result.filter((e: any) => (
                e.isInICM === filters.isInICM
            ))
        }
        // console.log(result)
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
        const created =
                    // eslint-disable-next-line max-len
                    await createdForms.insertForm(req.body.formKey, req.body.code, req.body.catchment, req.body.storefront, req.body.userName, req.body.language)
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

export const deleteForm = async (req: any, res: express.Response) => {
    try {
        const { id } = req.params
        console.log(id)
        const deleted =
                    await createdForms.deleteForm(parseInt(id, 10))
        console.log("deleted is")
        console.log(deleted)
        if (deleted) {
            return res.status(200).send({ id: id })
        }
        return res.status(500).send("Internal Server Error")
    } catch (e: any) {
        console.log(e)
        return res.status(500).send("Internal Server Error")
    }
}

export const updateForm = async (req: any, res: express.Response) => {
    try {
        const { id } = req.params
        console.log(id)
        const updated =
                    await createdForms.setFormInICM(parseInt(id, 10))
        console.log("updated is")
        console.log(updated)
        if (updated) {
            return res.status(200).send({ id: id })
        }
        return res.status(500).send("Internal Server Error")
    } catch (e: any) {
        console.log(e)
        return res.status(500).send("Internal Server Error")
    }
}
