# FOR_ME — 내 포트폴리오 사이트 사용설명서

이 문서는 나(김현지)를 위한 사용설명서다. 이 저장소를 열었을 때 "뭘 어디서 고치면 사이트에 어떻게 반영되는지"를 한 번에 알 수 있게 정리했다.

- 사이트: https://hellonobb.github.io
- 저장소: https://github.com/HelloNobb/HelloNobb.github.io (Public, `main` 브랜치)
- 내 컴퓨터 위치: `~/WebProjects/HelloNobb.github.io`

이 파일은 사이트에는 나오지 않는다 (`_config.yml`의 `exclude`에 들어 있음). 저장소에는 올라가 있으니 다른 컴퓨터에서도 볼 수 있다.

---

## 1. 한눈에 보기

```
내가 파일 수정 → git commit → git push
                                   │
                                   ▼
                GitHub Pages가 Jekyll로 사이트를 다시 만듦 (보통 1분)
                                   │
                                   ▼
                     https://hellonobb.github.io 에 반영
```

- 따로 빌드하거나 서버를 켤 필요가 없다. **push만 하면 끝.**
- 블로그 글 목록은 GitHub가 6시간마다 알아서 가져온다 (아래 "블로그" 참고).

---

## 2. 기술 스택

| 영역 | 사용한 것 | 하는 일 |
|---|---|---|
| 사이트 생성 | Jekyll 3.9 (GitHub Pages 내장) | 마크다운/HTML + 데이터 파일을 합쳐 정적 웹페이지로 만듦 |
| 템플릿 | Liquid (`{% %}`, `{{ }}`) | 프로젝트 목록 반복, 조건부 표시 등 |
| 콘텐츠 | Markdown, YAML front matter | 이력서, 포트폴리오 본문과 설정값 |
| 디자인 | 순수 CSS 한 파일 (`assets/style.css`) | 레이아웃, 색, 폰트, 모바일, 인쇄(PDF) |
| 폰트 | Jost (영문 제목·메뉴), Pretendard (한글 본문) | CDN에서 불러옴 |
| 아이콘 | 직접 넣은 SVG (Feather 스타일) | GitHub, 블로그, 메일, 영상, Google Play |
| 호스팅 | GitHub Pages | 무료 배포, `main` 브랜치 루트에서 빌드 |
| 자동화 | GitHub Actions + Python | 블로그 RSS → 최신 글 5개 저장 |
| 이력서 PDF | Chrome 헤드리스 인쇄 | 이력서 웹페이지를 PDF로 변환 |

직접 쓴 자바스크립트는 없다. 전부 정적 페이지라 빠르고 깨질 곳이 적다. 외부 스크립트는 방문 통계 두 개뿐 (GoatCounter, Microsoft Clarity. 아래 "방문 통계").

---

## 3. 사이트 구성 (페이지)

| 주소 | 메뉴 | 내용 | 만드는 파일 |
|---|---|---|---|
| `/` | ABOUT | 프로필 이미지 + Nobb, 슬로건, 아래 2단 (왼쪽 Projects / 오른쪽 Blog 최신 5개) | `index.html` |
| `/resume/` | RESUME | 이력서 웹 버전 + PDF 다운로드 버튼 | `resume.md` |
| `/portfolio/` | PORTFOLIO | 프로젝트 카드 목록 + 상단 세부 메뉴(프로젝트 이름) | `portfolio.html` |
| `/projects/<이름>/` | (세부 메뉴) | 프로젝트 상세 페이지 | `_projects/<이름>.md` |

---

## 4. 디렉토리 구조와 주요 파일

