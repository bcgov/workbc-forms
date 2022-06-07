import { useKeycloak } from '@react-keycloak/web'
import jwt_decode from 'jwt-decode'

const useAuthProvider = (clientID: string) => {
    const { keycloak } = useKeycloak();
    return ({
        login: () => keycloak.login(),
        checkError: () => Promise.resolve(),
        checkAuth: () => {
            return localStorage.getItem('token') ? Promise.resolve() : Promise.reject("Failed to obtain access token.");

        },
        logout: () => {
            localStorage.removeItem("token")
            localStorage.removeItem("refresh_token")
            localStorage.removeItem("permissions")
            return keycloak.logout()
        },
        getIdentity: () => {
            if (keycloak.token) {
                const decoded: any = jwt_decode(keycloak.token);
                console.log(decoded)
                const id = decoded.sub
                const idp = decoded.identity_provider
                const fullName = decoded.identity_provider_identity
                return Promise.resolve({ id, idp, fullName });
            }
            return Promise.reject("Failed to get identity");
        },
        getPermissions: async () => {
            if (localStorage.getItem('token')) {
                const decoded: any = jwt_decode(localStorage.getItem('token') || "")
                const permissionRequest = new Request(`http://localhost:8000/Common/UserPermissions/${decoded.identity_provider}`, {
                    method: "GET",
                    headers: new Headers({
                        userGUID: decoded.smgov_userguid || ""
                    })
                })
                try {
                    const permissions = await fetch(permissionRequest)
                        .then(response => {
                            if (response.status < 200 || response.status >= 300) {
                                throw new Error(response.statusText);
                            }
                            return response.json();

                        })
                        .then(p => {
                            console.log(p)
                            //localStorage.setItem("hasAccess", p.hasAccess)
                            //localStorage.setItem("catchments", p.catchments)
                            //localStorage.setItem("isIDIR",p.isIDIR)
                            //localStorage.setItem("permissions", p)
                            return p
                        })
                    console.log(permissions)
                    return Promise.resolve(permissions)
                } catch (error: any) {
                    console.log(error)
                    return Promise.resolve(false)

                }



            }
            return Promise.resolve(false)
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