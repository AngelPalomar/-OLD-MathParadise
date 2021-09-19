import { basePath, apiVersion } from './config'
//import { getAccessTokenApi } from './auth'

export function createHistoryApi(data) {
    const url = `${basePath}/${apiVersion}/history`
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
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

export function getHistoryByNicknameApi(nickname) {
    const url = `${basePath}/${apiVersion}/history/${nickname}`
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