
```structure
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
│  │  │  │        ├─ Controllers
│  │  │  │        │  ├─ Auth.cs
│  │  │  │        │  ├─ Me.cs
│  │  │  │        │  └─ Users.cs
│  │  │  │        ├─ Exceptions
│  │  │  │        │  └─ Business.cs
│  │  │  │        ├─ Extensions
│  │  │  │        │  └─ DI
│  │  │  │        │     └─ Manager.cs
│  │  │  │        ├─ Handlers
│  │  │  │        │  └─ Exception.cs
│  │  │  │        ├─ Managers
│  │  │  │        │  └─ Session.cs
│  │  │  │        ├─ Middlewares
│  │  │  │        │  ├─ Authentication.cs
│  │  │  │        │  ├─ Authorization.cs
│  │  │  │        │  └─ RateLimiter.cs
│  │  │  │        ├─ Openapi
│  │  │  │        │  └─ v1.json
│  │  │  │        ├─ Properties
│  │  │  │        │  └─ launchSettings.json
│  │  │  │        ├─ Transformers
│  │  │  │        │  ├─ BearerSecurity.cs
│  │  │  │        │  ├─ ErrorResponses.cs
│  │  │  │        │  └─ LowercaseParameter.cs
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
│  │  │     ├─ Core.csproj
│  │  │     ├─ Exceptions
│  │  │     │  └─ Business.cs
│  │  │     ├─ Extensions
│  │  │     │  ├─ DI
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
│  │  │     ├─ Permissions
│  │  │     │  ├─ Confirmation.cs
│  │  │     │  ├─ Me.cs
│  │  │     │  └─ Users.cs
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
│  │     ├─ Program.cs
│  │     └─ Util.csproj
│  ├─ Directory.Build.props
│  ├─ Directory.Packages.props
│  ├─ Infra
│  │  └─ Clients
│  │     └─ Generated
│  │        ├─ kiota-lock.json
│  │        └─ Zed31rus
│  │           └─ Infra
│  │              └─ Clients
│  │                 └─ Auth
│  │                    ├─ Auth
│  │                    │  ├─ AuthRequestBuilder.cs
│  │                    │  ├─ Login
│  │                    │  │  ├─ LoginRequestBuilder.cs
│  │                    │  │  ├─ LoginResponse429Error.cs
│  │                    │  │  └─ LoginResponse500Error.cs
│  │                    │  ├─ Logout
│  │                    │  │  ├─ Logout429Error.cs
│  │                    │  │  ├─ Logout500Error.cs
│  │                    │  │  └─ LogoutRequestBuilder.cs
│  │                    │  ├─ Refresh
│  │                    │  │  ├─ RefreshRequestBuilder.cs
│  │                    │  │  ├─ RefreshResponse429Error.cs
│  │                    │  │  └─ RefreshResponse500Error.cs
│  │                    │  └─ Register
│  │                    │     ├─ PublicUser429Error.cs
│  │                    │     ├─ PublicUser500Error.cs
│  │                    │     └─ RegisterRequestBuilder.cs
│  │                    ├─ AuthHttpClient.cs
│  │                    ├─ Me
│  │                    │  ├─ Get
│  │                    │  │  ├─ GetRequestBuilder.cs
│  │                    │  │  ├─ PersonalUser401Error.cs
│  │                    │  │  ├─ PersonalUser403Error.cs
│  │                    │  │  ├─ PersonalUser429Error.cs
│  │                    │  │  └─ PersonalUser500Error.cs
│  │                    │  ├─ MeRequestBuilder.cs
│  │                    │  └─ Update
│  │                    │     ├─ EmailFind
│  │                    │     │  ├─ EmailFindRequestBuilder.cs
│  │                    │     │  ├─ PersonalUser401Error.cs
│  │                    │     │  ├─ PersonalUser403Error.cs
│  │                    │     │  ├─ PersonalUser429Error.cs
│  │                    │     │  └─ PersonalUser500Error.cs
│  │                    │     ├─ LoginFind
│  │                    │     │  ├─ LoginFindRequestBuilder.cs
│  │                    │     │  ├─ PersonalUser401Error.cs
│  │                    │     │  ├─ PersonalUser403Error.cs
│  │                    │     │  ├─ PersonalUser429Error.cs
│  │                    │     │  └─ PersonalUser500Error.cs
│  │                    │     ├─ Nickname
│  │                    │     │  ├─ NicknameRequestBuilder.cs
│  │                    │     │  ├─ PersonalUser401Error.cs
│  │                    │     │  ├─ PersonalUser403Error.cs
│  │                    │     │  ├─ PersonalUser429Error.cs
│  │                    │     │  └─ PersonalUser500Error.cs
│  │                    │     └─ UpdateRequestBuilder.cs
│  │                    ├─ Models
│  │                    │  ├─ LoginRequest.cs
│  │                    │  ├─ LoginResponse.cs
│  │                    │  ├─ PersonalUser.cs
│  │                    │  ├─ ProblemDetails.cs
│  │                    │  ├─ PublicUser.cs
│  │                    │  ├─ RefreshResponse.cs
│  │                    │  ├─ RegisterRequest.cs
│  │                    │  ├─ UpdateEmailFindRequest.cs
│  │                    │  ├─ UpdateLoginFindRequest.cs
│  │                    │  └─ UpdateNicknameRequest.cs
│  │                    └─ Users
│  │                       ├─ Get
│  │                       │  ├─ Email
│  │                       │  │  ├─ EmailRequestBuilder.cs
│  │                       │  │  ├─ PublicUser401Error.cs
│  │                       │  │  ├─ PublicUser403Error.cs
│  │                       │  │  ├─ PublicUser429Error.cs
│  │                       │  │  └─ PublicUser500Error.cs
│  │                       │  ├─ GetRequestBuilder.cs
│  │                       │  ├─ Login
│  │                       │  │  ├─ LoginRequestBuilder.cs
│  │                       │  │  ├─ PublicUser401Error.cs
│  │                       │  │  ├─ PublicUser403Error.cs
│  │                       │  │  ├─ PublicUser429Error.cs
│  │                       │  │  └─ PublicUser500Error.cs
│  │                       │  ├─ Nickname
│  │                       │  │  ├─ NicknameRequestBuilder.cs
│  │                       │  │  ├─ PublicUser401Error.cs
│  │                       │  │  ├─ PublicUser403Error.cs
│  │                       │  │  ├─ PublicUser429Error.cs
│  │                       │  │  └─ PublicUser500Error.cs
│  │                       │  └─ Uuid
│  │                       │     ├─ PublicUser401Error.cs
│  │                       │     ├─ PublicUser403Error.cs
│  │                       │     ├─ PublicUser429Error.cs
│  │                       │     ├─ PublicUser500Error.cs
│  │                       │     └─ UuidRequestBuilder.cs
│  │                       └─ UsersRequestBuilder.cs
│  ├─ Monorepo.slnx
│  ├─ Options
│  │  ├─ Auth
│  │  │  ├─ Auth.csproj
│  │  │  ├─ Extensions
│  │  │  │  └─ DI
│  │  │  │     └─ Use.cs
│  │  │  └─ Options
│  │  │     ├─ Auth.cs
│  │  │     ├─ Connection.cs
│  │  │     ├─ Jwt.cs
│  │  │     └─ Session.cs
│  │  └─ Mail
│  │     ├─ Mail.csproj
│  │     └─ Options
│  │        └─ Smtp.cs
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
│  │  │     ├─ Dto
│  │  │     │  └─ User
│  │  │     │     ├─ MappingExtensions.cs
│  │  │     │     └─ Models.cs
│  │  │     ├─ Migrations
│  │  │     │  ├─ 20261101071750_Initial.cs
│  │  │     │  ├─ 20261101071750_Initial.Designer.cs
│  │  │     │  └─ AuthDbContextModelSnapshot.cs
│  │  │     ├─ Models
│  │  │     │  ├─ OauthAccount.cs
│  │  │     │  ├─ RefreshToken.cs
│  │  │     │  ├─ User.cs
│  │  │     │  └─ VerificationCode.cs
│  │  │     └─ ServiceExtensions.cs
│  │  ├─ Infra
│  │  │  ├─ Clients
│  │  │  └─ Infra.csproj
│  │  └─ Libs
│  │     ├─ DI
│  │     │  └─ Extensions
│  │     │     ├─ Hash.cs
│  │     │     └─ Tokens.cs
│  │     ├─ Hash
│  │     │  ├─ Argon2.cs
│  │     │  └─ Sha256.cs
│  │     ├─ Libs.csproj
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
│     ├─ Path.cs
│     └─ Shared.csproj
├─ eslint.config.ts
├─ LICENSE
├─ README.md
└─ ts
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
   │  │  │  ├─ services
   │  │  │  │  ├─ account.ts
   │  │  │  │  ├─ auth.ts
   │  │  │  │  ├─ me.ts
   │  │  │  │  ├─ oauth
   │  │  │  │  │  └─ discord.ts
   │  │  │  │  └─ users.ts
   │  │  │  └─ types
   │  │  │     └─ account.ts
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
   │  │     │  └─ error.ts
   │  │     ├─ managers
   │  │     │  └─ session.ts
   │  │     ├─ middleware
   │  │     │  └─ auth.ts
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
   │  │  │  └─ robots.txt
   │  │  ├─ README.md
   │  │  └─ tsconfig.json
   │  ├─ mail
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
   │  │  │  │  ├─ features
   │  │  │  │  │  ├─ cases
   │  │  │  │  │  │  ├─ settings.ts
   │  │  │  │  │  │  └─ status.ts
   │  │  │  │  │  └─ features.ts
   │  │  │  │  ├─ guilds
   │  │  │  │  │  ├─ cases
   │  │  │  │  │  │  ├─ create.ts
   │  │  │  │  │  │  ├─ delete.ts
   │  │  │  │  │  │  └─ get.ts
   │  │  │  │  │  └─ guilds.ts
   │  │  │  │  └─ schema.prisma
   │  │  │  ├─ spotify
   │  │  │  │  ├─ config.ts
   │  │  │  │  ├─ dailyTrack
   │  │  │  │  │  ├─ cases
   │  │  │  │  │  │  ├─ get.ts
   │  │  │  │  │  │  └─ upsert.ts
   │  │  │  │  │  └─ dailyTrack.ts
   │  │  │  │  ├─ db.ts
   │  │  │  │  └─ schema.prisma
   │  │  │  └─ types
   │  │  │     └─ declarations.ts
   │  │  └─ tsconfig.json
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
   │  ├─ libs
   │  │  ├─ index.ts
   │  │  ├─ package.json
   │  │  ├─ src
   │  │  │  ├─ base.ts
   │  │  │  ├─ container.ts
   │  │  │  └─ libs
   │  │  │     ├─ hash
   │  │  │     │  └─ hash.ts
   │  │  │     ├─ i18n
   │  │  │     │  └─ i18n.ts
   │  │  │     ├─ jwt
   │  │  │     │  └─ jwt.ts
   │  │  │     ├─ mail
   │  │  │     │  └─ mail.ts
   │  │  │     ├─ refreshToken
   │  │  │     │  └─ refreshToken.ts
   │  │  │     └─ verificationCode
   │  │  │        └─ verificationCode.ts
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