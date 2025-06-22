# ✨ MoonoZ

## MZ세대를 위한 스마트한 U+ 혜택 큐레이션 서비스

<div align="center">

<img src="https://avatars.githubusercontent.com/u/212847508?s=200&v=4" width="150" />

**경기 불황 속에서 합리적 소비를 추구하는 MZ세대를 위한**  
**AI 기반 LG U+ 요금제 및 구독 서비스 추천 플랫폼**

[WBS](https://docs.google.com/spreadsheets/d/1ln5VudFdBKMbaNANwzZyW0CGLYC_R9Xf/edit?usp=sharing&ouid=101077923369398316818&rtpof=true&sd=true) • [플로우 차트](https://www.figma.com/proto/C1HjN8qg3Vptm2j7k2cT8N/%ED%94%8C%EB%A1%9C%EC%9A%B0%EC%B0%A8%ED%8A%B8?node-id=1-4&t=OH4mgwF8RPp4bDv8-1&scaling=scale-down-width&content-scaling=fixed&page-id=0%3A1) • [API 명세서](https://hollow-cello-87b.notion.site/1fb3347f51ee81269bceeaad7f3c76f1?v=1fb3347f51ee81719ba1000c67dfe978) • [ERD](https://dbdiagram.io/d/DB_4ever0-684e577c3cc77757c8eaba7c) • [Storybook](https://6835efb2a0dda6635d6b2c1d-nazyzhfott.chromatic.com)

</div>

## 프로젝트 개요

| 항목           | 내용                             |
| -------------- | -------------------------------- |
| **프로젝트명** | MoonoZ                           |
| **팀명**       | 4EVER0                           |
| **주제**       | LG U+ 요금제 추천 AI 챗봇 서비스 |
| **타겟층**     | 합리적 소비를 추구하는 MZ세대    |
| **개발 기간**  | 2025.06.04 ~ 2025.06.26 (약 3주) |
| **팀 구성**    | Frontend 5명 (Full-Stack 개발)   |

### 개발 동기

- **시장 배경**
  - 최근 경기 불황과 구독료 인상으로 **MZ세대의 합리적 소비 지향**이 뚜렷해짐
  - 최근 LG유플러스의 '유독픽' 과 같은 구독 통합 상품이 **20·30대 가입자 비중 71%** 달성
  - **개인 라이프스타일 최적화된 통합 서비스**에 대한 수요 급증
- **개발 목표**
  - **AI 챗봇 기반 성향 분석**을 통한 맞춤형 요금제 및 서비스 추천
  - **MZ세대의 스마트한 통신 라이프스타일** 지원

## 주요 기능

### **1. AI 기반 멀티턴 챗봇 & 요금제 추천**

- **LangChain + OpenAI 템플릿 아키텍처**: 자연어 처리로 사용자 성향과 패턴 분석해 LG U+ 요금제 및 구독 서비스 맞춤 추천
- **멀티턴 세션 관리**: Redis 기반 대화 상태 보존, 세션 마이그레이션 및 플로우 자동 전환
- **StreamingThrottle 프로세서**: 청크별 지연 제어로 실제 사람 대화 패턴 모방 구현
- **`useStreamingChat` 커스텀 훅**: JSON/텍스트 혼합 메시지 처리 및 실시간 카드 렌더링 지원

### **2. 위치 기반 혜택 추천 & 스토어맵**

- **Naver Geolocation + Maps API**: 사용자 위치 감지 및 Reverse Geocoding으로 주소 추출
- **Google Search 기반 스토어맵**: 좋아요한 브랜드의 오프라인 매장 정보 제공 및 반경 내 혜택 추천
- **브랜드 선호도 알고리즘**: 좋아요한 쿠폰의 브랜드 기반 유독픽 서비스 추천

### **3. 소셜 로그인 & 보안 인증 시스템**

- **OAuth2 통합 인증**: Kakao/Google/Naver 로그인 지원, JWT는 HttpOnly Cookie로 관리
- **Redis 세션 관리**: Refresh Token 저장 및 userId/authId는 Zustand + localStorage 동기화
- **Axios 인터셉터**: 401 응답 시 자동 refresh 요청 후 재시도 처리 구현
- **하이브리드 인증**: 서버 기반 인증 + 프론트엔드 상태 동기화 및 리프레시 트리거 분리

## 팀원 소개

|                                                           [이영주](https://github.com/abyss-s)                                                            |                                                                  [박교녕](https://github.com/kny0ng125)                                                                   |                                                           [박지회](https://github.com/jihoi0615)                                                            |                                                                [이은채](https://github.com/eunchrri)                                                                 |                                                                   [홍민주](https://github.com/illustermin)                                                                   |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|                                      <img src="https://avatars.githubusercontent.com/u/77565980?v=4" width="100" />                                       |                                              <img src="https://avatars.githubusercontent.com/u/80964083?v=4" width="100" />                                               |                                       <img src="https://avatars.githubusercontent.com/u/197379577?v=4" width="100" />                                       |                                           <img src="https://avatars.githubusercontent.com/u/171488704?v=4" width="100" />                                            |                                               <img src="https://avatars.githubusercontent.com/u/134802163?v=4" width="100" />                                                |
| **팀장**, AI 챗봇 설계 및 스트리밍 처리<br/>요금제·구독 API 개발<br/>Naver API 연동<br/>스토리북 관리<br/>모달 전역 상태 관리 설계<br/>요금제 페이지 개선 | OAuth 로그인 및 콜백 구현<br/>JWT 인증·전역 상태 관리<br/>Google/Naver API 매장 탐색 기능 개발<br/>SNS 공유 기능 추가<br/>마이페이지·핫플 UI 구현<br/>인프라 및 배포 관리 | 플로우 차트 작성<br/>쿠폰·팝업스토어·유플투쁠 ERD 설계<br/>좋아요·BEST 3 혜택 API 개발<br/>핫플·타코시그널 UI 구현<br/>공통 컴포넌트 제작<br/>코드 리팩토링 | 미션·출석 기능 ERD 설계<br/>미션·출석·유플투쁠 API 구현<br/>UI 기획 및 캘린더 컴포넌트 제작<br/>월별 출석 조회 API 추가<br/>달력 상태 렌더링 구현<br/>관련 코드 정리 | 마이페이지·쿠폰함·타코시그널 UI 기획<br/>쿠폰 전체·발급·사용 API 개발<br/>요금제 카드 컴포넌트 제작<br/>홈·마이페이지·랜딩 UI 구현<br/>공통 컴포넌트 개발<br/>오류 코드 정리 |

## 기술 스택

| 분야                  | 기술 스택                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**          | ![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-FF6B35?style=flat&logo=zustand&logoColor=white) ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat&logo=reactquery&logoColor=white) ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) |
| **Backend**           | ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring-boot&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens&logoColor=white) ![OAuth2](https://img.shields.io/badge/OAuth2-4285F4?style=flat&logo=oauth&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white) ![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white) ![JPA](https://img.shields.io/badge/JPA-59666C?style=flat&logo=hibernate&logoColor=white) ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black)                  |
| **AI Server**         | ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white) ![LangChain](https://img.shields.io/badge/LangChain-1C3C3C?style=flat&logo=langchain&logoColor=white) ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat&logo=openai&logoColor=white) ![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat&logo=sqlalchemy&logoColor=white)                                                                                                                                                                                                                                                                                                |
| **Infrastructure**    | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) ![AWS EC2](https://img.shields.io/badge/AWS_EC2-FF9900?style=flat&logo=amazon-ec2&logoColor=white) ![AWS RDS](https://img.shields.io/badge/AWS_RDS-527FFF?style=flat&logo=amazon-rds&logoColor=white) ![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=flat&logo=amazon-s3&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)                                                                                                                                                                                                            |
| **Development Tools** | ![Git](https://img.shields.io/badge/Git-F05032?style=flat&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white) ![Jira](https://img.shields.io/badge/Jira-0052CC?style=flat&logo=jira&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=flat&logo=notion&logoColor=white) ![Confluence](https://img.shields.io/badge/Confluence-172B4D?style=flat&logo=confluence&logoColor=white) ![Discord](https://img.shields.io/badge/Discord-5865F2?style=flat&logo=discord&logoColor=white) ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=flat&logo=figma&logoColor=white)                                    |
| **UI/UX & Testing**   | ![Shadcn/ui](https://img.shields.io/badge/Shadcn%2Fui-000000?style=flat&logo=shadcnui&logoColor=white) ![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=flat&logo=storybook&logoColor=white) ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=black) ![Husky](https://img.shields.io/badge/Husky-42B883?style=flat&logo=husky&logoColor=white)                                                                                                                                                                                                     |

## 시스템 아키텍처

![system-architecture](https://github.com/user-attachments/assets/23b5d5b9-4266-42d5-89d6-c6d473e630b8)

## AI 챗봇 동적 스트리밍 제어 아키텍처

```mermaid
sequenceDiagram
    participant User as 👤 사용자
    participant Hook as 🎣 useStreamingChat
    participant Processor as ⚙️ processStreamWithThrottle
    participant Throttle as ⏱️ StreamingThrottle
    participant FastAPI as 🐍 FastAPI 서버
    participant LLM as 🤖 LangChain + OpenAI

    User->>Hook: 메시지 입력
    Hook->>FastAPI: fetch(Accept: text/event-stream)
    FastAPI->>LLM: 템플릿 기반 프롬프트 처리

    LLM-->>FastAPI: 스트리밍 응답 시작
    FastAPI-->>Processor: SSE 형태 전송 (data: ...\n\n)

    loop 각 SSE chunk 처리
        Processor->>Processor: isJSONStructure() 검사

        alt JSON 구조 (카드/추천)
            Processor-->>Hook: 지연 없이 즉시 전송
            Hook-->>User: 카드 컴포넌트 즉시 렌더링
        else 일반 텍스트
            Processor->>Throttle: calculateDelay(chunkSize)
            Throttle->>Throttle: 청크 간격/크기 분석
            Throttle-->>Processor: 동적 지연시간 반환
            Processor->>Processor: setTimeout(delay)
            Processor-->>Hook: 지연 후 텍스트 전송
            Hook-->>User: 자연스러운 타이핑 효과
        end
    end

    FastAPI-->>Processor: data: [DONE]
    Processor-->>Hook: 스트림 완료
    Hook->>Throttle: reset() 호출
```
