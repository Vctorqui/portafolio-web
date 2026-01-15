![image](https://github.com/user-attachments/assets/cb4ad516-4b12-4225-a6db-fcc2c9f0cc75)

# Personal website

Repository for my personal website that serves as my online resume. You can find all my projects there, info about myself, etc. The design was inspired by Twitter's UI.

### Tech stack used:

![Next.js](https://ziadoua.github.io/m3-Markdown-Badges/badges/NextJS/nextjs3.svg) ![TailwindCSS](https://ziadoua.github.io/m3-Markdown-Badges/badges/TailwindCSS/tailwindcss1.svg) ![Typescript](https://ziadoua.github.io/m3-Markdown-Badges/badges/TypeScript/typescript1.svg) ![Firebase](https://ziadoua.github.io/m3-Markdown-Badges/badges/Firebase/firebase3.svg)

## Spotify “Now Playing” (Next.js)

### 1) Crea una app en Spotify

1. Ve a https://developer.spotify.com/dashboard
2. Crea una app.
3. En la app, agrega un **Redirect URI** (por ejemplo): `http://localhost:3000/api/spotify/callback`

### 2) Variables de entorno

1. Copia `.env.example` a `.env.local`
2. Completa:
   - `SPOTIFY_CLIENT_ID`
   - `SPOTIFY_CLIENT_SECRET`
   - `SPOTIFY_REFRESH_TOKEN`

### 3) Obtener el `SPOTIFY_REFRESH_TOKEN`

La forma más simple (sin librerías extra) es hacer el “Authorization Code Flow” una sola vez:

1. Abre esta URL en el navegador (reemplaza `CLIENT_ID` y `REDIRECT_URI`):
   - `https://accounts.spotify.com/authorize?client_id=CLIENT_ID&response_type=code&redirect_uri=REDIRECT_URI&scope=user-read-currently-playing%20user-read-playback-state`
2. Acepta permisos. Spotify te redirigirá a tu `REDIRECT_URI` con `?code=...`.
3. Intercambia el `code` por tokens con un POST a `https://accounts.spotify.com/api/token`.
   - `grant_type=authorization_code`
   - `code=...`
   - `redirect_uri=...`
   - Header `Authorization: Basic base64(CLIENT_ID:CLIENT_SECRET)`
4. Del JSON, guarda `refresh_token` como `SPOTIFY_REFRESH_TOKEN`.

Notas:

- Scopes mínimos: `user-read-currently-playing` y `user-read-playback-state`.

### 4) Dónde está el código

- API route: `pages/api/spotify/now-playing.ts`
- Helpers Spotify: `src/lib/spotify.ts`
- UI card: `src/components/SpotifyNowPlaying.tsx`
- Uso en Home: `pages/index.tsx` (sección/tab Projects)

### 5) Probar

```powershell
pnpm run dev
```

Abre `http://localhost:3000` y debería aparecer la tarjeta “Now playing”.

## Configuración para Producción (Netlify)

Para que Spotify funcione en tu web en vivo (`https://victorqui.dev/`):

1. **Añadir Variables de Env en Netlify**:
   - Ve a **Site configuration** > **Environment variables** en Netlify.
   - Agrega estas 3 variables:
     - `SPOTIFY_CLIENT_ID`
     - `SPOTIFY_CLIENT_SECRET`
     - `SPOTIFY_REFRESH_TOKEN`
2. **Actualizar Spotify Dashboard**:
   - En tu [App de Spotify](https://developer.spotify.com/dashboard), añade `https://victorqui.dev/api/spotify/callback` a **Redirect URIs**.
3. **Desplegar**:
   - Asegúrate de hacer `git push` de los últimos cambios.

## Deploy

https://victorqui.dev/

## Feedback

Feel free to share any feedback you have with me! You can contact me here:

<a href="https://linkedin.com/in/victorqui/" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/linked-in-alt.svg" alt="https://www.linkedin.com/in/eliassvelazquez/" height="30" width="40" /></a>
