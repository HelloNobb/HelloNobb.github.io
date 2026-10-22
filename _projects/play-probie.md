---
title: "Play Probie"
order: 5                        # 목록·세부 메뉴 순서 (작을수록 앞)
date: 2025-12-01
cover: /assets/projects/play-probie/cover.webp
gallery:
  - src: /assets/projects/play-probie/cover.webp
    caption: AI 심층 인터뷰
  - src: /assets/projects/play-probie/questions.webp
    caption: AI 질문 추천
summary: "게임 테스터의 진짜 속마음을 이끌어내는 AI 기반 “플레이 테스트 솔루션”"
highlights:
  - "**올인원 솔루션**: 플레이 테스트 및 설문조사의 설계, 진행, 결과 분석까지 하나로 통합"
  - "**AI 심층 인터뷰**: 유저의 생생한 피드백과 핵심 인사이트 제공을 위한 AI 기반 인터뷰"
kind: "크래프톤 정글 '나만무' 웹 프로젝트"
period: "2025.12 ~ 2026.01 (5주)"
team: "5인 (풀스택 / 기능별 전담)"
role: "풀스택 개발 · 게임 생성 → 설문 설계 → 설문 진행 (End-to-End)"
stack_short: ["React", "Spring Boot", "FastAPI", "MariaDB", "LangGraph"]   # 목록 카드용 대표 스택 (뒤에 … 표시). 상세 페이지는 전체 stack
stack:
  - "FE: React, TypeScript, Tailwind, Zustand"
  - "BE: Spring Boot, FastAPI"
  - "AI & Data: LangGraph, MariaDB, ChromaDB, AWS Bedrock, Titan Embedding"
links:
  github: https://github.com/PlayProbie
  video: https://youtu.be/JSlvAlyyR48?si=tmMG0uA4ZxyKcmgz
  play:
---

## 담당 구현 기능

게임 생성 → 설문 설계 → 설문 진행 (End-to-End)

- **게임 생성**: 게임 정보 입력 및 핵심 요소 자동 추출
- **설문 생성**: RAG 기반 AI 질문 추천 시스템
- **설문 진행**: LangGraph 기반 실시간 AI 인터뷰 시스템

## 기술적 챌린지

### BE

#### LangGraph 기반 적응형 AI 인터뷰 시스템

- **문제:** 기존 게임 QA 설문은 고정 질문을 순차 제시하는 정적 방식으로, "좋았어요", "괜찮았어요" 같은 피상적 답변만 수집됨. 답변의 맥락과 이유를 파악할 수 없어 유의미한 인사이트 도출이 불가능했음.
- **과제:** AI가 인터뷰어 역할을 수행하여 응답 품질에 따라 꼬리질문을 동적으로 생성하는 적응형 설문 시스템 구현.
- **해결:**
  1. **설문조사 방법론 기반 2단계 평가 파이프라인 설계**
     - 유효성 평가(6가지): VALID, AMBIGUOUS, OFF_TOPIC, UNINTELLIGIBLE, CONTRADICTORY, REFUSAL
     - 품질 평가(4가지): Thickness(구체성) × Richness(다양성) 매트릭스로 EMPTY / GROUNDED / FLOATING / FULL 분류
     - 평가 결과 조합에 따라 재질문 / 꼬리질문 / 다음질문 자동 라우팅
  2. **병렬 평가 처리**
     - 기존: 유효성(2s) → 품질(2s) = 4초 순차 대기
     - 개선: `asyncio.gather`로 두 평가 동시 실행
     - 유효성이 있어야 품질 검사가 유의미하나, 리소스와 성능 사이에서 "낙관적 실행 전략" 사용함. (대기 시간 줄임으로써 얻는 비즈니스적 이득이 더 크다고 판단)
  3. **이중 모델 아키텍처**
     - 평가(Validity/Quality): Claude Haiku (경량 모델)
     - 생성(꼬리질문/리액션): Claude Sonnet (고성능 모델)

```python
import asyncio

async def run_pipeline(user_input):
    # 유효성 평가와 품질 평가를 동시에 시작!
    validity_task = check_validity(user_input)
    quality_task = check_quality(user_input)

    # 두 작업이 모두 끝날 때까지 기다렸다가 결과를 한꺼번에 받음
    validity_res, quality_res = await asyncio.gather(validity_task, quality_task)

    return validity_res, quality_res
```

