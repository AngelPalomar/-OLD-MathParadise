import React, { useState, useEffect } from 'react'
import { useStyles } from './useStyles'
import {
    Table, TableBody, TableCell, TableContainer, TableHead,
    TableRow, Paper, IconButton
} from "@material-ui/core"

/**Componentes */
import UpdateArea from '../forms/UpdateArea'

/**Iconos */
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

/**APIs */
import { getAreasApi, deleteAreaApi } from "../../api/areas"

function AreasTable() {
    const classes = useStyles()
    const [areasData, setAreaData] = useState([])
    //Panel
    const [selectedItem, setSelectedItem] = useState(0)
    const [openPanel, setOpenPanel] = useState(false)

    useEffect(() => {
        getAreasApi().then(response => {
            setAreaData(response.areas)
        })
    }, [])

    //Panel de modificación
    const handlerPanel = () => {
        setOpenPanel(!openPanel)
    }

    return (
        <>
            <UpdateArea open={openPanel} handler={handlerPanel} values={areasData[selectedItem]} />
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.tableHead}>Nombre del área (Materia)</TableCell>
                            <TableCell className={classes.tableHead}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {areasData.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component='th' scope='row'>
                                    {row.name}
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
                                    <IconButton
                                        className={classes.modifyButton}
                                        onClick={() => {
                                            setSelectedItem(index)
                                            handlerPanel()
                                        }}>
                                        <CreateIcon />
                                    </IconButton>
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
