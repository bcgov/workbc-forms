import * as express from "express"

const submissionService = require("../services/submissions.service")

export const getSubmission = async (req: any, res: express.Response) => {
    try {
        const x = await submissionService.getFormSubmissions(req.body, req.body.formPass)
        // console.log(x)
        res.status(200).send(x)
    } catch (e: any) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}

export const checkingToken = async (req: any, res: express.Response) => {
    const allTokens = []
    let flagging = false
    let i = 0
    try {
        const y = await submissionService.getFormSubmissions(req.body, req.body.formPass)
        // should I code for binary search since it's better?
        for (; i < y.length; i += 1) {
            allTokens.push(y[i].token)
            if (req.body.formKey === y[i].token) {
                flagging = true
                break
            }
        }
        if (flagging === true) {
            const response = `${y[i].firstName}  ${y[i].lastName}`
            res.status(200).send(response)
        } else {
            res.status(200).send("Doesn't Exist")
        }
    } catch (e: any) {
        console.log(e)
        res.status(500).send("Internal Server Error")
    }
}
export const anotherFunction = async (req: any, res: express.Response) => {
    res.status(200).send("OK2")
}
