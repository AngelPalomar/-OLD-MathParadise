import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton
} from "@material-ui/core"

/**Iconos */
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

/**APIs */
import { getAllUsersApi } from "../../api/user"

function UsersTable() {
    const classes = useStyles()
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsersApi().then(response => {
            setUsers(response.users)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>Nombre</TableCell>
                        <TableCell className={classes.tableHead}>Alias</TableCell>
                        <TableCell className={classes.tableHead}>Correo Electrónico</TableCell>
                        <TableCell className={classes.tableHead}>Institución</TableCell>
                        <TableCell className={classes.tableHead}>Grado escolar</TableCell>
                        <TableCell className={classes.tableHead}>Rol</TableCell>
                        <TableCell className={classes.tableHead}>Estado</TableCell>
                        <TableCell className={classes.tableHead}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <TableRow key={row.email}>
                            <TableCell component='th' scope='row'>
                                {row.name + " " + row.lastname}
                            </TableCell>
                            <TableCell>{row.nickname}</TableCell>
                            <TableCell>{row.email}</TableCell>
                            <TableCell>{row.institution}</TableCell>
                            <TableCell>{row.school_grade}</TableCell>
                            <TableCell>{row.role}</TableCell>
                            <TableCell>{row.active ? "Activo" : "Inactivo"}</TableCell>
                            <TableCell component='th' scope='row'>
                                <IconButton className={classes.deleteButton}>
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

export default UsersTable
