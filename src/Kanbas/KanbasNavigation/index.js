

import { Link, useLocation } from "react-router-dom";
import { BiUserCircle } from "react-icons/bi";
import { RiDashboard3Fill } from "react-icons/ri";
import { FaBook } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { FaInbox, FaClock, FaDesktop, FaShare, FaQuestionCircle } from "react-icons/fa";
import "./index.css";
import logo from "./NEU.png"
function KanbasNavigation() {
    const links = ["Account", "Dashboard", "Courses", "Calendar", "Inbox", "History", "Studio", "Commons", "Help"];

    const linkToIconMap = {
        Account: <BiUserCircle className="wd-icon wd-white-icon" />,
        Dashboard: <RiDashboard3Fill className="wd-icon" />,
        Courses: <FaBook className="wd-icon" />,
        Calendar: <BsFillCalendar2WeekFill className="wd-icon" />,
        Inbox: <FaInbox className="wd-icon" />,
        History: <FaClock className="wd-icon" />,
        Studio: <FaDesktop className="wd-icon" />,
        Commons: <FaShare className="wd-icon" />,
        Help: <FaQuestionCircle className="wd-icon" />,

    };

    const { pathname } = useLocation();
    return (
        <div className="list-group wd-kanbas-navigation" style={{ width: 150 }}>
            <img src={logo} alt="logo" className="logo" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            {
                links.map((link, index) => (
                    <Link
                        key={index}
                        to={`/Kanbas/${link}`}
                        className={`list-group-item ${pathname.includes(link) && "active"}`}
                    >
                        {linkToIconMap[link]}
                        <br />
                        {link}
                    </Link>
                ))
            }
        </div >
    );
}
export default KanbasNavigation;
