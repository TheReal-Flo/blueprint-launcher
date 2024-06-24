import { Outlet } from 'react-router-dom';
import BackgroundVideo from '../assets/background2.mp4';

import '../styles/layout.scss';

function Layout() {
    return (<>
        <video autoPlay muted loop className='background-video' src={BackgroundVideo}></video>
        <Outlet />
    </>);
}

export default Layout;