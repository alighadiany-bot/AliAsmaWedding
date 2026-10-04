# سایت دعوت عروسی اسما و علی

## ۱. ویرایش اطلاعات
در `config.js` نام تالار («تالار مجلل مهر») و ساعت (از ۱۹ تا ۲۲) تنظیم شده است؛ در صورت نیاز ویرایش کنید.

## ۲. ذخیره‌ی اطلاعات (Firebase، رایگان)
1. در https://console.firebase.google.com پروژه بسازید.
2. **Firestore Database ← Create database**.
3. **Authentication ← Sign-in method ← Email/Password** را فعال کنید. در تب Users این کاربر را بسازید:
   ایمیل `admin@ali-asma.com` (یا هر ایمیل دلخواه؛ همان را در `adminEmail` فایل config.js بگذارید) و رمز **AliAsma**
4. Authentication ← Settings ← Authorized domains: `USERNAME.github.io` را اضافه کنید.
5. Project settings ← Your apps ← Web: مقادیر `firebaseConfig` را در `config.js` بگذارید.
6. Firestore ← Rules را با این جایگزین و Publish کنید:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{d}/documents {
    match /rsvps/{id} {
      allow create: if request.resource.data.keys().hasOnly(['name','attending','at'])
                    && request.resource.data.name is string && request.resource.data.name.size() < 80
                    && request.resource.data.attending is bool;
      allow read, delete: if request.auth != null;
    }
    match /messages/{id} {
      allow read: if true;
      allow create: if request.resource.data.text is string && request.resource.data.text.size() < 600
                    && request.resource.data.name is string && request.resource.data.name.size() < 60;
      allow delete: if request.auth != null;
    }
  }
}
```
رمز داشبورد در Firebase بررسی می‌شود (نه داخل کد سایت)، پس امن است. لینک داشبورد: `https://USERNAME.github.io/REPO/dashboard.html`

## ۳. گیت‌هاب
همه‌ی فایل‌ها (با پوشه‌های assets و fonts) را در یک repository آپلود کنید ← Settings ← Pages ← Deploy from a branch ← main.

بدون تنظیم Firebase، سایت در «حالت آزمایشی» است (داده‌ها فقط در همان مرورگر؛ رمز داشبورد هم AliAsma).