- **결과:**
  - 응답 시간 50% 단축 (4s → 2s)
  - API 비용 40% 이상 절감
  - 피상적 답변 대비 구체적 맥락 포함 답변 유도율 향상

#### RAG 기반 맞춤형 질문 추천 시스템

- **문제:** 게임 QA 설문 설계 시 수십 개 질문을 수동 작성해야 했음. 질문 품질이 담당자마다 들쭉날쭉하고, 게임 특성(장르, 핵심 메카닉)에 맞는 맞춤형 질문 작성이 어려움.
- **과제:** 검증된 질문 템플릿을 벡터화하고, 게임 정보 기반으로 최적의 질문을 자동 추천하는 시스템 구현.
- **해결:**
  1. **벡터 DB 구축**
     - ChromaDB + Amazon Titan V2 Embedding (1024차원)
     - 1,000개 검증된 질문 템플릿 벡터화 (장르, 테스트 목적, 채택률 메타데이터 포함)
  2. **다중 요소 스코어링 설계**
     - 단순 유사도가 아닌 3가지 요소 종합: `final_score = 0.4×similarity + 0.3×goal_match + 0.3×adoption_rate`
     - goal_match: 테스트 목적 일치도 (대분류 0.6 + 소분류 0.4 가중치)
     - adoption_rate: 실제 사용자 채택률 반영
  3. **MMR 알고리즘으로 다양성 확보**
     - `MMR = λ×Relevance − (1−λ)×max(Similarity_to_Selected)` (λ=0.7)
     - 관련성 높으면서 기존 선택과 의미적으로 다른 질문 우선 선택
- **결과:**
  - 설문 설계 시간 평균 30분 → 5분 (83% 단축)
  - 의미적 중복 질문 0건 달성

#### 3-Tier 실시간 스트리밍 아키텍처 설계

- **문제:** LLM 응답을 토큰 단위로 실시간 표시하여 타이핑 효과 UX 제공이 필요. 클라이언트(React) → API 서버(Spring) → AI 서버(FastAPI/LangGraph) 간 실시간 데이터 흐름 설계가 요구됨.
- **과제:** 3-Tier 구조에서 SSE(Server-Sent Events) 기반 실시간 스트리밍 아키텍처 설계 및 상태 동기화.
- **해결:**
  1. **SSE 이중 스트리밍 구조**
     - FastAPI → Spring: LangGraph 워크플로우 이벤트를 SSE로 수신
     - Spring → React: 이벤트 파싱 후 클라이언트로 재전송
     - 11개 이벤트 타입 정의 (question, continue, validity_result, quality_result, reaction, done 등)
  2. **서버 권위(Server Authority) 상태 관리**
     - 클라이언트가 전송한 상태(fixedQId, turnNum)는 참고만 하고, 서버 상태를 권위적으로 사용
     - 클라이언트/서버 불일치 시 서버 값으로 자동 교정하여 상태 동기화 보장
  3. **Graceful Shutdown 메커니즘**
     - 전송 실패 감지 시 예외 발생 → Flux 에러 핸들러에서 스트림 즉시 종료
     - 불필요한 서버 리소스 낭비(Zombie Stream) 방지
- **결과:**
  - React ↔ Spring ↔ FastAPI 3계층 실시간 통신 안정적 구현
  - 토큰 단위 타이핑 효과 UX 제공
  - 상태 불일치로 인한 오류 0건

### FE

#### SSE 실시간 스트리밍과 Stale Closure 해결

- **문제:** LLM 응답을 토큰 단위로 실시간 렌더링해야 함. 그러나 React의 Closure 특성으로 인해 SSE 이벤트 핸들러가 컴포넌트 초기 렌더링 시점의 상태만 참조하는 Stale Closure 문제 발생. 11개 이벤트 타입 각각에 대해 최신 콜백을 참조하지 못함.
- **과제:** 모든 SSE 이벤트 핸들러가 항상 최신 상태와 콜백을 참조하도록 보장하고, EventSource 생명주기를 메모리 누수 없이 관리.
- **해결:**
  1. **useRef 기반 콜백 레퍼런스 패턴**
     - 11개 이벤트별 콜백을 Ref로 관리
     - 매 렌더링마다 `useEffect`에서 Ref를 최신 콜백으로 동기화
     - SSE 이벤트 핸들러에서는 Ref.current 호출로 항상 최신 상태 참조
  2. **Strict Mode 중복 연결 방지**
     - 모듈 레벨 Set으로 이미 초기화된 세션 추적
     - 개발 환경(Strict Mode)에서 컴포넌트 리마운트 시 중복 연결 방지
  3. **타입 안전한 이벤트 변환 레이어**
     - API 응답(snake_case) → 클라이언트(camelCase) 변환 함수 분리
     - 타입 불일치 런타임 에러 사전 방지
