//import { getAccessTokenApi } from './auth'
import { basePath, apiVersion } from './config'

export function getDefaultBoardApi(area) {
    const url = `${basePath}/${apiVersion}/get-default-classic-board?area=${area}`
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }

    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }, (err) => {
        return err.message
    })
}