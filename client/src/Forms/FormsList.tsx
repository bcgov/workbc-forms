import * as React from 'react'
import { BooleanField, Datagrid, FunctionField, List, ReferenceField, TextField } from "react-admin"
const CopyToClipboard =  require('react-copy-to-clipboard')

export const FormList = (props: any) => {
        const a = "b"
        return (
        <List {...props}>
            <Datagrid>
                <TextField source="id" />
                <ReferenceField label="Title" source="formCode" reference="forms">
                    <TextField source="title" />
                </ReferenceField>
                <ReferenceField label="Code" source="formCode" reference="forms">
                    <TextField source="formCode" />
                </ReferenceField>
            {/*<TextField source="formCode" />*/}
                <BooleanField source='created' />
                <FunctionField 
                    label="Create"
                    render={(record: any) => 
                        !record.created ? 
                        <div>
                            <a href={`${record.url}`} target="_blank" rel='noopener noreferrer'>Create Form</a>
                        </div>
                        :
                        `Created`
                    }
                />
                <FunctionField 
                    label="Client URL"
                    render={(record: any) => 
                        !record.client_completed && record.created ? 
                        <CopyToClipboard text={`${record.url}`}>
                         <button>Copy</button>
                        </CopyToClipboard>
                        :
                        `N/A`
                    }
            />
            <BooleanField source='client_completed' />
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