- **결과:**
  - Stale Closure 완전 해결, 11개 이벤트 모두 최신 상태 참조
  - Strict Mode 포함 개발/운영 환경 모두 안정 동작

#### 페이지 전환 시 데이터 유실 문제 해결

- **문제:** 5단계 설문 생성 위자드에서 기존 게임을 선택한 후 다음 페이지로 이동하면 게임 정보(game_genre, extracted_elements)가 사라짐. AI 질문 생성 API 호출 시 필수 파라미터 누락으로 500 에러 발생.
- **과제:** 페이지 전환(컴포넌트 언마운트) 후에도 게임 정보가 영속적으로 유지되고, 신규 게임 생성 / 기존 게임 선택 두 경로 모두 지원.
- **해결:**
  1. **Zustand 글로벌 스토어 설계**
     - 현재 선택된 게임 정보를 전역 상태로 관리
     - 컴포넌트 생명주기와 독립적으로 데이터 영속
  2. **Fallback 패턴 적용**
     - AI 질문 생성 시 formData에 게임 정보가 없으면 글로벌 스토어에서 조회
     - 게임 이름 일치 시 추출된 요소(extracted_elements)도 재활용
  3. **게임 선택 시점 동기화**
     - 게임 목록에서 선택 즉시 글로벌 스토어에 저장
     - 위자드 전 단계에서 일관된 게임 정보 접근 가능
- **결과:**
  - 페이지 전환 시 게임 정보 유실 0건
  - Props Drilling 완전 제거
  - 신규/기존 게임 두 경로 통합 처리

#### 복잡한 5단계 위자드 폼 상태 관리

- **문제:** 5단계 설문 생성 위자드에서 react-hook-form(폼 유효성 검사)과 Zustand(단계 간 데이터 공유) 두 상태 저장소를 동기화해야 함. 추가로 AI 질문 생성 모드와 사용자 직접 입력 모드의 공통 로직이 중복됨.
- **과제:** RHF ↔ Zustand 양방향 동기화를 안정적으로 구현하고, 두 모드 간 공통 로직을 추출하여 코드 재사용성 확보.
- **해결:**
  1. **Custom Hook 계층 분리 설계**
     - useQuestionManager: 질문 선택/삭제/피드백 등 공통 로직 통합
     - useQuestionGenerate: AI 모드 전용 (자동 생성, 재생성)
     - useQuestionUserGenerate: 수동 모드 전용 (직접 입력)
     - 모드별 Hook이 공통 Hook을 상속하여 확장
  2. **단방향 데이터 흐름 유지**
     - Zustand → RHF: `setValue()`로 폼 값 갱신
     - 폼 제출 시점에만 RHF 값 사용, 중간 단계는 Zustand 우선
  3. **피드백 상태 연동**
     - 질문 삭제 시 해당 질문의 피드백도 함께 정리
     - 피드백 요청 로딩 상태 개별 관리
- **결과:**
  - 코드 재사용률 35% 향상 (선택/피드백 로직 공통화)
  - RHF ↔ Zustand 동기화 관련 버그 0건
  - 새 모드 추가 시 공통 Hook 상속만으로 구현 가능

### 핵심 성과 요약

| 영역 | 문제 | 해결 방법 | 성과 |
| --- | --- | --- | --- |
| BE | 순차 LLM 호출 지연 | asyncio.gather 병렬 처리 | 응답 시간 50% 단축 |
| BE | 고비용 LLM 사용 | 평가/생성 모델 분리 | API 비용 40% 절감 |
| BE | 설문 설계 시간 과다 | 다중 요소 스코어링 + MMR | 설계 시간 83% 단축 |
| FE | SSE Stale Closure | useRef 콜백 패턴 | 메모리 누수 0건 |
| FE | 페이지 전환 데이터 유실 | Zustand 글로벌 스토어 + Fallback | 유실 0건 |
| FE | 폼 상태 복잡도 | Custom Hook 계층 분리 | 재사용률 35% 향상 |
