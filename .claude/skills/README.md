# Project skills

Committed Claude Code skills for this repo. Anything here is available in **every**
session — including ephemeral cloud/web sessions — because it lives in the repo
(unlike personal skills installed only on a local machine, which do not carry over
to a fresh cloud container).

## Add a skill

Create `.claude/skills/<skill-name>/SKILL.md` with frontmatter:

```markdown
---
name: my-skill
description: When to use this skill and what it does.
---

# my-skill

Instructions for the skill...
```

Commit it and it will be loadable via the `/my-skill` slash command in future sessions.

> No project skills are defined yet. Add the ones you want persisted here.
