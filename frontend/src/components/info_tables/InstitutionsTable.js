import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from './useStyles'
import {
    LinearProgress, IconButton, Typography
} from "@material-ui/core"
import { DataGrid, GridToolbar } from '@material-ui/data-grid'

/**Componentes */
import Notification from '../common/Notification'

/**Iconos */
import DeleteIcon from '@material-ui/icons/Delete'
import CreateIcon from '@material-ui/icons/Create'

/**APIs */
import { getInstitutionsApi, deleteInstitutionApi } from "../../api/institution"

function InstitutionsTable() {
    const classes = useStyles()

    let instList = []
    const [instData, setTnstData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [reload, setReload] = useState(false)

    const columns = [
        { field: 'id', headerName: 'ID', width: 100, hide: true },
        { field: 'name', headerName: 'Nombre', width: 300, },
        { field: 'abbrev', headerName: 'Abrebiatura', width: 120 },
        { field: 'type', headerName: 'Tipo', width: 150 },
        { field: 'city', headerName: 'Ciudad', width: 150 },
        { field: 'country', headerName: 'Paía', width: 150 },
        {
            field: 'actions',
            headerName: 'Acciones',
            width: 150,
            renderCell: (params) => (
                <Fragment>
                    <Link to={`/admin/institutions/update/${params.getValue(params.id, "id")}`}>
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
        getInstitutionsApi().then(response => {
            response.institution.forEach(value => {
                instList.push({ ...value, id: value._id })
            })

            setTnstData(instList)
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
                title="Eliminar institución"
                onAccept={() => {
                    deleteInstitutionApi(selectedId).then()
                    setOpen(false)
                    setReload(true)
                }}>
                <Typography>¿Estás seguro de querer eliminar este elemento?</Typography>
            </Notification>
            <div style={{ height: 400 }}>
                <DataGrid
                    columns={columns}
                    rows={instData}
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

export default InstitutionsTable
