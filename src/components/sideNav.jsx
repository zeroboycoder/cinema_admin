import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import { Apps, People, LocalMovies, Book, Logout } from "@mui/icons-material";
import "./sideNav.css";
import { Button } from "@mui/material";

const drawerWidth = 260;

const SideNav = () => {
  const navigator = useNavigate(0);
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={true}
    >
      <div className="flex justify-center items-center p-2">
        <h1 className="text-3xl font-bold">iCinema</h1>
      </div>
      <Divider />
      <List className="flex flex-col justify-between h-screen">
        <div>
          <NavLink to={"/"} activeClassName="active">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Apps />
                </ListItemIcon>
                Dashboard
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/users"} activeClassName="active">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                Users
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/movies"} activeClassName="active">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LocalMovies />
                </ListItemIcon>
                Movies
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/upcoming-movies"} activeClassName="active">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <LocalMovies />
                </ListItemIcon>
                Upcoming Movies
              </ListItemButton>
            </ListItem>
          </NavLink>
          <NavLink to={"/bookings"} activeClassName="active">
            <ListItem>
              <ListItemButton>
                <ListItemIcon>
                  <Book />
                </ListItemIcon>
                Bookings
              </ListItemButton>
            </ListItem>
          </NavLink>
        </div>
        <Button
          variant="text"
          style={{ color: "white" }}
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("id");
            navigator("/login");
          }}
        >
          <Logout className="mr-2" />
          Logout
        </Button>
      </List>
    </Drawer>
  );
};

export default SideNav;
