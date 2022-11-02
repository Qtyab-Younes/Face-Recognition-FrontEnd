import React from "react";
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Logo.css';


const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt
            className="Tilt tilt-img br2 shadow-2"
            tiltMaxAngleX={35}
            tiltMaxAngleY={35}
            perspective={900}
            scale={1.1}
            transitionSpeed={30}
            gyroscope={true}
            style={{height: 110, width: 110}}
            options={{ max : 55 }}
            >
                <div className="pa3">            
                    <img src={brain} className="inner-element center" alt='logo' />
                </div>
            </Tilt>
        </div>
    )
}
export default Logo;