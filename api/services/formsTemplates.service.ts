const db = require("../db/db")

export const getAllFormTemplates = async () => {
    let formTemplate: any
    try {
        await db.query("SELECT * FROM formtemplates").then((resp:any) => {
            formTemplate = {
                count: resp.rowCount,
                content: resp.rows.map((t: any) => ({
                    id: t.id,
                    name: t.name,
                    code: t.code,
                    description: t.description,
                    clientUrl: t.clienturl,
                    clientApiKey: t.clientapikey,
                    providerUrl: t.providerurl
                }))
            }
        })
    } catch (e: any) {
        console.error("error while querying: ", e)
        throw new Error(e.message)
    }
    return formTemplate
}

export const getFormTemplatesById = async (id: number) => {
    let formTemplate: any
    try {
        await db.query("SELECT * FROM formtemplates WHERE id = $1", [id]).then((resp:any) => {
            formTemplate = {
                count: resp.rowCount,
                content: resp.rows.map((t: any) => ({
                    id: t.id,
                    name: t.name,
                    code: t.code,
                    description: t.description,
                    clientUrl: t.clienturl,
                    clientApiKey: t.clientapikey,
                    providerUrl: t.providerurl
                }))
            }
        })
    } catch (e: any) {
        console.error("error while querying: ", e)
        throw new Error(e.message)
    }
    return formTemplate
}

export const getCreatedForms = async () => ({ someData: "ok" })
