import * as express from "express"
import { getAllFormTemplates, getFormTemplatesById } from "../services/formsTemplates.service"

export const getFormTemplates = async (req: any, res: express.Response) => {
    const formTemplates = await getAllFormTemplates()
    // console.log(formTemplates.content)
    // console.log(formTemplates)
    res.set(
        {
            "Access-Control-Expose-Headers": "Content-Range",
            "Content-Range": `0 - ${formTemplates.count} / ${formTemplates.count}`
        }
    )
    res.status(200).send(formTemplates.content)
}

export const getFormTemplateByID = async (req: any, res: express.Response) => {
    const { id } = req.params
    const formTemplates = await getFormTemplatesById(id)
    console.log(formTemplates)
    console.log(formTemplates.content[0])
    res.status(200).send(formTemplates.content[0])
}
