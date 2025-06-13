// src/components/ProtectedRoute.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/useAuthStore';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from '@/components/Modal';
import { Button } from '@/components/ui/button';

const ProtectedRoute: React.FC = () => {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // 인증되지 않았을 때만 모달 열기
  useEffect(() => {
    if (!isLoggedIn) {
      setOpen(true);
    }
  }, [isLoggedIn]);

  const handleConfirm = useCallback(() => {
    setOpen(false);
    navigate('/login', {
      replace: true,
      state: { from: location },
    });
  }, [navigate, location]);

  // 로그인되어 있으면 자식 라우트 바로 렌더링
  if (isLoggedIn) {
    return <Outlet />;
  }

  // 로그인 전에는 모달만 보여주기
  return (
    <Modal open={open} onOpenChange={(flag) => flag === false && handleConfirm()}>
      <ModalContent variant="default" size="sm" showClose={false}>
        <ModalHeader>
          <ModalTitle>로그인이 필요합니다.</ModalTitle>
          <ModalDescription>이 페이지에 접근하려면 로그인이 필요합니다.</ModalDescription>
        </ModalHeader>
        <ModalFooter>
          <Button className="w-full" onClick={handleConfirm}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProtectedRoute;
