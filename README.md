# Join My Trip - Client Side

Welcome to the frontend of **Join My Trip**, a modern, full-stack travel companion finding platform. This application allows users to find travel buddies, manage bookings, share travel plans, and review their experiences.

## 🚀 Live Demo

[Link to Live Demo](https://join-my-trip-client-side.vercel.app) _(Replace with actual link)_

## 🌟 Key Features

- **User Dashboard:**
  - **Manage Profile:** Update personal information and profile photo.
  - **Travel Plans:** Create, edit, and delete travel plans.
  - **Bookings:** View and manage your trip bookings.
  - **Followers/Following:** Social features to connect with other travelers.
  - **Reviews:** Give and receive reviews for completed trips.
- **Admin Dashboard:**
  - **User Management:** View all users and manage their roles/status.
  - **Travel Management:** Approve or reject travel plans.
  - **Review Management:** Monitor community feedback.
- **Advanced search & Filtering:**
  - Filter trips by budget, destination, dates, and more.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.
- **Secure Authentication:** Powered by JWT and secure cookie management.

## 🛠️ Technology Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [Shadcn/UI](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Hooks & Server State
- **Forms:** React Hook Form + Zod
- **Animations:** Framer Motion

## 📦 Prerequisites

- Node.js (v18 or higher)
- npm or yarn

## ⚙️ Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/join_my_trip_client_side.git
    cd join_my_trip_client_side
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    ```

3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add the following:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```

4.  **Run Development Server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

5.  **Build for Production:**
    ```bash
    npm run build
    npm start
    ```

## 📂 Project Structure

```bash
src/
├── app/                  # Next.js App Router pages & layouts
│   ├── (dashboardLayout) # Dashboard implementations
│   ├── (commonLayout)    # Public pages (Home, About, etc.)
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── ui/               # Shadcn UI primitives
│   └── modules/          # Feature-specific components
├── lib/                  # Utilities (utils, providers)
├── services/             # API service functions
├── types/                # TypeScript interfaces
└── styles/               # Global styles
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

## 📝 License

This project is licensed under the ISC License.
