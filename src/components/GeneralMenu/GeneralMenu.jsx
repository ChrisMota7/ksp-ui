import React, { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ViewListIcon from '@mui/icons-material/ViewList';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DnsIcon from '@mui/icons-material/Dns';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddModeratorIcon from '@mui/icons-material/AddModerator';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAdmin, selectUserid } from '@/redux/reducers/authReducer';
import { logout, setAuthInfo } from '@/redux/actions/authAction';
import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import Loader from '../../components/Loader/Loader';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const GeneralMenu = ({ children }) => {
  const { push } = useRouter();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [menuItems, setMenuItems] = useState([]);
  const isOpenProfileMenu = Boolean(anchorEl);
  const [loading, setLoading] = useState(true);

  const userId = useSelector(selectUserid);
  const isAdmin = useSelector(selectIsAdmin);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setAuthInfo());
      setLoading(false);
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (isAdmin === "true") {
      setMenuItems(["Tickets", "Crear Ticket", "Usuarios", "Clientes", "Categorías", "Dashboard", "Configuración", "Incidentes", "Crear Incidente"]);
    } else if (isAdmin === "false") {
      setMenuItems(["Mis Tickets", "Crear Ticket", "Configuración", "Mis Incidentes", "Crear Incidente"]);
    }
  }, [isAdmin]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const renderItemIcon = (itemText) => {
    switch (itemText) {
      case "Mis Tickets":
      case "Tickets":
        return <ViewListIcon />;
      case "Crear Ticket":
        return <PlaylistAddIcon sx={{ fontSize: 30 }}/>;
      case "Usuarios":
        return <PeopleAltIcon />;
      case "Clientes":
        return <BusinessCenterIcon />; 
      case "Categorías":
        return <DnsIcon />;
      case "Dashboard":
        return <EqualizerIcon />;
      case "Configuración":
        return <SettingsIcon />;
      case "Mis Incidentes":  
      case "Incidentes":
        return <AdminPanelSettingsIcon sx={{ fontSize: 30 }}/>;
      case "Crear Incidente":
        return <AddModeratorIcon />;   
        
    }
  };

  const handleItemClick = (itemText) => {
    switch (itemText) {
      case "Mis Tickets":
      case "Tickets":
        push("/tickets");
        break;
      case "Crear Ticket":
        push("/create-ticket");
        break;
      case "Usuarios":
        push("/users");
        break;
      case "Clientes":
        push("/clients");
        break;
      case "Categorías":
        push("/categories");
        break;
      case "Dashboard":
        push("/dashboard");
        break;
      case "Configuración":
        push("/settings");
        break;
      case "Mis Incidentes":
      case "Incidentes":
        push("/incidents");
        break;
      case "Crear Incidente":
        push("/create-incident");
        break;
    }
  };

  const handleClickProfileMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseProfileMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    push('/Logout');
  };

  if (loading) {
    return <Loader />; 
  }

  return (
    <>
      {userId ? (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 5,
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            </div>
            <div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                anchorEl={anchorEl}
                onClick={handleClickProfileMenu}
                edge="start"
              >
                <AccountCircleIcon fontSize='large' />
              </IconButton>
              <Popper 
                open={isOpenProfileMenu} 
                anchorEl={anchorEl}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={handleCloseProfileMenu}>
                        <MenuList id="split-button-menu" autoFocusItem>
                          <MenuItem onClick={handleLogout}>
                            Cerrar Sesión
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </div>
          </Toolbar>
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{ display: "flex", justifyContent: "space-between", paddingLeft: 2 }}>
              <img src="/LogoNegro.png" alt="KSP" height={30} />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
              {menuItems.map((itemText) => (
                <div key={itemText}>
                  <ListItem disablePadding sx={{ display: 'block' }}>
                    <Tooltip title={itemText} placement="right" arrow>
                      <ListItemButton onClick={() => handleItemClick(itemText)} className={open ? "menu__open-list-item" : "menu__list-item"}>
                        <ListItemIcon className={open ? "menu__open-list-item__list-icon" : "menu__list-item__list-icon"}>
                          {renderItemIcon(itemText)}
                        </ListItemIcon>
                        <ListItemText primary={itemText} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </Tooltip>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </Drawer> 
          <Box component="main" sx={{ flexGrow: 1 }}>
            <DrawerHeader />
            {children}
          </Box>
        </Box>
      ) : (
        children
      )}
    </>
  );
}

export default GeneralMenu;