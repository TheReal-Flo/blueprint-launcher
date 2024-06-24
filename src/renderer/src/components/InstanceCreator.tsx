import React from "react";

import '../styles/instancecreator.scss'

interface InstanceCreatorProperties {
    style: React.CSSProperties
}

function InstanceCreator({ style }: InstanceCreatorProperties) {
    return (<div className="instance-creator big-window" style={style}>
        <h2>Create new instance</h2>
    </div>)
}

export default InstanceCreator;