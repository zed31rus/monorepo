```structure
monorepo
├─ .dockerignore
├─ .prettierrc
├─ apps
│  ├─ auth
│  │  ├─ core
│  │  │  ├─ base
│  │  │  │  ├─ core.ts
│  │  │  │  ├─ manager.ts
│  │  │  │  └─ service.ts
│  │  │  ├─ containers
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ manager.ts
│  │  │  │  └─ services.ts
│  │  │  ├─ managers
│  │  │  │  ├─ otp.ts
│  │  │  │  └─ session.ts
│  │  │  └─ services
│  │  │     ├─ account.ts
│  │  │     ├─ auth.ts
│  │  │     ├─ me.ts
│  │  │     ├─ oauth
│  │  │     │  └─ discord.ts
│  │  │     └─ users.ts
│  │  ├─ package.json
│  │  ├─ start.ts
│  │  ├─ tsconfig.json
│  │  └─ web
│  │     ├─ base
│  │     │  ├─ handler.ts
│  │     │  ├─ manager.ts
│  │     │  ├─ middleware.ts
│  │     │  ├─ module.ts
│  │     │  ├─ openapi.ts
│  │     │  ├─ server.ts
│  │     │  ├─ web.ts
│  │     │  └─ wrapper.ts
│  │     ├─ containers
│  │     │  ├─ dto.ts
│  │     │  ├─ handler.ts
│  │     │  ├─ index.ts
│  │     │  ├─ managers.ts
│  │     │  ├─ middleware.ts
│  │     │  ├─ module.ts
│  │     │  ├─ openapi.ts
│  │     │  ├─ server.ts
│  │     │  └─ wrapper.ts
│  │     ├─ dto
│  │     │  ├─ cookie.ts
│  │     │  └─ file.ts
│  │     ├─ handlers
│  │     │  ├─ auth.ts
│  │     │  ├─ error.ts
│  │     │  └─ file.ts
│  │     ├─ managers
│  │     │  └─ session.ts
│  │     ├─ middleware
│  │     │  ├─ auth.ts
│  │     │  └─ file.ts
│  │     ├─ modules
│  │     │  ├─ external
│  │     │  │  ├─ account.ts
│  │     │  │  ├─ auth.ts
│  │     │  │  ├─ me.ts
│  │     │  │  ├─ oauth
│  │     │  │  │  └─ discord.ts
│  │     │  │  └─ users.ts
│  │     │  └─ internal
│  │     │     └─ users.ts
│  │     ├─ openapi
│  │     │  ├─ external
│  │     │  │  ├─ account.ts
│  │     │  │  ├─ auth.ts
│  │     │  │  ├─ me.ts
│  │     │  │  ├─ oauth
│  │     │  │  │  └─ discord.ts
│  │     │  │  └─ users.ts
│  │     │  └─ internal
│  │     │     └─ users.ts
│  │     ├─ servers
│  │     │  ├─ external.ts
│  │     │  └─ internal.ts
│  │     ├─ types
│  │     │  └─ Env.ts
│  │     └─ wrappers
│  │        ├─ cors.ts
│  │        ├─ rateLimiter.ts
│  │        └─ validator.ts
│  ├─ discordBot
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ base
│  │  │  │  ├─ bot.ts
│  │  │  │  ├─ event
│  │  │  │  │  ├─ discord.ts
│  │  │  │  │  └─ internal
│  │  │  │  │     └─ rabbitMq.ts
│  │  │  │  └─ manager.ts
│  │  │  ├─ containers
│  │  │  │  ├─ event
│  │  │  │  │  └─ discord.ts
│  │  │  │  ├─ index.ts
│  │  │  │  └─ manager.ts
│  │  │  ├─ events
│  │  │  │  ├─ discord
│  │  │  │  │  └─ guild
│  │  │  │  │     └─ voice
│  │  │  │  │        └─ hub
│  │  │  │  │           ├─ onConnect.ts
│  │  │  │  │           └─ onDisconnect.ts
│  │  │  │  └─ internal
│  │  │  │     └─ rabbitMq
│  │  │  │        └─ auth
│  │  │  │           └─ from
│  │  │  │              └─ oauthRegisteredNewUser.ts
│  │  │  └─ managers
│  │  │     ├─ activity.ts
│  │  │     ├─ serverName.ts
│  │  │     └─ voice.ts
│  │  └─ tsconfig.json
│  ├─ frontend
│  │  ├─ app
│  │  │  ├─ app.vue
│  │  │  ├─ components
│  │  │  │  ├─ defaultLayout
│  │  │  │  │  ├─ desktop.vue
│  │  │  │  │  └─ mobile.vue
│  │  │  │  ├─ notifications
│  │  │  │  │  ├─ area
│  │  │  │  │  │  ├─ desktop.vue
│  │  │  │  │  │  └─ mobile.vue
│  │  │  │  │  ├─ desktop.vue
│  │  │  │  │  ├─ instance
│  │  │  │  │  │  ├─ desktop.vue
│  │  │  │  │  │  └─ mobile.vue
│  │  │  │  │  └─ mobile.vue
│  │  │  │  ├─ pages
│  │  │  │  │  └─ home
│  │  │  │  │     ├─ desktop.vue
│  │  │  │  │     └─ mobile.vue
│  │  │  │  └─ sideBar
│  │  │  │     ├─ desktop.vue
│  │  │  │     ├─ item.vue
│  │  │  │     └─ mobile.vue
│  │  │  ├─ composables
│  │  │  │  ├─ notifications.ts
│  │  │  │  ├─ routes.ts
│  │  │  │  └─ typeColors.ts
│  │  │  ├─ layouts
│  │  │  │  └─ default.vue
│  │  │  ├─ main.css
│  │  │  ├─ pages
│  │  │  │  └─ index.vue
│  │  │  ├─ stores
│  │  │  │  ├─ notifications.ts
│  │  │  │  ├─ title.ts
│  │  │  │  └─ user.ts
│  │  │  └─ types
│  │  │     ├─ notification.ts
│  │  │     ├─ sideBar.ts
│  │  │     └─ user.ts
│  │  ├─ Dockerfile
│  │  ├─ nuxt.config.ts
│  │  ├─ package.json
│  │  ├─ public
│  │  │  ├─ favicon.ico
│  │  │  ├─ resources
│  │  │  │  └─ background.png
│  │  │  └─ robots.txt
│  │  ├─ README.md
│  │  └─ tsconfig.json
│  └─ spotify
│     ├─ core
│     │  ├─ base
│     │  │  ├─ core.ts
│     │  │  ├─ emitter.ts
│     │  │  ├─ instance.ts
│     │  │  ├─ manager.ts
│     │  │  └─ services.ts
│     │  ├─ containers
│     │  │  ├─ emitter.ts
│     │  │  ├─ index.ts
│     │  │  ├─ instances.ts
│     │  │  ├─ managers.ts
│     │  │  └─ services.ts
│     │  ├─ emitters
│     │  │  └─ schedullers
│     │  │     └─ dailyTrack.ts
│     │  ├─ instances
│     │  │  └─ spotify.ts
│     │  ├─ managers
│     │  │  └─ dailyTrack.ts
│     │  └─ services
│     │     └─ playlist.ts
│     ├─ Dockerfile
│     ├─ package.json
│     ├─ start.ts
│     ├─ tsconfig.json
│     └─ web
│        ├─ base
│        │  ├─ handler.ts
│        │  ├─ module.ts
│        │  ├─ openapi.ts
│        │  ├─ server.ts
│        │  ├─ web.ts
│        │  └─ wrapper.ts
│        ├─ containers
│        │  ├─ handler.ts
│        │  ├─ index.ts
│        │  ├─ module.ts
│        │  ├─ openapi.ts
│        │  ├─ server.ts
│        │  └─ wrapper.ts
│        ├─ handlers
│        │  └─ error.ts
│        ├─ modules
│        │  └─ dailyTrack.ts
│        ├─ openapi
│        │  └─ dailyTrack.ts
│        ├─ servers
│        │  └─ external.ts
│        └─ wrappers
│           ├─ cors.ts
│           └─ rateLimiter.ts
├─ base
│  ├─ index.ts
│  ├─ package.json
│  ├─ src
│  │  └─ base.ts
│  └─ tsconfig.json
├─ compose.yaml
├─ eslint.config.ts
├─ LICENSE
├─ package.json
├─ packages
│  ├─ db
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ auth
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ config.ts
│  │  │  │  ├─ oauth
│  │  │  │  │  ├─ cases
│  │  │  │  │  │  ├─ create.ts
│  │  │  │  │  │  ├─ get.ts
│  │  │  │  │  │  ├─ update.ts
│  │  │  │  │  │  └─ upsert.ts
│  │  │  │  │  └─ oauth.ts
│  │  │  │  ├─ refreshToken
│  │  │  │  │  ├─ cases
│  │  │  │  │  │  ├─ create.ts
│  │  │  │  │  │  ├─ delete.ts
│  │  │  │  │  │  └─ get.ts
│  │  │  │  │  └─ refreshToken.ts
│  │  │  │  ├─ schema.prisma
│  │  │  │  ├─ user
│  │  │  │  │  ├─ cases
│  │  │  │  │  │  ├─ create.ts
│  │  │  │  │  │  ├─ get.ts
│  │  │  │  │  │  └─ update.ts
│  │  │  │  │  └─ user.ts
│  │  │  │  └─ verificationCode
│  │  │  │     ├─ cases
│  │  │  │     │  ├─ delete.ts
│  │  │  │     │  ├─ get.ts
│  │  │  │     │  └─ upsert.ts
│  │  │  │     └─ verificationCode.ts
│  │  │  ├─ db.base.ts
│  │  │  ├─ db.container.ts
│  │  │  ├─ discordBot
│  │  │  │  ├─ activityStatus
│  │  │  │  │  ├─ activityStatus.ts
│  │  │  │  │  └─ cases
│  │  │  │  │     ├─ create.ts
│  │  │  │  │     ├─ delete.ts
│  │  │  │  │     └─ get.ts
│  │  │  │  ├─ config.ts
│  │  │  │  ├─ db.ts
│  │  │  │  ├─ guilds
│  │  │  │  │  ├─ cases
│  │  │  │  │  │  ├─ create.ts
│  │  │  │  │  │  ├─ delete.ts
│  │  │  │  │  │  └─ get.ts
│  │  │  │  │  ├─ features
│  │  │  │  │  │  ├─ cases
│  │  │  │  │  │  │  ├─ create.ts
│  │  │  │  │  │  │  └─ delete.ts
│  │  │  │  │  │  └─ features.ts
│  │  │  │  │  └─ guilds.ts
│  │  │  │  ├─ schema.prisma
│  │  │  │  └─ serverName
│  │  │  │     ├─ cases
│  │  │  │     │  ├─ create.ts
│  │  │  │     │  ├─ delete.ts
│  │  │  │     │  └─ get.ts
│  │  │  │     └─ serverName.ts
│  │  │  └─ spotify
│  │  │     ├─ config.ts
│  │  │     ├─ dailyTrack
│  │  │     │  ├─ cases
│  │  │     │  │  ├─ get.ts
│  │  │     │  │  └─ upsert.ts
│  │  │     │  └─ dailyTrack.ts
│  │  │     ├─ db.ts
│  │  │     └─ schema.prisma
│  │  ├─ tsconfig.json
│  │  └─ types
│  │     └─ declarations.ts
│  ├─ infra
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ base.ts
│  │  │  ├─ container.ts
│  │  │  ├─ discord
│  │  │  │  ├─ oauth.ts
│  │  │  │  └─ users.ts
│  │  │  ├─ internal
│  │  │  │  └─ auth
│  │  │  │     └─ users.ts
│  │  │  ├─ rabbitmq
│  │  │  │  └─ rabbitmq.ts
│  │  │  └─ spotify
│  │  │     └─ oauth.ts
│  │  └─ tsconfig.json
│  └─ libs
│     ├─ index.ts
│     ├─ package.json
│     ├─ src
│     │  ├─ base.ts
│     │  ├─ container.ts
│     │  └─ libs
│     │     ├─ hash
│     │     │  └─ hash.ts
│     │     ├─ jwt
│     │     │  └─ jwt.ts
│     │     ├─ mail
│     │     │  └─ mail.ts
│     │     ├─ refreshToken
│     │     │  └─ refreshToken.ts
│     │     └─ verificationCode
│     │        └─ verificationCode.ts
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
├─ shared
│  ├─ config
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ base.ts
│  │  │  ├─ configs
│  │  │  │  └─ env.ts
│  │  │  └─ container.ts
│  │  └─ tsconfig.json
│  ├─ errors
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ base.ts
│  │  │  ├─ container.ts
│  │  │  └─ errors
│  │  │     ├─ api.ts
│  │  │     ├─ config.ts
│  │  │     ├─ internal.ts
│  │  │     └─ prisma.ts
│  │  └─ tsconfig.json
│  └─ logger
│     ├─ index.ts
│     ├─ package.json
│     ├─ src
│     │  ├─ base.ts
│     │  └─ logger.ts
│     └─ tsconfig.json
├─ tsconfig.base.json
├─ tsconfig.json
└─ types
   ├─ index.ts
   ├─ package.json
   ├─ src
   │  ├─ account.ts
   │  ├─ discordBot
   │  │  └─ features.ts
   │  └─ oauth.ts
   └─ tsconfig.json

```