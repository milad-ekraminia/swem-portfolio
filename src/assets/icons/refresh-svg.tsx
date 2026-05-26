import { SvgProps } from '@/types/icons';

export const RefreshSvg = ({
  width = '20',
  height = '20',
  fill = 'none',
  stroke = '#717680',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill={fill}
    >
      <path
        d="M17.0441 10.7441C16.8126 12.9191 15.5803 14.9572 13.5411 16.1345C10.1532 18.0905 5.82114 16.9297 3.86513 13.5418L3.6568 13.1809M2.95509 9.25578C3.18659 7.08086 4.41891 5.04276 6.45807 3.86545C9.84598 1.90944 14.1781 3.07023 16.1341 6.45813L16.3424 6.81898M2.91095 15.055L3.52099 12.7783L5.7977 13.3883M14.202 6.61161L16.4787 7.22165L17.0887 4.94495"
        stroke={stroke}
        strokeWidth="1.67"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
