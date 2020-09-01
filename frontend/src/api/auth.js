import { basePath, apiVersion } from './config'
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/Constants";
import jwtDecode from 'jwt-decode'

/**Obtener token de accesso encriptado */
export function getAccessTokenApi() {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    if (!accessToken || accessToken === "null") {
        return null
    }

    return willExpireToken(accessToken) ? null : accessToken
}

/**Obtener token de actualización */
export function getRefreshTokenApi() {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    if (!refreshToken || refreshToken === "null") {
        return null
    }

    return willExpireToken(refreshToken) ? null : refreshToken
}

/**Función para actualizar el token de acceso */
export function updateAccessTokenApi(refreshToken) {
    const url = `${basePath}/${apiVersion}/update-access-token`
    const bodyObj = {
        refreshToken: refreshToken
    }

    const params = {
        method: 'POST',
        body: JSON.stringify(bodyObj),
        headers: {
            "Content-Type": "application/json"
        }
    }

    fetch(url, params).then(response => {
        if (response.status !== 200) {
            return null
        } else {
            return response.json()
        }
    }).then(result => {
        if (!result) {
            logout()
        } else {
            const { accessToken, refreshToken } = result
            localStorage.setItem(ACCESS_TOKEN, accessToken)
            localStorage.setItem(REFRESH_TOKEN, refreshToken)
        }
    })
}

/**Función para cerrar sesión */
export function logout() {
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(REFRESH_TOKEN)
}

function willExpireToken(token) {
    const seconds = 60
    const metaToken = jwtDecode(token)
    const { exp } = metaToken
    const now = (Date.now() + seconds) / 1000

    return now > exp
}