```
HelloNobb.github.io/
├─ _config.yml              ★ 사이트 공통 정보 (이름, 직군, 슬로건, 이메일, 프로필 이미지, 닉네임, 상단 링크)
├─ index.html               ABOUT 페이지
├─ resume.md                ★ 이력서 (내용 전부 여기서 직접 수정)
├─ portfolio.html           PORTFOLIO 목록 페이지
│
├─ _projects/               ★ 포트폴리오 프로젝트. 파일 1개 = 프로젝트 1개 = 상세 페이지 1개
│  ├─ turtle.md
│  ├─ gloomy.md
│  ├─ scriber.md
│  ├─ computer-escape.md
│  └─ play-probie.md
│
├─ _layouts/
│  ├─ default.html          모든 페이지의 공통 틀 (맨 위 CONTACT 아이콘, 이름, 메뉴, 세부 메뉴, 푸터)
│  └─ project.html          프로젝트 상세 페이지 틀 (제목 → 이미지 → 개요 → 본문)
│
├─ _includes/               여러 곳에서 재사용하는 조각
│  ├─ project-block.html    PORTFOLIO 목록 카드 1개
│  ├─ project-meta.html     개요 표 (종류, 기간, 인원, 내 역할, 기술 스택) + 링크 버튼
│  ├─ chips.html            기술 스택 칩 (연회색 글자 칩)
│  ├─ link.html, icon.html  아이콘 링크 (GitHub, 블로그, 메일, 영상, Google Play)
│  ├─ img.html              이미지 (파일이 실제로 있을 때만 표시)
│  └─ video.html            자동재생 영상 클립
│
├─ _data/
│  └─ blog.json             블로그 최신 글 5개 (자동 생성, 직접 고치지 말 것)
│
├─ assets/
│  ├─ style.css             ★ 디자인 전부
│  ├─ avatar.png            프로필 고양이 이미지 (배경 투명)
│  ├─ resume.pdf            이력서 PDF (사이트의 PDF download 버튼이 이 파일)
│  └─ projects/<이름>/       프로젝트별 이미지
│
├─ .github/
│  ├─ workflows/blog.yml    6시간마다 블로그 글 가져오는 자동 작업
│  └─ scripts/fetch_blog.py RSS를 읽어 _data/blog.json을 만드는 스크립트
│
├─ README.md                저장소 소개 (영문, 짧음)
├─ FOR_ME.md                지금 이 문서
└─ CLAUDE.md                Claude용 작업 메모 (내 컴퓨터에만 있음, .gitignore)
```

★ 표시가 내가 주로 고칠 파일이다.

---

## 5. 동작 방식

### 포트폴리오 프로젝트
`_projects/turtle.md` 같은 파일 하나가 세 군데에 자동으로 들어간다.

1. ABOUT의 Projects 목록 (썸네일, 제목, 한 줄 설명, 역할)
2. PORTFOLIO 카드 목록 + 상단 세부 메뉴
3. 상세 페이지 `/projects/turtle/`

파일 맨 위 `---` 사이(front matter)가 **개요 정보**, 그 아래가 **상세 본문**이다.

```yaml
---
title: "Turtle"                 # 제목 (세부 메뉴에도 이 이름)
order: 1                        # 목록 순서. 작을수록 앞
date: 2026-05-01                # 시작 시점. 화면에는 연도(2026)만 보임
cover: /assets/projects/turtle/cover.png    # 대표 이미지
thumb: /assets/projects/...     # (선택) 목록에서만 쓸 썸네일
summary: "한 줄 설명"
kind: "모바일 2D 게임"           # 개요: 종류
period: "2026.05 ~ 06"          # 개요: 기간
team: "2인"                     # 개요: 인원
role: "담당 역할"                # 개요: 내 역할
stack: ["Unity 6", "C#"]        # 개요: 기술 스택 → 칩으로 표시
stack_short: [...]              # (선택) 목록 카드에서만 줄여 보여줄 스택 (뒤에 … 붙음)
gallery:                        # (선택) 상세 페이지 위쪽 2열 이미지
  - src: /assets/projects/turtle/x.webp
    caption: "설명"
links:                          # 비워두면 버튼이 안 보임
  github: https://...
  video: https://...            # YouTube 등
  play: https://...             # Google Play
  web: https://...              # 웹에서 바로 열리는 주소 (예: Vercel) → "웹에서 열기"
---

## 핵심 성과

#### 1. 소제목
- **문제:** ...
```

### 이력서
- `resume.md` 하나에 전부 직접 쓴다. **포트폴리오와는 따로 관리하는 별개 문구**다.
- 이름, 슬로건, 이메일은 `_config.yml`에서 가져온다.
- PDF download 버튼은 `assets/resume.pdf` 파일을 내려준다. **이력서를 고치면 PDF도 다시 만들어야 한다** (아래 7번).

