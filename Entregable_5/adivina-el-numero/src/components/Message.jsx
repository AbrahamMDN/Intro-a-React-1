import React from 'react';

const Message = ({ feedback }) => {
  if (!feedback) return null;

  let messageColor;

  if (feedback === '¡Correcto!') {
    messageColor = 'green';
  } else if (feedback === 'El número es mayor' || feedback === 'El número es menor') {
    messageColor = 'blue';
  } else {
    messageColor = 'red';
  }

  return (
    <p style={{ color: messageColor }}>{feedback}</p>
  );
};

export default Message;
