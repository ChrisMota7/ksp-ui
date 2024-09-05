'use client';

const Log = ({ message = "Iniciando sesión..." }) => {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h1>{message}</h1>
      </div>
    );
  };
  
  export default Log;
