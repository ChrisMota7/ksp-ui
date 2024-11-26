'use client'

import './dashboard.scss'
import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Bar, Pie } from 'react-chartjs-2';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
// import { getDashboard } from "@/redux/actions/categoryActions";
// import { selectDashboard } from "@/redux/reducers/categoryReducer";
import { Breadcrumbs, Typography } from "@mui/material"

// Registro de componentes necesarios para Chart.js
// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     ArcElement,
//     Title,
//     Tooltip,
//     Legend
// );

const Dashboard = () => {
    // const dispatch = useDispatch();
    // const dashboardData = useSelector(selectDashboard);

    // useEffect(() => {
    //     dispatch(getDashboard());
    // }, [dispatch]);

    // const problemaData = {
    //     labels: dashboardData.problema_stats?.map(item => item.problema__name),
    //     datasets: [
    //         {
    //             label: 'Número de Tickets por Problema',
    //             data: dashboardData.problema_stats?.map(item => item.total),
    //             backgroundColor: 'rgba(255, 99, 132, 0.5)',
    //             borderColor: 'rgba(255, 99, 132, 1)',
    //             borderWidth: 1,
    //         }
    //     ]
    // };

    // const categoriaData = {
    //     labels: dashboardData.categoria_stats?.map(item => item.problema__categoria__name),
    //     datasets: [
    //         {
    //             label: 'Número de Tickets por Categoría',
    //             data: dashboardData.categoria_stats?.map(item => item.total),
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.5)',
    //                 'rgba(54, 162, 235, 0.5)',
    //                 'rgba(255, 206, 86, 0.5)',
    //                 'rgba(75, 192, 192, 0.5)',
    //                 'rgba(153, 102, 255, 0.5)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)',
    //                 'rgba(153, 102, 255, 1)'
    //             ],
    //             borderWidth: 1,
    //         }
    //     ]
    // };

    // const options = {
    //     responsive: true,  // Hace que la gráfica sea responsive
    //     maintainAspectRatio: true, // Mantiene la relación de aspecto
    //     plugins: {
    //         legend: {
    //             position: 'top',
    //         }
    //     }
    // };

    return (
        <div className='dashboard'>
            <div className='dashboard__header__title'>
                    <h1>Dashboard</h1>
                </div>
                <div className='dashboard__header__nav'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Typography color="text.primary">Helpdesk</Typography>
                        <Typography color="text.primary">Dashboard</Typography>
                    </Breadcrumbs>
                </div>
            <iframe title="Dashboard prueba helpdesk" width="100%" height="700" src="https://app.powerbi.com/reportEmbed?reportId=eb7f2cc9-468b-4b25-981c-ccdc459e766f&autoAuth=true&ctid=6d5e4175-75ef-480a-becf-6f7a01d04824" frameborder="0" allowFullScreen="true"></iframe>{/* <div className='dashboard__header'>
            </div>
            <div className='dashboard__content'>
                <div className='dashboard__content__grafica'>
                    <h5>Estadísticas de Problemas</h5>
                    <br />
                    <Bar data={problemaData} options={options} />
                </div>
                <div className='dashboard__content__grafica'>
                    <h5>Estadísticas de Categorías</h5>
                    <br />
                    <Pie data={categoriaData} options={options} />
                </div>
            </div> */}
        </div>
    );
};

export default Dashboard;
