cd C:\automation_app_android

git pull origin main --rebase

REM Forzar cambio en el log
echo Run at %date% %time% >> scripts\log\test-spec-output.txt

git add scripts\log

git diff --cached --quiet || (
    git commit -m "Auto log update %date% %time%"
    git push origin main
)