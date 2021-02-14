import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
                        <TableCell className={classes.tableHead}>Dificultad</TableCell>
                        <TableCell className={classes.tableHead}>Subtopic</TableCell>
                        <TableCell className={classes.tableHead}>Topic</TableCell>
                        <TableCell className={classes.tableHead}>Area</TableCell>
                        <TableCell className={classes.tableHead}>Estado</TableCell>
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
                                {row.active ? 'Habilitado' : 'Deshabilitado'}
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
                                <Link to={`/admin/excercises/update/${row._id}`}>
                                    <IconButton className={classes.modifyButton}>
                                        <CreateIcon />
                                    </IconButton>
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default ExcercisesTable
