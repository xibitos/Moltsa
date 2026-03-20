# Moltsa

Dashboard y centro de control en tiempo real para agentes de IA OpenClaw. Monitoriza, gestiona y controla instancias de agentes corriendo en un VPS.

## Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS v4 (dark mode por defecto)
- **Lenguaje**: TypeScript 5 (strict)
- **Base de datos**: SQLite (better-sqlite3, WAL mode)
- **3D**: React Three Fiber + Drei
- **Charts**: Recharts

## Comandos

```bash
npm run dev          # Servidor de desarrollo (localhost:3000)
npm run build        # Build de producción
npm run lint         # ESLint 9
npx tsc --noEmit     # Verificación de tipos
```

No hay framework de tests. Verificación manual: build + tsc + lint.

## Estructura

```
src/
├── app/
│   ├── (dashboard)/     # Páginas protegidas del dashboard
│   ├── api/             # API routes (protegidas excepto auth y health)
│   ├── login/           # Página de login (pública)
│   └── office/          # Oficina 3D (pública)
├── components/
│   ├── Moltsa/          # Shell del OS (TopBar, Dock, StatusBar)
│   ├── Office3D/        # Espacio 3D con agentes
│   └── charts/          # Componentes de gráficas
├── config/
│   └── branding.ts      # Configuración de branding desde env vars
├── hooks/               # Custom hooks (useDebounce, etc.)
├── lib/
│   ├── paths.ts         # Paths centralizados de OpenClaw
│   ├── activities-db.ts # Activity logging (SQLite)
│   ├── pricing.ts       # Precios de modelos y cálculo de costes
│   ├── usage-collector.ts
│   └── usage-queries.ts
└── middleware.ts        # Guard de autenticación
data/                    # Datos operacionales (gitignored)
scripts/                 # Scripts de mantenimiento y cron
public/models/           # Modelos 3D GLB de avatares
```

## Arquitectura

### Autenticación
- Middleware en `src/middleware.ts` protege todas las rutas
- Cookie `mc_auth` con `AUTH_SECRET`, httpOnly, sameSite lax
- Rate limiting: 5 intentos fallidos → 15 min de bloqueo por IP
- Rutas públicas: `/login`, `/api/auth/*`, `/api/health`, `/office`

### Configuración
- Paths de OpenClaw centralizados en `src/lib/paths.ts`
- Branding y datos personales via env vars en `src/config/branding.ts`
- **NUNCA hardcodear datos personales** — siempre usar variables `NEXT_PUBLIC_*`

### Base de datos
- SQLite con WAL mode, almacenada en `data/`
- `activities.db` — log de actividades (retención 30 días)
- `usage-tracking.db` — tracking de costes y uso de tokens

### Patrón de API routes
```typescript
export async function GET() {
  try {
    const data = await fetchData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
```

## Convenciones

### Nombrado de archivos
- Componentes: **PascalCase** (`ActivityFeed.tsx`, `CronJobCard.tsx`)
- Utilidades/libs: **camelCase** (`pricing.ts`, `activities-db.ts`)
- API routes: **kebab-case** en carpetas (`/api/cron/run`)

### TypeScript
- Usar `unknown` en vez de `any`
- Import alias: `@/*` → `./src/*`
- Componentes interactivos llevan `'use client'`

### Estilos
- Tailwind CSS v4 con clases utility
- Variables CSS para theming definidas en `globals.css`
- Dark mode por defecto

### Git
- Formato de commits: `<tipo>: <descripción>` (feat, fix, docs, style, refactor, perf, test, chore)
- Pre-commit hook verifica leaks de datos personales (`scripts/pre-commit-check.sh`)

## Variables de entorno

Ver `.env.example` para referencia completa.

| Variable | Requerida | Descripción |
|----------|-----------|-------------|
| `ADMIN_PASSWORD` | Sí | Password de login |
| `AUTH_SECRET` | Sí | Secreto para firmar cookies (32 chars base64) |
| `OPENCLAW_DIR` | No | Directorio de OpenClaw (default: `/root/.openclaw`) |
| `OPENCLAW_WORKSPACE` | No | Workspace principal (default: `/root/.openclaw/workspace`) |
| `NEXT_PUBLIC_*` | No | Variables de branding (ver `.env.example`) |

## Notas

- `data/` está gitignored — los archivos `.example.json` sirven de plantilla para inicializar
- Terminal API usa allowlist de comandos (bloquea `env`, `curl`, `wget`, `node`, `python`)
- Los agentes se auto-descubren desde `openclaw.json`
- PWA habilitada con service worker (`public/sw.js`)
