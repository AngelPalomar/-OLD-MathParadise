import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from './useStyles'
import {
    LinearProgress, IconButton, Typography
} from "@material-ui/core"
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

/**Componentes */
import Notification from '../Notification'

/**Iconos */
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'

/**APIs */
import { getExcercisesApi, deleteExcerciseApi } from "../../api/excercises"

function ExcercisesTable() {
    const classes = useStyles()

    let excList = []
    const [areasData, setAreaData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [reload, setReload] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'label',
            headerName: 'Ejercicio',
            renderCell: (params) => (
                <InlineMath math={`${params.getValue("label")}`} />
            ),
            width: 250
        },
        {
            field: 'option_a',
            headerName: 'Opción A',
            hide: true,
            renderCell: (params) => (
                <InlineMath math={`${params.getValue("option_a")}`} />
            ),
            width: 150
        },
        {
            field: 'option_b',
            headerName: 'Opción B',
            hide: true,
            renderCell: (params) => (
                <InlineMath math={`${params.getValue("option_b")}`} />
            ),
            width: 150
        },
        {
            field: 'option_c',
            headerName: 'Opción C',
            hide: true,
            renderCell: (params) => (
                <InlineMath math={`${params.getValue("option_c")}`} />
            ),
            width: 150
        },
        {
            field: 'option_d',
            headerName: 'Opción D',
            hide: true,
            renderCell: (params) => (
                <InlineMath math={`${params.getValue("option_d")}`} />
            ),
            width: 150
        },
        {
            field: 'answer',
            headerName: 'Respuesta',
            hide: true,
            renderCell: (params) => (
                <InlineMath math={`${params.getValue("answer")}`} />
            ),
            width: 150
        },
        { field: 'subtopic', headerName: 'Subtema', width: 150 },
        { field: 'topic', headerName: 'Tema', width: 130 },
        { field: 'area', headerName: 'Área', width: 100 },
        { field: 'difficulty', headerName: 'Dificultad', width: 100 },
        {
            field: 'active',
            headerName: 'Estado',
            renderCell: (params) => (
                params.getValue('active') ?
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CheckCircleIcon style={{ color: '#00B76F' }} />
                        <span style={{ marginLeft: 5 }}>Activo</span>
                    </div> :
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CancelIcon style={{ color: '#FF2942' }} />
                        <span style={{ marginLeft: 5 }}>Inactivo</span>
                    </div>
            ),
            width: 100
        },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 130,
            renderCell: (params) => (
                <div>
                    <Link to={`/admin/excercises/update/${params.getValue("id")}`}>
                        <IconButton className={classes.modifyButton}>
                            <CreateIcon style={{ fontSize: 16 }} />
                        </IconButton>
                    </Link>
                    <IconButton
                        className={classes.deleteButton}
                        onClick={() => {
                            setOpen(true)
                            setSelectedId(params.getValue("id"))
                        }}>
                        <DeleteIcon style={{ fontSize: 16 }} />
                    </IconButton>
                </div>
            )
        }
    ]

    useEffect(() => {
        getExcercisesApi().then(response => {
            response.excercises.map(value => {
                excList.push({ ...value, id: value._id })
            })

            setAreaData(excList)
            setIsLoading(false)
        })

        setReload(false)
    }, [reload])

    return (
        <Fragment>
            <Notification
                open={open}
                onClose={() => setOpen(false)}
                title="Eliminar ejercicio"
                onAccept={() => {
                    deleteExcerciseApi(selectedId).then()
                    setOpen(false)
                    setReload(true)
                }}>
                <Typography>¿Estás seguro de querer eliminar este elemento?</Typography>
            </Notification>
            <div style={{ height: 600 }}>
                <DataGrid
                    columns={columns}
                    rows={areasData}
                    pageSize={20}
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

export default ExcercisesTable
