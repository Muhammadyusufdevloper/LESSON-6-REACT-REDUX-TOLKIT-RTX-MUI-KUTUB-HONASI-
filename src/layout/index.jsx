import { Outlet } from 'react-router-dom'
import PrimarySearchAppBar from './header'

const Layout = () => {
    return (
        <>
            <PrimarySearchAppBar />
            <main style={{  backgroundColor:" #202C36",}}>
                <Outlet />
            </main>
        </>
    )
}

export default Layout