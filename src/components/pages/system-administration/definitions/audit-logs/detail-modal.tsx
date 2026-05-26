import Accordion from '@/components/ui/accordion/accordion';
import { Button } from '@/components/ui/button/button';
import { Loader } from '@/components/ui/loader/loader';
import ModalHeader from '@/components/ui/modal-wrapper/modal-header';
import StatusTag from '@/components/ui/status-tag/status-tag';
import Tabs from '@/components/ui/tabs/tabs';
import { dateFormatter } from '@/helpers/format-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getAuditLogDetail } from '@/services/system-administration/audit-logs';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

interface Props {
  auditLogId: string;
  onClose: () => void;
}
export default function AuditLogDetailModal({ auditLogId, onClose }: Props) {
  const [activeTab, setActiveTab] = useState<string>('overall');
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);

  // Fetch audit log details
  const { data: auditLog, isLoading } = useQuery({
    queryKey: ['audit-log-detail', auditLogId],
    queryFn: () => getAuditLogDetail(auditLogId),
    enabled: !!auditLogId,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="global-modal">
        <ModalHeader
          label={getTranslatedValue('Detail', 'AbpAuditLogging.texts')}
          isAuditLogs
          setShowModal={onClose}
        />
        <Loader />
      </div>
    );
  }

  if (!auditLog) {
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
                title: getTranslatedValue('Actions', 'AbpAuditLogging.texts'),
                value: 'entityChanges',
              },
            ]}
          ></Tabs>
        </div>
        {activeTab === 'overall' ? (
          <div className="audit-modal__detail">
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('HttpStatusCode', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                <StatusTag
                  label={auditLog?.httpStatusCode || '-'}
                  color={
                    auditLog?.httpStatusCode >= 200 &&
                      auditLog?.httpStatusCode < 300
                      ? 'success'
                      : 'danger'
                  }
                />
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('HttpMethod', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                <StatusTag label={auditLog?.httpMethod || '-'} color={'blue'} />
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('Url', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.url || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('UserId', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.userId || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('UserName', 'AbpIdentity.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.userName || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('TenantId', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.tenantId || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('TenantName', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.tenantName || '-'}
              </div>
            </div>
            {(auditLog?.impersonatorUserId ||
              auditLog?.impersonatorUserName ||
              auditLog?.impersonatorTenantId ||
              auditLog?.impersonatorTenantName) && (
                <>
                  <div className="audit-modal__detail-row">
                    <div className="audit-modal__detail-row-title">
                      {getTranslatedValue(
                        'ImpersonatorUserId',
                        'AbpAuditLogging.texts',
                      )}
                    </div>
                    <div className="audit-modal__detail-row-value">
                      {auditLog?.impersonatorUserId || '-'}
                    </div>
                  </div>
                  <div className="audit-modal__detail-row">
                    <div className="audit-modal__detail-row-title">
                      {getTranslatedValue(
                        'ImpersonatorUserName',
                        'AbpAuditLogging.texts',
                      )}
                    </div>
                    <div className="audit-modal__detail-row-value">
                      {auditLog?.impersonatorUserName || '-'}
                    </div>
                  </div>
                  <div className="audit-modal__detail-row">
                    <div className="audit-modal__detail-row-title">
                      {getTranslatedValue(
                        'ImpersonatorTenantId',
                        'AbpAuditLogging.texts',
                      )}
                    </div>
                    <div className="audit-modal__detail-row-value">
                      {auditLog?.impersonatorTenantId || '-'}
                    </div>
                  </div>
                  <div className="audit-modal__detail-row">
                    <div className="audit-modal__detail-row-title">
                      {getTranslatedValue(
                        'ImpersonatorTenantName',
                        'AbpAuditLogging.texts',
                      )}
                    </div>
                    <div className="audit-modal__detail-row-value">
                      {auditLog?.impersonatorTenantName || '-'}
                    </div>
                  </div>
                </>
              )}
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ClientIpAddress', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.clientIpAddress || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ClientId', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.clientId || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ExecutionTime', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.executionTime
                  ? dateFormatter(auditLog.executionTime, true, false, true)
                  : '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue(
                  'ExecutionDuration',
                  'AbpAuditLogging.texts',
                )}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.executionDuration
                  ? `${auditLog.executionDuration} ms`
                  : '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('BrowserInfo', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.browserInfo || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ClientName', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.clientName || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ApplicationName', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.applicationName || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('CorrelationId', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.correlationId || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('Comments', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.comments || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('Exceptions', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.exceptions || '-'}
              </div>
            </div>
            <div className="audit-modal__detail-row">
              <div className="audit-modal__detail-row-title">
                {getTranslatedValue('ExtraProperties', 'AbpAuditLogging.texts')}
              </div>
              <div className="audit-modal__detail-row-value">
                {auditLog?.extraProperties
                  ? JSON.stringify(auditLog.extraProperties)
                  : '-'}
              </div>
            </div>
          </div>
        ) : (
          <div className="audit-modal__collapsibles">
            {auditLog?.actions && auditLog.actions.length > 0 ? (
              auditLog.actions.map((action: any, index: number) => (
                <Accordion
                  key={action.id || index}
                  id={action.id || index}
                  clickHandler={() => {
                    const actionId = action.id || index;
                    setActiveAccordion(
                      actionId === activeAccordion ? null : actionId,
                    );
                  }}
                  isSelected={activeAccordion}
                  title={action.serviceName || action.methodName || 'Action'}
                >
                  <div className="audit-modal__collapsibles-table">
                    <div className="audit-modal__collapsibles-table-row">
                      <div className="audit-modal__collapsibles-table-row-title">
                        {getTranslatedValue('Id', 'AbpAuditLogging.texts')}
                      </div>
                      <div className="audit-modal__collapsibles-table-row-value">
                        {action.id || '-'}
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
                        {action.tenantId || '-'}
                      </div>
                    </div>
                    <div className="audit-modal__collapsibles-table-row">
                      <div className="audit-modal__collapsibles-table-row-title">
                        {getTranslatedValue(
                          'ServiceName',
                          'AbpAuditLogging.texts',
                        )}
                      </div>
                      <div className="audit-modal__collapsibles-table-row-value">
                        {action.serviceName || '-'}
                      </div>
                    </div>
                    <div className="audit-modal__collapsibles-table-row">
                      <div className="audit-modal__collapsibles-table-row-title">
                        {getTranslatedValue(
                          'MethodName',
                          'AbpAuditLogging.texts',
                        )}
                      </div>
                      <div className="audit-modal__collapsibles-table-row-value">
                        {action.methodName || '-'}
                      </div>
                    </div>
                    <div className="audit-modal__collapsibles-table-row">
                      <div className="audit-modal__collapsibles-table-row-title">
                        {getTranslatedValue(
                          'ExecutionTime',
                          'AbpAuditLogging.texts',
                        )}
                      </div>
                      <div className="audit-modal__collapsibles-table-row-value">
                        {action.executionTime
                          ? dateFormatter(action.executionTime, true, false, true)
                          : '-'}
                      </div>
                    </div>
                    <div className="audit-modal__collapsibles-table-row">
                      <div className="audit-modal__collapsibles-table-row-title">
                        {getTranslatedValue(
                          'ExecutionDuration',
                          'AbpAuditLogging.texts',
                        )}
                      </div>
                      <div className="audit-modal__collapsibles-table-row-value">
                        {action.executionDuration
                          ? `${action.executionDuration} ms`
                          : '-'}
                      </div>
                    </div>
                    <div className="audit-modal__collapsibles-table-row">
                      <div className="audit-modal__collapsibles-table-row-title">
                        {getTranslatedValue(
                          'Parameters',
                          'AbpAuditLogging.texts',
                        )}
                      </div>
                      <div className="audit-modal__collapsibles-table-row-value">
                        {action.parameters ? (
                          <pre
                            style={{
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              margin: 0,
                              fontFamily: 'monospace',
                              fontSize: '12px',
                              maxHeight: '300px',
                              overflow: 'auto',
                            }}
                          >
                            {action.parameters}
                          </pre>
                        ) : (
                          '-'
                        )}
                      </div>
                    </div>
                  </div>
                </Accordion>
              ))
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
