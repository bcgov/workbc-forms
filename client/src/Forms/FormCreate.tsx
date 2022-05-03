import { useMemo } from "react"
import { Create, ReferenceInput, SelectInput, SimpleForm } from "react-admin"

const FormReferenceInput = (props: any) => {

    return (
      <>
          <ReferenceInput {...props}>
            <SelectInput optionText="formCode"/>
          </ReferenceInput>
      </>
    )
  }

export const FormCreate = (props: any) => {
    const defaultValues = useMemo(
      () => ({
        created: false,
        url: "none",
        client_completed: false,
      }), []
    )
    return (
      <Create {...props}>
        <SimpleForm
          initialValues={defaultValues}
        >
          {/*
          <SelectInput source="title" choices={[
            {id : 'Client Services Application', name : 'Client Services Application'},
            {id : 'Wage Subsidy Work Experience Agreement', name: 'Wage Subsidy Work Experience Agreement'}
          ]} />
          */}
          <FormReferenceInput label="Select form" source="formCode" reference="forms" />
        </SimpleForm>
      </Create>
    )
  }