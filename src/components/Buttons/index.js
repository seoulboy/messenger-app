import React from 'react';
import './index.css';

export const BackButton = () => {
  return (
    <>
      <button className='back-button'>뒤로</button>
    </>
  );
};

export const SendButton = ({ onClick }) => {
  return (
    <>
      <button className='send-button' onClick={onClick}>
        보내기
      </button>
    </>
  );
};
