import { Outlet } from "react-router-dom"
import "./Admin.scss"
import SiteBar from "./site-bar"
const Admin = () => {
    return (
        <>
            <div className="admin">
                <SiteBar />
                <Outlet />
            </div>
        </>
    )
}

export default Admin