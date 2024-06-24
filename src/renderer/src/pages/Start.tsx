import { useEffect } from 'react';

import { MicrosoftLoginButton } from "react-social-login-buttons";

import Banner from '../assets/banner.png';

import '../styles/start.scss';
import { useNavigate } from 'react-router-dom';
import { Minecraft } from 'msmc';

function Start() {
    const navigate = useNavigate()

    const requestAuth = (): void => window.electron.ipcRenderer.send("requestAuth");

    useEffect(() => {
        window.electron.ipcRenderer.send("requestAccount");

        window.electron.ipcRenderer.on("profileInfo", (_e, args: Minecraft) => {
            console.log(args.profile?.name);

            navigate("/home");
        })
    }, []);

    return (
        <>
            <div className="start-container">
                <div className="blur" />

                <div className="form">
                    <img src={Banner} alt="Blueprint banner" />
                    <MicrosoftLoginButton onClick={requestAuth} />
                </div>
            </div>
        </>
    )
}

export default Start;
