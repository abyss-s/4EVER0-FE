import { create } from 'zustand';
import { ReactNode } from 'react';

export interface ModalConfig {
  id: string;
  title?: string;
  description?: string;
  content?: ReactNode;
  variant?: 'default' | 'minimal' | 'drawer' | 'alert';
  size?: 'sm' | 'default' | 'lg' | 'xl';
  showClose?: boolean; // showCloseButton → showClose로 통일
  showCancel?: boolean; // showCancelButton → showCancel로 변경
  showConfirm?: boolean; // showConfirmButton → showConfirm로 변경
  showInput?: boolean; // 입력 필드 표시 여부
  inputPlaceholder?: string; // 입력 필드 플레이스홀더
  cancelText?: string; // cancelButtonText → cancelText로 변경
  confirmText?: string; // confirmButtonText → confirmText로 변경
  confirmVariant?: 'default' | 'destructive' | 'outline' | 'secondary'; // confirmButtonVariant → confirmVariant로 변경
  onCancel?: () => void;
  onConfirm?: (value?: string) => void; // 입력값을 받을 수 있도록 수정
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

interface ModalStore {
  modals: ModalConfig[];
  openModal: (config: ModalConfig) => void;
  closeModal: (id: string) => void;
  closeAllModals: () => void;
  updateModal: (id: string, updates: Partial<ModalConfig>) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],

  openModal: (config) => {
    set((state) => ({
      modals: [...state.modals.filter((m) => m.id !== config.id), config],
    }));
  },

  closeModal: (id) => {
    set((state) => ({
      modals: state.modals.filter((m) => m.id !== id),
    }));
  },

  closeAllModals: () => {
    set({ modals: [] });
  },

  updateModal: (id, updates) => {
    set((state) => ({
      modals: state.modals.map((modal) => (modal.id === id ? { ...modal, ...updates } : modal)),
    }));
  },
}));
