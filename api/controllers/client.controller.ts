import * as express from "express"
import { getCreatedFormsByKey } from "../services/formsCreated.service"

const getClientInfo = async (req: any, res: express.Response) => {
    const { key } = req.params
    const form = await getCreatedFormsByKey(key)
    console.log(form)
    return res.status(200).send(form)
}

export default getClientInfo
