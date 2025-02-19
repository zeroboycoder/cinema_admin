import SideNav from "../components/sideNav";
import PropTypes from "prop-types";

const Layout = (props) => {
  return (
    <div className="flex">
      <SideNav />
      {props.children}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
