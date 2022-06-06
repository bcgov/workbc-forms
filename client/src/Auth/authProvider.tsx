import { useKeycloak } from '@react-keycloak/web'
import jwt_decode from 'jwt-decode'

const useAuthProvider = (clientID:string) => {
    const { keycloak } = useKeycloak();
    return ({
        login: (idp) => keycloak.login(),
        checkError: () => Promise.resolve(),
        checkAuth: () => {
           return localStorage.getItem('token') ? Promise.resolve() : Promise.reject("Failed to obtain access token.");
            
        },
        logout: () => {
            localStorage.removeItem('token')
            localStorage.removeItem('refresh_token')
            return keycloak.logout()
        },
        getIdentity: () => { 
            if (keycloak.token) {
                const decoded : any = jwt_decode(keycloak.token);
                console.log(decoded)
                const id = decoded.sub
                const fullName = decoded.identity_provider_identity
                return Promise.resolve({id, fullName});
            }
            return Promise.reject("Failed to get identity");
        },
        getPermissions:() => {
            let hasRole = false;
            return Promise.resolve(true)
            /*
            if (keycloak.token) {
                const decoded : any = jwt_decode(keycloak.token);
                decoded.resource_access[clientID].roles.forEach((el: string) => {
                    if (el === "admin") {
                        hasRole = true;
                        return
                    }
                });
            }
            if (hasRole) {
                return Promise.resolve(true);
            }
            return Promise.resolve(false);
            */
        },
    });
};

export default useAuthProvider;