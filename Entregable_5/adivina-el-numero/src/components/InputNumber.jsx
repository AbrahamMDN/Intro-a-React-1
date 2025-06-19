import React from 'react';

const InputNumber = ({ value, onChange, onCheck, disabled }) => {
  return (
    <div>
      <input
        type="number"
        value={value}
        onChange={onChange}
        placeholder="Ingresa un número del 1 al 100"
        disabled={disabled}
      />
      <button onClick={onCheck} disabled={disabled}>Adivinar</button>
    </div>
  );
};

export default InputNumber;