# Angular Admin Panel with AdminLTE v3

## Description

This is a **front-end project** built using **Angular v18** and the **AdminLTE v3** template (https://adminlte.io/themes/v3).  
The project demonstrates a simple and functional **admin panel** with key features like authentication with refresh token, admin routes, CRUD template, translation, toast, and reusable components.

This front-end application is designed to work seamlessly with a REST API built using Flask, which provides the back-end services and data management. If you're interested in exploring the corresponding API, you can find it in this repo [HERE](https://github.com/tiagofranco21/flask-structure-login-mongo).

## Project Structure

```
src/
|-- app/
|   |-- core/                         # Core modules and services
|   |   |-- guards/                   # Route Guards
|   |   |   |-- auth.guard.ts         # Protects routes for authenticated users
|   |   |   |-- guest.guard.ts        # Restricts access for logged-in users
|   |   |-- interceptors/             # HTTP Interceptors
|   |   |   |-- auth.interceptor.ts   # Attaches authentication tokens to HTTP requests
|   |   |-- models/                   # Data models
|   |   |   |-- book.ts
|   |   |   |-- register.ts
|   |   |-- services/                 # Shared services
|   |   |   |-- auth.service.ts
|   |   |   |-- register.service.ts
|   |   |   |-- toast.service.ts
|   |   |   |-- translate.service.ts
|   |   |-- validators/               # Project Validators
|   |   |   |-- password-match.validator.ts
|   |-- pages/                        # Application pages
|   |   |-- auth/                     # Authentication pages
|   |   |   |-- login/
|   |   |   |-- register/
|   |   |-- dashboard/                # Admin Dashboard
|   |   |   |-- home/                 # Dashboard home
|   |   |   |-- books/                # Book management
|   |   |       |-- books-list/
|   |   |       |-- books-add/
|   |   |   |-- dashboard.component.ts # Dashboard main component
|   |   |-- home/                     # Public landing page
|   |-- shared/                       # Shared components, pipes, and utilities
|   |   |-- components/               # Reusable components
|   |   |   |-- card/                 # Card component
|   |   |   |-- dashboard/            # Dashboard layout (breadcrumb, header, sidebar, footer)
|   |   |   |-- toast/                # Toast notifications
|   |   |   |-- dynamic-table/        # Dynamic Data Table
|   |   |-- pipes/                    # Custom pipes
|   |   |   |-- translate.pipe.ts     # Translation pipe
|   |   |   |-- capitalize.pipe.ts    # Capitalize text pipe
|-- public/                           # Static assets
|   |-- i18n/                         # Translation files (JSON)
|   |-- favicon.ico                   # Project icon
|   |-- dist/                         # AdminLTE Folders
|   |-- public/                       # AdminLTE Folders
```

## Installation and Execution

### 1. Clone the Repository

```bash
git clone https://git@github.com:tiagofranco21/adminlte-angular.git
cd adminlte-angular
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
ng serve
```

### 4. Access the Application

Open your browser and navigate to:

```
http://localhost:4200
```

## Translations

Translation files are located in the **`public/i18n`** folder. Example files:

- `english.json`
- `portuguese.json`

To add a new language, create a new JSON file with the required keys and values.

## Author & Help

- [**Tiago Franco**](https://www.linkedin.com/in/tiago-sanches-franco)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
