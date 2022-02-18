import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from './useStyles'
import {
    IconButton, LinearProgress, Typography
} from "@material-ui/core"
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

/**Componentes */
import Notification from '../common/Notification'

/**Iconos */
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'

/**APIs */
import { getTSubtopicsApi, deleteTSubtopicApi } from "../../api/subtopics"

function SubtopicsTable() {
    const classes = useStyles()

    let subtList = []
    const [areasData, setAreaData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [reload, setReload] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Nombre', width: 212 },
        { field: 'topic', headerName: 'Tema', width: 110 },
        { field: 'area', headerName: 'Área', width: 110 },
        { field: 'displayLabel', headerName: 'Texto de casilla', width: 120 },
        {
            field: 'symbol',
            headerName: 'Símbolo',
            renderCell: (params) => (
                <InlineMath math={`${params.getValue(params.id, "symbol")}`} />
            ),
            width: 150
        },
        {
            field: 'active',
            headerName: 'Estado',
            renderCell: (params) => (
                params.getValue(params.id, 'active') ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CheckCircleIcon style={{ color: '#00B76F' }} />
                        <span style={{ marginLeft: 5 }}>Activo</span>
                    </div> :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CancelIcon style={{ color: '#FF2942' }} />
                        <span style={{ marginLeft: 5 }}>Inactivo</span>
                    </div>
            ),
            width: 150
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 130,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/subtopics/update/${params.getValue(params.id, "id")}`}>
                        <IconButton className={classes.modifyButton}>
                            <CreateIcon style={{ fontSize: 16 }} />
                        </IconButton>
                    </Link>
                    <IconButton
                        className={classes.deleteButton}
                        onClick={() => {
                            setOpen(true)
                            setSelectedId(params.getValue(params.id, "id"))
                        }}>
                        <DeleteIcon style={{ fontSize: 16 }} />
                    </IconButton>
                </Fragment>
            )
        }
    ]

    useEffect(() => {
        getTSubtopicsApi().then(response => {
            response.subtopics.forEach(value => {
                subtList.push({ ...value, id: value._id })
            })

            setAreaData(subtList)
            setIsLoading(false)
        })

        setReload(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reload])

    return (
        <Fragment>
            <Notification
                open={open}
                onClose={() => setOpen(false)}
                title="Eliminar subtema"
                onAccept={() => {
                    deleteTSubtopicApi(selectedId).then()
                    setOpen(false)
                    setReload(true)
                }}>
                <Typography>¿Estás seguro de querer eliminar este elemento?</Typography>
            </Notification>
            <div style={{ height: 400 }}>
                <DataGrid
                    columns={columns}
                    rows={areasData}
                    pageSize={25}
                    disableSelectionOnClick
                    loading={isLoading}
                    components={{
                        LoadingOverlay: LinearProgress,
                        Toolbar: GridToolbar
                    }} />
            </div>
        </Fragment>
    )
}

export default SubtopicsTable
