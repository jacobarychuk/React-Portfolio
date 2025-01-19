function Tag({ label, color }) {
  const tagStyle = {
    display: 'inline-block',
    border: `0.125rem solid ${color}`,
    borderRadius: '9999px',
    padding: '0.25rem 0.75rem',
    backgroundColor: 'white',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: color,
    height: '2rem',
    boxSizing: 'border-box',
  };

  return <div style={tagStyle}>{label}</div>;
}

export default Tag;
