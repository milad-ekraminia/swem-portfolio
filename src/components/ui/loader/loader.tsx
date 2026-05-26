export const Loader = ({ isFallBack = false }: { isFallBack?: boolean }) => {
  return (
    <div className={`flex-center container ${isFallBack ? 'fallback' : ''} `}>
      <div className="container__loader">
        <div className="container__loader-crystal"></div>
        <div className="container__loader-crystal"></div>
        <div className="container__loader-crystal"></div>
        <div className="container__loader-crystal"></div>
        <div className="container__loader-crystal"></div>
        <div className="container__loader-crystal"></div>
      </div>
    </div>
  );
};
