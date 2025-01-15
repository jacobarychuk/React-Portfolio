import { useState } from 'react';
import './TagFilterDropdown.css';

function TagFilterDropdown({ tags, onTagSelect }) {
  const [hasSelected, setHasSelected] = useState(false);

  const handleChange = (e) => {
    const selectedTag = e.target.value;
    onTagSelect(selectedTag);
    setHasSelected(true);
  };

  return (
    <div className="dropdown">
      <p>Sort projects by tag</p>
      <div className="dropdown__select-container">
        <select className="dropdown__select" onChange={handleChange}>
          <option value="" disabled={hasSelected}>
            Select a tag...
          </option>
          <option value="">All tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default TagFilterDropdown;
