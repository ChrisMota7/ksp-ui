import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getEmpresas, filterTicketsByCompany } from '@/redux/actions/ticketAction';
import Select from 'react-select';

const FilterByCompany = () => {
    const [selectedEmpresa, setSelectedEmpresa] = useState('');
    const dispatch = useDispatch();
    // const empresas = useSelector(state => state.empresaReducer.empresas);
    const empresas = useSelector(state => state.empresaReducer.empresas);
useEffect(() => {
    console.log("Empresas:", empresas); // Verificar que las empresas se están obteniendo correctamente
}, [empresas]);
    const isAdmin = useSelector(state => state.authReducer.isAdmin);
    const options = empresas.map(empresa => ({
        value: empresa.id,  // Asegúrate de que el id esté presente y sea válido
        label: empresa.nombre
    }));
    

    useEffect(() => {
        if (isAdmin) {
            dispatch(getEmpresas());
        }
    }, [dispatch, isAdmin]);

    const handleEmpresaChange = (option) => {
        console.log("Empresa seleccionada:", option);  // Verifica que option tiene el valor correcto
        setSelectedEmpresa(option);  // Guarda el objeto { value, label }
        dispatch(filterTicketsByCompany(option.value));  // Asegúrate de que option.value es el id de la empresa
    };
    

    return (
        <div>
            {isAdmin && (
                <Select
                    value={selectedEmpresa}
                    onChange={handleEmpresaChange}
                    options={options}
                />
            )}
        </div>
    );
};

export default FilterByCompany
