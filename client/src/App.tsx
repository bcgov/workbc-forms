import React, { ComponentType, useMemo } from 'react';
import logo from './logo.svg';
import './App.css';

import {Admin, BooleanField, Button, Create, Datagrid, EditButton, EditGuesser, FileField, FunctionField, List, ListGuesser, ReferenceField, ReferenceInput, Resource, SelectField, SelectInput, SimpleForm, TextField, TextInput, UrlField, useResourceContext} from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import fakeDataProvider from 'ra-data-fakerest'
import { FormList } from './Forms/FormsList';
import { FormCreate } from './Forms/FormCreate';


const dataProvider = fakeDataProvider({
  my_forms: [
      { id: 0, formCode: 0, created: true, url: "https://some-url.ca", client_completed: true },
  ],
  forms: [
    {id: 0, title: 'Test Form', formCode: "HR123456", url: ""},
  ]
})








function App() {
  return (
    <Admin
      dataProvider={dataProvider}
    >
      <Resource name="my_forms" list={FormList} create={FormCreate}/>
      <Resource name="forms" list={ListGuesser} edit={EditGuesser}/>
    </Admin>
  );
}

export default App;
