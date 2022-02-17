import React from 'react'
import {
    Typography, Accordion, AccordionSummary,
    AccordionDetails,
    Divider
} from '@material-ui/core';
import { useStyles } from './useStyles'

//Icons
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

//Components
import Footer from '../../components/Footer'
import PublicHeader from '../../components/PublicHeader'

//Images
import arcade from '../../assets/images/screenshots/arcade.png';
import clasico from '../../assets/images/screenshots/clasico.png';
import contrasena from '../../assets/images/screenshots/contrasena.png';
import crear_cuenta from '../../assets/images/screenshots/crear_cuenta.png';
import historial from '../../assets/images/screenshots/historial.png';
import iniciar_sesion from '../../assets/images/screenshots/iniciar_sesion.png';
import lobby from '../../assets/images/screenshots/lobby.png';
import panel_general from '../../assets/images/screenshots/panel_general.png';
import perfil from '../../assets/images/screenshots/perfil.png';
import resultados from '../../assets/images/screenshots/resultados.png';
import rush from '../../assets/images/screenshots/rush.png';
import selector_modos from '../../assets/images/screenshots/selector_modos.png';
import tablas_clasificacion from '../../assets/images/screenshots/tablas_clasificacion.png';

function Help() {

    const classes = useStyles();

    return (
        <div>
            <PublicHeader />
            <div className={classes.root}>
                <Typography variant='h4' gutterBottom color='primary'>Ayuda</Typography>
                <Typography gutterBottom>
                    ¿En qué podemos ayudarte? Aquí tienes información sobre el uso de las secciones
                    de Math Paradise.
                </Typography>
                <div className={classes.accordionContainer}>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6' className={classes.heading}>Cuenta</Typography>
                            <Typography color='textSecondary' className={classes.secondaryHeading}>
                                Inicio de sesión, crear cuenta.
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Typography className={classes.subtitle} gutterBottom>Iniciar sesión</Typography>
                            <Typography>
                                Para iniciar sesión con una cuenta registrada, se necesita
                                contar con una dirección de correo electrónico y una contraseña
                                definida en la creación de la cuenta e ingresarlos en los campos
                                correspondientes.
                            </Typography>
                            <img
                                src={iniciar_sesion}
                                alt='iniciar_sesion.png'
                                className={classes.image} />
                            <Divider className={classes.divider} />
                            <Typography className={classes.subtitle} gutterBottom>Crear cuenta</Typography>
                            <Typography>
                                Para crear una cuenta, se necesitan de ciertos campos, como una
                                dirección de correo electrónico, una contraseña, un alias (nickname)
                                que solo acepta letras, números, guiones medios, bajos y puntos,
                                además de una institución de procedencia y un grado escolar que se
                                esté cursando.
                            </Typography>
                            <Typography>
                                Antes de unirse a Math Paradise, se debe seleccionar el rol que usted sea,
                                como profesor o como estudiante.
                            </Typography>
                            <img
                                src={crear_cuenta}
                                alt='crear_cuenta.png'
                                className={classes.image} />
                            <Divider className={classes.divider} />
                            <Typography className={classes.subtitle} gutterBottom>Cambio de contraseña</Typography>
                            <Typography>
                                Para cambiar la contraseña desde el perfil, se tiene que dirigir
                                al panel de configuración; en la parte inferior se debe ingresar
                                la antigüa contraseña, y confirmar la nueva contraseña.
                                Para completar el proceso, se debe presionar el botón de guardar.
                            </Typography>
                            <img
                                src={contrasena}
                                alt='contrasena.png'
                                className={classes.image} />
                            <Typography>
                                Si se olvidó de la contraseña, en el panel de inicio de sesión,
                                encontrará un apartado para recuperar la contraseña, para ello,
                                se deberá ingresar la dirección del correo electrónico.
                            </Typography>
                            <img
                                src={crear_cuenta}
                                alt='crear_cuenta.png'
                                className={classes.image} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6' className={classes.heading}>Panel general</Typography>
                            <Typography color='textSecondary' className={classes.secondaryHeading}>
                                Usuario, estadísticas.
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Typography>
                                El panel general muestra el usuario actual, junto con las estadísticas
                                de juego.
                            </Typography>
                            <Typography>
                                En las estadísticas del Modo Clásico y el Modo Arcade, muestra la puntuación
                                máxima alcanzada, la cantidad total de ejercicios correctos y
                                contestados erróneamente, además del número de victorias y derrotas.
                            </Typography>
                            <Typography>
                                Por último, las estadísticas del Modo Rush, muestran la puntuación, el multiplicador
                                y el nivel máximo.
                            </Typography>
                            <img
                                src={panel_general}
                                alt='panel_general.png'
                                className={classes.image} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6' className={classes.heading}>Perfil</Typography>
                            <Typography color='textSecondary' className={classes.secondaryHeading}>
                                Ver y editar perfil.
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Typography>
                                La sección del perfil de usuario es pública y cualquiera puede
                                ver cierta información como la de la imagen, estos datos son:
                                el nombre y apellido, el alias, la institución de procedencia
                                y las puntuaciones máximas.
                            </Typography>
                            <img
                                src={perfil}
                                alt='perfil.png'
                                className={classes.image} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6' className={classes.heading}>Modos de juego</Typography>
                            <Typography color='textSecondary' className={classes.secondaryHeading}>
                                Áreas de aprendizaje, ¿cómo jugar?
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Typography className={classes.subtitle} gutterBottom>Crear y unierse a una partida</Typography>
                            <Typography>
                                Aquí se puede seleccionar un modo de juego para crear una partida
                                respectiva, se pueden configurar áreas (materias), la dificultad y la
                                meta para ganar; actualmente hay tres modos de juego: Clásico, Arcade y Rush.
                            </Typography>
                            <img
                                src={selector_modos}
                                alt='selector_modos.png'
                                className={classes.image} />
                            <Typography>
                                Para crear una partida, solamente deberás cofigurar este modo de juego, en los
                                modos Clásico y Arcade, al momento de presionar el botón de jugar, te enviará al
                                lobby de emparejamiento, donde deberás pasarle tu PIN de partida a un amigo para
                                empezar, tu amigo deberá ingresar dicho PIN en la casilla que indica "Ingres PIN".
                                Una vez encontrada la partida, se podrá dar inicio al juego.
                            </Typography>
                            <img
                                src={lobby}
                                alt='lobby.png'
                                className={classes.image} />
                            <Divider className={classes.divider} />
                            <Typography className={classes.subtitle} gutterBottom>Modo Clásico</Typography>
                            <Typography>
                                Para jugar el Modo Clásico, deberás obtener más puntos
                                que tu oponente, contestando ejercicios.
                                <br />
                                <br />
                                En el centro encontrarás un panel donde se visualizarán tus
                                puntos junto a los de tu contrincante.
                                <br />
                                <br />
                                Finalmente en la parte inferior, econtrarás un contador de
                                vueltas, el numero de la izquierda son del jugador 1 (creador de la partida)
                                y los de la derecha, los del jugador 2 (contrincante).
                                <br />
                                <br />
                                Al dar al botón (Tirar), el dado arrojará un número aleatorio, que
                                moverá tu ficha (Foto de perfil) el número de casillas representadas
                                por el dado.
                                <br />
                                <br />
                                Al caer en una casilla, arrojará un ejercicio de opción múltiple
                                del tema de la casilla.
                                <br />
                                <br />
                                Hay varios tipos de casillas, las casillas de las esquinas son especiales,
                                y las demás, son solo casillas de ejercicios.
                                <br />
                                <br />
                                Al visualizar el ejercicio, este te mostrará el subtema, el ejercicio
                                y cuatro opciones, dependiendo de la dificultad, tendrás un tiempo
                                límite para contestarlo.
                                <br />
                                <br />
                                <span style={{ fontWeight: 'bold' }}>TIPOS DE CASILLA</span>
                                <br />
                                <br />
                                - Normal: Te mostrará un ejercicio dependiendo de su tema.
                                <br />
                                - Ejercicio Random: Te mostrará un ejercicio aleatorio.
                                <br />
                                - Reto: Mostrará un ejercicio al azar, pero el cronómetro irá el doble de
                                rápido, si lo contestas de forma errónea, te bajará 150 puntos.
                                <br />
                                - Evento: Te soltará una bonificación o penalización, dependiendo del evento al azar.
                                <br />
                                <br />
                                Para ganar puntos, obtendrás 1000 puntos si contestas en menos de 5 segundos,
                                500 en menos de 15 segundos, y 100 puntos, si contestas correctamente, no
                                obtendrás puntos si contestas mal.
                                <br />
                                <br />
                                El juego termina cuando los dos jugadores completan las vueltas seleccionadas.
                                <br />
                                <br />
                                <span style={{ fontWeight: 'bold' }}>
                                    GANA EL JUGADOR QUE TENGA MÁS PUNTOS.
                                </span>
                            </Typography>
                            <img
                                src={clasico}
                                alt='clasico.png'
                                className={classes.image} />
                            <Divider className={classes.divider} />
                            <Typography className={classes.subtitle} gutterBottom>Modo Arcade</Typography>
                            <Typography>
                                Para jugar el Modo Arcade, deberás obtener más puntos
                                que tu oponente, contestando ejercicios aleatorios.
                                <br />
                                <br />
                                En la parte izquierda un panel donde se visualizarán tus
                                puntos junto a los de tu contrincante.
                                <br />
                                <br />
                                Finalmente en la parte inferior, econtrarás un contador de
                                turnos, el numero de la izquierda son del jugador 1 (creador de la partida)
                                y los de la derecha, los del jugador 2 (contrincante).
                                <br />
                                <br />
                                Al dar al botón (Tirar), empezará a seleccionarse una casilla al azar
                                de todo el tablero, el tiempo de giro es aleatorio.
                                <br />
                                <br />
                                Al caer en una casilla, arrojará un ejercicio de opción múltiple
                                del tema de la casilla.
                                <br />
                                <br />
                                Hay varios tipos de casillas, las casillas de las esquinas son especiales,
                                y las demás, son solo casillas de ejercicios.
                                <br />
                                <br />
                                Al visualizar el ejercicio, este te mostrará el subtema, el ejercicio
                                y cuatro opciones, dependiendo de la dificultad, tendrás un tiempo
                                límite para contestarlo.
                                <br />
                                <br />
                                <span style={{ fontWeight: 'bold' }}>TIPOS DE CASILLA</span>
                                <br />
                                <br />
                                - Normal: Te mostrará un ejercicio dependiendo de su tema.
                                <br />
                                - Ejercicio Random: Te mostrará un ejercicio aleatorio.
                                <br />
                                - Reto: Mostrará un ejercicio al azar, pero el cronómetro irá el doble de
                                rápido, si lo contestas de forma errónea, te bajará 150 puntos.
                                <br />
                                <br />
                                Para ganar puntos, obtendrás 1000 puntos si contestas en menos de 5 segundos,
                                500 en menos de 15 segundos, y 100 puntos, si contestas correctamente, no
                                obtendrás puntos si contestas mal.
                                <br />
                                <br />
                                El juego termina cuando los dos jugadores completan sus turnos seleccionados.
                                <br />
                                <br />
                                <span style={{ fontWeight: 'bold' }}>
                                    GANA EL JUGADOR QUE TENGA MÁS PUNTOS.
                                </span>
                            </Typography>
                            <img
                                src={arcade}
                                alt='arcade.png'
                                className={classes.image} />
                            <Divider className={classes.divider} />
                            <Typography className={classes.subtitle} gutterBottom>Modo Rush</Typography>
                            <Typography>
                                Para jugar el Modo Rush, deberás contestar tantos
                                ejercicios matemáticos puedas en un plazo de un minuto.
                                <br />
                                <br />
                                En el centro encontrarás el indicador del nivel actual,
                                el número de ejercicio, la puntuación y el multiplicador.
                                <br />
                                <br />
                                Finalmente en el lado izquierdo tendrás el panel que muestra
                                el tema, el ejercicio correspondiente, un campo de texto, un botón
                                para responder y un cronómetro regresivo.
                                <br />
                                <br />
                                Cuando respondas un ejercicio y sea correcto, avanzarás al
                                siguiente tema y aumentará 5 segundos a tu cronómetro,
                                si respondes mal, quedarás estancado en ese
                                ejercicio hasta que ingreses la respuesta correcta.
                                <br />
                                Cuando completes los cuatro temas, regresarás al primero
                                pero aumentará tu nivel, aumentando así la dificultad de los
                                ejercicios.
                                <br />
                                <br />
                                Si contestas rápido muchos ejercicios, aumentarás tu acumulador
                                por cada ejercicio, si lo completas, tu multiplicador de puntos
                                aumentará por cada ejercicio, perderás tu racha en el acumulador
                                si dejas de contestar por 4 segundos, o si respondes mal.
                                <br />
                                <br />
                                Ganarás puntos por cada ejercicio contestado correctamente de
                                acuerdo a tu multiplicador (5 puntos &times; multiplicador)
                                <br />
                                <br />
                                La partida termina cuando el cronómetro llegue a cero.
                            </Typography>
                            <img
                                src={rush}
                                alt='rush.png'
                                className={classes.image} />
                            <Divider className={classes.divider} />
                            <Typography className={classes.subtitle} gutterBottom>Resultados</Typography>
                            <Typography>
                                Al terminar una partida, aparecerá una pantalla con los resultados y estadísticas
                                de la partida, mostrará el ganador (en caso de los primeros dos modos de juego), los
                                ejercicios contestados, correctos, incorrectos, el nivel y la puntuación final.
                            </Typography>
                            <img
                                src={resultados}
                                alt='resultados.png'
                                className={classes.image} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6' className={classes.heading}>Tablas de clasificación</Typography>
                            <Typography color='textSecondary' className={classes.secondaryHeading}>
                                Puntuaciones, clasificación.
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Typography>
                                El apartado de tablas de puntuaciones muestran a los 10 jugadores con
                                las mejores puntuaciones en los tres modos de juego.
                            </Typography>
                            <img
                                src={tablas_clasificacion}
                                alt='tablas_clasificacion.png'
                                className={classes.image} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant='h6' className={classes.heading}>Historial de partidas</Typography>
                            <Typography color='textSecondary' className={classes.secondaryHeading}>
                                Detalles de partidas jugadas, retroalimentación.
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Typography>
                                En el menú de historial de partidas, se podrán consultar las últimas
                                15 partidas jugadas con sus respectivos resultados, como puntuaciones y
                                cantidad de ejercicios, así como contrincantes.
                            </Typography>
                            <img
                                src={historial}
                                alt='historial.png'
                                className={classes.image} />
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Help