import { memo } from 'react';

const MemoWindEnergySvg = ({ stroke = '#1570EF' }: { stroke: "#667085" | "#1570EF" }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="22" viewBox="0 0 25 22" fill="none">
      <path d="M10.519 9.01599L5.21501 12.2478C4.51281 12.6756 4.29452 13.5302 4.71651 14.1994C5.1385 14.8685 6.05532 15.1216 6.81022 14.7773L12.5008 12.182" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5176 9.01602L10.9097 3.21902C10.9619 2.44763 11.6594 1.84638 12.5026 1.84595C13.3457 1.84552 14.0439 2.44606 14.097 3.2174L14.497 9.02573" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.4977 9.02576L19.7875 12.2411C20.4905 12.6684 20.7097 13.5232 20.288 14.1929V14.1929C19.8665 14.862 18.9504 15.1156 18.1954 14.7722L12.5 12.182" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="12.5" cy="10.0749" rx="2" ry="1.83333" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M21.5 20.1667H3.5" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.7681 20.1518L14.2748 12.9893" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.7152 12.9966L10.2301 20.1667" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

const WindEnergySvg = memo(MemoWindEnergySvg);

export default WindEnergySvg;