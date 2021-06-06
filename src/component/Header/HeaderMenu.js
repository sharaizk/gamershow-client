import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FiberNewRoundedIcon from "@material-ui/icons/FiberNewRounded";
import HomeRoundedIcon from "@material-ui/icons/HomeRounded";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from "react-redux";

import { NavLink } from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import Avatar from '@material-ui/core/Avatar';
import "../App.css";
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});


const HeaderMenu = (props) => {
    let gender, name, username;
    let src
  if(props.isSignedIn && props.userdata){
    gender = props.userdata.gender; name = props.userdata.name; username = props.userdata.username;
    let maleAvatar = "https://image.flaticon.com/icons/png/512/145/145843.png"
    let femaleAvatar = "https://image.flaticon.com/icons/png/512/145/145847.png"
    src = gender === "Male" ? maleAvatar : femaleAvatar
  }
  const menuLink = props.isSignedIn ? "menu_link" : "menu_linkDis";
  const classes = useStyles();
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => () => {
    setState(open);
  };

  const list = () => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        <NavLink
          className='menu_link'
          aria-current="page"
          exact
          to="/home"
          activeClassName="activeLink"
        >
          <ListItem button>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
        </NavLink>
        <NavLink
          className={`${menuLink}`}
          aria-current="page"
          exact
          to="/streams/new"
          activeClassName="activeLink"
        >
          <ListItem button>
            <ListItemIcon>
              <FiberNewRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Create a New Stream" />
          </ListItem>
        </NavLink>
        <NavLink
          className={`${menuLink}`}
          aria-current="page"
          exact
          to="/streams/list"
          activeClassName="activeLink"
        >
          <ListItem button>
            <ListItemIcon>
              <ViewStreamIcon />
            </ListItemIcon>
            <ListItemText primary="Streams" />
          </ListItem>
        </NavLink>
      </List>
      <Divider />

      {!props.isSignedIn && (
        <>
          <NavLink
            className={`${menuLink}`}
            aria-current="page"
            exact
            to="/register"
            activeClassName="activeLink"
          >
            <ListItem button>
              <ListItemIcon>
                <FiberNewRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Up Now" />
            </ListItem>
          </NavLink>
          <NavLink
            className={`${menuLink}`}
            aria-current="page"
            exact
            to="/login"
            activeClassName="activeLink"
          >
            <ListItem button>
              <ListItemIcon>
                <FiberNewRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </NavLink>
          <Divider />
        </>
      )}

      {props.isSignedIn &&  (
        <>
          <NavLink
            className={`${menuLink}`}
            aria-current="page"
            exact
            to="/logout"
            activeClassName="activeLink"
          >
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Log Out" />
            </ListItem>
          </NavLink>
          <Divider />
          <div className="profiledata">
          <Avatar style={{marginBottom: '10px'}} alt="Remy Sharp" src={src}/>
          <label>Name: <span>{name}</span></label>
          <label>Username: <span>{`@${username}`}</span></label>
          <label>Gender: <span>{gender}</span></label>
          </div>
        </>
      )}
    </div>
  );
  return (
    <div style={{ width: "50px" }}>
      <React.Fragment>
        <IconButton
          edge="start"
          className="header-menu"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer anchor="left" open={state} onClose={toggleDrawer(false)}>
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.pauth.isSignedIn,
    userdata: state.pauth.userdata
  };
};

export default connect(mapStateToProps)(HeaderMenu);
