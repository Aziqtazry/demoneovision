from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


project_root = Path(__file__).resolve().parents[1]
output_dir = project_root / "out"
archive_path = project_root / "deploy" / "amplify" / "flood-dashboard-static-v4.zip"

if not output_dir.is_dir():
    raise SystemExit("Static output folder 'out' does not exist. Run the static build first.")

archive_path.parent.mkdir(parents=True, exist_ok=True)

with ZipFile(archive_path, "w", ZIP_DEFLATED) as archive:
    for source_path in output_dir.rglob("*"):
        if source_path.is_file():
            archive_name = source_path.relative_to(output_dir).as_posix()
            archive.write(source_path, archive_name)

print(archive_path)
