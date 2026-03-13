# Soc Ops (Tiếng Việt)

Trò chơi Bingo xã hội dành cho các buổi gặp mặt trực tiếp. Tìm những người phù hợp với các câu hỏi và đạt 5 ô liên tiếp để chiến thắng!

🎮 **[Chơi ngay](https://madebygps.github.io/vscode-github-copilot-agent-lab/)** • 📚 **[Xem hướng dẫn](https://madebygps.github.io/vscode-github-copilot-agent-lab/docs/)**

---

## 📚 Hướng dẫn Lab

| Phần | Tiêu đề |
|------|--------|
| [**00**](https://madebygps.github.io/vscode-github-copilot-agent-lab/docs/step.html?step=00-overview) | Tổng quan & Danh sách kiểm tra |
| [**01**](https://madebygps.github.io/vscode-github-copilot-agent-lab/docs/step.html?step=01-setup) | Cài đặt & Kỹ thuật ngữ cảnh |
| [**02**](https://madebygps.github.io/vscode-github-copilot-agent-lab/docs/step.html?step=02-design) | Thiết kế giao diện đầu tiên |
| [**03**](https://madebygps.github.io/vscode-github-copilot-agent-lab/docs/step.html?step=03-quiz-master) | Tùy chỉnh Quiz Master |
| [**04**](https://madebygps.github.io/vscode-github-copilot-agent-lab/docs/step.html?step=04-multi-agent) | Phát triển đa tác nhân |

> 📝 Hướng dẫn cũng có trong thư mục [`workshop/`](workshop/) để đọc offline.

---

## Yêu cầu

- [Python 3.13](https://www.python.org/downloads/) trở lên
- [uv](https://docs.astral.sh/uv/) trình quản lý gói

## Cài đặt

```bash
uv sync
```

## Chạy

```bash
uv run uvicorn app.main:app --reload
```

Sau đó mở http://localhost:8000 trên trình duyệt.

## Kiểm thử

```bash
uv run pytest
```

## Kiểm tra định dạng

```bash
uv run ruff check .
uv run ruff format .
```

Tự động triển khai lên GitHub Pages khi đẩy lên nhánh `main`.