### 블로그 (ABOUT 오른쪽 칸)
- 티스토리 RSS(`https://nobbs-it-study.tistory.com/rss`)에서 최신 글 5개를 가져온다.
- 썸네일 = 글의 첫 이미지, 요약 = 본문 앞 90자. 이미지가 없는 글은 회색 박스.
- GitHub Actions가 **6시간마다** 자동 실행 → 새 글이 있으면 `_data/blog.json`을 커밋 → 사이트 재빌드.
- 지금 바로 반영하고 싶으면: GitHub 저장소 → **Actions** 탭 → 왼쪽 "Sync blog posts" → **Run workflow**.

### 방문 통계 (GoatCounter)
- 대시보드: https://hellonobb.goatcounter.com (**로그인해야 보임**. 사이트에는 아무것도 표시되지 않음)
- 볼 수 있는 것: 방문 수, 페이지별 조회, 유입 경로, 국가·지역(시·도), 브라우저·OS·화면 크기. IP와 개인 신원은 저장하지 않는다.
- 설정 위치: `_config.yml`의 `goatcounter: hellonobb` (비우면 꺼짐), 스크립트는 `_layouts/default.html` 맨 아래. 실제 사이트에서만 켜지고 로컬 미리보기·비공개 이력서 빌드에서는 꺼진다.
- **내 방문 빼기**: 기기·브라우저마다 한 번씩 https://hellonobb.github.io/#toggle-goatcounter 를 열고 확인 창에서 OK. 브라우저 데이터를 지우면 다시 해야 한다.
- 지원서에 회사별 링크를 넣으면 유입 경로에서 구분된다: `https://hellonobb.github.io/?ref=회사이름`
- 대시보드 Settings에서 public 통계 공개 옵션은 꺼 둔다 (기본값이 꺼짐).

### 세션 녹화 (Microsoft Clarity)
- 대시보드: https://clarity.microsoft.com (로그인). 방문 한 번 한 번을 영상처럼 다시 보기(Recordings), 페이지별 체류 시간, 스크롤·클릭 히트맵.
- 설정 위치: `_config.yml`의 `clarity:` (프로젝트 ID, 비우면 꺼짐). 실제 사이트에서만 켜진다.
- **내 방문 빼기**: GoatCounter와 같은 `#toggle-goatcounter`. DISABLED 상태인 브라우저는 Clarity도 안 켜진다.
- 푸터의 "방문 분석에 Microsoft Clarity를 사용합니다" 문구는 Clarity 이용약관상 고지 의무라 지우지 않는다.
- 녹화 찾기: Recordings 필터에서 Entry URL에 `ref=회사이름`, 또는 날짜·기기(Windows 등)로 좁힌다.

---

## 6. 자주 하는 작업

| 하고 싶은 것 | 고칠 파일 | 방법 |
|---|---|---|
| 이름, 직군, 슬로건, 이메일 | `_config.yml` | `title`, `role`, `slogan`, `email` |
| 프로필 이미지 / 아래 닉네임 | `_config.yml` + `assets/` | 이미지 넣고 `avatar:` 경로, `nickname:` |
| 맨 위 GitHub·블로그 링크 | `_config.yml` | `links:` 목록 |
| 이력서 내용 | `resume.md` | 직접 수정 → **PDF 재생성** |
| 프로젝트 내용 | `_projects/<이름>.md` | 위 형식대로 수정 |
| 프로젝트 순서 | 각 `_projects/*.md` | `order:` 숫자 바꾸기 |
| 새 프로젝트 추가 | `_projects/새이름.md` | 기존 파일 복사 → 내용 교체. 파일 이름 = 주소 (영어 소문자, 하이픈) |
| 프로젝트 이미지 | `assets/projects/<이름>/` | 파일 넣고 front matter나 본문에 경로 |
| 본문 중간 이미지 | 프로젝트 `.md` 본문 | `{% include img.html src="/assets/projects/<이름>/파일.webp" alt="설명" %}` |
| 이미지 캡션 | 프로젝트 `.md` 본문 | 이미지 다음 줄에 문장, 그 다음 줄에 `{: .caption}` |
| 자동재생 영상 | `assets/projects/<이름>/clip.mp4` | front matter에 `clip: /assets/projects/<이름>/clip.mp4`. PORTFOLIO 카드 썸네일과 상세 상단에서 움직임. 세로 영상이면 `cover_class: phone` 추가 |
| 기술 스택 칩 | 프로젝트 `stack:` / `resume.md` | 이력서: `{% include chips.html list="Unity 6|C#" %}` |
| 메뉴 이름 | `_layouts/default.html` | `<nav>` 안 About / Resume / Portfolio |
| 개요 라벨 ("종류", "내 역할") | `_includes/project-meta.html` | |
| 색, 폰트, 여백 | `assets/style.css` | 맨 위 `:root` 변수 (`--accent` = 링크 파란색 등) |

