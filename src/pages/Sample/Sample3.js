import React from 'react';
import { SampleData3 } from './SampleData';
function Component3({selectedData}) {
  return (
    <div>
      {SampleData3.filter(item => item.patient === selectedData.id).map(item => (
        <div key={item.id}>
          {item.name}
        </div>
      ))}
    </div>
  );
}

export default Component3;