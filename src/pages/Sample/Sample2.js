import React, { useState } from 'react';
import { SampleData2 } from './SampleData.js';

function Sample2({selectedId}) {
  const [selectedData, setSelectedData] = useState(null);

  const handleClick = (data) => {
    setSelectedData(data);
  };

  return (
    <div>
      {SampleData2.filter(item => item.roomId === selectedId).map(item => (
        <div key={item.id} onClick={() => handleClick(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default Sample2;