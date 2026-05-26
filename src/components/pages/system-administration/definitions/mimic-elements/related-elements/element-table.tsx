import SureDeleteModal from '@/components/ui/action/sure-delete-modal';
import SureDeleteModalAction from '@/components/ui/action/sure-delete-modal-action';
import { Loader } from '@/components/ui/loader/loader';
import Modal from '@/components/ui/modal-wrapper/modal-wrapper';
import { getTranslatedValue } from '@/helpers/get-translated-value';
import { getMimicElementDetailDefinitions } from '@/services/system-administration/definitions/mimic-elements';
import {
  MimicElementFormData,
  MimicElementLookupItem,
} from '@/types/pages/system-administration/definitions/mimic-elements';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import Element from './element';
import ElementForm from './element-form';

interface Props {
  control: Control<MimicElementFormData>;
  mimicElementLookup: MimicElementLookupItem[];
  elementId?: number;
}

interface DeleteModalState {
  id: number;
  isSaved: boolean;
}

export default function RelatedElementsTable({
  control,
  elementId,
  mimicElementLookup,
}: Props) {
  const [deleteModalState, setDeleteModalState] =
    useState<DeleteModalState | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'mimicElementDetails',
  });

  const { data, isLoading } = useQuery({
    queryKey: ['mimicDetailList', elementId],
    queryFn: () =>
      getMimicElementDetailDefinitions({ elementId: elementId as number }),
    retry: false,
    enabled: !!elementId,
  });

  useEffect(() => {
    if (data) {
      append(data.map((item) => ({ ...item, serverId: item.id })));
    }
  }, [data]);

  const handleRemoveLocal = () => {
    if (deleteModalState) {
      remove(deleteModalState.id as number);
      setDeleteModalState(null);
    }
  };

  const handleRemoveServer = () => {
    if (!deleteModalState) return;
    const index = fields.findIndex(
      (field) => field.serverId === deleteModalState.id,
    );
    if (index !== -1) remove(index);
    setDeleteModalState(null);
  };

  return (
    <>
      <div className="related-elements-form-table">
        <div className="related-elements-form-table__title">
          {getTranslatedValue('RelatedElement')}
        </div>

        <div className="related-elements-form-table__header">
          {[
            'Condition',
            'ComponentConditionEqual',
            'ComponentConditionMinimum',
            'ComponentConditionMaximum',
            'Element',
            'Actions',
          ].map((label, i) => (
            <div
              key={label}
              className="related-elements-form-table__header-column"
              style={
                i === 1 || i === 5 ? { gridColumn: 'span 1 / span 1' } : {}
              }
            >
              {getTranslatedValue(label)}
            </div>
          ))}
        </div>

        <div className="related-elements-form-table__body">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <ElementForm
                mimicElementLookup={mimicElementLookup}
                append={append}
                fields={fields}
              />
              {fields.map((field, index) => (
                <Element
                  key={field.id || index}
                  handleRemove={() =>
                    setDeleteModalState({
                      id: field.creationTime ? Number(field.serverId) : index,
                      isSaved: !!field.creationTime,
                    })
                  }
                  mimicElementLookup={mimicElementLookup}
                  element={field}
                />
              ))}
            </>
          )}
        </div>
      </div>
      <Modal
        isOpen={!!deleteModalState}
        onClose={() => setDeleteModalState(null)}
      >
        {deleteModalState?.isSaved ? (
          <SureDeleteModal
            queryKey=""
            setShowModal={() => setDeleteModalState(null)}
            onSuccess={handleRemoveServer}
            deleteItemUrl={`app/mimic-element-components/${deleteModalState.id}?api-version=${import.meta.env.VITE_API_VERSION}`}
          />
        ) : (
          <SureDeleteModalAction
            onClick={handleRemoveLocal}
            setShowModal={() => setDeleteModalState(null)}
          />
        )}
      </Modal>
    </>
  );
}
