import { SvgProps } from '@/types/icons';

export const WarningSvg = ({
  width = '24',
  height = '24',
  fill = 'none',
  stroke = '#344054',
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
        d="M20.2171 13.2148C20.7163 12.2514 21.0034 11.16 21.0034 9.9995C21.0034 6.13189 17.8681 2.99658 14.0005 2.99658C12.84 2.99658 11.7486 3.2837 10.7852 3.78291"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99901 21.0039C6.1304 21.0039 2.99609 17.8676 2.99609 14.001C2.99609 10.1344 6.1304 6.99805 9.99901 6.99805C13.8656 6.99805 17.0019 10.1344 17.0019 14.001C17.0019 17.8676 13.8656 21.0039 9.99901 21.0039"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0002 13.7443V11.1992"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99825 16.5524C9.92922 16.5524 9.8722 16.6094 9.8742 16.6784C9.8742 16.7475 9.93122 16.8045 10.0003 16.8045C10.0693 16.8045 10.1243 16.7475 10.1243 16.6784C10.1253 16.6084 10.0693 16.5524 9.99825 16.5524"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
