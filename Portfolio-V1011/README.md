# محمد ياسين الزبيدي | ملف أعمالي

النسخة المحفوظة 9 · 896cef9dd91747aafedb0cb0a6a7d19373857cbb

## التشغيل المحلي

فك الضغط وافتح الطرفية في المجلد الذي يحتوي على README ثم شغّل باستخدام Python 3

```sh
python -m http.server 8000 --bind 127.0.0.1 --directory dist
```

افتح http://127.0.0.1:8000/index-ar.html للعربية أو http://127.0.0.1:8000/ للإنجليزية.

## GitHub Pages

عند رغبتك في النشر، ضع محتويات dist في جذر فرع النشر مع الحفاظ على المجلدات الفرعية، ثم اختر الفرع ومجلد الجذر في إعدادات Pages. تتطلب روابط Drive والموقع الخارجي اتصالًا بالإنترنت.

## بنية الملفات

يحتوي dist على صفحات البداية والأعمال والسيرة باللغتين والصور وملفي PDF. يتولى gallery.js عرض قوائم الصور الموجودة في works.html وworks-ar.html. يتولى contact.js عرض بيانات التواصل. يحتوي bakery على قائمة الطعام وصورها وملفاتها. يحتوي .openai على إعداد الاستضافة الأصلي.

## جرد ملفات المصدر

- `.openai/hosting.json`
- `dist/ad.webp`
- `dist/bakery/images/cheese.webp`
- `dist/bakery/images/dessert.webp`
- `dist/bakery/images/hotdog.webp`
- `dist/bakery/images/labneh.webp`
- `dist/bakery/images/margherita.webp`
- `dist/bakery/images/meat.webp`
- `dist/bakery/images/oven.webp`
- `dist/bakery/images/pepperoni.webp`
- `dist/bakery/images/pizza.webp`
- `dist/bakery/images/spinach.webp`
- `dist/bakery/images/vegetable.webp`
- `dist/bakery/index.html`
- `dist/bakery/menu.js`
- `dist/bakery/styles.css`
- `dist/beach-night.webp`
- `dist/beach.webp`
- `dist/contact.js`
- `dist/cv-en.pdf`
- `dist/cv.pdf`
- `dist/gallery.js`
- `dist/index-ar.html`
- `dist/index.html`
- `dist/menu.webp`
- `dist/poster-0.webp`
- `dist/poster-1.webp`
- `dist/poster-10.webp`
- `dist/poster-11.webp`
- `dist/poster-12.webp`
- `dist/poster-13.webp`
- `dist/poster-14.webp`
- `dist/poster-15.webp`
- `dist/poster-16.webp`
- `dist/poster-17.webp`
- `dist/poster-18.webp`
- `dist/poster-19.webp`
- `dist/poster-2.webp`
- `dist/poster-3.webp`
- `dist/poster-4.webp`
- `dist/poster-5.webp`
- `dist/poster-6.webp`
- `dist/poster-7.webp`
- `dist/poster-8.webp`
- `dist/poster-9.webp`
- `dist/rawafid.webp`
- `dist/resume-ar.html`
- `dist/resume-en.png`
- `dist/resume.html`
- `dist/resume.png`
- `dist/stars.webp`
- `dist/style.css`
- `dist/trip.webp`
- `dist/works-ar.html`
- `dist/works.html`
