# TransportationApp

A .NET 9 web application for managing transportation routes and fleet data, combining Razor Pages for management views with a minimal ASP.NET Core API for CRUD operations.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Complete Project Structure](#-complete-project-structure)
- [Architecture / Backend Documentation](#️-architecture--backend-documentation)
- [Installation](#-installation)
- [Environment Variables & Configuration](#️-environment-variables--configuration)
- [Database Documentation](#️-database-documentation)
- [Usage](#-usage)
- [API Endpoints](#-api-endpoints)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License & Contact](#-license--contact)

---

## 🎯 Features

### 🚚 Core Features
- CRUD operations for transportation **Routes**
- CRUD operations for **Fleet** vehicles
- Dashboard summary of routes and fleet status
- Route-to-fleet association by `RouteId`

### 🧩 Web UI
- Razor Pages for dashboard, routes management, and fleet management
- Bootstrap-powered modal forms for adding routes and fleet entries
- Responsive navigation and table views

### 📡 API
- Minimal ASP.NET Core HTTP endpoints
- Swagger/OpenAPI developer UI in development mode

### 🗃️ Data Management
- SQLite database storage via Entity Framework Core
- Data access layer via `TransportationContext` and `DbOperations`

---

## 🛠️ Tech Stack

### Backend Technologies

| Component | Technology | Version | Purpose |
|---|---|---|---|
| .NET SDK | ASP.NET Core | net9.0 | Web application runtime |
| ORM | Entity Framework Core | 9.0.6 | Database access |
| Database Provider | SQLite | 9.0.6 | Local database storage |
| API Documentation | NSwag.AspNetCore | 14.4.0 | Swagger/OpenAPI support |

### Frontend Technologies

| Component | Technology | Version | Purpose |
|---|---|---|---|
| UI Framework | Bootstrap | 5.3.0 | UI styling and responsive layout |
| Icons | Boxicons | 2.1.4 | Navigation and dashboard icons |
| Static HTML/JS | Vanilla JavaScript | N/A | Client-side UI logic for static pages |

### Database Technologies

| Component | Technology | Version | Purpose |
|---|---|---|---|
| Database | SQLite | N/A | Embedded relational database |
| EF Core Context | `TransportationContext` | N/A | Model-to-database mapping |

### Key Dependencies / Packages

| Component | Package | Version | Purpose |
|---|---|---|---|
| Entity Framework Core | Microsoft.EntityFrameworkCore.Sqlite | 9.0.6 | SQLite provider |
| EF Core Tools | Microsoft.EntityFrameworkCore.Tools | 9.0.6 | Migrations and tooling |
| EF Core Diagnostics | Microsoft.AspNetCore.Diagnostics.EntityFrameworkCore | 9.0.5 | EF exceptions diagnostics |
| Swagger | NSwag.AspNetCore | 14.4.0 | API documentation UI |

### External APIs / Services

| Component | Technology | Purpose |
|---|---|---|
| None | Not applicable | No external API integrations found |

### Development Tools

| Component | Technology | Purpose |
|---|---|---|
| IDE Support | Visual Studio / VS Code | Project authoring |
| Project File | `.csproj` | .NET build configuration |
| Solution | `.sln` | Solution entry point |

---

## 📁 Complete Project Structure

```
Transportation-App/
├── .github/                          # GitHub metadata (workflow files if present)
├── .vscode/                          # VS Code editor settings
├── App.razor                         # Blazor app root (unused / empty)
├── Program.cs                        # ASP.NET Core minimal API startup
├── appsettings.json                  # Default application configuration
├── appsettings.Development.json      # Development logging config
├── DbOperations.cs                   # Static CRUD helper for Route entities
├── Fleet.cs                          # Fleet entity model
├── Model.cs                          # Unused model file
├── Route.cs                          # Route entity model
├── TransportationApp.csproj          # .NET project manifest
├── TransportationApp.sln             # Solution file
├── TransportationContext.cs          # EF Core SQLite DbContext
├── TransportationDb.cs               # Alternate DbContext definition (unused)
├── LICENSE                           # Project license file
│
├── Pages/                            # Razor Pages and page models
│   ├── Index.cshtml                  # Dashboard page markup
│   ├── Index.cshtml.cs               # Dashboard page model
│   ├── Fleet.cshtml                  # Fleet page markup
│   ├── Fleet.cshtml.cs               # Fleet page model
│   ├── Routes.cshtml                 # Routes page markup
│   ├── Routes.cshtml.cs              # Routes page model
│   └── _ViewStart.cshtml             # Razor view start file
│
├── Properties/
│   └── launchSettings.json           # Development launch profile
│
├── Shared/                           # Shared UI components
│   ├── MainLayout.razor              # Layout (empty/unused)
│   └── NavMenu.razor                 # Navigation menu (empty/unused)
│
└── wwwroot/                          # Static web assets
    ├── index.html                    # Static dashboard page
    ├── fleet.html                    # Static fleet management page
    ├── route.html                    # Static routes management page
    ├── css/                          # Static stylesheets
    │   ├── site.css
    │   └── style.css
    └── js/                           # Static front-end scripts
        ├── dashboard.js
        ├── fleet.js
        └── route.js
```

### Folder & File Reference Table

| Path | Purpose |
|---|---|
| `Program.cs` | Application startup and endpoint definitions |
| `TransportationApp.csproj` | .NET build and package references |
| `DbOperations.cs` | Static helpers for route CRUD through `TransportationContext` |
| `TransportationContext.cs` | EF Core SQLite database context |
| `TransportationDb.cs` | Alternate DbContext type; no runtime registration |
| `Route.cs` | Domain model for routes |
| `Fleet.cs` | Domain model for fleet vehicles |
| `Pages/Index.cshtml` | Dashboard Razor Page markup |
| `Pages/Index.cshtml.cs` | Dashboard page model and data loading |
| `Pages/Fleet.cshtml` | Fleet management UI markup |
| `Pages/Fleet.cshtml.cs` | Fleet page model and form handling |
| `Pages/Routes.cshtml` | Routes management UI markup |
| `Pages/Routes.cshtml.cs` | Routes page model and form handling |
| `wwwroot/index.html` | Static dashboard page content |
| `wwwroot/fleet.html` | Static fleet management page content |
| `wwwroot/route.html` | Static routes management page content |
| `wwwroot/css/style.css` | Static site styling |
| `wwwroot/js/*.js` | Client-side page interactions |
| `appsettings.json` | Default app configuration |
| `appsettings.Development.json` | Development logging settings |
| `LICENSE` | Project license text |

---

## 🏗️ Architecture / Backend Documentation

The application is built as a single ASP.NET Core Web application targeting **net9.0**.

- It uses a **minimal API** pattern in `Program.cs` for HTTP routes.
- It also includes **Razor Pages** under `Pages/` for server-rendered management UI.
- Data access is provided through **Entity Framework Core** and **SQLite**.
- `TransportationContext` configures a SQLite file in the host's local application data folder.
- `DbOperations` provides static route CRUD routines; Razor Pages use `TransportationContext` directly.
- No authentication or authorization middleware is configured.
- Swagger/OpenAPI is enabled in development mode using NSwag.

### Request Flow

1. The app starts in `Program.cs`.
2. EF Core is configured in `TransportationContext`.
3. Minimal API routes are mapped directly to `DbOperations`.
4. Razor Pages load data through `TransportationContext` and persist entities by saving changes.
5. UI and static assets are served from `wwwroot`.

> ⚠️ **Note:** `Model.cs`, `TransportationDb.cs`, `App.razor`, `Shared/MainLayout.razor`, and `Shared/NavMenu.razor` exist in the codebase but are currently unused/empty and not wired into the running application.

---

## 📥 Installation

### Prerequisites
- **.NET 9 SDK** ([download](https://dotnet.microsoft.com/download/dotnet/9.0))
- A code editor such as **Visual Studio** or **Visual Studio Code**
- The `dotnet` CLI (included with the .NET SDK)

### Setup Steps

#### Step 1: Clone the Repository

```bash
git clone https://github.com/<your-username>/Transportation-App.git
cd Transportation-App
```

#### Step 2: Restore NuGet Packages

```bash
dotnet restore
```

#### Step 3: Configure Settings

No custom configuration is required for default operation — the app runs out of the box using the default `appsettings.json` and an auto-created local SQLite database.

#### Step 4: Build the Project

```bash
dotnet build
```

#### Step 5: Run the Application

```bash
dotnet run
```

#### Step 6: Access the Application

- **Web UI**: `https://localhost:5001` or `http://localhost:5000`
- **API Swagger UI** (development mode only): `https://localhost:5001/swagger`

---

## ⚙️ Environment Variables & Configuration

| Key | File | Type | Purpose | Default | Required |
|---|---|---|---|---|---|
| `Logging:LogLevel:Default` | `appsettings.json` | string | Default ASP.NET Core log level | `Information` | Optional |
| `Logging:LogLevel:Microsoft.AspNetCore` | `appsettings.json` | string | ASP.NET Core framework log level | `Warning` | Optional |
| `AllowedHosts` | `appsettings.json` | string | Host filtering | `*` | Optional |

> No `.env` file or environment-specific connection string configuration was found in the repository.

### Example `appsettings.json`

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

## 🗄️ Database Documentation

- **Provider**: SQLite
- **EF Core context**: `TransportationContext`
- **Database file path**: `[LocalApplicationData]/Transportation.db`
- **Tables**:
  - `Routes`
  - `Fleets`
- **Relationships**:
  - `Fleet.RouteId` references a route identifier; no explicit EF relationship (foreign key constraint) is configured.
- **Initialization**:
  - The database is created automatically by EF Core when `TransportationContext` is first used and the SQLite file does not already exist.
- **Migrations**:
  - No migrations folder or migration commands are present in the repository. The schema is generated directly from the EF Core model.

---

## 🚀 Usage

### Web UI
- The **Index** dashboard lists routes and fleet summaries.
- The **Routes** page allows adding new routes and deleting existing ones.
- The **Fleet** page allows adding new fleet entries and deleting existing ones.

> Editing controls are present in the UI but edit functionality is not implemented in the page handlers.

### API
Use the minimal API endpoints directly for programmatic route management. Route CRUD operations are available via standard HTTP methods (see [API Endpoints](#-api-endpoints) below).

---

## 📡 API Endpoints

| HTTP Method | Route | Description | Request Body | Response | Auth |
|---|---|---|---|---|---|
| GET | `/` | Returns a simple "Hello World!" response | None | `string` | None |
| POST | `/CreateRoute` | Creates a new route | Route JSON | Created `Route` | None |
| GET | `/GetRoute` | Returns all routes | None | `List<Route>` | None |
| DELETE | `/RemoveRoute/{id}` | Deletes a route by id | None | Deleted `Route` or `null` | None |
| PUT | `/UpdateRoute/{id}` | Updates a route's name by id | Route JSON | Updated `Route` or `null` | None |

> ⚠️ **Known issue**: The `GET` route is currently defined as `"/GetRoute "` (with a trailing space) in `Program.cs`, which may affect routing behavior and should be fixed.

---

## 🧪 Testing

- No test project or test files were found in the repository.
- No test commands are currently documented.
- Recommended: add an `xUnit`/`NUnit` test project (e.g., `TransportationApp.Tests`) covering `DbOperations` and the minimal API endpoints.

---

## 🚢 Deployment

- No Dockerfile, Docker Compose file, GitHub Actions workflow, or other CI/CD configuration was found in the repository.
- To deploy, use standard ASP.NET Core hosting options:

```bash
dotnet publish -c Release -o ./publish
```

- Host the published output on **IIS**, **Azure App Service**, or a **Linux container**, as preferred.

---

## 📄 License & Contact

### License

A `LICENSE` file is present in the repository root. Refer to it for the full license text and terms.

### Contact & Author

**Project**: TransportationApp — Route & Fleet Management System

**Author / Maintainer**: _Not specified_

**Email**: _[Add contact email here]_

**Repository**: _[Add repository URL here]_

For questions, bug reports, or feature requests, please open an **Issue** on the GitHub repository.