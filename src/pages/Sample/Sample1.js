import React, { useState } from 'react';
import { SampleData1 } from './SampleData.js';

function Sample1() {
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id);
  };

  return (
    <div>
      {SampleData1.map(item => {
        return (

        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
        )
        })}
    </div>
  );
}

export default Sample1