import React, { useState } from 'react';
import Sample1 from './Sample1';
import Sample2 from './Sample2';
import Sample3 from './Sample3';

function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedData, setSelectedData] = useState(null);

  const handleClick = (id) => {
    setSelectedId(id);
  };

  const handleDataClick = (data) => {
    setSelectedData(data);
  };

  return (
    <div>
      <Sample1 handleClick={handleClick} />
      {selectedId && <Sample2 selectedId={selectedId} handleClick={handleDataClick} />}
      {selectedData && <Sample3 selectedData={selectedData} />}
    </div>
  );
}

export default App;