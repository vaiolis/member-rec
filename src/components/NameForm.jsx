import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import './NameForm.css';

function NameForm(props) {
  const { name, setName } = props;
  const handleChange = useCallback(
    (e) => {
      setName(e.target.value);
    },
    [setName]
  );

  const handleSubmit = useCallback(
    (e) => {
      alert(`A name was submitted: ${name}`);
      e.preventDefault();
    },
    [name]
  );

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input className="name-input" type="text" value={name} onChange={handleChange} />
      </label>
      <input className="submit-btn" type="submit" value="SUBMIT" />
    </form>
  );
}

NameForm.propTypes = {
  name: PropTypes.string,
  setName: PropTypes.func,
};

export default NameForm;
