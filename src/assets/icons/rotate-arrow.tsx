import { SvgProps } from '@/types/icons';

export const RotateArrowSvg = ({
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
        d="M2 11.4706L3.578 9.89355L5.155 11.4706"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9997 12.5293L20.4217 14.1063L18.8447 12.5293"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.957 6.04688C19.48 7.57088 20.423 9.67587 20.423 12.0019C20.423 12.6419 20.345 13.2619 20.211 13.8609"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.4706 21.9997L9.89355 20.4217L11.4706 18.8447"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.1387 20.2101C10.7377 20.3451 11.3577 20.4221 11.9977 20.4221C14.3237 20.4221 16.4287 19.4791 17.9527 17.9561"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.5293 2L14.1063 3.578L12.5293 5.155"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.8609 3.79012C13.2619 3.65512 12.6419 3.57812 12.0019 3.57812C9.67587 3.57812 7.57088 4.52113 6.04688 6.04413"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.04315 17.9567C4.52015 16.4327 3.57715 14.3277 3.57715 12.0017V11.9977C3.57715 11.3577 3.65515 10.7377 3.78915 10.1387"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
