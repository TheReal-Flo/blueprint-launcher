import '../styles/home.scss';

import Banner from '../assets/banner.png';
import { Button, Dropdown } from 'react-bootstrap';
import { useState } from 'react';
import InstanceCreator from '@renderer/components/InstanceCreator';

function Home() {
    const [instance, setInstance] = useState("");
    const [openMenu, setOpenMenu] = useState("");

    return (<>
        <div className="home-container">
            <div className="menu">
                <img src={Banner} alt="Blueprint banner" />
                <Button style={{ width: "90%", marginBottom: "5px" }} variant='success' onClick={() => setOpenMenu("instance")}>New instance</Button>
                <Dropdown style={{ width: "90%", marginBottom: "15px" }}>
                    <Dropdown.Toggle style={{ width: "100%" }} variant="success" id="dropdown-basic">
                        {instance == "" ? "Select instance" : instance}
                    </Dropdown.Toggle>

                    <Dropdown.Menu style={{ width: "100%" }}>
                        <Dropdown.Item onClick={() => { setInstance("instance-1") }}>instance-1</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setInstance("instance-2") }}>instance-2</Dropdown.Item>
                        <Dropdown.Item onClick={() => { setInstance("instance-3") }}>instance-3</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Button style={{ width: "90%", marginBottom: "5px" }} disabled={instance == "" ? true : false} onClick={() => setOpenMenu("addons")}>Addons</Button>
                <Button style={{ width: "90%", marginBottom: "5px" }} disabled={instance == "" ? true : false} onClick={() => setOpenMenu("schematics")}>Schematics</Button>
                <Button style={{ width: "90%", marginTop: "5px", marginBottom: "5px" }} disabled={instance == "" ? true : false} onClick={() => { window.electron.ipcRenderer.send("openModrinth") }}>Modrinth</Button>
                <span />
                <Button variant="success" style={{ width: "90%", marginBottom: "5px" }} disabled={instance == "" ? true : false}>Play</Button>
            </div>
            <InstanceCreator style={{ display: openMenu == "instance" ? "block" : "none", flexGrow: 1 }} />
            <div className="addons-installer big-window" style={{ display: openMenu == "addons" ? "block" : "none", flexGrow: 1 }}>Manage addons</div>
            <div className="schematics-installer big-window" style={{ display: openMenu == "schematics" ? "block" : "none", flexGrow: 1 }}>Manage schematics</div>
        </div >
    </>)
}

export default Home;