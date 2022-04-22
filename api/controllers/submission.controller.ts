import * as express from "express"

const submissionService = require("../services/submissions.service")

export const getSubmission = async (req: any, res: express.Response) => {
    try {
        console.log(req.body)
        // res.status(200).send("OK2")
        const x = await submissionService.getFormSubmissions(req.body, req.body.formPass)
        res.status(200).send(x)
    } catch (e: any) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}

export const anotherFunction = async (req: any, res: express.Response) => {
    res.status(200).send("OK2")
}
