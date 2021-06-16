import { useState } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DescriptionIcon from "@material-ui/icons/Description";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BusinessIcon from "@material-ui/icons/Business";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  list: {
    width: 200,
  },
});

const SideMenu = () => {
  const classes = useStyles();
  const [anchorState, setAnchorState] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setAnchorState({ [anchor]: open });
  };

  const menuItems = [
    { url: "dashboard", title: "Dashboard", icon: DashboardIcon },
    { url: "orders", title: "Orders", icon: LocalShippingIcon },
    { url: "asns", title: "ASNs", icon: BusinessIcon },
    { url: "invoices", title: "Invoices", icon: DescriptionIcon },
    { url: "reports", title: "Reports", icon: AssessmentIcon },
    { url: "account", title: "Account", icon: AccountBoxIcon },
  ];

  const linkList = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer("left", false)}
      onKeyDown={toggleDrawer("left", false)}
    >
      <List>
        {menuItems.map((item, index) => {
          return (
            <ListItem button component={Link} key={index} to={item.url}>
              <ListItemIcon>
                <DashboardIcon component={item.icon} />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          );
        })}
        <Divider />
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <Button onClick={toggleDrawer("left", true)}>
        <MenuIcon />
      </Button>
      <Drawer open={anchorState["left"]} onClose={toggleDrawer("left", false)}>
        {linkList("left")}
      </Drawer>
    </>
  );
};

export default SideMenu;
