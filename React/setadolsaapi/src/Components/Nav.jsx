import React from 'react';
import { useState } from 'react';
import { CSSTransition } from 'react-transition-group'
import { Link, useHistory } from "react-router-dom";



import { ReactComponent as BellIcon } from '../Icons/Bell.svg';
import { ReactComponent as MenuIcon } from '../Icons/Menu.svg';
import { ReactComponent as AccountIcon } from '../Icons/Account.svg';
import { ReactComponent as ConfigIcon } from '../Icons/Configuration.svg';
import { ReactComponent as RightArrowIcon } from '../Icons/RightArrow.svg';
import { ReactComponent as ExitIcon } from '../Icons/Exit.svg';
import { ReactComponent as ThreeDotsIcon } from '../Icons/Dots.svg';
import unknown from '../photos/unknown.jpg'
import cuchmanSaiPhoto from '../photos/cuchmanSaiPhoto.png';


const Nav = (props) => {
    const [openDropdown, setDropdown] = useState(false)
    const [openNotification, setNotification] = useState(false)


    return (
        <nav className="navbar">
            {props.token && <div className="aside-icon" onClick={() => {
                props.setAside(!props.openAside)
                setTimeout(() => { props.setAside(false)}, 30000) 
            }
                }><ThreeDotsIcon/></div>}
            <Link to='/'><img src={cuchmanSaiPhoto} alt="logo" id='logo'/></Link>
           {props.token && <ul className="nav-navbar">
                <NavItem icon={<BellIcon/>} open={openNotification} setOpen={setNotification} setClose={setDropdown}><NotificationsMenu/></NavItem>
                <NavItem icon={<MenuIcon/>} open={props.openApplications} setOpen={props.setApplications} ></NavItem>
                <NavItem icon={<AccountIcon/>} open={openDropdown} setOpen={setDropdown} setClose={setNotification}><DropdownMenu setToken={props.setToken} setDropdown={setDropdown} setApplications={props.setApplications}/></NavItem>
            </ul>}
        </nav>
    );


}

const NavItem = (props) => {

    return (
        <li className="nav-item">
            <a className="icon-button" onClick= {() => {
                props.setOpen(!props.open)
                props.setClose && props.setClose(false)
                setTimeout(() => { props.setOpen(false)}, 30000)
            }}>
                { props.icon }
            </a>
            { props.open && props.children }
        </li>
    )
}


const DropdownMenu = (props) => {
    
    const [activeMenu, setActiveMenu] = useState('main')
    const [menuHeight, setMenuHeight] = useState(null)

    function calcHeight(el) {
        const height = el.offsetHeight;
        setMenuHeight(height + 30);
        console.log(el)
    }


    const DropdownItem = (props) => {

        return (
            <div className="menu-item" onClick={() => {
                    props.goToMenu && setActiveMenu(props.goToMenu)
                }}>
                {props.img ? <img className="icon-button" src={unknown} /> : <span className="icon-button">{ props.leftIcon }</span>}
                { props.children }
                <span className="icon-right">{ props.rightIcon }</span>

            </div>
        )
    }

    const DropdownExitItem = (props) => {
        let history = useHistory();

        return (
            <div className="menu-item" onClick={() => {
                    localStorage.removeItem('alias')
                    localStorage.removeItem('jwt')
                    props.setToken(localStorage.jwt)
                    alert('Logout Exitoso')
                    history.push('/')
                    props.setDropdown(false)
                    props.closeApps(false)
                }}>
                <span className="icon-button">{ props.leftIcon }</span>
            </div>
        )
    }
    
    return (
        <div className="dropdown" style={{ height: menuHeight}}>
            <CSSTransition 
                in={activeMenu === 'main'}
                unmountOnExit
                timeout={500}
                classNames="menu-primary"
                onEnter={calcHeight}>
                <div className="menu">
                    <DropdownItem img={true} ><Link to="/MyProfile">My Profile</Link></DropdownItem>
                    <DropdownItem 
                        leftIcon={<ConfigIcon/>}
                        rightIcon={<RightArrowIcon/>}
                        goToMenu="settings">
                    Configuración </DropdownItem>
                    <DropdownExitItem
                        leftIcon={<ExitIcon/>}
                        setToken={props.setToken}
                        setDropdown={props.setDropdown}
                        closeApps={props.setApplications}>
                    Exit </DropdownExitItem>
                </div>
            </CSSTransition>
            <CSSTransition 
                in={activeMenu === 'settings'}
                unmountOnExit
                timeout={500}
                classNames="menu-secondary"
                onEnter={calcHeight}
                >
                <div className="menu">
                    <DropdownItem leftIcon={<RightArrowIcon/>} goToMenu="main"></DropdownItem>
                    <DropdownItem>Configuración1</DropdownItem>
                    <DropdownItem>Configuración2</DropdownItem>
                    <DropdownItem>Configuración3</DropdownItem>
                </div>
            </CSSTransition>
        </div>
    )
}

const NotificationsMenu = (props) => {
    return (
        <div className='dropdown'>

        </div>
    )
}


export default Nav;