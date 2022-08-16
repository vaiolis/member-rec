import React, { useState, useCallback } from 'react';
import './NameForm.css';

function NameForm() {
  const [value, setValue] = useState('');
  const handleChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      alert(`A name was submitted: ${value}`);
      e.preventDefault();
    },
    [value]
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input className="name-input" type="text" value={value} onChange={handleChange} />
      </label>
      <input className="submit-btn" type="submit" value="SUBMIT" />
    </form>
  );
}

export default NameForm;
