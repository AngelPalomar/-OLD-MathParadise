import { basePath, apiVersion } from './config'
//import { message } from 'antd'

/**Dar de alta a usuario */
export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`
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
    }).then(result => {
        if (result.user) {
            return {
                ok: true,
                message: 'Cuenta creada correctamente'
            }
        } 
        return {
            ok: false,
            message: result.message
        }
    }).catch(err => {
        return {
            ok: false,
            message: err.message
        }
    })
}

/**Inicio de sesión */
export function loginApi(data) {
    const url = `${basePath}/${apiVersion}/login`
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