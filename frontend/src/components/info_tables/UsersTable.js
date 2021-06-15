import React, { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useStyles } from './useStyles'
import {
    LinearProgress, IconButton, Typography
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
import { getAllUsersApi, deleteUserApi } from "../../api/user"

function UsersTable() {
    const classes = useStyles()

    const [users, setUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [open, setOpen] = useState(false)
    const [selectedId, setSelectedId] = useState("")
    const [reload, setReload] = useState(false)

    useEffect(() => {
        getAllUsersApi().then(response => {
            let usersList = []

            response.users.map(value => {
                usersList.push({ ...value, id: value._id })
            })

            setUsers(usersList)
            setIsLoading(false)
        }).catch(error => {
            console.log(error)
        })

        setReload(false)
    }, [reload])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70, hide: true },
        { field: 'name', headerName: 'Nombre', hide: true },
        { field: 'lastname', headerName: 'Apellido', hide: true },
        {
            field: 'fullName',
            headerName: 'Nombre Completo',
            width: 200,
            valueGetter: (params) =>
                `${params.getValue('name') || ''} ${params.getValue('lastname') || ''}`,
        },
        { field: 'nickname', headerName: 'Nickname', width: 150 },
        { field: 'email', headerName: 'Correo electrónico', width: 150 },
        { field: 'institution', headerName: 'Institución', width: 120 },
        { field: 'school_grade', headerName: 'Grado escolar', type: 'number', width: 120 },
        { field: 'role', headerName: 'Rol', width: 100 },
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
                    <Link to={`/admin/users/update/${params.getValue("id")}`}>
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

    return (
        <Fragment>
            <Notification
                open={open}
                onClose={() => setOpen(false)}
                title="Eliminar usuario"
                onAccept={() => {
                    deleteUserApi(selectedId).then()
                    setOpen(false)
                    setReload(true)
                }}>
                <Typography>¿Estás seguro de querer eliminar este elemento?</Typography>
            </Notification>
            <div style={{ height: 400 }}>
                <DataGrid
                    columns={columns}
                    rows={users}
                    pageSize={10}
                    loading={isLoading}
                    disableSelectionOnClick
                    components={{
                        LoadingOverlay: LinearProgress,
                        Toolbar: GridToolbar
                    }} />
            </div>
        </Fragment>
    )
}

export default UsersTable
