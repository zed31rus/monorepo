
```
monorepo
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
│  │  │  ├─ generated
│  │  │  │  └─ prisma
│  │  │  │     ├─ browser.ts
│  │  │  │     ├─ client.ts
│  │  │  │     ├─ commonInputTypes.ts
│  │  │  │     ├─ enums.ts
│  │  │  │     ├─ internal
│  │  │  │     │  ├─ class.ts
│  │  │  │     │  ├─ prismaNamespace.ts
│  │  │  │     │  └─ prismaNamespaceBrowser.ts
│  │  │  │     ├─ models
│  │  │  │     │  ├─ OauthAccount.ts
│  │  │  │     │  ├─ RefreshToken.ts
│  │  │  │     │  ├─ User.ts
│  │  │  │     │  └─ VerificationCode.ts
│  │  │  │     └─ models.ts
│  │  │  ├─ managers
│  │  │  │  ├─ otp.manager.ts
│  │  │  │  └─ session.manager.ts
│  │  │  ├─ prisma
│  │  │  │  └─ migrations
│  │  │  │     ├─ 20260121195853_base
│  │  │  │     │  └─ migration.sql
│  │  │  │     ├─ 20260123151148_verification_codes
│  │  │  │     │  └─ migration.sql
│  │  │  │     ├─ 20260123224904_uuid
│  │  │  │     │  └─ migration.sql
│  │  │  │     ├─ 20260124020639_allow_user_find
│  │  │  │     │  └─ migration.sql
│  │  │  │     ├─ 20260127014001_creted
│  │  │  │     │  └─ migration.sql
│  │  │  │     ├─ 20260202131407_uuid
│  │  │  │     │  └─ migration.sql
│  │  │  │     ├─ 20260202211948_unique_provider_user_uuid
│  │  │  │     │  └─ migration.sql
│  │  │  │     ├─ 20260202212725
│  │  │  │     │  └─ migration.sql
│  │  │  │     └─ migration_lock.toml
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
│  │     │  ├─ manager.base.ts
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
│  │     │  ├─ account.module.ts
│  │     │  ├─ auth.module.ts
│  │     │  ├─ me.module.ts
│  │     │  ├─ oauth
│  │     │  │  └─ discord.oauth.module.ts
│  │     │  └─ users.module.ts
│  │     ├─ openapi
│  │     │  ├─ account.openapi.ts
│  │     │  ├─ auth.openapi.ts
│  │     │  ├─ me.openapi.ts
│  │     │  ├─ oauth
│  │     │  │  └─ discord.oauth.openapi.ts
│  │     │  └─ users.openapi.ts
│  │     ├─ servers
│  │     │  └─ main.server.ts
│  │     ├─ types
│  │     │  └─ Env.d.ts
│  │     └─ wrappers
│  │        ├─ cors.wrapper.ts
│  │        ├─ rateLimiter.wrapper.ts
│  │        └─ validator.wrapper.ts
│  └─ discordBot
│     ├─ package.json
│     ├─ src
│     │  ├─ base
│     │  │  ├─ base.ts
│     │  │  └─ service.base.ts
│     │  └─ services
│     │     ├─ activity.service.ts
│     │     ├─ serverName.service.ts
│     │     ├─ soundpad.service.ts
│     │     ├─ users.service.ts
│     │     └─ voice.service.ts
│     └─ tsconfig.json
├─ base
│  ├─ index.ts
│  ├─ package.json
│  ├─ src
│  │  └─ base
│  │     └─ base.ts
│  └─ tsconfig.json
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
│  │  │  │  ├─ generated
│  │  │  │  │  └─ prisma
│  │  │  │  │     ├─ browser.ts
│  │  │  │  │     ├─ client.ts
│  │  │  │  │     ├─ commonInputTypes.ts
│  │  │  │  │     ├─ enums.ts
│  │  │  │  │     ├─ internal
│  │  │  │  │     │  ├─ class.ts
│  │  │  │  │     │  ├─ prismaNamespace.ts
│  │  │  │  │     │  └─ prismaNamespaceBrowser.ts
│  │  │  │  │     ├─ models
│  │  │  │  │     │  ├─ OauthAccount.ts
│  │  │  │  │     │  ├─ RefreshToken.ts
│  │  │  │  │     │  ├─ User.ts
│  │  │  │  │     │  └─ VerificationCode.ts
│  │  │  │  │     └─ models.ts
│  │  │  │  ├─ oauth
│  │  │  │  │  ├─ classes
│  │  │  │  │  │  ├─ createOauthAccount.ts
│  │  │  │  │  │  ├─ getOauthAccount.ts
│  │  │  │  │  │  ├─ updateOauthAccount.ts
│  │  │  │  │  │  └─ upsertOauthAccount.ts
│  │  │  │  │  └─ oauth.class.ts
│  │  │  │  ├─ refreshToken
│  │  │  │  │  ├─ classes
│  │  │  │  │  │  ├─ createRefreshToken.ts
│  │  │  │  │  │  ├─ deleteRefreshToken.ts
│  │  │  │  │  │  └─ getRefreshToken.ts
│  │  │  │  │  └─ refreshToken.class.ts
│  │  │  │  ├─ user
│  │  │  │  │  ├─ classes
│  │  │  │  │  │  ├─ createUser.ts
│  │  │  │  │  │  ├─ getUser.ts
│  │  │  │  │  │  └─ updateUser.ts
│  │  │  │  │  └─ user.class.ts
│  │  │  │  └─ verificationCode
│  │  │  │     ├─ classes
│  │  │  │     │  ├─ deleteVerificationCode.ts
│  │  │  │     │  ├─ getVerificationCode.ts
│  │  │  │     │  └─ upsertVerificationCode.ts
│  │  │  │     └─ verificationCode.class.ts
│  │  │  ├─ db.base.ts
│  │  │  ├─ db.container.ts
│  │  │  └─ discordBot
│  │  │     ├─ activityStatus
│  │  │     │  ├─ activityStatus.db.ts
│  │  │     │  └─ cases
│  │  │     │     ├─ create.activityStatus.db.case.ts
│  │  │     │     ├─ delete.activityStatus.db.case.ts
│  │  │     │     └─ get.activityStatus.db.case.ts
│  │  │     ├─ discordbot.db.ts
│  │  │     ├─ discordbot.prisma.config.ts
│  │  │     ├─ discordbot.schema.prisma
│  │  │     ├─ generated
│  │  │     │  └─ prisma
│  │  │     │     ├─ browser.ts
│  │  │     │     ├─ client.ts
│  │  │     │     ├─ commonInputTypes.ts
│  │  │     │     ├─ enums.ts
│  │  │     │     ├─ internal
│  │  │     │     │  ├─ class.ts
│  │  │     │     │  ├─ prismaNamespace.ts
│  │  │     │     │  └─ prismaNamespaceBrowser.ts
│  │  │     │     ├─ models
│  │  │     │     │  ├─ ActivityStatus.ts
│  │  │     │     │  └─ ServerName.ts
│  │  │     │     └─ models.ts
│  │  │     └─ serverName
│  │  │        ├─ cases
│  │  │        │  ├─ create.serverName.db.case.ts
│  │  │        │  ├─ delete.serverName.db.case.ts
│  │  │        │  └─ get.serverName.db.case.ts
│  │  │        └─ serverName.db.ts
│  │  └─ tsconfig.json
│  ├─ infra
│  │  ├─ index.ts
│  │  ├─ package.json
│  │  ├─ src
│  │  │  ├─ discord
│  │  │  │  └─ oauth.discord.infra.ts
│  │  │  ├─ infra.base.ts
│  │  │  ├─ infra.container.ts
│  │  │  └─ rabbitmq
│  │  │     └─ rabbitmq.infra.ts
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
   │  ├─ oauth
   │  │  └─ discord.ts
   │  ├─ oauth.ts
   │  └─ rabbitmq.ts
   └─ tsconfig.json

```