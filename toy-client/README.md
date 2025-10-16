# Toy Client - Language Learning Service

Next.js 14 기반의 언어 학습 서비스 프론트엔드 애플리케이션입니다.

## 기술 스택

- **Next.js 14 (LTS)** - React 프레임워크
- **React 18** - UI 라이브러리
- **TypeScript** - 타입 안전성
- **Tailwind CSS** - 스타일링
- **NextAuth.js v5** - 인증 및 OAuth 2.0
- **ESLint** - 코드 품질 관리

## 주요 기능

### 1. OAuth 2.0 소셜 로그인
- Google 로그인
- Naver 로그인
- 세션 관리 및 인증 상태 유지

### 2. 반응형 디자인
- 모바일/태블릿/데스크톱 대응
- 다크 모드 지원

### 3. 백엔드 API 연동
- RESTful API 클라이언트
- 헬스체크 및 연결 상태 모니터링

## 시작하기

### 1. 의존성 설치

```bash
npm install
```

### 2. 환경 변수 설정

`.env.local` 파일을 생성하고 다음 내용을 입력하세요:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8080

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Naver OAuth
NAVER_CLIENT_ID=your-naver-client-id
NAVER_CLIENT_SECRET=your-naver-client-secret
```

### 3. OAuth 인증 정보 발급

#### Google OAuth 설정
1. [Google Cloud Console](https://console.cloud.google.com/) 접속
2. 프로젝트 생성 또는 선택
3. **API 및 서비스 > 사용자 인증 정보** 이동
4. **사용자 인증 정보 만들기 > OAuth 2.0 클라이언트 ID** 선택
5. 애플리케이션 유형: **웹 애플리케이션**
6. 승인된 리디렉션 URI 추가:
   - `http://localhost:3000/api/auth/callback/google`
7. 클라이언트 ID와 클라이언트 보안 비밀을 `.env.local`에 저장

#### Naver OAuth 설정
1. [네이버 개발자 센터](https://developers.naver.com/) 접속
2. **Application > 애플리케이션 등록** 이동
3. 애플리케이션 이름 및 사용 API 선택 (네아로)
4. 서비스 URL: `http://localhost:3000`
5. Callback URL: `http://localhost:3000/api/auth/callback/naver`
6. Client ID와 Client Secret을 `.env.local`에 저장

#### NEXTAUTH_SECRET 생성

다음 명령어로 랜덤 시크릿 키 생성:

```bash
openssl rand -base64 32
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 5. 프로덕션 빌드

```bash
npm run build
npm start
```

## 프로젝트 구조

```
toy-client/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/  # NextAuth API 라우트
│   │   │   └── health/              # 백엔드 헬스체크
│   │   ├── login/                   # 로그인 페이지
│   │   ├── layout.tsx               # 루트 레이아웃
│   │   ├── page.tsx                 # 메인 페이지
│   │   └── globals.css              # 글로벌 스타일
│   ├── components/
│   │   ├── auth/
│   │   │   └── user-menu.tsx        # 사용자 메뉴 컴포넌트
│   │   └── providers/
│   │       └── session-provider.tsx # NextAuth 세션 프로바이더
│   ├── lib/
│   │   ├── auth.ts                  # NextAuth 설정
│   │   └── api-client.ts            # API 클라이언트 유틸리티
│   ├── types/
│   │   └── next-auth.d.ts           # NextAuth 타입 정의
│   └── middleware.ts                # 인증 미들웨어
├── .env.local                       # 환경 변수 (git에서 제외됨)
├── .env.example                     # 환경 변수 예제
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── README.md
```

## 주요 페이지

### 메인 페이지 (/)
- 백엔드 연결 상태 확인
- 사용자 프로필 표시 (로그인 시)
- 로그인/로그아웃 버튼

### 로그인 페이지 (/login)
- Google 로그인 버튼
- Naver 로그인 버튼
- 오류 메시지 표시

## API 클라이언트 사용법

```typescript
import { apiClient } from '@/lib/api-client'

// GET 요청
const { data, error } = await apiClient.get<ResponseType>('/api/endpoint')

// POST 요청
const { data, error } = await apiClient.post<ResponseType, RequestBody>(
  '/api/endpoint',
  { key: 'value' }
)

// PUT 요청
const { data, error } = await apiClient.put<ResponseType, RequestBody>(
  '/api/endpoint',
  { key: 'value' }
)

// DELETE 요청
const { data, error } = await apiClient.delete<ResponseType>('/api/endpoint')
```

## 인증 상태 관리

```typescript
'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Component() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (!session) {
    return <button onClick={() => signIn()}>로그인</button>
  }

  return (
    <div>
      <p>환영합니다, {session.user.name}님!</p>
      <button onClick={() => signOut()}>로그아웃</button>
    </div>
  )
}
```

## 스크립트

- `npm run dev` - 개발 서버 실행 (포트 3000)
- `npm run build` - 프로덕션 빌드
- `npm start` - 프로덕션 서버 실행
- `npm run lint` - ESLint 검사

## 환경 변수

| 변수명 | 설명 | 필수 |
|--------|------|------|
| `NEXT_PUBLIC_API_URL` | 백엔드 API URL | ✓ |
| `NEXTAUTH_URL` | NextAuth 베이스 URL | ✓ |
| `NEXTAUTH_SECRET` | NextAuth 시크릿 키 | ✓ |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | ✓ |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | ✓ |
| `NAVER_CLIENT_ID` | Naver OAuth Client ID | ✓ |
| `NAVER_CLIENT_SECRET` | Naver OAuth Client Secret | ✓ |

## 트러블슈팅

### 로그인이 작동하지 않는 경우
1. OAuth 리디렉션 URI가 올바르게 설정되었는지 확인
2. `.env.local` 파일의 클라이언트 ID/Secret이 정확한지 확인
3. 개발 서버를 재시작

### 백엔드 연결 실패
1. 백엔드 서버가 실행 중인지 확인 (`http://localhost:8080`)
2. `NEXT_PUBLIC_API_URL` 환경 변수 확인
3. CORS 설정 확인

## 라이선스

이 프로젝트는 교육 목적으로 만들어진 샘플 애플리케이션입니다.
