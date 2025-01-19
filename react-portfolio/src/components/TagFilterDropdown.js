import { useState } from 'react';
import './TagFilterDropdown.css';
import caron from '../caron.svg';

function TagFilterDropdown({ tags, onTagSelect }) {
  const [hasSelected, setHasSelected] = useState(false);

  const handleChange = (e) => {
    const selectedTag = e.target.value;
    onTagSelect(selectedTag);
    setHasSelected(true);
  };

  return (
    <div className="dropdown">
      <div className="dropdown__arrow">
        <img src={caron} alt=""></img>
      </div>
      <select className="dropdown__select" onChange={handleChange}>
        <option value="" disabled={hasSelected}>
          Filter by tag
        </option>
        <option value="">All tags</option>
        {tags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TagFilterDropdown;
