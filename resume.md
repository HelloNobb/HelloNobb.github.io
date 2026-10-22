---
layout: default
title: Resume
permalink: /resume/
---

<div class="page-head">
  <h1 class="section-title">Resume</h1>
  <a class="button small" href="{{ '/assets/resume.pdf' | relative_url }}" download="김현지_이력서.pdf">PDF download</a>
</div>

{% comment %}Photo, phone, birth date come from _data/private.yml (gitignored) and only render with JEKYLL_ENV=private. See FOR_ME.md 7-5.{% endcomment %}
{% if jekyll.environment == "private" %}{% assign me = site.data.private %}{% endif %}
<div class="resume-head{% if me %} with-photo{% endif %}">
  {% if me.photo %}<img class="resume-photo" src="{{ me.photo | relative_url }}" alt="증명사진">{% endif %}
  <div>
    <h2>{{ site.title }}</h2>
    <blockquote class="slogan">{{ site.slogan | strip | newline_to_br }}</blockquote>
  </div>
  <ul class="contact">
    {% if me.birth %}<li>{% include icon.html name="calendar" %}<span>생년월일:</span> {{ me.birth }}</li>{% endif %}
    {% if me.phone %}<li>{% include icon.html name="phone" %}<span>전화:</span> {{ me.phone }}</li>{% endif %}
    {% capture mailto %}mailto:{{ site.email }}{% endcapture %}
    <li>{% include icon.html name="mail" %}<span>메일:</span> <a href="{{ mailto }}">{{ site.email }}</a></li>
    <li>{% include icon.html name="blog" %}<span>블로그:</span> <a href="https://nobbs-it-study.tistory.com/" target="_blank" rel="noopener">nobbs-it-study.tistory.com</a></li>
    <li>{% include icon.html name="github" %}<span>깃허브:</span> <a href="https://github.com/HelloNobb" target="_blank" rel="noopener">github.com/HelloNobb</a></li>
  </ul>
</div>

{% comment %}이력서용 프로젝트 문구. 포트폴리오(_projects/)와 별개로 관리한다.{% endcomment %}

## 프로젝트

### Gloomy

**“우울한 인조인간의 눈물로 꽃을 키워 마을을 정화하는 방치형 육성 시뮬레이션 게임”**

<p class="muted">1인 · 기획·개발 | 2025.01 ~ 진행중 {% include chips.html list="Unity 6|C#" %}</p>

#### 구현 및 성과

- 싱글톤 직접 호출 233회로 참조가 뒤엉킨 구버전 구조를 단방향 레이어와 이벤트 구조로 재설계하고, 중복 구현, 하드코딩 등 붕괴 원인별 규칙을 문서화해 AI가 작성한 코드에도 동일하게 적용
- 임시 파일에 먼저 쓰고 교체하는 원자적 저장과 백그라운드 전환 시 저장을 도입해, 5곳에 흩어진 저장을 파일 1개로 통일하고 강제 종료, 파일 손상에 대비
- 9개 파일에 흩어진 시간 처리를 게임 시계 하나로 통합해, 배속·시간 점프로 하루 경과 테스트를 24시간 대기에서 버튼 1회로 단축
- 직접 만든 대사 작성 툴 'Scriber'와 Unity를 잇는 대사 시스템을 설계해, 구버전의 대사 형식 3종과 이를 읽던 코드 4곳을 규격 1개와 엔진 1개로 통합하고 대사 수정 시 코드 수정 0건 달성
- 구버전 Android APK 빌드(씬 15개) 후, 리부트 전 AI로 회색박스 프로토타입을 빠르게 먼저 구현해 재미를 먼저 검증

### Turtle

**“아기 거북이로 수중 탐험과 조력자 수집을 통해 엄마를 구하는 모바일 2D 캐주얼 게임”**

<p class="muted">2인 · 기획·개발 | 2026.05 ~ (2개월) {% include chips.html list="Unity 6|C#|Unity Profiler" %}</p>

#### 구현

- 물고기 군집을 500마리로 늘린 과부하 조건에서 Unity Profiler로 프레임 시간의 70%를 차지하는 물리 연산 병목과, 그중 가장 큰 구간인 충돌 후보 탐색 확인. 충돌 레이어 필터와 Kinematic 전환이 효과 없는 원인을 밀집 개체 간 충돌 후보 쌍 증가로 분석하고, 서로 상호작용이 필요 없는 물고기를 물리 연산에서 제외해 거리 기반 판정으로 대체
- 드래그 유지 시간과 스탯 조건을 조합해 이동, 공격을 하나의 제스처에서 구분하는 모바일 입력 시스템 구현. 짧은 드래그는 오입력으로 걸러 터치 오반응 최소화
- '게 AI'에 내적 계산으로 정면 공격만 막히는 방향 기반 방어 판정 구현
- 팀원이 각자 구현한 세 종류 적의 피격, 전환, 시각 효과 중복 코드를 추상 클래스로 통합

#### 성과

- 물고기 500마리 기준 프레임 시간 54.47ms → 12.33ms (약 18 → 81 FPS, 에디터 측정), 물리 연산 비용 제거
- 구역 오브젝트의 직접 참조를 이벤트 발행·구독으로 전환해 2인 병렬 작업 중 씬 수정 충돌 방지

### Computer Escape

**“컴퓨터 속에 갇힌 주인공이 미니게임과 퍼즐을 풀어 탈출하는 모바일 방탈출 어드벤처 게임”**

<p class="muted">8인 · 팀장, 기획 리드, 클라이언트 개발 | 2023.09 (2개월) {% include chips.html list="Lua|Solar2D (Corona SDK)" %}</p>

{% include link.html url="https://play.google.com/store/apps/details?id=com.solar2d.app.Computer_Escape&hl=ko" label="Google Play" icon="googleplay" %}

#### 구현 및 성과

- 스토리와 미니게임 기획을 이끌면서 로비 이동·카메라와 미니게임 1종을 직접 개발해, 8인 팀에서 2개월 만에 Google Play 출시까지 완주
- 카메라 기능이 없는 엔진에서 화면보다 큰 맵의 카메라와 구역별 이동 제한을 직접 구현

### Play Probie

**“AI 기반 게임 플레이테스트 플랫폼”**

<p class="muted">5인 · 풀스택 개발 | 2025.12 ~ 2026.01 (5주) {% include chips.html list="Spring Boot|FastAPI|React|MariaDB" %}</p>

#### 구현 및 성과

게임 생성 → 설문 설계 → 설문 진행 (End-to-End)

- FastAPI에서 LLM 평가 호출을 asyncio로 병렬 처리해 응답 시간 50% 단축
- LLM 응답 대기 중 이탈을 막기 위해 FastAPI → Spring Boot → React로 이어지는 3단 SSE 스트리밍 구조 설계

## 기술 스택

- **Client** {% include chips.html list="C#|Unity 6 (2D URP)|Unity Profiler" %}
- **Server** {% include chips.html list="Java|Spring Boot|Python|FastAPI|MariaDB" %}
- **Language** {% include chips.html list="C|C#|Java|Python|TypeScript" %}
- **Tools** {% include chips.html list="Git|Claude Code" %}

## 학력

- 2027-08 동덕여자대학교 컴퓨터학과 (졸업 예정 / 2027년 1월부터 풀근무 가능)
- 2026-01 크래프톤 부트캠프 정글 11기 (수료)

## 자격증

- 2026-09 정보처리기사
