const format = require("pg-format")
const db = require("../db/db")

export const getCreatedForms = async (col: string, filter: string) => {
    let createdForms: any
    if (col === "id") { col = "formscreatedid" }
    let sql
    if (filter === "ASC") {
        sql = format("SELECT * FROM FormsCreated_Listing ORDER BY %I ASC", col)
    } else {
        sql = format("SELECT * FROM FormsCreated_Listing ORDER BY %I DESC", col)
    }
    console.log(sql)
    try {
        await db.query(sql).then((resp: any) => {
            // console.log(resp.rows)
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
                        providerUrl: t.providerurl,
                        language: t.formlanguage
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

export const getInitialCreatedFormsByKey = async (formKey: string) => {
    let createdForms: any
    try {
        await db.query("SELECT * FROM FormsCreated_Listing WHERE FormKey = $1 LIMIT 1", [formKey]).then((resp: any) => {
            // console.log(resp.rows)
            if (resp.rows.length === 0) {
                createdForms = {}
            } else {
                createdForms = {
                    catchment: resp.rows[0].catchmentno,
                    sf: resp.rows[0].storefrontname,
                }
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
        await db.query("SELECT * FROM FormsCreated WHERE FormKey = $1 LIMIT 1", [formKey]).then((resp: any) => {
            console.log(resp.rows)
            if (resp.rows.length === 0) {
                createdForms = {}
            } else {
                createdForms = {
                    firstName: resp.rows[0].formdata.firstName,
                    lastName: resp.rows[0].formdata.lastName,
                    caseNumber: resp.rows[0].formdata.caseNumber,
                    address: resp.rows[0].formdata.address,
                    cityTown: resp.rows[0].formdata.cityTown,
                    province: resp.rows[0].formdata.province,
                    postalCode: resp.rows[0].formdata.postalCode,
                    telephone: resp.rows[0].formdata.telephone,
                    emailAddress: resp.rows[0].formdata.emailAddress,
                    workBcCentreName: resp.rows[0].formdata.workBcCentreName,
                    workBcCentreAddress: resp.rows[0].formdata.workBcCentreAddress,
                    workBcCentreTelephoneNumber: resp.rows[0].formdata.workBcCentreTelephoneNumber,
                    dataGrid: resp.rows[0].formdata.dataGrid,
                    dataGrid1: resp.rows[0].formdata.dataGrid1,
                    dataGrid2: resp.rows[0].formdata.dataGrid2,
                }
            }
        })
    } catch (e: any) {
        console.error("error while querying: ", e)
        throw new Error(e.message)
    }
    return createdForms
}

export const getCreatedFormsSubmission = async (formKey: string) => {
    let createdForms: any
    try {
        await db.query("SELECT * FROM FormsCreated_Listing WHERE FormKey = $1 LIMIT 1", [formKey]).then((resp: any) => {
            console.log(resp.rows)
            if (resp.rows.length === 0) {
                createdForms = {}
            } else {
                createdForms = {
                    clientApiKey: resp.rows[0].clientapikey,
                    clientUrl: resp.rows[0].clienturl,
                    pdfHash: resp.rows[0].pdfhash,
                    pdfHashFR: resp.rows[0].pdfhashfr,
                    formLanguage: resp.rows[0].formlanguage,
                    clientSubmissionId: resp.rows[0].submissionid
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
            `, [formData, formKey]).then((resp: any) => {
            // console.log(resp)
        })
    } catch (e: any) {
        console.log(e)
        return false
    }
    return true
}

export const setFormComplete = async (formKey: string, submissionId: string) => {
    try {
        await db.query(`
            UPDATE FormsCreated
            SET 
              IsCompleted = true,
              SubmissionId = $1
            WHERE FormKey = $2`, [submissionId, formKey]).then((resp: any) => {
            // console.log(resp)
        })
    } catch (e: any) {
        console.log(e)
        return false
    }
    return true
}

// eslint-disable-next-line max-len
export const insertForm = async (formKey: string, formTemplateId: string, catchmentNo: string, storeFrontName: string, userName: string, language: string) => {
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
                $6, /* Language */
                current_timestamp
            ) RETURNING id
            `, [formKey, formTemplateId, catchmentNo, storeFrontName, userName, language]).then((resp: any) => {
            // console.log("resp is")
            // console.log(resp)
            id = resp.rows[0].id
        })
    } catch (e: any) {
        console.log(e)
        return false
    }
    return id
}

export const setFormInICM = async (id: number) => {
    try {
        await db.query(`
            UPDATE FormsCreated
            SET
                IsInICM = true
            WHERE id = $1 AND IsCompleted = true`, [id])
            .then((resp: any) => {
                // console.log(resp)
            })
    } catch (e: any) {
        console.log(e)
        return false
    }
    return true
}

export const deleteForm = async (id: number) => {
    try {
        await db.query(`
            DELETE FROM FormsCreated
            WHERE id = $1`, [id])
            .then((resp: any) => {
                // console.log(resp)
            })
    } catch (e: any) {
        console.log(e)
        return false
    }
    return true
}
