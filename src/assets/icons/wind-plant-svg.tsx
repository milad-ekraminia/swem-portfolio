import { SvgProps } from '@/types/icons';

export const WindPlantSvg = ({
  width = '16',
  height = '16',
  fill = 'none',
  stroke = '#344054',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill={fill}
    >
      <path
        d="M6.67934 6.55713L3.14334 8.90752C2.67521 9.21868 2.52968 9.84019 2.81101 10.3268C3.09233 10.8135 3.70355 10.9975 4.20681 10.7472L8.00051 8.8597"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.67773 6.55713L6.93917 2.34113C6.97398 1.78011 7.43896 1.34284 8.00105 1.34253C8.56315 1.34222 9.02862 1.77897 9.06405 2.33995L9.33071 6.56419"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33183 6.56421L12.8584 8.90267C13.327 9.21342 13.4731 9.83511 13.192 10.3221V10.3221C12.911 10.8087 12.3003 10.9932 11.7969 10.7435L8 8.85969"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="7.99935"
        cy="7.32723"
        r="1.33333"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 14.6666H2"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.51144 14.6556L9.18258 9.44653"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.80947 9.4519L6.48611 14.6665"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
