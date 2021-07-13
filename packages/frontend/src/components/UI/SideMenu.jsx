import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import AuthContext from "../../context/auth-context";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import DashboardIcon from "@material-ui/icons/Dashboard";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import DescriptionIcon from "@material-ui/icons/Description";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BusinessIcon from "@material-ui/icons/Business";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const SideMenu = () => {
  const authCtx = useContext(AuthContext);
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

  const MenuList = () => (
    <List>
      {menuItems.map((item, index) => {
        return (
          <ListItem component={Link} key={index} to={item.url}>
            <Button color="primary">
              <DashboardIcon component={item.icon} />
              {item.title}
            </Button>
          </ListItem>
        );
      })}
      <ListItem
        onClick={(e) => {
          onLogoutHandler(e);
        }}
      >
        <Button color="primary">
          <ExitToAppIcon />
          Logout
        </Button>
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
