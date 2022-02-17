import { basePath, apiVersion } from './config'
import { getAccessTokenApi } from './auth'

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

export function createUserApi(data) {
    const url = `${basePath}/${apiVersion}/create-user`
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

export function updatePasswordApi(data, id) {
    const url = `${basePath}/${apiVersion}/update-password/${id}`
    const params = {
        method: 'PUT',
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
    const url = `${basePath}/${apiVersion}/get-user/${id}`
    const params = {
        method: 'POST',
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

export function getUserByIdApi(id) {
    const url = `${basePath}/${apiVersion}/get-user-id/${id}`
    const params = {
        method: 'GET',
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


export function getAllUsersApi() {
    const url = `${basePath}/${apiVersion}/get-all-users`
    const params = {
        method: 'GET',
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

/**Modificar datos con pass de un usuario */
export function updateFullUserApi(userData, userId) {
    const url = `${basePath}/${apiVersion}/update-full-user/${userId}`
    const params = {
        method: 'PUT',
        body: JSON.stringify(userData),
        headers: {
            "Content-Type": "application/json",
            Authorization: getAccessTokenApi()
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

export function uploadAvatarApi(avatar, id) {
    const url = `${basePath}/${apiVersion}/upload-avatar/${id}`

    //para archivos
    const formData = new FormData()
    formData.append("avatar", avatar, avatar.name)

    const params = {
        method: 'PUT',
        body: formData,
        headers: {
            //"Content-Type": "application/json",
            //Authorization: getAccessTokenApi()
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

export function getAvatarApi(avatarName) {
    const url = `${basePath}/${apiVersion}/get-avatar/${avatarName}`

    return fetch(url)
        .then(response => {
            return response.url
        }).catch(err => {
            return err.message
        })
}

export function getRushLeaderboardApi() {
    const url = `${basePath}/${apiVersion}/get-rush-leaderboard`
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: getAccessTokenApi()
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

export function getClassicLeaderboardApi() {
    const url = `${basePath}/${apiVersion}/get-classic-leaderboard`
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: getAccessTokenApi()
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

export function getArcadeLeaderboardApi() {
    const url = `${basePath}/${apiVersion}/get-arcade-leaderboard`
    const params = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            Authorization: getAccessTokenApi()
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

export function deleteUserApi(id) {
    const url = `${basePath}/${apiVersion}/delete-user/${id}`
    const params = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
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

export function createToken(data) {
    const url = `${basePath}/${apiVersion}/create-token`
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
    }).catch(err => {
        return err.message
    })
}

export function passwordReset(data) {
    const url = `${basePath}/${apiVersion}/password-reset`
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
    }).catch(err => {
        return err.message
    })
}