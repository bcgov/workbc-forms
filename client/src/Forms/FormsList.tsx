import * as React from 'react'
import { BooleanField, Datagrid, FunctionField, List, ReferenceField, TextField } from "react-admin"
const CopyToClipboard = require('react-copy-to-clipboard')

export const FormList = (props: any) => {
    const a = "b"
    return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <FunctionField
                    label="Client Name"
                    render={(record: any) =>
                        record.isCreated ?
                            `${record.firstName} ${record.lastName}`
                            :
                            "Pending..."
                    }
                />
                <ReferenceField label="Form Name" source="formTemplateId" reference="formTemplates" link={false}>
                    <TextField source="code" />
                </ReferenceField>
                <ReferenceField label="Form Title" source="formTemplateId" reference="formTemplates" link={false}>
                    <TextField source="name" />
                </ReferenceField>
                <FunctionField
                    label="Status"
                    render={(record: any) =>
                        !record.isCreated ?
                            `Awaiting Service Provider`
                            :
                            record.isCompleted ?
                                `Complete`
                                :
                                `Awaiting Client`
                    }
                />
                <BooleanField source='isInICM' label="Added to ICM" />
                <FunctionField
                    label="Enter Details"
                    render={(record: any) =>
                        !record.isCreated ?
                            <div>
                                <a href={`${record.providerUrl.trim()}&token=${record.key}`} target="_blank" rel='noopener noreferrer'>Fill Out Form</a>
                            </div>
                            :
                            `N/A`
                    }
                />
                <FunctionField
                    label="Copy URL"
                    render={(record: any) =>
                        !record.isCompleted && record.isCreated ?
                            <CopyToClipboard text={`${record.clientUrl.trim()}&token=${record.key}`}>
                                <button>Copy</button>
                            </CopyToClipboard>
                            :
                            `N/A`
                    }
                />
                <FunctionField
                    label="Generate PDF"
                    render={(record: any) =>
                        record.client_completed ?
                            <div>
                                <a href={`https://`} target="_blank" rel='noopener noreferrer'>Generate PDF</a>
                            </div>
                            :
                            `Not Available`
                    }
                />
            </Datagrid>
        </List>
    )
}