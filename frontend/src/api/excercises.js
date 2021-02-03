import { basePath, apiVersion } from './config'

export function getRandomExcerciseApi(area, subtopic, difficulty) {
    const url = `${basePath}/${apiVersion}/get-random-excercise?difficulty=
    ${difficulty}&subtopic=${subtopic}&area=${area}`
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