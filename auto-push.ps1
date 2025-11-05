# Script de auto-push a GitHub
# Este script monitorea cambios y automaticamente hace commit y push

$projectPath = "C:\Users\PERSONAL\Documents\web spa 2\CGMWTAUGUST2025\terrene"
$watchDelay = 10

Write-Host "Auto-Push GitHub activado" -ForegroundColor Green
Write-Host "Monitoreando: $projectPath" -ForegroundColor Cyan
Write-Host "Verificando cada $watchDelay segundos" -ForegroundColor Yellow
Write-Host "Presiona Ctrl+C para detener" -ForegroundColor Red
Write-Host ""

Set-Location $projectPath

while ($true) {
    $status = git status --porcelain 2>&1

    if ($status) {
        if ($status -notmatch "fatal") {
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

            Write-Host ""
            Write-Host "[$timestamp] Cambios detectados:" -ForegroundColor Yellow
            Write-Host $status -ForegroundColor Gray

            git add . 2>&1 | Out-Null

            $commitMessage = "Auto-commit: $timestamp"
            git commit -m $commitMessage 2>&1 | Out-Null

            Write-Host "Subiendo cambios a GitHub..." -ForegroundColor Cyan
            $pushResult = git push origin main 2>&1

            if ($LASTEXITCODE -eq 0) {
                Write-Host "Push exitoso a GitHub!" -ForegroundColor Green
            }
            else {
                Write-Host "Error al hacer push:" -ForegroundColor Red
                Write-Host $pushResult -ForegroundColor Red
            }
        }
    }
    else {
        Write-Host "." -NoNewline -ForegroundColor DarkGray
    }

    Start-Sleep -Seconds $watchDelay
}
