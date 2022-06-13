export interface UserPermissions {
    hasAccess: boolean,
    catchments: number[],
    isIDIR: boolean
}

export interface OESAccessDefinition {
    Application: string,
    Catchment: string,
    CatchmentDescription: string,
    Group: string,
    Permission: number,
    PermissionsCode: string,
    Role: string
}
