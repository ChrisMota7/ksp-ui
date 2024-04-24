'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { createProblem } from '@/redux/actions/categoryActions';
import { Button, TextField, FormControl, MenuItem, Select, InputLabel } from '@mui/material';
import { selectCategories } from '@/redux/reducers/categoryReducer';

const NewCategory = () => {
    const router = useRouter()
    const dispatch = useDispatch()

    const [name, setName] = useState("");
    const [categoriaid, setCategoriaid] = useState("");

    const submitCreateProblem = (e) => {
        e.preventDefault();

        dispatch(createProblem(name, categoriaid))
    }

    return (
        <form onSubmit={submitCreateProblem}>
            <TextField
                label="Nombre del Problema"
                value={name} name='name' type='text'
                onChange={event => setName(event.target.value)}
                required
            />
            <FormControl fullWidth className='content__label__select'>
                <InputLabel id="select-label">Categoría</InputLabel>
                    <Select 
                    value={categoriaid} name='categoria'
                    labelId="select-label"
                    id="select"
                    label="categoria"
                    onChange={event => setCategoriaid(event.target.value)}
                    >
                        <MenuItem value={1}>Hardware</MenuItem>
                        <MenuItem value={2}>Software</MenuItem>
                    </Select>
            </FormControl>
            <Button type="submit" variant="contained" color="primary"
            onClick={() => router.push(`/category/`)}>
                Crear Problema
            </Button>
        </form>
    );
};

export default NewCategory;