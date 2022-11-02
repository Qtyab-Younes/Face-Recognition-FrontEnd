import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
      return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
          <a href='/'>
          <button onClick={() => onRouteChange('signout')} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib ma2 ">Sign Out</button>
          </a>
        </nav>
      );
    } else {
      return (
        <nav className='' style={{display: 'flex', justifyContent: 'flex-end'}}>
          <button onClick={() => onRouteChange('signin')} className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib ma2'>Sign In</button>
          <button onClick={() => onRouteChange('register')} className='b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f4 dib ma2'>Register</button>
        </nav>
      );
    }
}
export default Navigation;