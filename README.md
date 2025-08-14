# IELTS Mock Mini - Frontend

Bu loyiha **IELTS Mock Mini** platformasining frontend qismi bo‘lib, foydalanuvchilarga IELTS testlarini onlayn topshirish imkonini beradi. Frontend **React.js** va **Tailwind CSS** asosida ishlab chiqilgan va **Vercel** platformasida deploy qilingan. Backend **Render** orqali ishlaydi.

 🌐 Live Demo

- **Frontend:** [Vercel Link](https://ilets-mock-frontend-test.vercel.app/)  
- **Backend:** [Render Link](https://ielts-mock-backend-b2je.onrender.com)

🛠 Technologies Used

- **React.js** – UI yaratish uchun  
- **Tailwind CSS** – Stil va dizayn  
- **Vite** – Build tool va dev server  
- **Axios / Fetch** – Backend API bilan bog‘lanish uchun

  📊 UML Diagram
<img width="1536" height="1024" alt="Ielts uml" src="https://github.com/user-attachments/assets/7a0eb112-931b-44fc-addb-2a35f50c4d4a" />


Frontend backend bilan ulanadi. `src/config.js` yoki API faylida quyidagicha o‘rnatiladi:

```js
const API_BASE = "https://ielts-mock-backend-b2je.onrender.com";
export default API_BASE;
📌 Features
✅ Testni boshlash
✅ Tasodifiy savollar
✅ 10 daqiqalik taymer
✅ Foydalanuvchi javoblari va yakuniy natija
Eslatma: Admin panel front-end qismi hozircha yaratilmagan, lekin backend API orqali savollarni qo‘shish, tahrirlash va o‘chirish mumkin.

🚀 Installation
cd frontend
npm install
npm run dev
