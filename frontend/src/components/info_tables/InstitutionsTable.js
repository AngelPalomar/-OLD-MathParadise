import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper
} from "@material-ui/core"

/**APIs */
import { getInstitutionsApi } from "../../api/institution"

function InstitutionsTable() {
    const classes = useStyles()
    const [instData, setTnstData] = useState([])

    useEffect(() => {
        getInstitutionsApi().then(response => {
            setTnstData(response.institution)
        })
    }, [])

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className={classes.tableHead}>Nombre de la institución</TableCell>
                        <TableCell className={classes.tableHead}>Abreviatura</TableCell>
                        <TableCell className={classes.tableHead}>Tipo</TableCell>
                        <TableCell className={classes.tableHead}>Ciudad</TableCell>
                        <TableCell className={classes.tableHead}>País</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {instData.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component='th' scope='row'>
                                {row.name}
                            </TableCell>
                            <TableCell>{row.abbrev}</TableCell>
                            <TableCell>{row.type}</TableCell>
                            <TableCell>{row.city}</TableCell>
                            <TableCell>{row.country}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )
}

export default InstitutionsTable
