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