**영상 팁**: GIF 말고 MP4(H.264)로. 5~20초, 가로 1280px 이하, 소리 없이, 2~8MB. 압축 명령:
```bash
ffmpeg -i 원본.mov -t 15 -vf "scale=1280:-2,fps=30" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -an -movflags +faststart clip.mp4
```
(ffmpeg 설치: `brew install ffmpeg`, 이 맥에는 설치돼 있음). 세로 폰 화면 녹화는 `scale=720:-2`, `-crf 22`, fps 옵션 빼고(원본 60fps 유지) 하면 10초에 약 1.5MB. 정지 화면: `ffmpeg -ss 0.5 -i clip.mp4 -frames:v 1 -q:v 4 clip-poster.jpg`. 1분 넘는 영상은 YouTube에 올리고 `links.video`로 연결.

**비공개 메모**: 사이트에 안 보이게 메모를 남기려면 `{% comment %}메모{% endcomment %}`. `<!-- -->`는 페이지 소스에 그대로 남으니 쓰지 말 것.

---

## 7. 이력서 PDF 다시 만들기 / 다른 형식으로 받기

### 7-1. 사이트에 올라가는 PDF 다시 만들기 (이력서 수정 후 필수)

가장 쉬운 방법 (설치 필요 없음):
1. 이력서를 고쳐서 먼저 push한다 → 1분 뒤 https://hellonobb.github.io/resume/ 에 반영됐는지 확인.
2. 터미널에서 저장소 폴더로 가서 아래 명령 실행:
   ```bash
   cd ~/WebProjects/HelloNobb.github.io
   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --no-pdf-header-footer --virtual-time-budget=5000 --print-to-pdf="$PWD/assets/resume.pdf" https://hellonobb.github.io/resume/
   ```
3. 새 `assets/resume.pdf`를 커밋하고 다시 push.

PDF에는 메뉴·버튼이 빠지고 인쇄용 레이아웃이 적용된다 (`assets/style.css`의 `@media print` 부분).

### 7-2. 브라우저에서 바로 PDF로 저장 (여백·용지 직접 조절)
1. Chrome에서 https://hellonobb.github.io/resume/ 열기
2. `Cmd + P` → 대상: **PDF로 저장**
3. 더보기 설정에서 용지(A4), 여백, "머리글과 바닥글" 체크 해제
4. 저장

### 7-3. Word(.docx)로 받기 (회사 양식에 붙여넣기 등)
pandoc을 한 번 설치하면 웹 이력서를 Word로 바꿀 수 있다.
```bash
brew install pandoc
pandoc -f html -t docx https://hellonobb.github.io/resume/ -o ~/Desktop/김현지_이력서.docx
```
메뉴 같은 사이트 요소가 일부 같이 들어올 수 있으니 열어서 지우면 된다.

### 7-4. 텍스트만 필요할 때 (지원서 입력칸에 붙여넣기)
- 웹 이력서에서 드래그해 복사하거나, `resume.md`를 열어 해당 부분을 복사.
- `resume.md`에는 `{% include ... %}` 같은 코드가 섞여 있으니 그 줄은 빼고 쓴다.

### 7-5. 사진·전화번호가 들어간 비공개 이력서
- **공개 사이트에는 사진, 휴대전화, 생년월일을 올리지 않는다.** 사이트의 PDF는 누구나 받을 수 있다.
- 비공개 정보는 내 맥에만 있는 두 곳에 둔다 (둘 다 `.gitignore`라 push해도 안 올라감):
  - `_data/private.yml`: `photo`, `phone`, `birth`
  - `assets/private/photo.jpg`: 증명사진
- 아래 명령 한 줄이면 사진·생년월일·전화번호가 들어간 이력서 PDF가 **바탕화면 `김현지_이력서.pdf`**로 저장된다 (10번의 로컬 Jekyll 설치 필요):
  ```bash
  cd ~/WebProjects/HelloNobb.github.io
  .github/scripts/private_resume.sh
  ```
  다른 이름으로 저장하려면 뒤에 경로를 붙인다: `.github/scripts/private_resume.sh ~/Desktop/이력서.pdf`
