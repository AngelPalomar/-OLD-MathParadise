/**Degradados */

export function MATH_GRADIENTS(deg = 45) {
    return {
        default: `linear-gradient(${deg}deg, #2A55FF, #15FFD4)`,
        error: `linear-gradient(${deg}deg, #73000D, #FF0008)`,
        disabled: `linear-gradient(${deg}deg, #515151, #A1A1A1)`,
        classic: `linear-gradient(${deg}deg, #388659, #98CE00)`,
        arcade: `linear-gradient(${deg}deg, #6A041D, #FF006E)`,
        rush: `linear-gradient(${deg}deg, #00487C, #2A8EFF)`,
        start_tile: `linear-gradient(${deg}deg, #D4145A, #ED1C24)`,
        random_exc_tile: `linear-gradient(${deg}deg, #8CC63F, #006837)`,
        challenge_tile: `linear-gradient(${deg}deg, #29CBD1, #2A7BD1)`,
        event_tile: `linear-gradient(${deg}deg, #0D001A, #330063)`,
        winner: `linear-gradient(${deg}deg, #FFBE0B, #FFE80A)`
    }
}