import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DescriptionIcon from "@material-ui/icons/Description";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BusinessIcon from "@material-ui/icons/Business";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const SideMenu = () => {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const history = useHistory();

  const onLogoutHandler = (e) => {
    e.preventDefault();
    authCtx.logout();
    history.replace("/");
  };

  const menuItems = [
    { url: "dashboard", title: "Dashboard", icon: DashboardIcon },
    { url: "orders", title: "Orders", icon: LocalShippingIcon },
    { url: "asns", title: "ASNs", icon: BusinessIcon },
    { url: "invoices", title: "Invoices", icon: DescriptionIcon },
    { url: "reports", title: "Reports", icon: AssessmentIcon },
    { url: "account", title: "Account", icon: AccountBoxIcon },
  ];

  const MenuList = () =>
    isLoggedIn && (
      <List>
        {menuItems.map((item, index) => {
          return (
            <ListItem component={Link} key={index} to={item.url}>
              <DashboardIcon component={item.icon} />
              <ListItemText>{item.title}</ListItemText>
            </ListItem>
          );
        })}
        <Divider />
        <ListItem
          onClick={(e) => {
            onLogoutHandler(e);
          }}
        >
          <ExitToAppIcon />
          <ListItemText>Logout</ListItemText>
        </ListItem>
      </List>
    );

  return (
    <>
      <MenuList />
    </>
  );
};

export default SideMenu;
