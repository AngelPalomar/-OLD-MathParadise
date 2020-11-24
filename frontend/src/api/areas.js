import { getAccessTokenApi } from './auth'
import { basePath, apiVersion } from './config'

export function createAreaApi(data) {
    const url = `${basePath}/${apiVersion}/create-area`
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            Authorization: getAccessTokenApi()
        }
    }

    /**Petición fetch */
    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }, (err) => {
        return err.message
    })
}

export function getAreasApi() {
    const url = `${basePath}/${apiVersion}/get-areas`
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: getAccessTokenApi()
        }
    }

    /**Petición fetch */
    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }, (err) => {
        return err.message
    })
}