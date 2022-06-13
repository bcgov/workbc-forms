import { stringify } from "querystring";
import { fetchUtils } from "react-admin";

const apiUrl = 'http://localhost:8000';
const countHeader = "Content-Range"
const httpClient = fetchUtils.fetchJson


export const dataProvider = {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage - 1;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([rangeStart, rangeEnd]),
            filter: JSON.stringify(params.filter),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const options =
            countHeader === 'Content-Range'
                ? {
                    // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                    headers: new Headers({
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        Range: `${resource}=${rangeStart}-${rangeEnd}`,
                    }),
                }
                : {};

        return httpClient(url, options).then(({ headers, json }) => {
            if (typeof(headers) === "undefined"  || !headers.has(countHeader)) {
                throw new Error(
                    `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                );
            }
            const range = headers.get(countHeader.toLowerCase()) || "0"
            const total = range.split("/").pop() || "0"
            console.log(total)
            return {
                data: json,
                total: parseInt(total, 10)
            };
        });
    },
    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            headers: new Headers({
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            })
        }).then(({ json }) => ({
            data: json,
        })),
    getMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids }),
        }
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        return httpClient(url, {
            headers: new Headers({
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            })
        }).then(({ json }) => ({ data: json }));
    },
    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;

        const rangeStart = (page - 1) * perPage;
        const rangeEnd = page * perPage - 1;

        const query = {
            sort: JSON.stringify([field, order]),
            range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
            filter: JSON.stringify({
                ...params.filter,
                [params.target]: params.id,
            }),
        };
        const url = `${apiUrl}/${resource}?${stringify(query)}`;
        const options =
            countHeader === 'Content-Range'
                ? {
                    // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
                    headers: new Headers({
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        Range: `${resource}=${rangeStart}-${rangeEnd}`,
                    }),
                }
                : {};
        return httpClient(url, options).then(({ headers, json }) => {
            if (typeof(headers) === "undefined" || !headers.has(countHeader)) {
                throw new Error(
                    `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`
                );
            }
            const range = headers.get(countHeader.toLowerCase()) || "0"
            const total = range.split("/").pop() || "0"
            return {
                data: json,
                total: parseInt(total,10)
            };
        });
    },
    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
            headers: new Headers({
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            })
        }).then(({ json }) => ({
            data: { ...params.data, id: json.id },
        })),
    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
            headers: new Headers({
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`
            })
        }).then(({ json }) => ({ data: json })),
    //fallback to calling update many times
    updateMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'PUT',
                    body: JSON.stringify(params.data),
                    headers: new Headers({
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    })
                })
            )
        ).then(responses => ({ data: responses.map(({ json }) => json.id) })),
    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`, {
            method: 'DELETE',
            headers: new Headers({
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": 'text/plain',
            }),
        }).then(({ json }) => ({ data: json })),
    //fallback to calling delete many times
    deleteMany: (resource, params) =>
        Promise.all(
            params.ids.map(id =>
                httpClient(`${apiUrl}/${resource}/${id}`, {
                    method: 'DELETE',
                    headers: new Headers({
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": 'text/plain',
                    }),
                })
            )
        ).then(responses => ({
            data: responses.map(({ json }) => json.id),
        })),
};
