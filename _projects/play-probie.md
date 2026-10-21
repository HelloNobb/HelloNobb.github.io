---
title: "Play Probie"
date: 2025-12-01
cover: /assets/projects/placeholder.svg   # 대표 이미지로 교체: /assets/projects/play-probie/cover.gif
summary: "AI 기반 게임 플레이테스트 플랫폼"
role: "풀스택 개발"
team: "5인"
period: "2025.12 ~ 2026.01 (5주)"
stack: ["Spring Boot", "FastAPI", "React", "MariaDB"]
points:
  - "FastAPI에서 LLM 평가 호출을 asyncio로 병렬 처리해 응답 시간 50% 단축"
  - "LLM 응답 대기 중 이탈을 막기 위해 FastAPI → Spring Boot → React 3단 SSE 스트리밍 구조 설계"
links:
  github:
  video:
  play:
---

#### 구현

게임 생성 → 설문 설계 → 설문 진행 (End-to-End)

- FastAPI에서 LLM 평가 호출을 asyncio로 병렬 처리해 응답 시간 50% 단축
- LLM 응답 대기 중 이탈을 막기 위해 FastAPI → Spring Boot → React로 이어지는 3단 SSE 스트리밍 구조 설계
