# Portfolio Content Update from CV — Design Spec

**Date:** 2026-05-12  
**Source:** Omar Chouman_Senior-Software-Engineer_CV.pdf  
**Scope:** Fill portfolio content from CV (education excluded)

---

## What Changes

### 1. `components/sections/CoreExpertise.tsx`

Update the `expertise` array — 4 cards, same structure, descriptions updated to reflect actual tech from CV:

| Title | Updated Description |
|-------|-------------------|
| Scalable Backend Systems | PHP/Laravel, Node.js, Python/Flask, GraphQL. Microservices architecture, fault tolerance, API performance at scale. |
| Cloud & Infrastructure | AWS, Terraform, Docker, Linux. CI/CD pipelines and IAC for reusable, production-grade infrastructure. |
| AI & Intelligent Systems | ML model integration, anomaly detection systems, natural language query interfaces, predictive analytics, and workflow automation. |
| Full Stack Development | ReactJS, Next.js, AngularJS, Vue.js. End-to-end delivery across ERP, ed-tech, recruitment, and enterprise platforms. |

No structural changes — only the `description` strings change.

---

### 2. `components/sections/AboutContent.tsx`

**Data model change:** Replace `{ role, company }` with `{ role, company, period, bullets: string[] }`.

**New experience entries (CV-faithful language, 2-3 bullets each):**

```ts
const experience = [
  {
    role: "Senior Software Engineer",
    company: "Aspire Software",
    period: "May 2025 – Present",
    bullets: [
      "Designed and implemented an AI-powered anomaly detection system to identify unusual behavior across IT and operational data.",
      "Developed an AI-driven SQL Query Chatbot enabling IT teams to query system data using natural language.",
      "Enhanced IAC (Infrastructure as Code) for reusable infrastructure and contributed to architectural and DevOps decisions.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Intalio",
    period: "September 2023 – February 2025",
    bullets: [
      "Built and deployed microservices powered by AI and machine learning models, boosting predictive analytics and workflow automation.",
      "Designed scalable microservice architectures ensuring high performance, fault tolerance, and seamless platform integration.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Justech",
    period: "May 2019 – Present",
    bullets: [
      "Led development and deployment of customized software solutions for clients, ensuring high performance and scalability.",
      "Collaborated with the development team to maintain efficient code and optimize performance across client projects.",
    ],
  },
  {
    role: "Software Engineer",
    company: "Kamkalima",
    period: "December 2022 – August 2023",
    bullets: [
      "Designed, coded, and deployed new features, transforming initial concepts into efficient solutions while maintaining system stability.",
      "Improved platform performance by analyzing bottlenecks and implementing optimization techniques.",
    ],
  },
  {
    role: "Software Developer",
    company: "Cirrus (An ITG Company)",
    period: "April 2022 – December 2022",
    bullets: [
      "Built a web application platform using Vue.JS, Laravel, and Microsoft SQL Server.",
      "Designed and implemented an internal ERP system to streamline resource management and reduce manual workload.",
    ],
  },
];
```

**JSX change:** The timeline `<li>` must render `item.period` and `item.bullets` in addition to `item.role` and `item.company`. Style bullets as a small unordered list in muted foreground text, consistent with existing typography.

---

## What Does NOT Change

- `components/sections/Hero.tsx` — no change
- `components/sections/WhatIDo.tsx` — no change
- `components/sections/Founder.tsx` — no change
- `lib/projects.ts` — no change
- `components/sections/ProjectsGrid.tsx` — no change
- Education section — excluded per user instruction

---

## Writing Approach

- **Experience timeline:** CV-faithful — language taken directly from PDF
- **CoreExpertise cards:** Portfolio-voice — facts from CV, condensed to match existing card style
- **Hero / WhatIDo / Founder:** Unchanged

---

## Files to Edit

1. `components/sections/CoreExpertise.tsx` — data only, no JSX changes
2. `components/sections/AboutContent.tsx` — data + JSX (add `period` and `bullets` rendering)
