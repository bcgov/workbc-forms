import * as express from "express"
import { UserPermissions } from "../interfaces/common.interface"
import * as commonService from "../services/common.service"

export const getUserPermissions = async (req: any, res: express.Response) => {
    const userGUID: string = <string>req.headers.userguid
    const { idp } = req.params
    const isIDIR = idp === "idir"
    const permissions: UserPermissions = await commonService.getUserPermissions(userGUID, isIDIR)
    return res.status(200).send(permissions)
}

export const getCatchmentInfo = async (req: any, res: express.Response) => {
    const { catchment } = req.params
    const catchments = commonService.getCatchments()
    const ca = catchments.find(c => c.CatchmentNo === catchment)
    return res.status(200).send(ca)
}

export const getCatchments = async (req: any, res: express.Response) => {
    // const { catchment } = req.params
    const catchments = commonService.getCatchments()
    // const ca = catchments.find(c => c.CatchmentNo === catchment)
    return res.status(200).send(catchments)
}

export default getUserPermissions
