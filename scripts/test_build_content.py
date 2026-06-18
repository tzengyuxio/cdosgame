import sys
import tempfile
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
from build_content import existing_body


def run():
    with tempfile.TemporaryDirectory() as d:
        t = Path(d)
        # 不存在 -> 預設換行
        assert existing_body(t / "nope.md") == "\n"
        # 空正文（現行格式）-> 換行
        p = t / "a.md"
        p.write_text("---\nid: cdg-0001\n---\n\n", encoding="utf-8")
        assert existing_body(p) == "\n"
        # 有手寫正文 -> 原樣保留
        q = t / "b.md"
        q.write_text("---\nid: cdg-0002\n---\n\n## 考據\n內文\n", encoding="utf-8")
        assert existing_body(q) == "\n## 考據\n內文\n"
    print("ok")


if __name__ == "__main__":
    run()
