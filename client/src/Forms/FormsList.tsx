import * as React from 'react'
import { BooleanField, Datagrid, FunctionField, List, ReferenceField, TextField, TopToolbar, SearchInput, useListContext, TextInput, FilterButton, CreateButton, BooleanInput, EditButton, BulkDeleteButton, BulkUpdateButton } from "react-admin"
import CircleIcon from '@mui/icons-material/Circle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Avatar from '@mui/material/Avatar';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
import { DoneAll } from '@mui/icons-material';
import { saveAs } from 'file-saver';
const CopyToClipboard = require('react-copy-to-clipboard')

const formFilters = [
    <TextInput label="Search by client name" source="q" alwaysOn />,
    <BooleanInput source='isInICM' label="Added to ICM" defaultValue={true} sx={{ paddingBottom: "20px", paddingLeft: "20px" }} />
];

const ListActions = () => (
    <TopToolbar sx={{ paddingTop: "5vh" }}>
        <div>
            <FilterButton />
            <CreateButton />
        </div>
    </TopToolbar>
);

const MarkOnICMButton = (props) => (
    <BulkUpdateButton label={props.label} data={{ isInICM: true }} icon={<DoneAll />} />
)

const FormBulkActionButtons = () => (
    <>
        <MarkOnICMButton label="Mark on ICM" />
        <BulkDeleteButton />
    </>
);

export const FormList = (props: any) => {
    return (
        <List {...props} actions={<ListActions />} filters={formFilters}>
            <Datagrid bulkActionButtons={<FormBulkActionButtons />}>
                <TextField source="id" />
                <FunctionField
                    label="Client Name"
                    render={(record: any) => record.isCreated ?
                        <div>
                            <Avatar style={{ display: "inline-flex", backgroundColor: "#1070ca", height: "35px", width: "35px" }}>
                                {record.firstName[0]}{record.lastName[0]}
                            </Avatar>
                            <div style={{ display: "inline-flex", paddingLeft: "0.5vw" }}>{record.firstName} {record.lastName}</div>
                        </div>
                        :
                        <div>
                            <Avatar style={{ display: "inline-flex", backgroundColor: "#1070ca", height: "35px", width: "35px" }}>
                                P
                            </Avatar>
                            <div style={{ display: "inline-flex", paddingLeft: "0.5vw" }}>Pending...</div>
                        </div>} />
                <ReferenceField label="Form Name" source="formTemplateId" reference="formTemplates" link={false}>
                    <TextField source="code" />
                </ReferenceField>
                <ReferenceField label="Form Title" source="formTemplateId" reference="formTemplates" link={false}>
                    <TextField source="name" />
                </ReferenceField>
                <FunctionField
                    label="Status"
                    render={(record: any) => !record.isCreated ?
                        <div>
                            <CircleIcon sx={{ fontSize: 10 }} htmlColor='#ec4c47' />
                            <div style={{ display: "inline-block", paddingLeft: "0.5vw" }}>Awaiting Service Provider</div>
                        </div>
                        :
                        record.isCompleted ?
                            <div>
                                <CircleIcon sx={{ fontSize: 10 }} htmlColor='#47b881' />
                                <div style={{ display: "inline-block", paddingLeft: "0.5vw" }}>Complete</div>
                            </div>
                            :
                            <div>
                                <CircleIcon sx={{ fontSize: 10 }} htmlColor='#f7d154' />
                                <div style={{ display: "inline-block", paddingLeft: "0.5vw" }}>Awaiting Client</div>
                            </div>} />
                <BooleanField source='isInICM' label="Added to ICM" TrueIcon={CheckBoxIcon} FalseIcon={CheckBoxOutlineBlankIcon} />
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
                        `N/A`} />
                <FunctionField
                    label="Copy URL"
                    render={(record: any) => !record.isCompleted && record.isCreated ?
                        <CopyToClipboard text={`${record.clientUrl.trim()}&token=${record.key}&lang=${record.language.toLowerCase()}`}>
                            <Button
                                variant="contained"
                                sx={{ backgroundColor: '#003366' }}>Copy
                            </Button>
                        </CopyToClipboard>
                        :
                        `N/A`} />
                <FunctionField
                    label="Generate PDF"
                    render={(record: any) => record.isCompleted ?
                        <div>
                            <Button
                                href="#"
                                variant="contained"
                                sx={{ backgroundColor: '#003366' }}
                                onClick={async () => {
                                    const pdfRequest = new Request(`http://localhost:8000/pdf/${record.key}`, {
                                        method: "GET",
                                        headers: new Headers({
                                            Authorization: `Bearer ${localStorage.getItem('token')}`
                                        })
                                    })
                                    try {
                                        const pdf = await fetch(pdfRequest)
                                        .then(response => {
                                            return response.blob()
                                        })
                                        console.log(record)
                                        saveAs(pdf, `${record.formCode}_${record.firstName}_${record.lastName}.pdf`)
                                        /*
                                        console.log(pdf)
                                        const url = window.URL.createObjectURL(pdf);
                                        const a = document.createElement('a');
                                        a.style.display = 'none';
                                        a.href = url;
                                        // the filename you want
                                        a.download = `pdf`;
                                        document.body.appendChild(a);
                                        a.click();
                                        document.body.removeChild(a);
                                        window.URL.revokeObjectURL(url);
                                        */
                                        //return pdf
                                    } catch (error: any){
                                        console.log(error)
                                        alert("Something happened while generating the PDF")
                                    }
                                }}
                            >
                                Download
                            </Button>
                        </div>
                        :
                        `Not Available`} />
            </Datagrid>
        </List >
    )
}