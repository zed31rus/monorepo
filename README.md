
```
monorepo
├─ .dockerignore
├─ .prettierrc
├─ compose.yaml
├─ dotnet
│  ├─ Apps
│  │  ├─ Authorization
│  │  │  ├─ Clients
│  │  │  │  └─ External
│  │  │  │     └─ Web
│  │  │  │        ├─ appsettings.json
│  │  │  │        ├─ Attributes
│  │  │  │        │  └─ Manager.cs
│  │  │  │        ├─ Exceptions
│  │  │  │        │  └─ Business.cs
│  │  │  │        ├─ Extensions
│  │  │  │        │  └─ DI
│  │  │  │        │     └─ Manager.cs
│  │  │  │        ├─ Features
│  │  │  │        │  ├─ Auth
│  │  │  │        │  │  ├─ Controller.cs
│  │  │  │        │  │  ├─ Dto.cs
│  │  │  │        │  │  ├─ Routes.cs
│  │  │  │        │  │  └─ Validator.cs
│  │  │  │        │  ├─ Me
│  │  │  │        │  │  ├─ Controller.cs
│  │  │  │        │  │  ├─ Dto.cs
│  │  │  │        │  │  ├─ Routes.cs
│  │  │  │        │  │  └─ Validator.cs
│  │  │  │        │  └─ Users
│  │  │  │        │     ├─ Controller.cs
│  │  │  │        │     ├─ Dto.cs
│  │  │  │        │     ├─ Routes.cs
│  │  │  │        │     └─ Validator.cs
│  │  │  │        ├─ Filters
│  │  │  │        │  └─ Validation.cs
│  │  │  │        ├─ Handlers
│  │  │  │        │  └─ Exception.cs
│  │  │  │        ├─ Managers
│  │  │  │        │  └─ Session.cs
│  │  │  │        ├─ Middlewares
│  │  │  │        │  ├─ Authentication.cs
│  │  │  │        │  ├─ Authorization.cs
│  │  │  │        │  ├─ Cors.cs
│  │  │  │        │  └─ RateLimiter.cs
│  │  │  │        ├─ Openapi
│  │  │  │        │  ├─ Add.cs
│  │  │  │        │  └─ Specifications
│  │  │  │        │     └─ v1.json
│  │  │  │        ├─ packages.lock.json
│  │  │  │        ├─ Properties
│  │  │  │        │  └─ launchSettings.json
│  │  │  │        ├─ Transformers
│  │  │  │        │  ├─ BearerSecurity.cs
│  │  │  │        │  └─ ErrorResponses.cs
│  │  │  │        ├─ Validators
│  │  │  │        │  └─ Rules
│  │  │  │        │     └─ User.cs
│  │  │  │        ├─ WebExternalClient.cs
│  │  │  │        └─ WebExternalClient.csproj
│  │  │  └─ Core
│  │  │     ├─ Attributes
│  │  │     │  ├─ Handler.cs
│  │  │     │  ├─ Manager.cs
│  │  │     │  ├─ Permission.cs
│  │  │     │  ├─ Role.cs
│  │  │     │  └─ Service.cs
│  │  │     ├─ Base
│  │  │     │  ├─ Permission.cs
│  │  │     │  └─ Role.cs
│  │  │     ├─ Constants
│  │  │     │  └─ Oauth.cs
│  │  │     ├─ Core.csproj
│  │  │     ├─ Dto
│  │  │     │  └─ User
│  │  │     │     ├─ MappingExtensions.cs
│  │  │     │     └─ Models.cs
│  │  │     ├─ Exceptions
│  │  │     │  └─ Business.cs
│  │  │     ├─ Extensions
│  │  │     │  ├─ DI
│  │  │     │  │  ├─ Constants.cs
│  │  │     │  │  ├─ ExternalUse.cs
│  │  │     │  │  ├─ Handlers.cs
│  │  │     │  │  ├─ Managers.cs
│  │  │     │  │  ├─ Permissions.cs
│  │  │     │  │  ├─ Roles.cs
│  │  │     │  │  └─ Services.cs
│  │  │     │  ├─ Getters
│  │  │     │  │  └─ ClaimsPrincipal.cs
│  │  │     │  └─ Mappers
│  │  │     │     └─ User.cs
│  │  │     ├─ Handlers
│  │  │     │  └─ Exception.cs
│  │  │     ├─ Managers
│  │  │     │  ├─ Role.cs
│  │  │     │  └─ Session.cs
│  │  │     ├─ packages.lock.json
│  │  │     ├─ Permissions
│  │  │     │  ├─ Confirmation.cs
│  │  │     │  ├─ GetUsers.cs
│  │  │     │  └─ Me.cs
│  │  │     ├─ Roles
│  │  │     │  ├─ Admin.cs
│  │  │     │  ├─ Confirmed.cs
│  │  │     │  ├─ Default.cs
│  │  │     │  ├─ Owner.cs
│  │  │     │  └─ Unconfirmed.cs
│  │  │     └─ Services
│  │  │        ├─ Account.cs
│  │  │        ├─ Auth.cs
│  │  │        ├─ Me.cs
│  │  │        ├─ Oauth
│  │  │        │  └─ Discord.cs
│  │  │        └─ Users.cs
│  │  └─ Util
│  │     ├─ packages.lock.json
│  │     ├─ Program.cs
│  │     └─ Util.csproj
│  ├─ Directory.Build.props
│  ├─ Directory.Packages.props
│  ├─ Monorepo.slnx
│  ├─ Options
│  │  ├─ Auth
│  │  │  ├─ Auth.csproj
│  │  │  ├─ Extensions
│  │  │  │  └─ DI
│  │  │  │     └─ Use.cs
│  │  │  ├─ Options
│  │  │  │  ├─ Auth.cs
│  │  │  │  ├─ Connection.cs
│  │  │  │  ├─ Encryption.cs
│  │  │  │  ├─ Jwt.cs
│  │  │  │  ├─ RefreshToken.cs
│  │  │  │  └─ Session.cs
│  │  │  └─ packages.lock.json
│  │  ├─ Global
│  │  │  ├─ Extensions
│  │  │  │  └─ DI
│  │  │  │     └─ Use.cs
│  │  │  ├─ Global.csproj
│  │  │  ├─ Options
│  │  │  │  └─ Domain.cs
│  │  │  └─ packages.lock.json
│  │  ├─ Infra
│  │  │  ├─ Extensions
│  │  │  │  └─ DI
│  │  │  │     └─ Use.cs
│  │  │  ├─ Infra.csproj
│  │  │  ├─ Options
│  │  │  │  └─ Discord.cs
│  │  │  └─ packages.lock.json
│  │  └─ Shared
│  │     ├─ Attributes
│  │     │  └─ Value.cs
│  │     ├─ Constants
│  │     │  └─ Value.cs
│  │     ├─ Extensions
│  │     │  └─ DI
│  │     │     └─ Use.cs
│  │     ├─ packages.lock.json
│  │     └─ Shared.csproj
│  ├─ Packages
│  │  ├─ Db
│  │  │  └─ Auth
│  │  │     ├─ AuthDb.csproj
│  │  │     ├─ Configurations
│  │  │     │  ├─ OauthAccount.cs
│  │  │     │  ├─ RefreshToken.cs
│  │  │     │  ├─ User.cs
│  │  │     │  └─ VerificationCode.cs
│  │  │     ├─ Context.cs
│  │  │     ├─ ContextFactory.cs
│  │  │     ├─ Exceptions
│  │  │     │  └─ Db.cs
│  │  │     ├─ Migrations
│  │  │     │  ├─ 20260921100226_Initial.cs
│  │  │     │  ├─ 20260921100226_Initial.Designer.cs
│  │  │     │  └─ AuthDbContextModelSnapshot.cs
│  │  │     ├─ Models
│  │  │     │  ├─ OauthAccount.cs
│  │  │     │  ├─ RefreshToken.cs
│  │  │     │  ├─ User.cs
│  │  │     │  └─ VerificationCode.cs
│  │  │     ├─ packages.lock.json
│  │  │     └─ ServiceExtensions.cs
│  │  ├─ Infra
│  │  │  ├─ Clients
│  │  │  ├─ Discord
│  │  │  │  ├─ Oauth.cs
│  │  │  │  └─ Users.cs
│  │  │  ├─ Exceptions
│  │  │  │  └─ Discord.cs
│  │  │  ├─ Extensions
│  │  │  │  └─ DI
│  │  │  │     └─ Use.cs
│  │  │  ├─ Infra.csproj
│  │  │  └─ packages.lock.json
│  │  └─ Libs
│  │     ├─ Encryption
│  │     │  └─ Aes256Gcm.cs
│  │     ├─ Extensions
│  │     │  └─ DI
│  │     │     ├─ Encryption.cs
│  │     │     ├─ Hash.cs
│  │     │     └─ Tokens.cs
│  │     ├─ Hash
│  │     │  ├─ Argon2.cs
│  │     │  └─ Sha256.cs
│  │     ├─ Libs.csproj
│  │     ├─ packages.lock.json
│  │     ├─ Proxies
│  │     │  └─ ErrorHandler.cs
│  │     ├─ Reflection
│  │     │  ├─ Attributes.cs
│  │     │  └─ Interface.cs
│  │     └─ Tokens
│  │        ├─ Hex.cs
│  │        └─ Jwt.cs
│  └─ Shared
│     ├─ Base
│     │  └─ ExceptionHandler.cs
│     ├─ packages.lock.json
│     ├─ Path.cs
│     └─ Shared.csproj
├─ eslint.config.ts
├─ LICENSE
├─ README.md
└─ ts
   ├─ apps
   │  ├─ discordBot
   │  │  ├─ core
   │  │  │  ├─ base
   │  │  │  │  ├─ bot.ts
   │  │  │  │  ├─ deployer.ts
   │  │  │  │  ├─ emitters
   │  │  │  │  │  ├─ base.ts
   │  │  │  │  │  ├─ commands
   │  │  │  │  │  │  ├─ base.ts
   │  │  │  │  │  │  └─ slash
   │  │  │  │  │  │     ├─ base.ts
   │  │  │  │  │  │     ├─ global.ts
   │  │  │  │  │  │     ├─ guild.ts
   │  │  │  │  │  │     └─ subcommand
   │  │  │  │  │  │        ├─ base.ts
   │  │  │  │  │  │        └─ guild.ts
   │  │  │  │  │  └─ event
   │  │  │  │  │     ├─ base.ts
   │  │  │  │  │     ├─ discord.ts
   │  │  │  │  │     └─ internal
   │  │  │  │  │        └─ rabbitMq.ts
   │  │  │  │  ├─ instance.ts
   │  │  │  │  ├─ manager
   │  │  │  │  │  ├─ base.ts
   │  │  │  │  │  ├─ guild.ts
   │  │  │  │  │  └─ singleton.ts
   │  │  │  │  ├─ registry.ts
   │  │  │  │  └─ service.ts
   │  │  │  ├─ containers
   │  │  │  │  ├─ deployer.ts
   │  │  │  │  ├─ emitters
   │  │  │  │  │  ├─ command
   │  │  │  │  │  │  ├─ command.ts
   │  │  │  │  │  │  ├─ subcommand.ts
   │  │  │  │  │  │  └─ subcommandGroup.ts
   │  │  │  │  │  └─ event
   │  │  │  │  │     ├─ discord.ts
   │  │  │  │  │     └─ internal
   │  │  │  │  │        └─ rabbitMq.ts
   │  │  │  │  ├─ index.ts
   │  │  │  │  ├─ instance.ts
   │  │  │  │  ├─ manager.ts
   │  │  │  │  ├─ registry.ts
   │  │  │  │  └─ service.ts
   │  │  │  ├─ deployers
   │  │  │  │  └─ command.ts
   │  │  │  ├─ emitters
   │  │  │  │  ├─ commands
   │  │  │  │  │  ├─ global
   │  │  │  │  │  │  └─ test.ts
   │  │  │  │  │  └─ guild
   │  │  │  │  │     └─ features
   │  │  │  │  │        ├─ name
   │  │  │  │  │        │  ├─ main.ts
   │  │  │  │  │        │  └─ subcommands
   │  │  │  │  │        │     └─ disable.ts
   │  │  │  │  │        └─ voice
   │  │  │  │  │           ├─ main.ts
   │  │  │  │  │           └─ subcommands
   │  │  │  │  │              ├─ configure.ts
   │  │  │  │  │              ├─ disable.ts
   │  │  │  │  │              └─ enable.ts
   │  │  │  │  └─ events
   │  │  │  │     ├─ discord
   │  │  │  │     │  └─ guild
   │  │  │  │     │     └─ voice
   │  │  │  │     │        └─ hub
   │  │  │  │     │           ├─ onConnect.ts
   │  │  │  │     │           └─ onDisconnect.ts
   │  │  │  │     └─ internal
   │  │  │  │        └─ rabbitMq
   │  │  │  │           └─ auth
   │  │  │  │              └─ from
   │  │  │  │                 └─ oauth
   │  │  │  │                    └─ registeredNewUser.ts
   │  │  │  ├─ instances
   │  │  │  │  └─ eventRouter.ts
   │  │  │  ├─ managers
   │  │  │  │  ├─ activity.ts
   │  │  │  │  └─ guild
   │  │  │  │     ├─ name.ts
   │  │  │  │     └─ voice.ts
   │  │  │  ├─ registry
   │  │  │  │  ├─ command
   │  │  │  │  │  ├─ global.ts
   │  │  │  │  │  └─ guild.ts
   │  │  │  │  └─ feature.ts
   │  │  │  └─ services
   │  │  │     └─ guild.ts
   │  │  ├─ localisations
   │  │  │  ├─ en-US.json
   │  │  │  └─ ru.json
   │  │  ├─ package.json
   │  │  ├─ start.ts
   │  │  ├─ tsconfig.json
   │  │  └─ types
   │  │     └─ localisation.d.ts
   │  ├─ frontend
   │  │  ├─ app
   │  │  │  ├─ app.vue
   │  │  │  ├─ components
   │  │  │  │  ├─ auth
   │  │  │  │  │  ├─ login.vue
   │  │  │  │  │  └─ register.vue
   │  │  │  │  ├─ defaultLayout
   │  │  │  │  │  ├─ desktop.vue
   │  │  │  │  │  └─ mobile.vue
   │  │  │  │  ├─ iframe
   │  │  │  │  │  └─ spotify
   │  │  │  │  │     ├─ desktop.vue
   │  │  │  │  │     └─ mobile.vue
   │  │  │  │  ├─ notifications
   │  │  │  │  │  ├─ area
   │  │  │  │  │  │  ├─ desktop.vue
   │  │  │  │  │  │  └─ mobile.vue
   │  │  │  │  │  ├─ desktop.vue
   │  │  │  │  │  ├─ instance
   │  │  │  │  │  │  ├─ desktop.vue
   │  │  │  │  │  │  └─ mobile.vue
   │  │  │  │  │  └─ mobile.vue
   │  │  │  │  └─ sideBar
   │  │  │  │     ├─ desktop.vue
   │  │  │  │     ├─ item.vue
   │  │  │  │     └─ mobile.vue
   │  │  │  ├─ composables
   │  │  │  │  ├─ firstTimeHook.ts
   │  │  │  │  ├─ notifications.ts
   │  │  │  │  ├─ routes.ts
   │  │  │  │  └─ typeColors.ts
   │  │  │  ├─ layouts
   │  │  │  │  └─ default.vue
   │  │  │  ├─ main.css
   │  │  │  ├─ pages
   │  │  │  │  ├─ auth
   │  │  │  │  │  ├─ desktop.vue
   │  │  │  │  │  └─ mobile.vue
   │  │  │  │  └─ index
   │  │  │  │     ├─ desktop.vue
   │  │  │  │     └─ mobile.vue
   │  │  │  ├─ stores
   │  │  │  │  ├─ notifications.ts
   │  │  │  │  ├─ title.ts
   │  │  │  │  └─ user.ts
   │  │  │  └─ types
   │  │  │     ├─ notification.ts
   │  │  │     ├─ sideBar.ts
   │  │  │     └─ user.ts
   │  │  ├─ Dockerfile
   │  │  ├─ modules
   │  │  │  └─ pagesDeviceRouter
   │  │  │     ├─ index.ts
   │  │  │     ├─ runtime
   │  │  │     │  └─ deviceRenderer.vue
   │  │  │     └─ types
   │  │  │        └─ nuxt.d.ts
   │  │  ├─ nuxt.config.ts
   │  │  ├─ package.json
   │  │  ├─ public
   │  │  │  ├─ favicon.ico
   │  │  │  ├─ resources
   │  │  │  └─ robots.txt
   │  │  ├─ README.md
   │  │  └─ tsconfig.json
   │  ├─ mail
   │  │  ├─ core
   │  │  │  ├─ manager
   │  │  │  │  └─ mail.ts
   │  │  │  └─ services
   │  │  │     └─ mail.ts
   │  │  ├─ package.json
   │  │  └─ tsconfig.json
   │  ├─ spotify
   │  │  ├─ core
   │  │  │  ├─ base
   │  │  │  │  ├─ core.ts
   │  │  │  │  ├─ emitter.ts
   │  │  │  │  ├─ instance.ts
   │  │  │  │  ├─ manager.ts
   │  │  │  │  └─ services.ts
   │  │  │  ├─ containers
   │  │  │  │  ├─ emitter.ts
   │  │  │  │  ├─ index.ts
   │  │  │  │  ├─ instances.ts
   │  │  │  │  ├─ managers.ts
   │  │  │  │  └─ services.ts
   │  │  │  ├─ emitters
   │  │  │  │  └─ schedullers
   │  │  │  │     └─ dailyTrack.ts
   │  │  │  ├─ instances
   │  │  │  │  └─ spotify.ts
   │  │  │  ├─ managers
   │  │  │  │  └─ dailyTrack.ts
   │  │  │  └─ services
   │  │  │     └─ playlist.ts
   │  │  ├─ Dockerfile
   │  │  ├─ package.json
   │  │  ├─ start.ts
   │  │  ├─ tsconfig.json
   │  │  └─ web
   │  │     ├─ base
   │  │     │  ├─ handler.ts
   │  │     │  ├─ module.ts
   │  │     │  ├─ openapi.ts
   │  │     │  ├─ server.ts
   │  │     │  ├─ web.ts
   │  │     │  └─ wrapper.ts
   │  │     ├─ containers
   │  │     │  ├─ handler.ts
   │  │     │  ├─ index.ts
   │  │     │  ├─ module.ts
   │  │     │  ├─ openapi.ts
   │  │     │  ├─ server.ts
   │  │     │  └─ wrapper.ts
   │  │     ├─ handlers
   │  │     │  └─ error.ts
   │  │     ├─ modules
   │  │     │  └─ dailyTrack.ts
   │  │     ├─ openapi
   │  │     │  └─ external
   │  │     │     └─ dailyTrack.ts
   │  │     ├─ servers
   │  │     │  ├─ external.ts
   │  │     │  └─ internal.ts
   │  │     └─ wrappers
   │  │        ├─ cors.ts
   │  │        └─ rateLimiter.ts
   │  └─ tsconfig.base.json
   ├─ base
   │  ├─ index.ts
   │  ├─ package.json
   │  ├─ src
   │  │  └─ base.ts
   │  └─ tsconfig.json
   ├─ package.json
   ├─ packages
   │  ├─ db
   │  │  ├─ discordBot
   │  │  │  ├─ activityStatus
   │  │  │  │  ├─ activityStatus.ts
   │  │  │  │  └─ cases
   │  │  │  │     ├─ create.ts
   │  │  │  │     ├─ delete.ts
   │  │  │  │     └─ get.ts
   │  │  │  ├─ config.ts
   │  │  │  ├─ db.ts
   │  │  │  ├─ features
   │  │  │  │  ├─ cases
   │  │  │  │  │  ├─ settings.ts
   │  │  │  │  │  └─ status.ts
   │  │  │  │  └─ features.ts
   │  │  │  ├─ guilds
   │  │  │  │  ├─ cases
   │  │  │  │  │  ├─ create.ts
   │  │  │  │  │  ├─ delete.ts
   │  │  │  │  │  └─ get.ts
   │  │  │  │  └─ guilds.ts
   │  │  │  ├─ package.json
   │  │  │  ├─ schema.prisma
   │  │  │  ├─ tsconfig.json
   │  │  │  └─ types
   │  │  │     └─ declarations.ts
   │  │  ├─ spotify
   │  │  │  ├─ config.ts
   │  │  │  ├─ dailyTrack
   │  │  │  │  ├─ cases
   │  │  │  │  │  ├─ get.ts
   │  │  │  │  │  └─ upsert.ts
   │  │  │  │  └─ dailyTrack.ts
   │  │  │  ├─ db.ts
   │  │  │  ├─ package.json
   │  │  │  ├─ schema.prisma
   │  │  │  └─ tsconfig.json
   │  │  └─ tsconfig.json
   │  ├─ infra
   │  │  ├─ index.ts
   │  │  ├─ package.json
   │  │  ├─ src
   │  │  │  ├─ base.ts
   │  │  │  ├─ container.ts
   │  │  │  └─ spotify
   │  │  │     └─ oauth.ts
   │  │  └─ tsconfig.json
   │  ├─ libs
   │  │  ├─ index.ts
   │  │  ├─ package.json
   │  │  ├─ src
   │  │  │  ├─ base.ts
   │  │  │  ├─ container.ts
   │  │  │  └─ libs
   │  │  │     ├─ i18n
   │  │  │     │  └─ i18n.ts
   │  │  │     └─ mail
   │  │  │        └─ mail.ts
   │  │  └─ tsconfig.json
   │  └─ tsconfig.base.json
   ├─ pnpm-lock.yaml
   ├─ pnpm-workspace.yaml
   ├─ shared
   │  ├─ config
   │  │  ├─ index.ts
   │  │  ├─ package.json
   │  │  ├─ src
   │  │  │  ├─ base.ts
   │  │  │  ├─ configs
   │  │  │  │  ├─ env.ts
   │  │  │  │  └─ path.ts
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
   │  ├─ logger
   │  │  ├─ index.ts
   │  │  ├─ package.json
   │  │  ├─ src
   │  │  │  ├─ base.ts
   │  │  │  └─ logger.ts
   │  │  └─ tsconfig.json
   │  └─ tsconfig.base.json
   ├─ tsconfig.base.json
   ├─ tsconfig.json
   └─ types
      ├─ index.ts
      ├─ package.json
      ├─ src
      │  ├─ discordBot
      │  │  └─ features.ts
      │  └─ oauth.ts
      └─ tsconfig.json

```