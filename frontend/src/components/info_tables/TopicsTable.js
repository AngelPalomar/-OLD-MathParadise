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
import { getTopicsApi, deleteTopicApi } from "../../api/topics"

function TopicsTable() {
    const classes = useStyles()
    const [areasData, setAreaData] = useState([])

    useEffect(() => {
        getTopicsApi().then(response => {
            setAreaData(response.topics)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>Nombre del tema</TableCell>
                        <TableCell className={classes.tableHead}>Nombre del area</TableCell>
                        <TableCell className={classes.tableHead}>Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {areasData.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component='th' scope='row'>
                                {row.name}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {row.area}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <IconButton
                                    className={classes.deleteButton}
                                    onClick={() => {
                                        deleteTopicApi(row._id).then()
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

export default TopicsTable
