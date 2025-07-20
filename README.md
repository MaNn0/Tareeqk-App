
# Tareeqk App – Full Setup Guide

This project includes three parts:
- Laravel + MySQL backend (`/backend`)
- Web Customer App using React + Tailwind (`/frontend`)
- Mobile Driver App using React Native + Expo (`/mobile-driver`)

---

## 🌟 Bonus Features Completed

This project includes several optional but valuable enhancements to improve usability and functionality:

- **Authentication**  
  Implemented simple login system with role-based access control for **Drivers** and **Customers**. Users can securely log in, and features are tailored based on roles.

- **Accept Request**  
  Drivers can accept towing requests. Once a request is accepted, its status updates to **"assigned"** and it becomes visible **only to the assigned driver**, ensuring clear task ownership and privacy.

- **Responsive Design**  
  The web application is fully responsive, providing an optimal user experience across all devices — desktops, tablets, and mobile phones.

- **Proper Documentation**  
  Added comprehensive README documentation covering installation, setup, usage, and detailed feature descriptions to help users and developers easily understand and run the project.

## 🧰 Prerequisites & Tools

### ✅ General Tools (Install First)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [XAMPP](https://www.apachefriends.org/index.html) (for MySQL and phpMyAdmin)
- [Composer](https://getcomposer.org/) (PHP dependency manager)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for React Native)

```bash
composer create-project laravel/laravel my-app
php artisan serve (to run laravel)
npm run dev (to run frontend)
npm install -g expo-cli (to run react native)
```

---

## 🔧 Backend (Laravel + MySQL)

### 1. Setup XAMPP & Create Database
- Open XAMPP → Start Apache and MySQL
- Visit: http://localhost/phpmyadmin
- Create a new database (e.g., `tareeqk`)

### 2. Configure `.env`
- Navigate to `/backend`
- Copy `.env.example` to `.env`
```bash
cd backend
cp .env.example .env
```

- Update DB config inside `.env`:
```env
DB_DATABASE=tareeqk
DB_USERNAME=root
DB_PASSWORD=
```

### 3. Install Dependencies & Run Migrations
```bash
composer install
php artisan key:generate
php artisan migrate
php artisan db:seed
php artisan serve
```

Your Laravel server should now be running at: http://127.0.0.1:8000

---

## 💻 Web App (React + Tailwind)

### 1. Setup
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

Web App runs at: http://localhost:5173

> Make sure your backend (Laravel) is running before testing login, etc.

---

## 📱 Mobile App (React Native + Expo)

### 1. Setup
```bash
cd mobile-driver
npm install
```

### 2. Start Expo
```bash
npx expo start
```

- Scan QR code with Expo Go on your mobile
- Or run on Android/iOS emulator

---

## 🛠 Folder Structure

```
tareeqk-app/
├── backend-web-customer/         # Laravel API and Frontend components
└── mobile-driver/   # React Native Mobile App (Driver)
```

---

## ✅ Final Checklist

- [x] XAMPP running (Apache + MySQL)
- [x] Laravel backend connected to database
- [x] React frontend connected to backend
- [x] Expo mobile app runs on device or emulator

---

## ✍️ Author
Built for **Tareeqk** company by Abdelrahman Ebied.
