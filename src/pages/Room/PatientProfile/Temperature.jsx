import React, { useState } from "react";

const Temperature = () => {
//   const [temperatureLimit, setTemperatureLimit] = useState(37.5); // default temperature limit is 37.5 degrees Celsius


//   const [value, setValue] = useState(0);

//   const handleChange = (event) => {
//     setValue(event.target.value);
//   };


//   const handleTemperatureLimitChange = (event) => {
//     const temperatureLimitValue = Number(event.target.value); // parse input value as number
//     setTemperatureLimit(temperatureLimitValue);
//   };


//   const [minRange, setMinRange] = useState(0);
//   const [maxRange, setMaxRange] = useState(100);

//   const handleMinRangeChange = (event) => {
//     const value = parseInt(event.target.value);
//     setMinRange(value);
//   };

//   const handleMaxRangeChange = (event) => {
//     const value = parseInt(event.target.value);
//     setMaxRange(value);
//   };

  return (
    <div>
    
  set temperature limit
      {/* <input
        type="range"
        id="temperatureLimit"
        name="temperatureLimit"
        min="35"
        max="40"
        step="0.1"
        value={temperatureLimit}
        onChange={handleTemperatureLimitChange}
      />
      <div>
        <button onClick={() => setTemperatureLimit(36)}>Lower Fever</button>
        <button onClick={() => setTemperatureLimit(37.5)}>Medium Fever</button>
        <button onClick={() => setTemperatureLimit(39)}>High Fever</button>
      </div>

      <div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
      />
      <p>{value}</p>
    </div>








    <div>
      <label>
        Min Range:
        <input
          type="number"
          value={minRange}
          onChange={handleMinRangeChange}
          min={0}
          max={maxRange}
        />
      </label>
      <label>
        Max Range:
        <input
          type="number"
          value={maxRange}
          onChange={handleMaxRangeChange}
          min={minRange}
          max={100}
        />
      </label>
    </div> */}

    </div>
  );
};

export default Temperature;
