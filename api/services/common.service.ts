import { AxiosResponse } from "axios"
import { OESAccessDefinition, UserPermissions } from "../interfaces/common.interface"
import * as OESMediator from "./OESMediator.service"

const { authApi } = require("../config/config")

export const getToken = async () => {
    try {
        const authURL = `realms/${process.env.COMMON_SERVICES_AUTH_REALM}/protocol/openid-connect/token`
        const params = new URLSearchParams()
        params.append("grant_type", "client_credentials")
        const config = {
            auth: {
                username: process.env.COMMON_SERVICES_CLIENT || "",
                password: process.env.COMMON_SERVICES_CLIENT_SECRET || ""
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }
        const authResponse: AxiosResponse = await authApi.post(authURL, params, config)
        const token: String = authResponse.data.access_token
        return token
    } catch (error: any) {
        console.log(error)
        throw new Error(error.response?.status)
    }
}

export const getUserPermissions = async (userGUID: string) : Promise<UserPermissions> => {
    try {
        const resp = await OESMediator.getUserPermissions(userGUID)
        const permissions = resp.data

        // If the permissions array contains at least one entry with application "SARA", user has access //
        const hasAccess: boolean = permissions.some((p: OESAccessDefinition) => p.Application.toLowerCase() === "sara")

        // Determine which catchments the user has access to //
        let catchments: number[] = permissions.map((p: OESAccessDefinition) => {
            const catchmentID: number = parseInt(p.Catchment, 10)
            if (Number.isNaN(catchmentID) || p.Application.toLowerCase() !== "sara") {
                return -1 // return -1 (filter flag) if no catchment is defined for that access definition, or if the catchment doesn't belong to SARA
            }

            return catchmentID - 100 // OES returns the ids starting at 100
        })

        catchments = catchments.filter((c) => c !== -1) // filter out undesirables
        catchments = [...new Set(catchments)] // remove duplicates by creating a new Set object

        return {
            hasAccess: hasAccess,
            catchments: catchments
        }
    } catch (err: any) {
        throw new Error(err)
    }
}
