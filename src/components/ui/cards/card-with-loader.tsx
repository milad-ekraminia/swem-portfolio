const CardWithLoader = () => {
  return (
    <div className="information-cards">
      <span className="information-cards__title chart-skeleton-title skeleton skeleton-text"></span>
      <div className="information-cards__content">
        <div className="info-container">
          <div className="chart-container">
            <span className="chart-skeleton-count skeleton skeleton-text"></span>
            <span className="chart-skeleton skeleton skeleton-text"></span>
          </div>
          <div className="info">
            <span className="skeleton skeleton-text chart-skeleton-title-info"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardWithLoader;
