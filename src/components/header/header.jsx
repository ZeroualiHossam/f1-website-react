import React from 'react';
import './header.css';
import { auth } from '../../firebase';
import SignIn from '../login/signin';
import SignOut from '../signout/signout';
import { useAuthState } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

function Header() {
    const [user] = useAuthState(auth);

    return (
        <div className="header-container">
            <div className='header-content'>
                <NavLink to='/'> <img className='header-logo' src="https://media.formula1.com/image/upload/f_auto,c_limit,q_75,w_1024/content/dam/fom-website/manual/Helmets2023/sainz" alt="" /></NavLink>
                <div className='options'>
                    <div className='dropdown-content'>
                        <NavLink to="/">Option 1</NavLink>
                        <NavLink to="/community">Community</NavLink>
                        <NavLink to="/strategist">Option 3</NavLink>
                    </div>
                </div>
                {user ? <SignOut auth={auth} /> : <SignIn />}
            </div>
        </div>
    );
}

export default Header;