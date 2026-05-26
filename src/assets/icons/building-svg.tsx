import { SvgProps } from '@/types/icons';

export const BuildingSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
  stroke = '#98A2B3',
}: SvgProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
    >
      <path
        d="M8.99878 15.0014H15.0013"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.99878 18.0026H15.0013"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.99634 21.0039V10.0323C2.99634 9.30576 3.39056 8.63638 4.02577 8.28362L11.5149 4.12289C11.817 3.95513 12.1842 3.95513 12.4863 4.12289L19.9744 8.28262C20.6099 8.63555 21.004 9.3054 21.0038 10.0323V21.0039"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.0042 21.0039H1.99585"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.99756 21.0037V13.0004C5.99756 12.4479 6.44546 12 6.99798 12H17.0021C17.5547 12 18.0026 12.4479 18.0026 13.0004V21.0037"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99927 8.99899H14.0009"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
