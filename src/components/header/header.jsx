import React from 'react';
import './header.css';

function Header() {
    return (
        <div className="header-container">
            <div className='header-content'>
                <a href='/'> <img className='header-logo' src="https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1024/content/dam/fom-website/manual/Helmets2023/sainz" alt="" /></a>
                <div className='options'>
                    <div className='dropdown-content'>
                        <a href="/">Option 1</a>
                        <a href="/">Option 2</a>
                        <a href="/">Option 3</a>
                    </div>
                </div>
                <button className='login-btn'>
                    Login
                </button>
            </div>
        </div>
    );
}

export default Header;