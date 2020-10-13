import React, {useState} from "react";
import './Header.css';
import Switch from '@material-ui/core/Switch';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';

function Header(props) {

    const darkMode = props.mode;

    const [switchState, setSwitchState] = useState(darkMode);

    function switchChange() {
        props.setmode();
        setSwitchState(!switchState);
    }

    return (
        <header style={{backgroundColor: darkMode? "var(--dm-element)" : "var(--white)", color: darkMode? "var(--white)" : "var(--lm-text)"}}>
            <h1 className="header__title">Where In The World?</h1>
            <div className="switch__group">
                <p className="switch__title">Dark Mode</p>
                <div className="switch">
                    <WbSunnyIcon />
                    <Switch
                        checked={switchState}
                        onChange={switchChange}
                    />
                    <Brightness3Icon />
                </div>
                
            </div>
            
        </header>
    )

}

export default Header;