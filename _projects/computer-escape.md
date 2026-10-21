---
title: "Computer Escape"
date: 2023-07-01
cover: /assets/projects/computer-escape/cover.png
gallery:
  - src: /assets/projects/computer-escape/cover.png
    caption: 타이틀 화면
  - src: /assets/projects/computer-escape/gameplay.png
    caption: 장미 방
summary: "컴퓨터 속으로 빨려 들어간 주인공이 컴퓨터 바탕화면을 돌며 미니게임과 퍼즐을 풀고 탈출하는 모바일 방탈출 어드벤처 게임"
kind: "모바일 2D 게임"
period: "2023.07 ~ 09"
team: "8인 (개발 5, 기획 2, 디자인 2)"
role: "팀장 + 기획 리드 + 개발"
stack: ["Solar2D (Corona SDK)", "Lua"]
links:
  github: https://github.com/HelloNobb/Computer-Escape
  video:
  play: https://play.google.com/store/apps/details?id=com.solar2d.app.Computer_Escape&hl=ko
---

## 역할

- **기획:** 소재 제안, 스토리, 미니게임 대부분 기획. 스크립트 작업은 다른 기획자와 함께 작성.
- **개발:** 1층 로비(이동·카메라·상호작용), 장미 방 전체(입장부터 미니게임, 엔딩 분기까지)

## 구현

- 엔진 기능 없이 만든 로비 이동, 카메라 조작
- 타이머 기반 미니게임
- 직접 제작한 이동 코드가 팀 화면 18개에 쓰임
