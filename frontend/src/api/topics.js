import { basePath, apiVersion } from './config'

export function getTopicsApi(query = '') {
    const url = `${basePath}/${apiVersion}/get-topics?${query}`
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }

    /**Petición fetch */
    return fetch(url, params).then(response => {
        return response.json()
    })
        .then(result => {
            return result
        })
        .catch(err => {
            return err.message
        })
}

export function createTopicApi(data) {
    const url = `${basePath}/${apiVersion}/create-topic`
    const params = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    /**Petición fetch */
    return fetch(url, params).then(response => {
        return response.json()
    })
        .then(result => {
            return result
        })
        .catch(err => {
            return err.message
        })
}

export function deleteTopicApi(id) {
    const url = `${basePath}/${apiVersion}/delete-topic/${id}`
    const params = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        }
    }

    /**Petición fetch */
    return fetch(url, params).then(response => {
        return response.json()
    })
        .then(result => {
            return result
        })
        .catch(err => {
            return err.message
        })
}