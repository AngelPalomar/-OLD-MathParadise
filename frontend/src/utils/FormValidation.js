export function minLenghtValidation(inputData, minLength) {
    if (inputData.length >= minLength) {
        return true
    } else {
        return false
    }
}

export function emailValidation(inputData) {
    const emailValid = /^([a-zA-Z0-9_.])+@(([a-zA-Z0-9])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const { value } = inputData

    const resultValidation = emailValid.test(value)

    if (resultValidation) {
        return true
    } else {
        return false
    }
}

export function nicknameValidation(inputData) {
    const nicknameRegex = /^([a-zA-Z0-9_.])+([[a-zA-Z0-9_.])+([a-zA-Z0-9_.])+$/
    const { value } = inputData

    const result = nicknameRegex.test(value)

    if (!result) {
        return false
    } else {
        //Máximo de escritura
        if (value.length > 20) {
            return false
        } else {
            return true
        }
    }
}