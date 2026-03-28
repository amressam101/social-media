# 📱 Social Media Web Application

A feature-rich social media platform built with **Angular 20**, enabling users to create posts, interact through likes and comments, and manage their profiles with a focus on security and responsive design.

---

## ✨ Key Features

### 🔐 Authentication & Security

- User registration and login system
- Route protection using Angular Guards
- Secure HTTP request handling with Interceptors

### 📝 Post Management

- Create, update, and delete posts
- Real-time post feed
- View detailed post information

### 💬 Engagement & Interaction

- Comment on posts
- Edit and delete your own comments
- View all comments on any post
- User mentions and interactions

### 👤 User Profile

- View and edit profile information
- Upload and update profile photo
- View followers and following lists
- Personalized user dashboard

### 🔔 Notifications

- Real-time notification system
- Unread notification indicators

### ⚙️ Account Settings

- Change password functionality

### 🎨 UI/UX

- Fully responsive design (mobile, tablet, desktop)
- Modern and clean interface
- Toast notifications for user actions (ngx-toastr)

---

## 🛠️ Tech Stack

| Technology       | Version | Purpose                     |
| ---------------- | ------- | --------------------------- |
| **Angular**      | 20.x    | Frontend framework          |
| **TypeScript**   | Latest  | Type-safe JavaScript        |
| **Tailwind CSS** | Latest  | Utility-first CSS framework |
| **ngx-toastr**   | Latest  | Toast notifications         |
| **Font Awesome** | Latest  | Icon library                |
| **Flowbite**     | Latest  | Tailwind components         |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Angular CLI (`npm install -g @angular/cli`)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amressam101/social-media.git
   cd social-media
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   ng serve
   ```

4. **Open your browser:**
   ```
   http://localhost:4200/
   ```

---

## 📂 Project Structure

```bash
src/
├── app/
│   ├── core/                    # Core module (singleton services)
│   │   ├── auth/                # Authentication logic
│   │   ├── guards/              # Route guards (auth-guard, no-auth-guard)
│   │   ├── interceptors/        # HTTP interceptors (auth, error, loading)
│   │   ├── layouts/             # Layout components (auth-layout, blank-layout)
│   │   ├── models/              # TypeScript interfaces & models
│   │   └── services/            # API services (auth, posts, comments, users)
│   │
│   ├── features/                # Feature modules (lazy-loaded)
│   │   ├── home/                # Home page with post feed
│   │   ├── profile/             # User profile page
│   │   ├── settings/            # Account settings
│   │   ├── notifications/       # Notifications center
│   │   ├── post-details/        # Single post view
│   │   ├── all-suggested-friends/  # Friend suggestions
│   │   ├── unread-notification/ # Unread notifications
│   │   └── not-found/           # 404 page
│   │
│   ├── shared/                  # Shared module (reusable components)
│   │   ├── components/
│   │   │   ├── navbar/          # Top navigation bar
│   │   │   ├── side-nav/        # Sidebar navigation
│   │   │   ├── create-post/     # Post creation form
│   │   │   ├── feed-post/       # Post feed list
│   │   │   ├── single-post/     # Individual post card
│   │   │   ├── comments/        # Comments section
│   │   │   ├── saved-posts/     # Saved posts list
│   │   │   ├── suggested-friends/  # Friend suggestions widget
│   │   │   └── community/       # Community features
│   │   ├── directives/          # Custom Angular directives
│   │   └── pipes/               # Custom Angular pipes
│   │
│   ├── app.routes.ts            # Application routing
│   ├── app.config.ts            # App configuration
│   ├── app.component.ts         # Root component
│   └── app.component.html       # Root template
│
├── environments/                # Environment configurations
│   ├── environment.ts           # Development environment
│   └── environment.prod.ts      # Production environment
│
├── assets/                      # Static assets (images, fonts)
├── index.html                   # Main HTML file
├── main.ts                      # Application entry point
└── styles.css                   # Global styles
```

---

## 🏗️ Architecture & Design Patterns

### Core Principles

- **Modular Architecture**: Separation into Core, Shared, and Feature modules
- **Lazy Loading**: Feature modules loaded on-demand for better performance
- **Separation of Concerns**: Clear distinction between smart and presentational components
- **Dependency Injection**: Angular's DI system for service management
- **Reactive Programming**: RxJS for asynchronous operations

### Security Implementation

- **HTTP Interceptors**: Automatic token injection and error handling
- **Route Guards**: Prevent unauthorized access to protected routes
- **JWT Authentication**: Secure token-based authentication
- **XSS Protection**: Input sanitization and validation

---

## 🌐 Live Demo

🔗 **[View Live Application](https://social-media-phi-wheat.vercel.app/)**

---

## 📝 API Integration

This application integrates with a RESTful backend API. Key endpoints include:

- `POST /auth/login` - User authentication
- `POST /auth/register` - User registration
- `GET /posts` - Fetch all posts
- `POST /posts` - Create new post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post
- `POST /posts/:id/comments` - Add comment
- `GET /notifications` - Fetch notifications

---

## 👨‍💻 Developer

**Amr Essam**

- GitHub: [@amressam101](https://github.com/amressam101)
- Project Link: [https://github.com/amressam101/social-media](https://github.com/amressam101/social-media)
