import { AxiosResponse } from "axios"
import { oesApi } from "../config/config"

export const getUserPermissions = async (userGUID: string, isIDIR = false): Promise<any> => {
    try {
        const resp: AxiosResponse = await oesApi.get("User/Permissions", {
            auth: {
                username: process.env.OES_USER || "",
                password: process.env.OES_PASS || ""
            },
            params: {
                userGUID: userGUID,
                isIDIR: isIDIR
            }
        })

        return resp
    } catch (err: any) {
        console.error("error while calling OES: ", err)
        throw new Error(err.response?.status)
    }
}

export default getUserPermissions
