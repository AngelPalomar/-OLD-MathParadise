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
import { getTSubtopicsApi, deleteTSubtopicApi } from "../../api/subtopics"

function SubtopicsTable() {
    const classes = useStyles()
    const [areasData, setAreaData] = useState([])

    useEffect(() => {
        getTSubtopicsApi().then(response => {
            setAreaData(response.subtopics)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>Nombre del subtema</TableCell>
                        <TableCell className={classes.tableHead}>Nombre del tema</TableCell>
                        <TableCell className={classes.tableHead}>Nombre del area</TableCell>
                        <TableCell className={classes.tableHead}>Texto de casilla</TableCell>
                        <TableCell className={classes.tableHead}>Símbolo</TableCell>
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
                                {row.topic}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {row.area}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {row.displayLabel}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <InlineMath math={row.symbol} />
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <IconButton
                                    className={classes.deleteButton}
                                    onClick={() => {
                                        deleteTSubtopicApi(row._id).then()
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

export default SubtopicsTable
