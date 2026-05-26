import Accordion from '@/components/ui/accordion/accordion';
import { Button } from '@/components/ui/button/button';
import { ComponentLoader } from '@/components/ui/loader/component-loader/component-loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import StatusTag from '@/components/ui/status-tag/status-tag';
import Tabs from '@/components/ui/tabs/tabs';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getEntityChangeDetail } from '@/services/system-administration/audit-logs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  entityChangeId: string;
  onClose: () => void;
}

export default function EntityChangeDetailModal({
  entityChangeId,
  onClose,
}: Props) {
  const [activeTab, setActiveTab] = useState<string>('overall');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Fetch entity change details
  const { data, isLoading } = useQuery({
    queryKey: ['entity-change-detail', entityChangeId],
    queryFn: () => getEntityChangeDetail(entityChangeId),
    enabled: !!entityChangeId,
    retry: false,
  });

  const entityChange = data?.entityChange;
  const userName = data?.userName;

  const getChangeTypeLabel = (changeType: number) => {
    switch (changeType) {
      case 0:
        return 'Created';
      case 1:
        return 'Updated';
      case 2:
        return 'Deleted';
      default:
        return changeType.toString();
    }
  };

  if (isLoading) {
    return (
      <div className="global-modal">
        <ModalHeader
          label={getTranslatedValue('Detail', 'AbpAuditLogging.texts')}
          isAuditLogs
          setShowModal={onClose}
        />
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <ComponentLoader />
        </div>
      </div>
    );
  }

  if (!entityChange) {
    return (
      <div className="global-modal">
        <ModalHeader
          label={getTranslatedValue('Detail', 'AbpAuditLogging.texts')}
          isAuditLogs
          setShowModal={onClose}
        />
        <div style={{ padding: '40px', textAlign: 'center' }}>
          {getTranslatedValue('NoDataAvailable')}
        </div>
      </div>
    );
  }

  return (
    <div className="global-modal">
      <ModalHeader
        label={getTranslatedValue('Detail', 'AbpAuditLogging.texts')}
        isAuditLogs
        setShowModal={onClose}
      />
      <div className="audit-modal ">
        <div className="audit-modal__tabs">
          <Tabs
            activeTab={activeTab}
            onTabClick={(tab: string) => setActiveTab(tab)}
            tabs={[
              {
                title: getTranslatedValue('Overall', 'AbpAuditLogging.texts'),
                value: 'overall',
              },
              {
                title: getTranslatedValue(
                  'PropertyChanges',
                  'AbpAuditLogging.texts',
                ),
                value: 'propertyChanges',
              },
            ]}
          ></Tabs>
        </div>
        {activeTab === 'overall' ? (
          <div className="audit-modal__detail">
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('Id', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {entityChange?.id || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('EntityId', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {entityChange?.entityId || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue(
                  'EntityTypeFullName',
                  'AbpAuditLogging.texts',
                )}
              </div>
              <div className="audit-modal__detail-row-value">
                {entityChange?.entityTypeFullName || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ChangeType', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                <StatusTag
                  label={
                    entityChange?.changeType !== undefined
                      ? getChangeTypeLabel(entityChange.changeType)
                      : '-'
                  }
                  color={
                    entityChange?.changeType === 0
                      ? 'success'
                      : entityChange?.changeType === 1
                        ? 'blue'
                        : entityChange?.changeType === 2
                          ? 'danger'
                          : 'warning'
                  }
                />
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ChangeTime', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {entityChange?.changeTime
                  ? dateFormatter(entityChange.changeTime, true, false, true)
                  : '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('AuditLogId', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {entityChange?.auditLogId || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('TenantId', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {entityChange?.tenantId || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('UserName', 'AbpIdentity.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {userName || '-'}
              </div>
            </div>
            {entityChange?.extraProperties?.PageUrl && (
              <div className="audit-modal__detail-row">
                <div className="audit-modal__detail-row-title">
                  {getTranslatedValue('PageUrl', 'AbpAuditLogging.texts')}
                </div>
                <div className="audit-modal__detail-row-value">
                  {entityChange.extraProperties.PageUrl}
                </div>
              </div>
            )}
            {entityChange?.extraProperties?.HttpMethod && (
              <div className="audit-modal__detail-row">
                <div className="audit-modal__detail-row-title">
                  {getTranslatedValue('HttpMethod', 'AbpAuditLogging.texts')}
                </div>
                <div className="audit-modal__detail-row-value">
                  <StatusTag
                    label={entityChange.extraProperties.HttpMethod}
                    color={'blue'}
                  />
                </div>
              </div>
            )}
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ExtraProperties', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {entityChange?.extraProperties &&
                  Object.keys(entityChange.extraProperties).length > 0
                  ? JSON.stringify(entityChange.extraProperties)
                  : '-'}
              </div>
            </div>
          </div>
        ) : (
          <div className="audit-modal__collapsibles">
            {entityChange?.propertyChanges &&
              entityChange.propertyChanges.length > 0 ? (
              entityChange.propertyChanges.map(
                (property: any, index: number) => (
                  <Accordion
                    key={property.id || index}
                    id={property.id || index}
                    clickHandler={() => {
                      const propertyId = property.id || index;
                      setActiveAccordion(
                        propertyId === activeAccordion ? null : propertyId,
                      );
                    }}
                    isSelected={activeAccordion}
                    title={property.propertyName || 'Property'}
                  >
                    <div className="audit-modal__collapsibles-table">
                      <div className="audit-modal__collapsibles-table-row">
                        <div className="audit-modal__collapsibles-table-row-title">
                          {getTranslatedValue('Id', 'AbpAuditLogging.texts')}
                        </div>
                        <div className="audit-modal__collapsibles-table-row-value">
                          {property.id || '-'}
                        </div>
                      </div>
                      <div className="audit-modal__collapsibles-table-row">
                        <div className="audit-modal__collapsibles-table-row-title">
                          {getTranslatedValue(
                            'PropertyName',
                            'AbpAuditLogging.texts',
                          )}
                        </div>
                        <div className="audit-modal__collapsibles-table-row-value">
                          {property.propertyName || '-'}
                        </div>
                      </div>
                      <div className="audit-modal__collapsibles-table-row">
                        <div className="audit-modal__collapsibles-table-row-title">
                          {getTranslatedValue(
                            'PropertyTypeFullName',
                            'AbpAuditLogging.texts',
                          )}
                        </div>
                        <div className="audit-modal__collapsibles-table-row-value">
                          {property.propertyTypeFullName || '-'}
                        </div>
                      </div>
                      <div className="audit-modal__collapsibles-table-row">
                        <div className="audit-modal__collapsibles-table-row-title">
                          {getTranslatedValue(
                            'OriginalValue',
                            'AbpAuditLogging.texts',
                          )}
                        </div>
                        <div className="audit-modal__collapsibles-table-row-value">
                          {property.originalValue || '-'}
                        </div>
                      </div>
                      <div className="audit-modal__collapsibles-table-row">
                        <div className="audit-modal__collapsibles-table-row-title">
                          {getTranslatedValue(
                            'NewValue',
                            'AbpAuditLogging.texts',
                          )}
                        </div>
                        <div className="audit-modal__collapsibles-table-row-value">
                          {property.newValue || '-'}
                        </div>
                      </div>
                      <div className="audit-modal__collapsibles-table-row">
                        <div className="audit-modal__collapsibles-table-row-title">
                          {getTranslatedValue(
                            'TenantId',
                            'AbpAuditLogging.texts',
                          )}
                        </div>
                        <div className="audit-modal__collapsibles-table-row-value">
                          {property.tenantId || '-'}
                        </div>
                      </div>
                      <div className="audit-modal__collapsibles-table-row">
                        <div className="audit-modal__collapsibles-table-row-title">
                          {getTranslatedValue(
                            'EntityChangeId',
                            'AbpAuditLogging.texts',
                          )}
                        </div>
                        <div className="audit-modal__collapsibles-table-row-value">
                          {property.entityChangeId || '-'}
                        </div>
                      </div>
                    </div>
                  </Accordion>
                ),
              )
            ) : (
              <div style={{ padding: '20px', textAlign: 'center' }}>
                {getTranslatedValue('NoDataAvailable')}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="audit-modal-actions">
        <Button onClick={onClose} variant="primary">
          {getTranslatedValue('Close', 'AbpUi.texts')}
        </Button>
      </div>
    </div>
  );
}

