```structure
frontend
├─ app
│  ├─ app.vue
│  ├─ components
│  │  ├─ auth
│  │  │  ├─ login.vue
│  │  │  └─ register.vue
│  │  ├─ defaultLayout
│  │  │  ├─ desktop.vue
│  │  │  └─ mobile.vue
│  │  ├─ notifications
│  │  │  ├─ area
│  │  │  │  ├─ desktop.vue
│  │  │  │  └─ mobile.vue
│  │  │  ├─ desktop.vue
│  │  │  ├─ instance
│  │  │  │  ├─ desktop.vue
│  │  │  │  └─ mobile.vue
│  │  │  └─ mobile.vue
│  │  ├─ pages
│  │  │  └─ home
│  │  │     ├─ desktop.vue
│  │  │     └─ mobile.vue
│  │  └─ sideBar
│  │     ├─ desktop.vue
│  │     ├─ item.vue
│  │     └─ mobile.vue
│  ├─ composables
│  │  ├─ firstTimeHook.ts
│  │  ├─ notifications.ts
│  │  ├─ routes.ts
│  │  └─ typeColors.ts
│  ├─ layouts
│  │  └─ default.vue
│  ├─ main.css
│  ├─ pages
│  │  ├─ auth.vue
│  │  ├─ index.vue
│  │  └─ me.vue
│  ├─ stores
│  │  ├─ notifications.ts
│  │  ├─ title.ts
│  │  └─ user.ts
│  └─ types
│     ├─ notification.ts
│     ├─ sideBar.ts
│     └─ user.ts
├─ Dockerfile
├─ nuxt.config.ts
├─ package.json
├─ public
│  ├─ favicon.ico
│  ├─ resources
│  │  └─ background.png
│  └─ robots.txt
├─ README.md
├─ server
│  └─ middleware
│     └─ auth.ts
└─ tsconfig.json

```
