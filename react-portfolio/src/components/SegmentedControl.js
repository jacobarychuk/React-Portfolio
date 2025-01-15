import './SegmentedControl.css';
import { useState } from 'react';

function SegmentedControl({ defaultIndex, callback, segments }) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const onInputChange = (value, index) => {
    setActiveIndex(index);
    callback(value);
  };

  return (
    <div className="segmented-control">
      <div
        className="segmented-control__highlight"
        style={{
          transform: `translateX(calc(${activeIndex} * 100% + ${activeIndex} * 0.375rem))`,
        }}
      />
      {segments.map((item, index) => (
        <div
          key={item.label}
          className="segmented-control__segment"
          ref={item.ref}
        >
          <input type="radio" id={item.label} onChange={() => onInputChange(item.value, index)} checked={index === activeIndex} />
          <label htmlFor={item.label}>{item.label}</label>
        </div>
      ))}
    </div>
  );
}

export default SegmentedControl;
