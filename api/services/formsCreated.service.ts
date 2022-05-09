const db = require("../db/db")

export const getCreatedForms = async () => {
    let createdForms: any
    try {
        await db.query("SELECT * FROM FormsCreated_Listing").then((resp:any) => {
            console.log(resp.rows)
            createdForms = {
                count: resp.rowCount,
                content: resp.rows.map((t: any) => (
                    {
                        id: t.formscreatedid,
                        formTemplateId: t.formtemplateid,
                        key: t.formkey,
                        formCode: t.code,
                        catchment: t.catchmentno,
                        storeFrontName: t.storefrontname,
                        isCreated: t.iscreated,
                        isInICM: t.isinicm,
                        isCompleted: t.iscompleted,
                        dateCreated: t.datecreated,
                        createdBy: t.createdby,
                        firstName: t.firstname,
                        lastName: t.lastname,
                        clientUrl: t.clienturl,
                        providerUrl: t.providerurl
                    }
                )),
                keys: resp.rows.map((t: any) => (
                    {
                        clientApiKey: t.clientapikey,
                        providerApiKey: t.providerapikey
                    }
                ))
            }
        })
    } catch (e: any) {
        console.error("error while querying: ", e)
        throw new Error(e.message)
    }
    return createdForms
}

export const getCreatedFormsByKey = async (formKey: string) => {
    let createdForms: any
    try {
        await db.query("SELECT * FROM FormsCreated_Listing WHERE FormKey = $1 LIMIT 1", [formKey]).then((resp:any) => {
            console.log(resp.rows)
            if (resp.rows.length === 0) {
                createdForms = {}
            } else {
                createdForms = {
                    firstName: resp.rows[0].firstname,
                    lastName: resp.rows[0].lastname,
                    caseNumber: resp.rows[0].casenumber
                }
            }
        })
    } catch (e: any) {
        console.error("error while querying: ", e)
        throw new Error(e.message)
    }
    return createdForms
}

export const setFormCreated = async (formKey: string, formData: any) => {
    try {
        await db.query(`
            UPDATE FormsCreated
            SET 
              IsCreated = true,
              FormData = $1
            WHERE
              FormKey = $2
            `, [formData, formKey]).then((resp:any) => {
            console.log(resp)
        })
    } catch (e: any) {
        console.log(e)
        return false
    }
    return true
}

export const setFormComplete = async (formKey: string) => {
    console.log(`UPDATE FormsCreated
        SET 
          IsCompleted = true
        WHERE FormKey = ${formKey}`)
    try {
        await db.query(`
            UPDATE FormsCreated
            SET 
              IsCompleted = true
            WHERE FormKey = $1`, [formKey]).then((resp:any) => {
            console.log(resp)
        })
    } catch (e: any) {
        console.log(e)
        return false
    }
    return true
}

export const insertForm = async (formKey: string, formTemplateId: string, catchmentNo: string, storeFrontName: string, userName: string) => {
    let id: any
    try {
        await db.query(`
            INSERT INTO FormsCreated VALUES (
                DEFAULT,
                $1,
                $2, /* FormTemplateId */
                '1', /* VersionNo */
                $3, /* CatchmentNo */
                $4, /* Storefront Name */
                false, /* IsCreated */
                false, /* IsInICM */
                false, /* IsCompleted */
                null,  /* FormData */
                $5,   /* User name */
                current_timestamp
            ) RETURNING id
            `, [formKey, formTemplateId, catchmentNo, storeFrontName, userName]).then((resp:any) => {
            console.log("resp is")
            console.log(resp)
            id = resp.rows[0].id
        })
    } catch (e: any) {
        console.log(e)
        return false
    }
    return id
}
