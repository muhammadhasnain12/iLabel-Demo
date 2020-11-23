import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import logo_f from './Images/i-label-white.png'
export class Header extends Component {
    expireLocalStorage=()=>{
        localStorage.removeItem("Url");
    }
    render() {
        return (

            <nav className="navbar sticky-top flex-md-nowrap  border-bottom-lightGrey">
                <a className="navbar-brand  mr-0 px-3 border-right-lightGrey" href="/homepage" onClick={this.expireLocalStorage}> 
                    <img src={logo_f} className="img-fluid " alt='logo' style={{ width: '150px' }} />
                </a>

                <li className="nav-item mr-auto nav-listStyle-none">
                    <div className="nav-link text-muted1" >Demo Version </div>
                </li>
                {/* onClick={this.goToWeb} */}
                <li className="nav-item ml-auto nav-listStyle-none">
                    <Link type="button" to="/" className="btn headerButton" style={{background: '#309486'}}>
                        <i className="fa fa-sign-out" aria-hidden="true" ></i>Exit</Link>
                </li>
            </nav>

        )
    }
}

export default Header
