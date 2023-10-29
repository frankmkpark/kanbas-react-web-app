import { Link, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiDashboard3Fill } from "react-icons/ri";
import { FaBook, FaInbox, FaHistory, FaQuestionCircle, FaTv } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import logoSrc from "../Images/NEU.png";
import "./index.css";

function KanbasNavigation() {
  const navigationItems = [
    { label: 'NEU', to: '/', isLogo: true, logoSrc: logoSrc },
    { label: 'Account', to: '/Kanbas/Account', icon: <BiUserCircle className="wd-icon" style={{ color: 'gray' }} /> },    
    { label: 'Dashboard', to: '/Kanbas/Dashboard', icon: <RiDashboard3Fill className="wd-icon" /> },
    { label: 'Courses', to: '/Kanbas/Courses', icon: <FaBook className="wd-icon" /> },
    { label: 'Calendar', to: '/Kanbas/Calendar', icon: <BsFillCalendar2WeekFill className="wd-icon" /> },
    { label: 'Inbox', to: '/Kanbas/Inbox', icon: <FaInbox className="wd-icon" /> },
    { label: 'History', to: '/Kanbas/History', icon: <FaHistory className="wd-icon" /> },
    { label: 'Help', to: '/Kanbas/Help', icon: <FaQuestionCircle className="wd-icon" /> }
  ];

  const { pathname } = useLocation();

  return (
    <div className="list-group wd-kanbas-navigation">
      {navigationItems.map((item, index) => (
        item.isLogo ? (
          <img key={index} src={item.logoSrc} height="65px" width="80px" alt={item.label} />
        ) : (
          <Link
            key={index}
            to={item.to}
            className={`list-group-item ${pathname.includes(item.label) && "active"}`}
          >
            {item.icon}
            <br/>
            {item.label}
          </Link>
        )
      ))}
    </div>
  );
}

export default KanbasNavigation;
