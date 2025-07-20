
# Tareeqk App – Full Setup Guide

This project includes three parts:
- Laravel + MySQL backend (`/backend`)
- Web Customer App using React + Tailwind (`/frontend`)
- Mobile Driver App using React Native + Expo (`/mobile-driver`)

---

## 🧰 Prerequisites & Tools

### ✅ General Tools (Install First)
- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) (LTS version recommended)
- [XAMPP](https://www.apachefriends.org/index.html) (for MySQL and phpMyAdmin)
- [Composer](https://getcomposer.org/) (PHP dependency manager)
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (for React Native)

```bash
npm install -g expo-cli
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
