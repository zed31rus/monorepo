
```structure
monorepo
├─ .dockerignore
├─ .json
├─ .prettierrc
├─ apps
│  ├─ auth
│  │  ├─ core
│  │  │  ├─ base
│  │  │  │  ├─ core.base.ts
│  │  │  │  ├─ manager.base.ts
│  │  │  │  └─ service.base.ts
│  │  │  ├─ containers
│  │  │  │  ├─ index.container.ts
│  │  │  │  ├─ manager.container.ts
│  │  │  │  └─ services.container.ts
│  │  │  ├─ managers
│  │  │  │  ├─ otp.manager.ts
│  │  │  │  └─ session.manager.ts
│  │  │  └─ services
│  │  │     ├─ account.service.ts
│  │  │     ├─ auth.service.ts
│  │  │     ├─ me.service.ts
│  │  │     ├─ oauth
│  │  │     │  └─ discord.oauth.service.ts
│  │  │     └─ users.service.ts
│  │  ├─ package.json
│  │  ├─ start.ts
│  │  ├─ tsconfig.json
│  │  └─ web
│  │     ├─ base
│  │     │  ├─ handler.base.ts
│  │     │  ├─ manager.web.base.ts
│  │     │  ├─ middleware.base.ts
│  │     │  ├─ module.base.ts
│  │     │  ├─ openapi.base.ts
│  │     │  ├─ server.base.ts
│  │     │  ├─ web.base.ts
│  │     │  └─ wrapper.base.ts
│  │     ├─ containers
│  │     │  ├─ dto.container.ts
│  │     │  ├─ handler.container.ts
│  │     │  ├─ index.web.container.ts
│  │     │  ├─ managers.container.ts
│  │     │  ├─ middleware.container.ts
│  │     │  ├─ module.container.ts
│  │     │  ├─ openapi.container.ts
│  │     │  ├─ server.container.ts
│  │     │  └─ wrapper.container.ts
│  │     ├─ dto
│  │     │  ├─ cookie.dto.ts
│  │     │  └─ file.dto.ts
│  │     ├─ handlers
│  │     │  ├─ auth.handler.ts
│  │     │  ├─ error.handler.ts
│  │     │  └─ file.handler.ts
│  │     ├─ managers
│  │     │  └─ session.manager.ts
│  │     ├─ middleware
│  │     │  ├─ auth.middleware.ts
│  │     │  └─ file.middleware.ts
│  │     ├─ modules
│  │     │  ├─ external
│  │     │  │  ├─ account.external.module.ts
│  │     │  │  ├─ auth.external.module.ts
│  │     │  │  ├─ me.external.module.ts
│  │     │  │  ├─ oauth
│  │     │  │  │  └─ discord.oauth.external.module.ts
│  │     │  │  └─ users.external.module.ts
│  │     │  └─ internal
│  │     │     └─ users.internal.module.ts
│  │     ├─ openapi
│  │     │  ├─ external
│  │     │  │  ├─ account.external.openapi.ts
│  │     │  │  ├─ auth.external.openapi.ts
│  │     │  │  ├─ me.external.openapi.ts
│  │     │  │  ├─ oauth
│  │     │  │  │  └─ discord.oauth.external.openapi.ts
│  │     │  │  └─ users.external.openapi.ts
│  │     │  └─ internal
│  │     │     └─ users.internal.openapi.ts
│  │     ├─ servers
│  │     │  ├─ external.server.ts
│  │     │  └─ internal.server.ts
│  │     ├─ types
│  │     │  └─ Env.ts
│  │     └─ wrappers
│  │        ├─ cors.wrapper.ts
│  │        ├─ rateLimiter.wrapper.ts
│  │        └─ validator.wrapper.ts
│  ├─ discordBot
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ base
│  │  │  │  ├─ bot.base.ts
│  │  │  │  ├─ event
│  │  │  │  │  ├─ discord.event.base.ts
│  │  │  │  │  └─ internal
│  │  │  │  │     └─ rabbitMq.internal.event.base.ts
│  │  │  │  └─ manager.base.ts
│  │  │  ├─ containers
│  │  │  │  ├─ event
│  │  │  │  │  └─ discord.event.container.ts
│  │  │  │  ├─ index.container.ts
│  │  │  │  └─ manager.container.ts
│  │  │  ├─ events
│  │  │  │  ├─ discord
│  │  │  │  │  └─ guild
│  │  │  │  │     └─ voice
│  │  │  │  │        └─ hub
│  │  │  │  │           ├─ onConnect.hub.voice.guild.discord.event.ts
│  │  │  │  │           └─ onDisconnect.hub.voice.guild.discord.event.ts
│  │  │  │  └─ internal
│  │  │  │     └─ rabbitMq
│  │  │  │        └─ auth
│  │  │  │           └─ from
│  │  │  │              └─ oauthRegisteredNewUser.rabbitmq.event.ts
│  │  │  └─ managers
│  │  │     ├─ activity.manager.ts
│  │  │     ├─ serverName.manager.ts
│  │  │     └─ voice.manager.ts
│  │  └─ tsconfig.json
│  ├─ frontend
│  │  ├─ app
│  │  │  ├─ app.vue
│  │  │  ├─ components
│  │  │  │  ├─ mainLayout
│  │  │  │  │  ├─ index.vue
│  │  │  │  │  └─ variants
│  │  │  │  │     ├─ desktop.vue
│  │  │  │  │     └─ mobile.vue
│  │  │  │  ├─ notifications
│  │  │  │  │  ├─ area
│  │  │  │  │  │  └─ variants
│  │  │  │  │  │     ├─ desktop.vue
│  │  │  │  │  │     └─ mobile.vue
│  │  │  │  │  ├─ index.vue
│  │  │  │  │  └─ instance
│  │  │  │  │     └─ variants
│  │  │  │  │        ├─ desktop.vue
│  │  │  │  │        └─ mobile.vue
│  │  │  │  ├─ pages
│  │  │  │  │  └─ main
│  │  │  │  │     ├─ index.vue
│  │  │  │  │     └─ variants
│  │  │  │  │        ├─ desktop.vue
│  │  │  │  │        └─ mobile.vue
│  │  │  │  └─ sideBar
│  │  │  │     ├─ index.vue
│  │  │  │     ├─ item.vue
│  │  │  │     └─ variants
│  │  │  │        ├─ desktop.vue
│  │  │  │        └─ mobile.vue
│  │  │  ├─ composables
│  │  │  │  └─ notifications.ts
│  │  │  ├─ layouts
│  │  │  ├─ main.css
│  │  │  ├─ pages
│  │  │  │  └─ index.vue
│  │  │  ├─ stores
│  │  │  │  ├─ notifications.store.ts
│  │  │  │  ├─ title.store.ts
│  │  │  │  └─ user.store.ts
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
│  │  └─ base
│  │     └─ base.ts
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
│  │  │  │     │  ├─ create.serverName.case.db.ts
│  │  │  │     │  ├─ delete.serverName.case.db.ts
│  │  │  │     │  └─ get.serverName.case.db.ts
│  │  │  │     └─ serverName.db.ts
│  │  │  └─ spotify
│  │  │     ├─ config.ts
│  │  │     ├─ dailyTrack
│  │  │     │  ├─ cases
│  │  │     │  │  ├─ get.ts
│  │  │     │  │  └─ upsert.ts
│  │  │     │  └─ dailyTrack.ts
│  │  │     ├─ schema.prisma
│  │  │     └─ spotify.db.ts
│  │  ├─ tsconfig.json
│  │  └─ types
│  │     └─ declarations.ts
│  ├─ infra
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ discord
│  │  │  │  ├─ oauth.discord.infra.ts
│  │  │  │  └─ users.discord.infra.ts
│  │  │  ├─ infra.base.ts
│  │  │  ├─ infra.container.ts
│  │  │  ├─ internal
│  │  │  │  └─ auth
│  │  │  │     └─ users.auth.internal.infra.ts
│  │  │  ├─ rabbitmq
│  │  │  │  └─ rabbitmq.infra.ts
│  │  │  └─ spotify
│  │  │     └─ oauth.spotify.infra.ts
│  │  └─ tsconfig.json
│  └─ libs
│     ├─ index.ts
│     ├─ package.json
│     ├─ src
│     │  ├─ lib.base.ts
│     │  ├─ lib.container.ts
│     │  └─ libs
│     │     ├─ hash
│     │     │  └─ hash.lib.ts
│     │     ├─ jwt
│     │     │  └─ jwt.lib.ts
│     │     ├─ mail
│     │     │  └─ mail.lib.ts
│     │     ├─ refreshToken
│     │     │  └─ refreshToken.lib.ts
│     │     └─ verificationCode
│     │        └─ verificationCode.lib.ts
│     └─ tsconfig.json
├─ pnpm-lock.yaml
├─ pnpm-workspace.yaml
├─ README.md
├─ shared
│  ├─ config
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ config.base.ts
│  │  │  ├─ config.container.ts
│  │  │  └─ configs
│  │  │     └─ env.config.ts
│  │  └─ tsconfig.json
│  ├─ errors
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ errors
│  │  │  │  ├─ api.ts
│  │  │  │  ├─ config.ts
│  │  │  │  ├─ internal.ts
│  │  │  │  └─ prisma.ts
│  │  │  ├─ errors.base.ts
│  │  │  └─ errors.container.ts
│  │  └─ tsconfig.json
│  └─ logger
│     ├─ index.ts
│     ├─ package.json
│     ├─ src
│     │  ├─ base.logger.ts
│     │  └─ logger.ts
│     └─ tsconfig.json
├─ tsconfig.base.json
├─ tsconfig.json
└─ types
   ├─ index.ts
   ├─ package.json
   ├─ src
   │  ├─ account.ts
   │  ├─ features.discordBot.ts
   │  └─ oauth.ts
   └─ tsconfig.json

```