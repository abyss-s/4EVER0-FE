import React, { useState } from 'react';
import { useModalStore, ModalConfig } from '@/stores/useModalStore';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from '@/components/Modal';
import { Button } from '@/components/Button';

export const GlobalModalProvider: React.FC = () => {
  const { modals, closeModal } = useModalStore();
  const [inputValues, setInputValues] = useState<Record<string, string>>({});

  const handleInputChange = (modalId: string, value: string) => {
    setInputValues((prev) => ({ ...prev, [modalId]: value }));
  };

  const handleConfirm = (modal: ModalConfig) => {
    const inputValue = inputValues[modal.id] || '';
    modal.onConfirm?.(modal.showInput ? inputValue : undefined);
    closeModal(modal.id);
    // 입력값 정리
    setInputValues((prev) => {
      const newValues = { ...prev };
      delete newValues[modal.id];
      return newValues;
    });
  };

  const handleCancel = (modal: ModalConfig) => {
    modal.onCancel?.();
    closeModal(modal.id);
    // 입력값 정리
    setInputValues((prev) => {
      const newValues = { ...prev };
      delete newValues[modal.id];
      return newValues;
    });
  };

  return (
    <>
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              closeModal(modal.id);
            }
          }}
        >
          <ModalContent
            variant={modal.variant || 'default'}
            size={modal.size || 'default'}
            showClose={modal.showClose ?? true}
            closeOnOverlayClick={modal.closeOnOverlayClick ?? true}
            closeOnEscape={modal.closeOnEscape ?? true}
          >
            {(modal.title || modal.description) && (
              <ModalHeader>
                {modal.title && <ModalTitle>{modal.title}</ModalTitle>}
                {modal.description && <ModalDescription>{modal.description}</ModalDescription>}
              </ModalHeader>
            )}

            {/* 커스텀 콘텐츠 */}
            {modal.content && <div className="py-4">{modal.content}</div>}

            {/* 입력 필드 */}
            {modal.showInput && (
              <div className="py-4">
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={modal.inputPlaceholder || '값을 입력하세요'}
                  value={inputValues[modal.id] || ''}
                  onChange={(e) => handleInputChange(modal.id, e.target.value)}
                  autoFocus
                />
              </div>
            )}

            {/* 푸터 버튼들 */}
            {(modal.showCancel !== false || modal.showConfirm !== false) && (
              <ModalFooter>
                {modal.showCancel !== false && (
                  <Button variant="outline" onClick={() => handleCancel(modal)}>
                    {modal.cancelText || '취소'}
                  </Button>
                )}
                {modal.showConfirm !== false && (
                  <Button
                    variant={modal.confirmVariant || 'default'}
                    onClick={() => handleConfirm(modal)}
                  >
                    {modal.confirmText || '확인'}
                  </Button>
                )}
              </ModalFooter>
            )}
          </ModalContent>
        </Modal>
      ))}
    </>
  );
};
