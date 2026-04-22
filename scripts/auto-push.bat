cd C:\automation_app_android

git pull origin main --rebase

git add scripts\log

git diff --cached --quiet || (
    git commit -m "Auto log update %date% %time%"
    git push origin main
)