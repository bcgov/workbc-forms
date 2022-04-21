import { AxiosInstance } from "axios"

const axios = require("axios")

const chefsBaseUrl = process.env.CHEFS_URL || ""
const formsBaseUrl = process.env.FORMS_API_URL || ""

export const chefsApi: AxiosInstance = axios.create(
    {
        baseURL: chefsBaseUrl
    }
)

export const formsApi: AxiosInstance = axios.create(
    {
        baseURL: formsBaseUrl
    }
)
