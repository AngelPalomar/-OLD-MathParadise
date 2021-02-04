import { basePath, apiVersion } from './config'

export function createSubtopicApi(data) {
    const url = `${basePath}/${apiVersion}/create-subtopic`
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

export function getTSubtopicsApi(query = '') {
    const url = `${basePath}/${apiVersion}/get-subtopics?${query}`
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

export function deleteTSubtopicApi(id) {
    const url = `${basePath}/${apiVersion}/delete-subtopic/${id}`
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