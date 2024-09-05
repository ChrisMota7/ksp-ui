import "./EditProblemModal.scss";
import { getProblems, updateProblem } from '@/redux/actions/categoryActions';
import { showSnackbar } from '@/redux/actions/visualsAction';
import { Box, Button, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

const EditCategoryModal = ({ openEditCategory, handleCloseEditCategory = () => {}, categoryName, categoryId }) => {
    const dispatch = useDispatch();
    const [newCategoryName, setCategoryName] = useState("");

    const handleEditCategory = async () => {
        const { setUpdateCategerySuccess } = await dispatch(updateProblem(categoryId, newCategoryName));

        if (setUpdateCategerySuccess) {
            dispatch(showSnackbar("Categoría actualizada", "success"));
            dispatch(getProblems());
            handleCloseEditCategory();
        } else {
            dispatch(showSnackbar("Error al actualizar la categoría", "error"));
        }
    };

    const closeModal = () => {
        setCategoryName("");
        handleCloseEditCategory();
    };

    return (
        <div>
            <Modal
                open={openEditCategory}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                PaperProps={{
                  sx: {
                    borderRadius: '10px',
                    padding: '20px',
                    margin: '10px',
                    boxShadow: '0px 0px 8px -4px rgba(0,0,0,0.79)'
                  }
                }}
            >
                <Box className="edit-category">
                    <h1>Editar Categoría</h1>
                    <TextField 
                        onChange={event => setCategoryName(event.target.value)}
                        name='categoría' 
                        className='edit-category__name' 
                        id="outlined-basic" 
                        label="Nombre de la Categoría"
                        defaultValue={categoryName}
                        fullWidth
                        margin="dense"
                    />
                    <div className="edit-category__buttons">
                        <Button 
                            onClick={handleEditCategory}
                            disabled={newCategoryName === ""}
                        >Editar</Button>
                        <Button onClick={closeModal}>Cancelar</Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
};

export default EditCategoryModal;
