import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton
} from "@material-ui/core"
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

/**Iconos */
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

/**APIs */
import { getExcercisesApi, deleteExcerciseApi } from "../../api/excercises"

function ExcercisesTable() {
    const classes = useStyles()
    const [areasData, setAreaData] = useState([])

    useEffect(() => {
        getExcercisesApi().then(response => {
            setAreaData(response.excercises)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>ID</TableCell>
                        <TableCell className={classes.tableHead}>Ejercicio</TableCell>
                        <TableCell className={classes.tableHead}>A</TableCell>
                        <TableCell className={classes.tableHead}>B</TableCell>
                        <TableCell className={classes.tableHead}>C</TableCell>
                        <TableCell className={classes.tableHead}>D</TableCell>
                        <TableCell className={classes.tableHead}>Respuesta</TableCell>
                        <TableCell className={classes.tableHead}>Dificultad</TableCell>
                        <TableCell className={classes.tableHead}>Subtopic</TableCell>
                        <TableCell className={classes.tableHead}>Topic</TableCell>
                        <TableCell className={classes.tableHead}>Area</TableCell>
                        <TableCell className={classes.tableHead}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {areasData.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell component='th' scope='row'>
                                {row._id}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <InlineMath math={row.label} />
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <InlineMath math={row.option_a} />
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <InlineMath math={row.option_b} />
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <InlineMath math={row.option_c} />
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <InlineMath math={row.option_d} />
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <InlineMath math={row.answer} />
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {row.difficulty}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {row.subtopic}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {row.topic}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {row.area}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <IconButton
                                    className={classes.deleteButton}
                                    onClick={() => {
                                        deleteExcerciseApi(row._id).then()
                                        window.location.reload()
                                    }}>
                                    <DeleteIcon />
                                </IconButton>
                                <IconButton className={classes.modifyButton}>
                                    <CreateIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default ExcercisesTable
