import * as React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { BooleanField, Datagrid, FunctionField, List, ReferenceField, TextField } from "react-admin"
import { 
    TopToolbar,
} from 'react-admin';
const CopyToClipboard = require('react-copy-to-clipboard')
const ListActions = () => (
    <TopToolbar>
    </TopToolbar>
);

export const FormList = (props: any) => {
    const a = "b"
    return (
        <><Grid container>
            <Grid item xs={7}>
            <List {...props}>
                <Datagrid>
                    <TextField source="id" />
                    <FunctionField
                        label="Client Name"
                        render={(record: any) => record.isCreated ?
                            `${record.firstName} ${record.lastName}`
                            :
                            "Pending..."} />
                    <ReferenceField label="Form Name" source="formTemplateId" reference="formTemplates" link={false}>
                        <TextField source="code" />
                    </ReferenceField>
                    <ReferenceField label="Form Title" source="formTemplateId" reference="formTemplates" link={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <FunctionField
                        label="Status"
                        render={(record: any) => !record.isCreated ?
                            `Awaiting Service Provider`
                            :
                            record.isCompleted ?
                                `Complete`
                                :
                                `Awaiting Client`} />
                    <BooleanField source='isInICM' label="Added to ICM" />
                    <FunctionField
                        label="Enter Details"
                        render={(record: any) => !record.isCreated ?
                            <div>
                                <Button
                                    href={`${record.providerUrl.trim()}&token=${record.key}`}
                                    target="_blank"
                                    rel='noopener noreferrer'
                                    variant="contained"
                                    sx={{ textAlign: 'center', backgroundColor: '#003366' }}>Fill Out Form
                                </Button>
                            </div>
                            :
                            ``} />
                    <FunctionField
                        label="Copy URL"
                        render={(record: any) => !record.isCompleted && record.isCreated ?
                            <CopyToClipboard text={`${record.clientUrl.trim()}&token=${record.key}`}>
                                <Button
                                    variant="contained"
                                    sx={{ backgroundColor: '#003366' }}>Copy</Button>
                            </CopyToClipboard>
                            :
                            ``} />
                    <FunctionField
                        label="Generate PDF"
                        render={(record: any) => record.isCompleted ?
                            <div>
                                <Button
                                    href={`http://localhost:8000/pdf/${record.key}`}
                                    target="_blank"
                                    rel='noopener noreferrer'
                                    variant="contained"
                                    sx={{ backgroundColor: '#003366' }}>Download
                                </Button>

                            </div>
                            :
                            ``} />
                </Datagrid>
            </List>
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={3}>
            <List actions={<ListActions/>} {...props}>
                <Datagrid bulkActionButtons={false}>
                    <ReferenceField label="Form Name" source="formTemplateId" reference="formTemplates" link={false}>
                        <TextField source="code" />
                    </ReferenceField>
                    <ReferenceField label="Form Title" source="formTemplateId" reference="formTemplates" link={false}>
                        <TextField source="name" />
                    </ReferenceField>
                    <FunctionField
                        render={(record: any) => record.isCompleted ?
                            <div>
                                <Button
                                    href={`http://localhost:3000/#/forms/create`}
                                    target="_blank"
                                    rel='noopener noreferrer'
                                    variant="contained"
                                    sx={{ backgroundColor: '#003366' }}>Create
                                </Button>

                            </div>
                            :
                            ``} />
                </Datagrid>
            </List>
            </Grid>
            <Grid item xs={1}></Grid>

        </Grid></>
    )
}