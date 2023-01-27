import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import Navbar from '../../components/Navbar/Navbar'
import './Profile.css'
import SubTopbar from '../../components/SubTopbar/SubTopbar'
import Avatar from '../../../src/assets/img/Avatar.jpeg'


const Profile = () => {
  return (
    <div className='Container'>
        <div className="left-profile">
            <Navbar/>
        </div>
        <div className="right-profile">
            <Scrollbars>
                <SubTopbar/>

                <div className="Profile">
                    <div className="profile-left">
                        <div>
                            <img style={{width:'10rem'}} src={Avatar} alt="" srcset="" />
                        </div>
                        <div>right</div>
                        
                    </div>
                    <div className="profile-right">
                        <p>cxbcxb</p>
                    </div>
                </div>

            </Scrollbars>
        </div>
    </div>
  )
}

export default Profile