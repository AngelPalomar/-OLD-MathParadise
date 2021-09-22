export function es_DateName(date) {
    const dateToFormat = new Date(date);
    const day = dateToFormat.getDate()
    const month = dateToFormat.getMonth() + 1
    const year = dateToFormat.getFullYear()

    return `${day} ${esMonth(month)}, ${year}`
}

function esMonth(numberMonth) {
    switch (numberMonth) {
        case 1: return 'Enero';
        case 2: return 'Febrero';
        case 3: return 'Marzo';
        case 4: return 'Abril';
        case 5: return 'Mayo';
        case 6: return 'Junio';
        case 7: return 'Julio';
        case 8: return 'Agosto';
        case 9: return 'Septiembre';
        case 10: return 'Octubre';
        case 11: return 'Noviembre';
        case 12: return 'Diciembre';

        default:
            break;
    }
}