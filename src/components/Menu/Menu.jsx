import React, { useState } from 'react';
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
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ListAltIcon from '@mui/icons-material/ListAlt';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import DnsIcon from '@mui/icons-material/Dns';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { useSelector } from 'react-redux';
import { selectIsAdmin, selectUserid } from '@/redux/reducers/authReducer';

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
  // necessary for content to be below app bar
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

const Menu = ({ children }) => {
  const { push } = useRouter()
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  // const userId = useSelector(selectUserid)
  // const isAdmin = useSelector(selectIsAdmin)
  const isAdmin = "false"
  const userId = 1

  console.log("isAdmin",isAdmin)
  const menuItems = [isAdmin === "true" ? "Tickets" : "Mis Tickets", "Crear Ticket", "Usuarios", "Categorías", "Dashboard", "Configuración"]

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
        return (
          <ListAltIcon />
        )
      case "Crear Ticket":
        return (
          <PlaylistAddIcon />
        )
      case "Usuarios":
        return (
          <PeopleAltIcon />
        )
      case "Categorías":
        return (
          <DnsIcon />
        )
      case "Dashboard":
        return (
          <EqualizerIcon />
        )
      case "Configuración":
        return (
          <SettingsIcon />
        )
    }
  }

  const handleItemClick = (itemText)=> {
    console.log("itemText",itemText)
    switch (itemText) {
      case "Mis Tickets":
      case "Tickets":
        push("/tickets")
        break;
      case "Crear Ticket":
        push("/create-ticket")
        break;
      case "Usuarios":
        push("/")
        break;
      case "Categorías":
        push("/categories")
        break;
      case "Dashboard":
        push("/")
        break;
      case "Configuración":
        push("/")
        break;
    }
  }

  return (
    <>
      {userId ? (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
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
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingLeft: 2
          }}>
              <img src="/LogoNegro.png" alt="KSP" height={30} />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((itemText) => {
              return (
                <div key={itemText}>
                <ListItem disablePadding sx={{ display: 'block' }}>
                  <ListItemButton onClick={() => handleItemClick(itemText)} className={open ? "menu__open-list-item" : "menu__list-item"}>
                    <ListItemIcon className={open ? "menu__open-list-item__list-icon" : "menu__list-item__list-icon"}>
                      {renderItemIcon(itemText)}
                    </ListItemIcon>
                    <ListItemText primary={itemText} sx={{ opacity: open ? 1 : 0 }} />
                  </ListItemButton>
                </ListItem>
                <Divider />
                </div>
              )
            })}
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

export default Menu