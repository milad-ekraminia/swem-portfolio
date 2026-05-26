import { getTranslatedValue } from '@/helpers/get-translated-value';

export const ExtraReports = () => {
  return (
    <div className="extra-reports">
      <div className="extra-reports__header">
        <span className="">{getTranslatedValue('ExtraReporting')}</span>
      </div>
      <div className="extra-reports__body">
        <div className="">
          <span className="">
            Daha fazla bilgi için bu bağlantıyı ziyaret edin:
          </span>
          <a href="#" className="">
            Power BI Raporlama Sistemi
          </a>
        </div>
      </div>
    </div>
  );
};
