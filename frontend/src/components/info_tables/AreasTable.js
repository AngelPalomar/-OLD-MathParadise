import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from './useStyles'
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton
} from "@material-ui/core"

/**Iconos */
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

/**APIs */
import { getAreasApi, deleteAreaApi } from "../../api/areas"

function AreasTable() {
    const classes = useStyles()
    const [areasData, setAreaData] = useState([])

    useEffect(() => {
        getAreasApi().then(response => {
            setAreaData(response.areas)
        })
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>Nombre del área (Materia)</TableCell>
                            <TableCell className={classes.tableHead}>Estado</TableCell>
                            <TableCell className={classes.tableHead}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {areasData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component='th' scope='row'>
                                    {row.name}
                                </TableCell>
                                <TableCell component='th' scope='row'>
                                    {row.active ? 'Habilitado' : 'Deshabilitado'}
                                </TableCell>
                                <TableCell component='th' scope='row' align="center">
                                    <IconButton
                                        className={classes.deleteButton}
                                        onClick={() => {
                                            deleteAreaApi(row._id).then()
                                            window.location.reload()
                                        }}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <Link to={`/admin/areas/update/${row._id}`}>
                                        <IconButton
                                            className={classes.modifyButton}>
                                            <CreateIcon />
                                        </IconButton>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default AreasTable
