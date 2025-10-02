import React from 'react';

const MaestroIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="38" height="24" viewBox="0 0 38 24" role="img" aria-labelledby="pi-maestro" {...props}>
    <title id="pi-maestro">Maestro</title>
    <g fill="none">
      <circle fill="#00A2E5" cx="10" cy="12" r="7"/>
      <circle fill="#D72036" cx="28" cy="12" r="7"/>
      <path fill="#7375CF" d="M19 12c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7-7-3.13-7-7z" transform="translate(-9)"/>
    </g>
  </svg>
);

export default MaestroIcon;
