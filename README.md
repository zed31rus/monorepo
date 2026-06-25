
```structure
monorepo
├─ .dockerignore
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
│     ├─ package.json
│     ├─ src
│     └─ tsconfig.json
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
│  │  │  │  ├─ auth.db.ts
│  │  │  │  ├─ auth.prisma.config.ts
│  │  │  │  ├─ auth.schema.prisma
│  │  │  │  ├─ oauth
│  │  │  │  │  ├─ cases
│  │  │  │  │  │  ├─ createOauthAccount.db.case.ts
│  │  │  │  │  │  ├─ getOauthAccount.db.case.ts
│  │  │  │  │  │  ├─ updateOauthAccount.db.case.ts
│  │  │  │  │  │  └─ upsertOauthAccount.db.case.ts
│  │  │  │  │  └─ oauth.db.ts
│  │  │  │  ├─ refreshToken
│  │  │  │  │  ├─ cases
│  │  │  │  │  │  ├─ createRefreshToken.db.case.ts
│  │  │  │  │  │  ├─ deleteRefreshToken.db.case.ts
│  │  │  │  │  │  └─ getRefreshToken.db.case.ts
│  │  │  │  │  └─ refreshToken.db.ts
│  │  │  │  ├─ user
│  │  │  │  │  ├─ cases
│  │  │  │  │  │  ├─ createUser.db.case.ts
│  │  │  │  │  │  ├─ getUser.db.case.ts
│  │  │  │  │  │  └─ updateUser.db.case.ts
│  │  │  │  │  └─ user.db.ts
│  │  │  │  └─ verificationCode
│  │  │  │     ├─ cases
│  │  │  │     │  ├─ deleteVerificationCode.db.case.ts
│  │  │  │     │  ├─ getVerificationCode.db.case.ts
│  │  │  │     │  └─ upsertVerificationCode.db.case.ts
│  │  │  │     └─ verificationCode.db.ts
│  │  │  ├─ db.base.ts
│  │  │  ├─ db.container.ts
│  │  │  └─ discordBot
│  │  │     ├─ activityStatus
│  │  │     │  ├─ activityStatus.discordbot.db.ts
│  │  │     │  └─ cases
│  │  │     │     ├─ create.activityStatus.db.case.ts
│  │  │     │     ├─ delete.activityStatus.db.case.ts
│  │  │     │     └─ get.activityStatus.db.case.ts
│  │  │     ├─ discordbot.db.ts
│  │  │     ├─ discordbot.prisma.config.ts
│  │  │     ├─ discordbot.schema.prisma
│  │  │     ├─ guilds
│  │  │     │  ├─ cases
│  │  │     │  │  ├─ create.guild.discordbot.db.case.ts
│  │  │     │  │  ├─ delete.guild.discordbot.db.case.ts
│  │  │     │  │  └─ get.guild.discordbot.db.case.ts
│  │  │     │  ├─ features
│  │  │     │  │  ├─ cases
│  │  │     │  │  │  ├─ add.feature.guild.db.case.ts
│  │  │     │  │  │  └─ delete.feature.guild.db.case.ts
│  │  │     │  │  └─ features.guild.discordbot.db.ts
│  │  │     │  └─ guilds.discordbot.db.ts
│  │  │     └─ serverName
│  │  │        ├─ cases
│  │  │        │  ├─ create.serverName.db.case.ts
│  │  │        │  ├─ delete.serverName.db.case.ts
│  │  │        │  └─ get.serverName.db.case.ts
│  │  │        └─ serverName.db.ts
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
│  │  │     └─ spotify.infra.ts
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
│  │  │  │  ├─ api.errors.ts
│  │  │  │  ├─ config.errors.ts
│  │  │  │  └─ prisma.errors.ts
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