# Soc Ops — Workspace Instructions

**Social Bingo game** for in-person mixers. This is a FastAPI + HTMX web application with real-time interactions and cookie-based session management.

---

## Code Style & Formatting

- **Python**: Python 3.13+, PEP 8 via `ruff`. Line length: 88 characters.
- **Imports**: Sorted alphabetically with `ruff` (`E`, `F`, `I`, `N`, `W` rules enabled).
- **Type Hints**: Use `@pydantic.BaseModel` for request/response schemas. Add type hints to function signatures.
- **Naming**: `snake_case` for functions/variables, `snake_case` for template files, `PascalCase` for classes.

Run linting and formatting before requesting review:
`ash
python -m uv run ruff check .
python -m uv run ruff format .
`

---

## Architecture

The application follows a **layered FastAPI structure**:

- **`app/main.py`**: FastAPI app initialization, routes, middleware (session management via `SessionMiddleware`)
- **`app/game_service.py`**: Game session management, player state, game logic orchestration
- **`app/game_logic.py`**: Core bingo game rules (board generation, winning conditions, square toggling)
- **`app/models.py`**: Pydantic models for data validation (`GameState`, `Square`, etc.)
- **`app/templates/`**: Jinja2 HTML templates with HTMX directives for real-time interactions
- **`app/static/css/app.css`**: Custom utility classes (Tailwind-like, not actual Tailwind)

### Key Patterns

- **Session Management**: Cookie-based sessions with `SessionMiddleware`. Session ID stored in `request.session["session_id"]`.
- **HTMX Integration**: Real-time game updates without page reloads. Routes return HTML fragments for partial page updates.
- **Template Structure**: Base template in `base.html` with component templates in `components/` for reusability.
- **No State Database**: Game state is stored in-memory via `GameSession` objects. Not persisted across server restarts.

---

## Build & Test

### Setup Dependencies
`ash
python -m uv sync
`

### Run Development Server
`ash
python -m uv run uvicorn app.main:app --reload --port 8000
`
Then open `http://localhost:8000` in your browser (not VS Code Simple Browser).

### Run Tests
`ash
python -m uv run pytest
`
Test coverage: API endpoints (`test_api.py`) and game logic (`test_game_logic.py`).

### Linting & Formatting
`ash
python -m uv run ruff check .       # Check linting errors
python -m uv run ruff format .      # Auto-format code
`

---

## Conventions

### HTML & HTMX
- **HTMX Attributes**: Use `hx-post`, `hx-swap`, `hx-target` for dynamic interactions. Keep HTMX logic in templates, not JavaScript.
- **CSS Classes**: Use custom utility classes from `app.css` (e.g., `flex`, `grid-cols-5`, `p-4`, `mb-2`). Never add inline styles; use utility classes.
- **Template Inheritance**: All templates extend `base.html` with `{% extends "base.html" %}`. Use `{% block content %}` for page-specific content.

### Python
- **Error Handling**: Use Pydantic validation for request data. Let FastAPI handle 422 validation errors.
- **Session Access**: Always call `_get_game_session(request)` to retrieve or create a session from the current request.
- **Database**: Not used. Game state lives in memory via `GameSession` on server—changes are not persisted.

### Testing
- **Unit Tests**: Test game logic in isolation (`test_game_logic.py` — rules, board generation, win conditions).
- **API Tests**: Test HTTP endpoints with `TestClient` (`test_api.py` — status codes, response formats, session management).
- **Fixtures**: Use pytest fixtures for reusable game state and test clients.

---

## When Stuck

1. **Tests fail**: Run `python -m uv run pytest -v` for detailed output. Check `tests/` folder for existing patterns.
2. **Linting errors**: Run `python -m uv run ruff check . --show-fixes` to see fixes, or auto-format with `ruff format .`.
3. **Server won't start**: Ensure port 8000 is free. Check Python version: `python --version` (must be 3.13+).
4. **HTMX not working**: Ensure full browser (not VS Code Simple Browser). Check browser console for errors.

---

## File Organization

`
app/
  main.py              # FastAPI app, routes, middleware
  game_service.py      # Session management & orchestration
  game_logic.py        # Core bingo game rules
  models.py            # Pydantic models
  templates/           # Jinja2 templates
    base.html
    home.html
    components/
      bingo_board.html
      game_screen.html
      start_screen.html
      bingo_modal.html
  static/
    css/app.css        # Utility classes
    js/htmx.min.js
tests/
  test_api.py          # API endpoint tests
  test_game_logic.py   # Game logic unit tests
`

---

## References

- **FastAPI Docs**: https://fastapi.tiangolo.com/
- **HTMX**: https://htmx.org/
- **Jinja2**: https://jinja.palletsprojects.com/
- **Pydantic**: https://docs.pydantic.dev/
- **Uvicorn**: https://www.uvicorn.org/
- **Workshop Guide**: See `workshop/` folder for lab steps and context engineering examples.