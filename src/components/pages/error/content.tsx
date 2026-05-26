import { memo } from 'react';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { useParams } from 'react-router-dom';
import CustomErrorButtons from './error-group-buttons/error-group-buttons';

const MemoErrorPageContent = () => {
  const { status } = useParams();
  return (
    <div className="dv-error__content-section">
      <div className="dv-error__content-section__content">
        <div className="dv-error__content-section__content__inner">
          <div className="dv-error__content-section__content__inner-background"></div>
          <div className="text-box">
            <h1>
              {status ?? 404} {getTranslatedValue('Mistake')}
            </h1>
            <h3 className="desc">
              {status ? (
                +status === 500 ? (
                  <>{getTranslatedValue('ErrorOccurredTryLater')}</>
                ) : (
                  <>{getTranslatedValue('NoPermissionAccess')}</>
                )
              ) : (
                <>{getTranslatedValue('PageNotExist')}</>
              )}
            </h3>
          </div>
          <CustomErrorButtons
            isPending={false}
            confirmButtonText={getTranslatedValue('ReturnToDashboard')}
          />
        </div>
      </div>
    </div>
  );
};

const ErrorPageContent = memo(MemoErrorPageContent);

export default ErrorPageContent;
