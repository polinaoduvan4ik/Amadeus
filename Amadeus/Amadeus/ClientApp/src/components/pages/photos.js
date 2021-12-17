import React from 'react'
import '../pages/photos-style.css';


class Photos extends React.Component{
    
    render(){
        const photo1 = require('../images/1.jpg');
        const photo2 = require('../images/2.jpg');
        const photo3 = require('../images/3.jpg');

        return(
            <div className="Photos_main">
                <div className="Photos_list">
                    <img className="Photo_element" src={photo1} alt={"photo1"} />
                    <img className="Photo_element" src={photo2} alt={"photo2"} />
                    <img className="Photo_element" src={photo3} alt={"photo3"} />
                </div>

            </div>
        )
    }
}

export default Photos;