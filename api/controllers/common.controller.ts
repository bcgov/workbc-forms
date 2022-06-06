import * as express from "express"
import { UserPermissions } from "../interfaces/common.interface"
import * as commonService from "../services/common.service"

export const getUserPermissions = async (req: any, res: express.Response) => {
    const userGUID: string = <string>req.headers.userguid
    const permissions: UserPermissions = await commonService.getUserPermissions(userGUID)
    return res.status(200).send(permissions)
}

export default getUserPermissions
