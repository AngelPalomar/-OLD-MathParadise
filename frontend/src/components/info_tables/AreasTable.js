import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper
} from "@material-ui/core"

/**APIs */
import { getAreasApi } from "../../api/areas"

function InstitutionsTable() {
    const classes = useStyles()
    const [areasData, setAreaData] = useState([])

    useEffect(() => {
        getAreasApi().then(response => {
            setAreaData(response.areas)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>Nombre del área (Materia)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {areasData.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component='th' scope='row'>
                                {row.name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default InstitutionsTable
