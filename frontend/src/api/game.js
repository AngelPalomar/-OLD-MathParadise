import { basePath, apiVersion } from './config'
//import { getAccessTokenApi } from './auth'

export function createGameApi(data) {
    const url = `${basePath}/${apiVersion}/create-game`
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

export function getGameByPinApi(pin) {
    const url = `${basePath}/${apiVersion}/get-game-pin?pin=${pin}`
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

export function joinGameApi(data, pin) {
    const url = `${basePath}/${apiVersion}/join-game?pin=${pin}`
    const params = {
        method: 'PUT',
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

export function updateGameApi(data, pin) {
    const url = `${basePath}/${apiVersion}/update-game?pin=${pin}`
    const params = {
        method: 'PUT',
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