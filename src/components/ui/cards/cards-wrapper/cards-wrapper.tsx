interface CardsWrapperProps {
  children: React.ReactNode;
  variant?: string;
}

const CardsWrapper = ({ variant = 'default', children }: CardsWrapperProps) => {
  return (
    <div className={`cards-wrapper cards-wrapper-${variant}`}>{children}</div>
  );
};

export default CardsWrapper;
