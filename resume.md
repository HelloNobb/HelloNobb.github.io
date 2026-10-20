---
layout: default
title: Resume
permalink: /resume/
---

# Resume

{% assign pdf = site.static_files | where: "path", "/assets/resume.pdf" | first %}
{% if pdf %}<a class="button" href="{{ '/assets/resume.pdf' | relative_url }}" download>PDF download</a>{% endif %}

<div class="resume-head">
  <h2>{{ site.title }}</h2>
  <p class="muted">지원 직무: 크래프톤 Game Development - Programming (인턴)</p>
  <blockquote>{{ site.slogan | newline_to_br }}</blockquote>
  <ul class="contact">
    <li>이메일: <a href="mailto:{{ site.email }}">{{ site.email }}</a></li>
    <li>블로그: <a href="https://nobbs-it-study.tistory.com/" target="_blank" rel="noopener">nobbs-it-study.tistory.com</a></li>
    <li>깃허브: <a href="https://github.com/HelloNobb" target="_blank" rel="noopener">github.com/HelloNobb</a></li>
  </ul>
</div>

## 프로젝트

<div class="resume-projects">
{% assign projects = site.projects | sort: "date" | reverse %}
{% for p in projects %}
  <section class="resume-project">
    <h3><a href="{{ p.url | relative_url }}">{{ p.title }}</a></h3>
    <p class="summary">“{{ p.summary }}”</p>
    <p class="muted">{{ p.team }} · {{ p.role }} | {{ p.period }} | {{ p.stack | join: ", " }}</p>
    {% if p.links.play %}<p><a href="{{ p.links.play }}" target="_blank" rel="noopener">플레이 링크</a></p>{% endif %}
    {{ p.content }}
  </section>
{% endfor %}
</div>

## 기술 스택

- **Client**: C#, Unity 6 (2D URP), Unity Profiler, C# Job System, Burst
- **Server**: Java·Spring Boot, Python·FastAPI, MariaDB
- **Language**: C, C#, Java, Python, TypeScript
- **Tools**: Git, Claude Code

## 학력

- 2027-08 동덕여자대학교 컴퓨터학과 (졸업 예정)
- 2026-01 크래프톤 부트캠프 정글 11기 (수료)

## 자격증

- 2026-09 정보처리기사
