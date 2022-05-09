import { v4 as uuidv4 } from 'uuid'
import { useMemo } from "react"
import { Create, ReferenceInput, SelectInput, SimpleForm } from "react-admin"

const FormReferenceInput = (props: any) => {

    return (
      <>
          <ReferenceInput {...props}>
            <SelectInput optionText="code"/>
          </ReferenceInput>
      </>
    )
  }

export const FormCreate = (props: any) => {
    const defaultValues = useMemo(
      () => ({
        formKey: uuidv4(),
        catchmentNo: 1,
        storeFrontName: "Campbell River",
        userName: "Someone@bceid"
      }), []
    )
    return (
      <Create {...props}>
        <SimpleForm
          defaultValues={defaultValues}
        >
          {/*
          <SelectInput source="title" choices={[
            {id : 'Client Services Application', name : 'Client Services Application'},
            {id : 'Wage Subsidy Work Experience Agreement', name: 'Wage Subsidy Work Experience Agreement'}
          ]} />
          */}
          <FormReferenceInput label="Select form" source="code" reference="formTemplates" />
        </SimpleForm>
      </Create>
    )
  }