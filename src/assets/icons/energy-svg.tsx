import { SvgProps } from '@/types/icons';

export const EnergySvg = ({
  width = '10',
  height = '10',
  fill = 'none',
  stroke = '#079455',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill={fill}
    >
      <g clipPath="url(#clip0_2315_106962)">
        <path
          d="M5.41653 0.833252L1.70547 5.28652C1.56013 5.46093 1.48746 5.54813 1.48635 5.62178C1.48539 5.6858 1.51392 5.74671 1.56372 5.78696C1.62101 5.83325 1.73452 5.83325 1.96154 5.83325H4.99986L4.58319 9.16659L8.29425 4.71331C8.43959 4.53891 8.51226 4.45171 8.51337 4.37806C8.51434 4.31404 8.48581 4.25313 8.436 4.21288C8.37872 4.16659 8.2652 4.16659 8.03818 4.16659H4.99986L5.41653 0.833252Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2315_106962">
          <rect width="10" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
