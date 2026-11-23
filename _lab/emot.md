---
title: "EMOT"
order: 3
cover: /assets/lab/emot/cover.png
summary: "단순한 대화와 호감도만으로 캐릭터의 매력을 실험한 대화형 프로토타입 (Claude Haiku, Jev AI API 활용)"
play: https://hellonobb.github.io/EMOT/
stack: ["JavaScript", "Claude Haiku", "Jev (Typesafe AI)", "Cloudflare Workers"]
---

- **목적:** [G village](/lab/g-village/)에서 얻은 결론 확인. 시스템은 단순하게 두고 캐릭터의 매력에 집중하면 재미있을지 실험.
- **구조:** 두 API는 Cloudflare Worker를 거쳐 호출. Jev로 감정을 매우 빠르게 판단하고, 그 결과를 바탕으로 Claude 모델이 기억과 매치해 대사로 표현.
- **결과:** 스토리 기획 역량에 따라 재미 정도가 달라짐을 확인하고, 적용할 만한 아이디어를 찾는 계기가 됨.
