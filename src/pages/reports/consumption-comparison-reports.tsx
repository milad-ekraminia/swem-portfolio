import { FilesSvg } from '@/assets/icons/files-svg';
import PagesHeader from '@/components/layouts/page-layout/pages-header/pages-header';
import { Button } from '@/components/ui/button/button';
import LineChartEcharts from '@/components/ui/charts/line-chart/line-chart-echart';
import DateInput from '@/components/ui/input/date-input/date-input';
import YearDateInput from '@/components/ui/input/date-input/year-date-input/year-date-input';
import RegisterSelectInput from '@/components/ui/input/select-input/register-select-input';
import LineProgress from '@/components/ui/progress-bar/line-progress';
import Tabs from '@/components/ui/tabs/tabs';
import { periodOptions } from '@/enum-data/reports/reports-data';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { BreadcrumbItem } from '@/types/components/ui/bread-crumb';
import { ComparisonConsumptionReportFields } from '@/types/pages/reports/consumption-comparison';
import { useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';

const baseBreadcrumbs: BreadcrumbItem[] = [
  {
    label: 'Menu:Reports',
  },
  { label: 'consumption_comparison' },
];

const title = {
  label: 'consumption_comparison',
};

export default function ConsumptionComparisonReport() {
  const { register, control, setValue } =
    useForm<ComparisonConsumptionReportFields>({
      defaultValues: {
        comparisonFilter: '',
        em_consumption_comparison_period: '',
        startDate: '',
        device: '',
      },
    });
  const startDate = useWatch({
    name: 'startDate',
    control,
  });
  const [activeTab, setActiveTab] = useState<string>(
    'em_consumption_comparison_based_device',
  );
  return (
    <div className="page-wrapper">
      <PagesHeader
        title={title}
        breadcrumbs={baseBreadcrumbs}
        icon={<FilesSvg />}
      />
      <div className="page-wrapper__body">
        <div className="row">
          <div className="tabs-container">
            <Tabs
              activeTab={activeTab}
              onTabClick={(tab) => setActiveTab(tab)}
              tabs={[
                {
                  title: getTranslatedValue(
                    'em_consumption_comparison_based_device',
                  ),
                  value: 'em_consumption_comparison_based_device',
                },
                {
                  title: getTranslatedValue(
                    'em_consumption_comparison_based_term',
                  ),
                  value: 'em_consumption_comparison_based_term',
                },
              ]}
            ></Tabs>
          </div>

          {activeTab === 'em_consumption_comparison_based_term' ? (
            <YearDateInput type="normal" />
          ) : null}
        </div>

        <>
          <div className="section">
            <div className="section__wrapper">
              <div className="section__wrapper__header">
                <span>
                  {getTranslatedValue('mnuEMReportConsumptionComparison')}
                </span>
              </div>
              <div className="section__wrapper__body">
                <div className="section__wrapper__body-box">
                  <RegisterSelectInput
                    required={true}
                    name={'em_consumption_comparison_period'}
                    label={getTranslatedValue(
                      'em_consumption_comparison_period',
                    )}
                    placeholder={getTranslatedValue(
                      'em_consumption_comparison_period',
                    )}
                    options={periodOptions()}
                    register={register}
                    control={control}
                  />
                  <DateInput
                    label={getTranslatedValue('StartDate')}
                    hasMax={true}
                    name="startDate"
                    onChange={(e: any) => setValue('startDate', e)}
                    value={startDate}
                  />
                  <RegisterSelectInput
                    required={true}
                    name={'comparisonFilter'}
                    label={getTranslatedValue('ComparisonFilter')}
                    placeholder={getTranslatedValue('ComparisonFilter')}
                    options={periodOptions()}
                    register={register}
                    control={control}
                  />
                  <RegisterSelectInput
                    required={true}
                    name={'device'}
                    label={getTranslatedValue(
                      'em_consumption_comparison_filter_device',
                    )}
                    placeholder={getTranslatedValue(
                      'em_consumption_comparison_filter_device',
                    )}
                    options={periodOptions()}
                    register={register}
                    control={control}
                  />
                </div>
                <div className="section__wrapper__body-actions">
                  <Button type="button" variant="primary" onClick={() => { }}>
                    {getTranslatedValue('ReportButton')}
                  </Button>

                  <Button type="button" variant="secondary">
                    {getTranslatedValue('Save')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__wrapper">
              <div className="section__wrapper__header">
                <span>
                  {getTranslatedValue('mnuEMReportConsumptionComparison')}
                </span>
              </div>
              <div className="section__wrapper__body">
                <div className="chart">
                  <LineChartEcharts
                    dates={[
                      '00:00',
                      '01:00',
                      '02:00',
                      '03:00',
                      '04:00',
                      '05:00',
                      '06:00',
                      '07:00',
                    ]}
                    series={[
                      {
                        color: '#079455',
                        name: 'Kompresör A (75 KW)',
                        data: [
                          {
                            y: 0,
                          },
                          {
                            y: 100,
                          },
                          {
                            y: 400,
                          },

                          {
                            y: 600,
                          },

                          {
                            y: 400,
                          },

                          {
                            y: 100,
                          },

                          {
                            y: 100,
                          },

                          {
                            y: 50,
                          },
                        ],
                      },
                      {
                        color: '#2E90FA',
                        name: 'Kompresör B (75 KW)',
                        data: [
                          {
                            y: 50,
                          },
                          {
                            y: 100,
                          },
                          {
                            y: 100,
                          },

                          {
                            y: 600,
                          },

                          {
                            y: 500,
                          },

                          {
                            y: 400,
                          },

                          {
                            y: 100,
                          },

                          {
                            y: 0,
                          },
                        ],
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="section">
            <div className="section__wrapper">
              <div className="section__wrapper__header">
                <span>{getTranslatedValue('em_invoice_total')}</span>
              </div>
              <div className="section__wrapper__body">
                <div className="grid">
                  <div className="card">
                    <span className="title">Kompresör A (75 KW)</span>
                    <LineProgress max={100} value={10.9} color="#079455" />
                    <div className="row">
                      <span className="usage">4,192.00 kWh</span>
                      <span className="price">419.20 $</span>
                    </div>
                  </div>
                  <div className="card">
                    <span className="title">Kompresör B (75 KW)</span>
                    <LineProgress
                      max={100}
                      value={50}
                      color="var(--brand-600)"
                    />
                    <div className="row">
                      <span className="usage">2,578.00 kWh</span>
                      <span className="price">257.80 $</span>
                    </div>
                  </div>
                  <div className="card">
                    <span className="title">AG ADP (A Bölgesi)</span>
                    <LineProgress max={100} value={50} color="#DC6803" />
                    <div className="row">
                      <span className="usage">31,725.00 kWh</span>
                      <span className="price">3,172.50 $</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
