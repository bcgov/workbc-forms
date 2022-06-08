import * as React from 'react'
import { BooleanField, Datagrid, FunctionField, List, ReferenceField, TextField, TopToolbar, SearchInput, useListContext, TextInput, FilterButton } from "react-admin"
import CircleIcon from '@mui/icons-material/Circle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Avatar from '@mui/material/Avatar';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Button from '@mui/material/Button';
const CopyToClipboard = require('react-copy-to-clipboard')

const formFilters = [
    <SearchInput source="q" alwaysOn/>,
    <TextInput source='isinicm' label="Added to ICM"/>
];

const ListActions = () => (
    <TopToolbar sx={{ paddingTop: "5vh" }}>
    <div>
        <FilterButton />
    </div>
    </TopToolbar>
);

export const FormList = (props: any) => {
    const a = "b"
    return (
        <List {...props} actions={<ListActions/>} filters={formFilters}>
                <Datagrid>
                    <TextField source="id" />
                    <FunctionField
                        label="Client Name"
                        render={(record: any) => record.isCreated ?
                            <div>
                                <Avatar style={{ display: "inline-flex", backgroundColor: "#1070ca", height: "35px", width: "35px"}}>
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
                                <a href={`${record.providerUrl.trim()}&token=${record.key}`} target="_blank" rel='noopener noreferrer'>Fill Out Form</a>
                            </div>
                            :
                            `N/A`} />
                    <FunctionField
                        label="Copy URL"
                        render={(record: any) => !record.isCompleted && record.isCreated ?
                            <CopyToClipboard text={`${record.clientUrl.trim()}&token=${record.key}`}>
                                <button>Copy</button>
                            </CopyToClipboard>
                            :
                            `N/A`} />
                    <FunctionField
                        label="Generate PDF"
                        render={(record: any) => record.isCompleted ?
                            <div>
                                <a href={`http://localhost:8000/pdf/${record.key}`} target="_blank" rel='noopener noreferrer'>Generate PDF</a>
                            </div>
                            :
                            `Not Available`} />
                </Datagrid>
            </List>
    )
}