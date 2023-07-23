import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AddExpense from "./AddExpense";
import AddTransaction from "./AddTransaction";
import ShowExpenses from "./ShowExpenses";
import { LightModeRounded } from "@mui/icons-material";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Nopage from "./Nopage";

const drawerWidth = 250;

function MyDrawer(props) {
  const navigate = useNavigate();
  const auth_token=localStorage.getItem("auth-token");
  React.useEffect(() => {
    if (!auth_token) {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, [auth_token]);

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    navigate("/login");
  };
  const menuitem = [
    ["Dashboard", "Add Expense", "Add Transactions", "Manage Expenses"],
    ["Profile", "Logout"],
  ];
  const menuitemicon = [
    [
      <GridViewRoundedIcon />,
      <LibraryAddRoundedIcon />,
      <LibraryAddRoundedIcon />,
      <AttachMoneyRoundedIcon />,
    ],
    [<PersonRoundedIcon />, <LogoutRoundedIcon />],
  ];
  const menuitemlink = [
    ["/", "/addexpense", "/addtransaction", "/showexpense"],
    [()=>{}, handleLogout],
  ];
  const { window } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <img src="./logo3.png" width={"100%"} height={"150px"} alt="DEMS LOGO" style={{margin:"5px",padding:"5px"}}/>
      <Divider />
      <List>
        {menuitem[0].map((text, index) => (
          <Link
            to={menuitemlink[0][index]}
            key={text}
            style={{ textDecoration: "none", color: "Black" }}
          >
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {menuitemicon[0][index]}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {menuitem[1].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={menuitemlink[1][index]}>
              <ListItemIcon>
                {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                {menuitemicon[1][index]}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Expense Manager
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
            >
              <LightModeRounded />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />

        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/addexpense" element={<AddExpense />}></Route>
          <Route path="/addtransaction" element={<AddTransaction />}></Route>
          <Route path="/showexpense" element={<ShowExpenses />}></Route>
          <Route path="*" element={<Nopage />} />   
        </Routes>
      </Box>
    </Box>
  );
}

MyDrawer.propTypes = {
  window: PropTypes.func,
};

export default MyDrawer;
