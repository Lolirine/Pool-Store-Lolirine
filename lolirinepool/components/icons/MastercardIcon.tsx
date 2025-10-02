import React from 'react';

const MastercardIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" role="img" aria-labelledby="pi-mastercard" {...props}>
    <title id="pi-mastercard">Mastercard</title>
    <g fill="none">
      <circle fill="#EB001B" cx="15" cy="12" r="7"/>
      <circle fill="#F79E1B" cx="23" cy="12" r="7"/>
      <path fill="#FF5F00" d="M22 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z" transform="translate(-15)"/>
    </g>
  </svg>
);

export default MastercardIcon;
