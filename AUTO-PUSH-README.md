# Sistema de Auto-Push a GitHub

Este proyecto tiene configurado un sistema automatico que detecta cambios en los archivos y los sube automaticamente a GitHub.

## Estado Actual

- **Servidor de desarrollo**: Corriendo en http://localhost:3000
- **Auto-Push**: Activo y funcionando
- **Repositorio**: https://github.com/Ubushisas/website-saris-1.git
- **Rama**: main

## Como Funciona

El script `auto-push.ps1` esta corriendo en segundo plano y:

1. Verifica cada 10 segundos si hay cambios en el proyecto
2. Cuando detecta cambios, automaticamente:
   - Agrega todos los archivos modificados (`git add .`)
   - Crea un commit con timestamp (`git commit -m "Auto-commit: [fecha y hora]"`)
   - Hace push a GitHub (`git push origin main`)

## Archivos Creados

- `auto-push.ps1` - Script principal de PowerShell que monitorea cambios
- `start-auto-push.bat` - Archivo batch para iniciar el auto-push manualmente

## Como Usar

El sistema ya esta corriendo automaticamente. Simplemente:

1. Edita cualquier archivo en el proyecto
2. Guarda los cambios
3. Espera maximo 10 segundos
4. Los cambios se subiran automaticamente a GitHub

## Verificar el Auto-Push

Puedes ver la actividad del auto-push en la consola de Claude Code o revisar tu repositorio en GitHub.

## Detener el Auto-Push

Si necesitas detener el auto-push temporalmente:

1. Ve a la terminal donde se ejecuto Claude Code
2. El script se detendra cuando cierres la sesion

## Reiniciar el Auto-Push Manualmente

Si el script se detiene, puedes reiniciarlo con:

```bash
cd "C:\Users\PERSONAL\Documents\web spa 2\CGMWTAUGUST2025\terrene"
powershell -NoProfile -ExecutionPolicy Bypass -File "auto-push.ps1"
```

O simplemente haz doble clic en `start-auto-push.bat`

## Notas Importantes

- El script solo detecta cambios en archivos rastreados por Git
- Los archivos en `.gitignore` no se subiran
- Cada commit incluye un timestamp para facilitar el seguimiento
- El script continua ejecutandose mientras la terminal este abierta
