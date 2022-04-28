import { chefsApi } from "../config/config"

export const getFormSubmissions = async (body: any, formPass: string) => {
    try {
        const url = `forms/${body.formId}/submissions`
        const params = new URLSearchParams(body.params)
        const config = {
            auth: {
                username: body.formId,
                password: formPass
            },
            headers: {
                "Content-Type": "application/json"
            },
            params: params
        }
        const formSubmissionResponse = await chefsApi.get(url, config)
        return formSubmissionResponse.data
    } catch (e : any) {
        console.log(e)
        throw new Error(e.response?.status)
    }
}

export const anotherFunction = async () => ({ ok: "ok" })
