import React, { useState } from 'react'
import Day from '../../pages/Graph&Table/Day'
import Week from '../../pages/Graph&Table/Week'
import Month from '../../pages/Graph&Table/Month'

function Button() {
    const [active, setActive] = useState("dayData")
    return (
        <div>
            <nav>
                <button onClick={() => setActive("dayData")} >Day</button>
                <button onClick={() => setActive("weekData")} >Week</button>
                <button onClick={() => setActive("monthData")} >Month</button>
            </nav>
            <div>
                {active === "dayData" && <Day />}
                {active === "weekData" && <Week />}
                {active === "monthData" && <Month />}
            </div>


        </div>
    )
}

export default Button