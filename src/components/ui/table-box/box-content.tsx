import { getTranslatedValue } from '@/helpers/get-translated-value';
import StatusTag from '../status-tag/status-tag';

function BoxContent({ data }: { data: any }) {
  const color = data.warehouse.status ? 'success' : 'orange';
  const isDisabled = data?.warehouse?.isDiscard;
  const isMainWareHouse = !data?.warehouse1;

  return (
    <div className="box-content">
      <div className="box-content-main-data">
        {!isMainWareHouse && (
          <>
            <span className="box-content-main-data-title">Ana Depo: </span>
            <span className="box-content-main-data-value">
              {data?.warehouse1?.name}
            </span>
          </>
        )}
        {isMainWareHouse ? (
          <StatusTag
            color={'blue'}
            label={getTranslatedValue('MainWarehouse')}
          />
        ) : (
          <span></span>
        )}
      </div>

      {!isDisabled ? (
        <StatusTag
          color={color}
          label={
            data?.warehouse?.status
              ? getTranslatedValue('Active')
              : getTranslatedValue('Passive')
          }
        />
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default BoxContent;
