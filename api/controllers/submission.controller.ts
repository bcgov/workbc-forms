import * as express from "express"

const submissionService = require("../services/submissions.service")

export const getSubmission = async (req: any, res: express.Response) => {
    try {
        await submissionService.getFormSubmissions(req.body,)
    } catch (e: any) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}

export const anotherFunction = async (req: any, res: express.Response) => {
    res.status(200).send("OK")
}
