import "./EditCategoryModal.scss"
import { getCategories, updateCategory } from '@/redux/actions/categoryActions'
import { showSnackbar } from '@/redux/actions/visualsAction'
import { Box, Button, Modal, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const EditCategoryModal = ({ openEditCategory, handleCloseEditCategory = () => {}, categoryName, categoryId }) => {
    const dispatch = useDispatch()
    const [newCategoryName, setCategoryName] = useState("")

    const handleEditCategory = async () => {
        const { setUpdateCategerySuccess } = await dispatch(updateCategory(categoryId, newCategoryName))

        if (setUpdateCategerySuccess) {
            dispatch(showSnackbar("Categoría actualizada", "success"))
            dispatch(getCategories());
            handleCloseEditCategory()
        } else {
            dispatch(showSnackbar("Error al actualizar", "error"))
        }
    }

    const closeModal = () => {
        setCategoryName("")
        handleCloseEditCategory()
    }

    return (
        <div>
            <Modal
            open={openEditCategory}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <div className="edit-category">
                <h1>Editar Categoría</h1>
                <TextField 
                    onChange={event => setCategoryName(event.target.value)}
                    name='categoría' 
                    className='edit-category__name' 
                    id="outlined-basic" 
                    defaultValue={categoryName}
                />
                <div className="edit-category__buttons">
                    <Button 
                        onClick={handleEditCategory}
                        disabled={newCategoryName === ""}
                    >Editar</Button>
                    <Button onClick={closeModal}>Cancelar</Button>
                </div>
            </div>
            </Modal>
        </div>
    )
}

export default EditCategoryModal