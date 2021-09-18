import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from './useStyles'
import {
    LinearProgress,
    IconButton,
    Typography
} from "@material-ui/core"
import { DataGrid, GridToolbar } from '@material-ui/data-grid'

/**Componentes */
import Notification from '../Notification'

/**Iconos */
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CancelIcon from '@material-ui/icons/Cancel'

/**APIs */
import { getAreasApi, deleteAreaApi } from "../../api/areas"

function AreasTable() {
    const classes = useStyles()
    let areaList = []

    const [areasData, setAreaData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [reload, setReload] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Nombre', width: 500 },
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
            width: 150,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/areas/update/${params.getValue(params.id, "id")}`}>
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
        getAreasApi().then(response => {
            response.areas.forEach(value => {
                areaList.push({ ...value, id: value._id })
                return null
            })

            setAreaData(areaList)
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
                title="Eliminar área"
                onAccept={() => {
                    deleteAreaApi(selectedId).then()
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

export default AreasTable
