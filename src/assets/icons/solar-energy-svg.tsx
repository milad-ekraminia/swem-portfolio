import { memo } from 'react';

const MemoSolarEnergySvg = ({ stroke = '#1570EF' }: { stroke: string }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
      <rect x="3.5" y="10.0834" width="18" height="10.0833" rx="2" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 20.1667V10.0834" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.5 20.1667V10.0834" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.5 15.125H3.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 7.33333H6.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18.5 7.33333H19.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 0.916626V1.83329" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M17.5 2.79611L16.7929 3.44429" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7.49996 2.79611L8.20707 3.44429" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.5 7.33337C9.5 5.81459 10.8431 4.58337 12.5 4.58337C14.1569 4.58337 15.5 5.81459 15.5 7.33337" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const SolarEnergySvg = memo(MemoSolarEnergySvg);

export default SolarEnergySvg;