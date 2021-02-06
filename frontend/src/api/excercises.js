import { basePath, apiVersion } from './config'

export function createExcercise(data) {
    const url = `${basePath}/${apiVersion}/create-excercise`
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

export function getRandomExcerciseApi(area, subtopic, difficulty) {
    const url = `${basePath}/${apiVersion}/get-random-excercise?difficulty=${difficulty}&subtopic=${subtopic}&area=${area}`
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

export function getExcercisesApi() {
    const url = `${basePath}/${apiVersion}/get-excercises`
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

export function deleteExcerciseApi(id) {
    const url = `${basePath}/${apiVersion}/delete-excercise/${id}`
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