- 원리: `resume.md`가 `JEKYLL_ENV=private`로 빌드할 때만 `_data/private.yml`을 읽어 사진·생년월일·전화를 그린다. GitHub Pages(production)와 평소 로컬 빌드에서는 아무것도 안 나온다.
- 이력서 내용을 고치면 공개 PDF(7-1)와 이 비공개 PDF를 둘 다 다시 만든다.

---

## 8. 커밋 / 푸시 하는 법

### 터미널로
```bash
cd ~/WebProjects/HelloNobb.github.io
git status                        # 무엇이 바뀌었는지 확인
git add -A                        # 바뀐 파일 전부 담기
git commit -m "이력서 학력 수정"     # 무엇을 바꿨는지 짧게
git push                          # GitHub로 올리기 → 1분 뒤 사이트 반영
```

### VS Code로
왼쪽 "소스 제어" 아이콘 → 메시지 입력 → ✓ 커밋 → "변경 사항 동기화(Sync/Push)".

### 반영 확인
- 1~2분 뒤 사이트를 **강력 새로고침** (`Cmd + Shift + R`). 브라우저가 예전 페이지를 최대 10분 들고 있을 수 있다.
- 빌드 상태: GitHub 저장소 → **Actions** 탭 → "pages build and deployment".
  - 초록 ✓ = 성공, 빨강 ✗ = 실패, 노란 점 = 진행/대기 중.

### push가 거절될 때 (`rejected ... fetch first`)
블로그 자동 작업이 그 사이 커밋을 올렸기 때문이다. 먼저 받아오고 다시 push:
```bash
git pull --rebase
git push
```

---

## 9. 문제가 생겼을 때

| 증상 | 원인 / 해결 |
|---|---|
| push했는데 사이트가 안 바뀜 | 1~2분 기다린 뒤 `Cmd + Shift + R`. 그래도면 Actions 탭 확인 |
| Actions에서 빌드가 10분 넘게 "Queued" | GitHub 쪽 대기열 지연. 그 실행을 열어 **Cancel workflow** → 다시 **Re-run all jobs** (또는 터미널에서 `gh api -X POST repos/HelloNobb/HelloNobb.github.io/pages/builds`) |
| 빌드 실패(빨강 ✗) | 거의 항상 `.md` 맨 위 `---` 사이 YAML 문법 오류. 따옴표 짝, 들여쓰기(스페이스 2칸), `:` 뒤 공백 확인 |
| 이미지가 안 보임 | 경로 오타 또는 파일 확장자 다름 (`.png` vs `.webp`). `img.html`은 파일이 없으면 조용히 안 그림 |
| 이력서는 바뀌었는데 PDF는 예전 것 | 7-1로 PDF 재생성 후 커밋 |
| 블로그 새 글이 안 뜸 | 최대 6시간 걸림. 급하면 Actions → Sync blog posts → Run workflow |
| 모바일에서 화면이 옆으로 밀림 | 너무 긴 단어/표/이미지. 이미지는 자동으로 줄어들지만 긴 코드 줄은 표나 코드 블록 안에 넣기 |

---

## 10. 내 컴퓨터에서 미리 보기 (선택)

push 전에 미리 보고 싶을 때만. 안 해도 된다.

```bash
# 한 번만: Jekyll 설치 (macOS 기본 Ruby 2.6용 버전 고정)
GEM_HOME=~/.jekyll-gems gem install --no-document ffi:1.15.5 i18n:1.14.1 public_suffix:4.0.7 jekyll:3.9.5 kramdown-parser-gfm:1.1.0

# 미리 보기 (http://localhost:4000)
cd ~/WebProjects/HelloNobb.github.io
GEM_HOME=~/.jekyll-gems ~/.jekyll-gems/bin/jekyll serve
```

---

## 11. 지켜야 할 규칙

- 이력서는 **공통 이력서**. 지원 회사명·직무는 넣지 않는다.
- 휴대전화, 생년월일, 실제 사진은 공개 사이트에 올리지 않는다.
- 이력서 문구와 포트폴리오 문구는 섞지 않는다 (이력서 = 요약, 포트폴리오 = 상세).
- 수치나 성과는 실제로 측정한 것만 쓴다.
