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

/**Obtener datos de un usuario */
export function getUserApi(token, id) {
    const url = `${basePath}/${apiVersion}/get-user`
    const params = {
        method: 'POST',
        body: JSON.stringify(id),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
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

/**Buscar usuario por nickname */
export function getUserByNicknameApi(nickname) {
    const url = `${basePath}/${apiVersion}/get-user-nickname/${nickname}`
    const params = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        }
    }

    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err.message
    })
}

/**Modificar datos de un usuario */
export function updateUserApi(token, userData, userId) {
    const url = `${basePath}/${apiVersion}/update-user/${userId}`
    const params = {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
            Authorization: token
        }
    }

    return fetch(url, params).then(response => {
        return response.json()
    }).then(result => {
        return result
    }).catch(err => {
        return err.message
    })
}