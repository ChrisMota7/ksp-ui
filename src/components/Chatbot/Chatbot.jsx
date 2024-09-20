import React from 'react';
import './Chatbot.scss';
import { useSelector } from 'react-redux';

const Chatbot = () => {

  const isAuthenticated = useSelector(state => !!state.authReducer.jwt);

  if (!isAuthenticated) {
    return null; // No renderizar el chatbot si no está autenticado
  }

  const toggleMenu = () => {
    const menuOverlay = document.getElementById('menu-overlay');
    const menu = document.querySelector('.menu');

    if (menuOverlay.style.display === 'flex') {
      menuOverlay.style.display = 'none';
      menu.style.animation = '';
    } else {
      menuOverlay.style.display = 'flex';
      menu.style.animation = 'slideIn 0.3s ease-out';
    }
  };

  const toggleSubMenu = (sectionId) => {
    document.querySelectorAll('.section > div').forEach(div => {
      if (div.id !== sectionId) {
        div.classList.add('hidden'); // Asegúrate de que todos los demás submenús estén cerrados
      }
    });
    const section = document.getElementById(sectionId);
    section.classList.toggle('hidden'); // Solo toggle el clickeado
  };

  const redirect = (area) => {
    const urls = {
      recursosHumanos: "https://kspus.sharepoint.com/sites/KSPRH/SitePages/TopicHome.aspx/?env=Embedded",
      operaciones: "https://kspus.sharepoint.com/sites/KSPOperaciones/SitePages/TopicHome.aspx/?env=Embedded",
      finanzas: "https://kspus.sharepoint.com/sites/ViveKSP-Maxi-Finanzas/SitePages/TopicHome.aspx/?env=Embedded",
      soporteTI: "https://kspus.sharepoint.com/sites/KSPInfraestructura/SitePages/TopicHome.aspx/?env=Embedded",
      direccionGeneral: "https://kspus.sharepoint.com/sites/PortalKSP-direccinGeneral/?env=Embedded",
      calidad: "https://kspus.sharepoint.com/sites/KSP-Calidad/?env=Embedded",
      vacaciones: "https://forms.office.com/pages/responsepage.aspx?id=dUFebe91Cki-z296AdBIJHfVzi8fSxlFqi72auAQfq1UMk9KR0UxUFAzQUdPRThWNjFMSUZGQjFRNy4u",
      permisoEspecial: "https://forms.office.com/r/qVGh1uZnXd",
      cartaIngresos: "https://forms.office.com/r/FHdZhDyTw5",
      timesheet: "https://operaciones-ksp.com.mx/formulario",
      ticketSoporte: "https://hesk.ksp.com.mx/",
      seguroGastosMedicos: "https://kspus.sharepoint.com/sites/vivekspmaxi/RH/SitePages/Gastos-M%C3%A9dicos-Mayores.aspx/?env=Embedded",
      foroTecnico: "https://kspus.sharepoint.com/:f:/s/vivekspmaxi/Ep6A8fVGHORFvyXZ-h998PkBmMLgCCOoc_4WLh9bD09u8Q?e=M3Nffa",
      repositorioCodigo: "https://example.com/repositorio-codigo",
      repositorioComponentes: "https://kspus.sharepoint.com/:f:/s/vivekspmaxi/EuqdcrbNpLRLiLMmgV-ESnwBaK8_bR9MV2Zc-ecDsc6VaQ?e=52dvNK",
      mejoresPracticas: "https://kspus.sharepoint.com/:f:/s/vivekspmaxi/EuxCL1zUSmhCu2OKR-_4xwUBpKk643ONUouwnK2uyLiWeg?e=g36NKr",
      estandaresNegocio: "https://kspus.sharepoint.com/:f:/s/vivekspmaxi/Ek-FAVdD3SNJuXVGpJLeieUBMU3iiHPCFHkNXsO8wPPmyA?e=JpcBru",
      estandaresTecnicos: "https://kspus.sharepoint.com/:f:/s/vivekspmaxi/EiMa3lWb135Pmp4msbX-8UMB4gmYePGW4Zy0tq6VvyaEbw?e=WBr7s7",
      ciberseguridad: "https://example.com/ciberseguridad",
      capacitacionTecnica: "https://learning.cloud.microsoft/search",
      capacitacionOffice: "https://learning.cloud.microsoft/search",
    };

    window.open(urls[area], '_blank');
  };

  return (
    <>
      <button className="floating-button" onClick={toggleMenu}>
        <img src="https://img.icons8.com/?size=100&id=b2rw9AoJdaQb&format=png&color=000000" alt="Chatbot" />
      </button>

      <div className="menu-overlay" id="menu-overlay">
        <div className="menu">
          <h2 className='title'>Asistente Virtual</h2>
          <div className="section">
            <h4 className="department" onClick={() => toggleSubMenu('recursosHumanos')}>Recursos Humanos</h4>
            <div id="recursosHumanos" className="submenu hidden">
              <div className="option" onClick={() => redirect('recursosHumanos')}>Recursos Humanos</div>
              <div className="option" onClick={() => redirect('vacaciones')}>Solicitud de Vacaciones</div>
              <div className="option" onClick={() => redirect('permisoEspecial')}>Solicitud de Permiso Especial</div>
              <div className="option" onClick={() => redirect('cartaIngresos')}>Solicitud de Carta de Ingresos</div>
              <div className="option" onClick={() => redirect('seguroGastosMedicos')}>Seguro de Gastos Médicos</div>
            </div>
          </div>

          <div className="section">
            <h4 className="department" onClick={() => toggleSubMenu('operaciones')}>Operaciones</h4>
            <div id="operaciones" className="submenu hidden">
              <div className="option" onClick={() => redirect('operaciones')}>Operaciones</div>
              <div className="option" onClick={() => redirect('timesheet')}>Carga de Timesheet</div>
            </div>
          </div>

          <div className="section">
            <h4 className="department" onClick={() => toggleSubMenu('finanzas')}>Finanzas</h4>
            <div id="finanzas" className="submenu hidden">
              <div className="option" onClick={() => redirect('finanzas')}>Finanzas</div>
            </div>
          </div>

          <div className="section">
            <h4 className="department" onClick={() => toggleSubMenu('soporteTI')}>Soporte TI</h4>
            <div id="soporteTI" className="submenu hidden">
              <div className="option" onClick={() => redirect('soporteTI')}>Soporte de TI</div>
              <div className="option" onClick={() => redirect('ticketSoporte')}>Levantamiento de Ticket de Soporte</div>
              <div className="option" onClick={() => redirect('ciberseguridad')}>Ciberseguridad</div>
              <div className="option" onClick={() => redirect('capacitacionTecnica')}>Capacitación Técnica</div>
              <div className="option" onClick={() => redirect('capacitacionOffice')}>Capacitación en Herramientas de Office</div>
            </div>
          </div>

          <div className="section">
            <h4 className="department" onClick={() => toggleSubMenu('Grupo-de-Expertos')}>Grupo de Expertos</h4>
            <div id="Grupo-de-Expertos" className="submenu hidden">
              <div className="option" onClick={() => redirect('foroTecnico')}>Foro Técnico</div>
              <div className="option" onClick={() => redirect('repositorioCodigo')}>Repositorio de Librerías de Código</div>
              <div className="option" onClick={() => redirect('repositorioComponentes')}>Repositorio de Librerías de Componentes</div>
              <div className="option" onClick={() => redirect('mejoresPracticas')}>Repositorio de Mejores Prácticas</div>
              <div className="option" onClick={() => redirect('estandaresNegocio')}>Repositorio de Estándares de Negocio</div>
              <div className="option" onClick={() => redirect('estandaresTecnicos')}>Repositorio de Estándares Técnicos</div>
            </div>
          </div>

          <div className="section">
            <h4 className="department" onClick={() => toggleSubMenu('direccionGeneral')}>Dirección General</h4>
            <div id="direccionGeneral" className="submenu hidden">
              <div className="option" onClick={() => redirect('direccionGeneral')}>Dirección General</div>
            </div>
          </div>

          <div className="section">
            <h4 className="department" onClick={() => toggleSubMenu('calidad')}>Calidad</h4>
            <div id="calidad" className="submenu hidden">
              <div className="option" onClick={() => redirect('calidad')}>Calidad</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
