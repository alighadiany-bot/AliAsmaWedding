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
6. Firestore ← تب **Rules** ← همه‌ی متن را پاک کنید و محتوای فایل `firestore.rules` (همین پوشه) را جایگزین و **Publish** کنید. این قوانین به مهمان‌ها فقط اجازه‌ی نوشتن پیام و تأیید حضور می‌دهد؛ سنجاق، جابه‌جایی و حذف فقط برای مدیر است.

رمز داشبورد در Firebase بررسی می‌شود (نه داخل کد سایت)، پس امن است. لینک داشبورد: `https://USERNAME.github.io/REPO/dashboard.html`

## ۳. گیت‌هاب
همه‌ی فایل‌ها (با پوشه‌های assets و fonts) را در یک repository آپلود کنید ← Settings ← Pages ← Deploy from a branch ← main.

بدون تنظیم Firebase، سایت در «حالت آزمایشی» است (داده‌ها فقط در همان مرورگر؛ رمز داشبورد هم AliAsma).

## داشبورد
بعد از وصل شدن Firebase، در `/dashboard.html` با ایمیل و رمز مدیر وارد شوید: تعداد حاضرین، همه‌ی پیام‌ها، سنجاق کردن، جابه‌جایی با ▲ و ▼ و حذف. اگر بالای داشبورد «حالت آزمایشی» دیدید، یعنی `config.js` هنوز مقدار ندارد.
