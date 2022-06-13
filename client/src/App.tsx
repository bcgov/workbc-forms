import './App.css';
import { Admin, EditGuesser, ListGuesser, Resource, Authenticated, fetchUtils, Options } from 'react-admin';
import { FormList } from './Forms/FormsList';
import { FormCreate } from './Forms/FormCreate';
import Layout from './Layout';
import Footer from './footer';
import { ReactKeycloakProvider } from '@react-keycloak/web'
import Keycloak from 'keycloak-js'
import useAuthProvider from './Auth/authProvider';
import {AcUnit} from "@material-ui/icons"
import LoginPage from './Auth/LoginPage';
import { dataProvider } from './DataProvider/DataProvider';

/*
const dataProvider = fakeDataProvider({
  my_forms: [
      { id: 0, formCode: 0, created: true, url: "https://some-url.ca", client_completed: true },
  ],
  forms: [
    {id: 0, title: 'Test Form', formCode: "HR123456", url: ""},
  ]
})
*/

const initOptions = {
  url: process.env.REACT_APP_KEYCLOAK_URL || "",
  realm: process.env.REACT_APP_KEYCLOAK_REALM || "",
  clientId: process.env.REACT_APP_KEYCLOAK_CLIENT_ID || "",
}

const keycloak = new Keycloak(initOptions)

const onToken = () => {
  if (keycloak.token && keycloak.refreshToken) {
    localStorage.setItem("token", keycloak.token);
    localStorage.setItem("refresh-token", keycloak.refreshToken);
  }
};

const onTokenExpired = () => {
  keycloak
    .updateToken(30)
    .then(() => {
      console.log("successfully get a new token", keycloak.token);
    })
    .catch(() => {
      console.error("failed to refresh token");
    });
};

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


//const dataProvider = simpleRestProvider("http://localhost:8000", httpClient)

console.log(process.env.DATA_PROVIDER_URL)
console.log(dataProvider)

const CustomAdminWithKeycloak = () => {
  const customAuthProvider = useAuthProvider(
    process.env.REACT_APP_KEYCLOAK_CLIENT_ID || ""
  );
  return (
    <Admin
    theme={lightTheme}
    dataProvider={dataProvider}
    authProvider={customAuthProvider}
    loginPage={false}
    layout={Layout}
    disableTelemetry
    requireAuth
  >
    <Resource name="forms" list={FormList} create={FormCreate} edit={EditGuesser} />
    <Resource name="formTemplates" list={ListGuesser} edit={EditGuesser} icon={AcUnit}/>

    
  </Admin >
  );
};


function App() {
  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      LoadingComponent={<div></div>}
      onTokens={onToken}
      initOptions={{
        onLoad: 'login-required',
        onTokenExpired: onTokenExpired
      }}
      
    >
      <CustomAdminWithKeycloak />
      <Footer />
    </ReactKeycloakProvider>



  );
}

export default App;
