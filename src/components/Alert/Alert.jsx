import React from 'react'
import {  AiOutlinePlus, AiFillDelete } from 'react-icons/ai';
import {data} from '../Alert/data'

import './Alert.css'

const Alert = () => {
  return (
    <div className='Alert'>
        <div className="Alert-container">

        <span className='icon-box'>
        <AiOutlinePlus size={20} style={{marginRight:'15px'}} />

        </span>
        <span>Alert</span>
        
        <span className='icon-box'>

        <AiFillDelete size={20} style={{marginRight:'15px'}} />
        </span>
        </div>
            {data.map(alert => {
                return(
        <div className="Alert-message">
                    
                    
                        <div key={alert.id}>
                            <span>{alert.name}</span>
                            <span>{alert.time}</span>
                            <span>{alert.roomId}</span>
                        </div>
                        <div>
                            <span>{alert.temp}</span>
                            <span>{alert.msg}</span>
                        </div>
                    
        </div>
                )
            })}
        </div>
  )
}

export default Alert