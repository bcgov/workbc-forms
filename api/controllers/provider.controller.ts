import * as express from "express"
import { getInitialCreatedFormsByKey } from "../services/formsCreated.service"
import { getCatchments } from "../services/common.service"

const getProviderInfo = async (req: any, res: express.Response) => {
    const { key } = req.params
    const form = await getInitialCreatedFormsByKey(key)
    console.log(form)
    const { catchment, sf } = form
    console.log(catchment)
    console.log(sf)
    const catchments = getCatchments()
    const ca = catchments.find(c => c.CatchmentNo === String(catchment))
    console.log(ca)
    const sfInfo = ca?.Storefronts.find(s => s.id === Number(sf))
    console.log(sfInfo)

    return res.status(200).send({
        workBcCentreName: sfInfo?.name,
        workBcCentreAddress: sfInfo?.Address,
        workBcCentreTelephoneNumber: sfInfo?.Phone
    })
}

export default getProviderInfo
