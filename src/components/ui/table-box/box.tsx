import BoxContent from './box-content';
import BoxFooter from './box-footer';
import BoxHeader from './box-header';

function Box({ data }: Readonly<{ data: any }>) {
  return (
    <div className={`box ${data?.warehouse?.isDiscard ? 'discard' : ''}`}>
      <BoxHeader
        isDiscard={data?.warehouse?.isDiscard}
        name={data?.warehouse?.name}
        isMainWareHouse={!data?.warehouse1}
      />
      <BoxContent data={data} />
      <BoxFooter
        isDiscard={data?.warehouse?.isDiscard}
        id={data?.warehouse?.id}
        haveDeletePermission={data?.haveDeletePermission}
        haveEditPermmission={data?.haveEditPermmission}
        havePermissionSetup={data?.havePermissionSetup}
        haveInventoriesPermission={data?.haveInventoriesPermission}
      />
    </div>
  );
}

export default Box;
