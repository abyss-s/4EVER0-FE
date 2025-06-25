import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from '@/components/Modal';

import { Button } from '@/components/Button';
import Barcode from 'react-barcode';

interface CouponBarcodeModalProps {
  open: boolean;
  onClose: () => void;
  brandName: string;
  barcodeValue: string;
}

const CouponBarcodeModal: React.FC<CouponBarcodeModalProps> = ({
  open,
  onClose,
  brandName,
  barcodeValue,
}) => {
  return (
    <Modal open={open} onOpenChange={onClose}>
      <ModalContent size="sm" showClose>
        <ModalHeader>
          <ModalTitle>{brandName} 쿠폰 사용</ModalTitle>
          <ModalDescription>직원에게 아래 바코드를 보여주세요.</ModalDescription>
        </ModalHeader>
        <div className="flex justify-center py-4">
          <Barcode value={barcodeValue} width={3.5} height={80} displayValue={false} />
        </div>
        <ModalFooter>
          <Button onClick={onClose} className="w-full">
            닫기
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CouponBarcodeModal;
