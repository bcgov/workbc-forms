import './App.css';
import {Admin,  EditGuesser,  ListGuesser,  Resource} from 'react-admin';
import fakeDataProvider from 'ra-data-fakerest'
import { FormList } from './Forms/FormsList';
import { FormCreate } from './Forms/FormCreate';
import Layout from './Layout';
import Footer from './footer';

const dataProvider = fakeDataProvider({
  my_forms: [
      { id: 0, formCode: 0, created: true, url: "https://some-url.ca", client_completed: true },
  ],
  forms: [
    {id: 0, title: 'Test Form', formCode: "HR123456", url: ""},
  ]
})

export const lightTheme = {
  components: {
      MuiAppBar: {
          styleOverrides: {
              colorSecondary: {
                  color: '#fff',
                  backgroundColor: '#003366',
                  borderBottom: '3px solid #FCBA19'
              },
          },
      },     
  },
}

function App() {
  return (    
    <><Admin
      theme={lightTheme}
      dataProvider={dataProvider}
      layout={Layout}
    >
      <Resource name="my_forms" list={FormList} create={FormCreate} />
      <Resource name="forms" list={ListGuesser} edit={EditGuesser} />
    </Admin><Footer /></> 
  );
}

export default App;
