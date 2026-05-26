import { SvgProps } from '@/types/icons';

export const PlantsSvg = ({
  width = '16',
  height = '16',
  fill = 'none',
  stroke = "#344054"
}: SvgProps) => {
  return (
    <svg width={width} height={height} viewBox="0 0 16 16" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path d="M5.50065 11.3333L5.83398 2" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.418 6.66658H1.56055" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.6673 14.0001H5.33398" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.33398 12C9.33398 13.1046 9.7817 14 10.334 14" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66602 12C6.66602 13.1046 6.2183 14 5.66602 14" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.33333 11.9999V11.3333" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.66732 11.9999V11.3333" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path fillRule="evenodd" clipRule="evenodd" d="M3.14351 2H12.8577C13.5572 2 14.1378 2.54059 14.1876 3.23833L14.6638 9.905C14.6902 10.2742 14.5619 10.6377 14.3097 10.9086C14.0574 11.1795 13.704 11.3333 13.3338 11.3333H2.66732C2.29719 11.3333 1.94372 11.1795 1.6915 10.9086C1.43928 10.6377 1.31101 10.2742 1.33738 9.905L1.81356 3.23834C1.8634 2.5406 2.44399 2 3.14351 2Z" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.5 11.3333L10.1667 2" stroke={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
