import { basePath, apiVersion } from './config'

export function getInstitutionsApi() {
    const url = `${basePath}/${apiVersion}/get-institutions`
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