import React, { useState, FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { apiWithoutToken } from '@/lib/api/apiconfig';
import { loginViaProvider } from '@/utils/auth';

const Signup: React.FC = () => {
  const [searchParams] = useSearchParams();

  // URL 쿼리에서 OAuth 정보 꺼내기
  const provider = searchParams.get('provider') || '';
  const oauthId = searchParams.get('oauthId') || '';

  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // apiWithoutToken 사용
      await apiWithoutToken.post('/users', {
        userId: oauthId,
        email,
        phoneNumber: phone,
        name,
        birth,
      });
      // 회원가입 성공 후 OAuth 재인증 플로우 재시작
      loginViaProvider(provider);
    } catch (error: unknown) {
      console.error('회원가입 오류:', error);
      alert('회원가입에 실패했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">추가 회원 정보 입력</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <div>
          <label className="block text-sm">Birth Date</label>
          <input
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
            required
            className="w-full border px-2 py-1 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          회원가입 완료
        </button>
      </form>
    </div>
  );
};

export default Signup;
