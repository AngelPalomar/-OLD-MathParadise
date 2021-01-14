/**Colores */

export function MATH_COLORS() {
    return {
        //General
        math_blue: '#2A55FF',
        math_blue_dark: '#1443FF',

        math_blue_secondary: '#15FFD4',
        math_blue_secondary_dark: '#15EED7',

        math_disabled: '#A1A1A1',
        math_disabled_label: '#818284',
        math_disabled_dark: '#959595',

        math_success: '#00B76F',
        math_success_dark: '#00AA66',

        math_error: '#FF2942',
        math_error_dark: '#FF142F',

        math_warning: '#FF8D29',
        math_warning_dark: '#FF8114',

        //Gamemodes
        math_classic: '#388659',
        math_arcade: '#6A041D',
        math_rush: '#00487C',

        math_classic_base: '#2A9134',
        math_classic_base_dark: '#247D2D',
        math_arcade_base: '#C80057',
        math_arcade_base_dark: '#B90050',
        math_rush_base: '#0063D3',
        math_rush_base_dark: '#005BC2'
    }
}

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
        event_tile: `linear-gradient(${deg}deg, #0D001A, #330063)`
    }
}