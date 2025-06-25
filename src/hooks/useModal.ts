import { useModalStore, ModalConfig } from '@/stores/useModalStore';
import { useCallback } from 'react';

export const useModal = () => {
  const { openModal, closeModal, closeAllModals } = useModalStore();

  const showModal = useCallback(
    (config: Omit<ModalConfig, 'id'> & { id?: string }) => {
      const modalId = config.id || `modal-${Date.now()}`;
      openModal({ ...config, id: modalId });
      return modalId;
    },
    [openModal],
  );

  const confirm = useCallback(
    (title: string, description?: string, onConfirm?: () => void) => {
      return showModal({
        title,
        description,
        variant: 'alert',
        size: 'sm',
        confirmText: '확인',
        cancelText: '취소',
        onConfirm,
      });
    },
    [showModal],
  );

  const alert = useCallback(
    (title: string, description?: string, onConfirm?: () => void) => {
      return showModal({
        title,
        description,
        variant: 'alert',
        size: 'sm',
        showCancel: false,
        confirmText: '확인',
        onConfirm,
      });
    },
    [showModal],
  );

  const prompt = useCallback(
    (
      title: string,
      description?: string,
      placeholder?: string,
      onConfirm?: (value: string) => void,
    ) => {
      return showModal({
        title,
        description,
        variant: 'default',
        size: 'sm',
        confirmText: '확인',
        cancelText: '취소',
        showInput: true,
        inputPlaceholder: placeholder || '값을 입력하세요',
        onConfirm: (value) => onConfirm?.(value || ''),
      });
    },
    [showModal],
  );

  const success = useCallback(
    (title: string, description?: string, onConfirm?: () => void) => {
      return showModal({
        title,
        description,
        variant: 'minimal',
        size: 'sm',
        showCancel: false,
        confirmText: '확인',
        onConfirm,
      });
    },
    [showModal],
  );

  const error = useCallback(
    (title: string, description?: string, onConfirm?: () => void) => {
      return showModal({
        title,
        description,
        variant: 'alert',
        size: 'sm',
        showCancel: false,
        confirmText: '확인',
        onConfirm,
      });
    },
    [showModal],
  );

  return {
    showModal,
    closeModal,
    closeAllModals,
    confirm,
    alert,
    prompt,
    success,
    error,
  };
};
