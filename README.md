# 🏃‍♂️ Letsrun - แอพเพื่อนนักวิ่ง

ยินดีต้อนรับสู่ **Letsrun** แอพพลิเคชันเว็บที่ออกแบบมาเพื่อช่วยเหลือนักวิ่งทุกคนในการวางแผนและติดตามการออกกำลังกาย! ไม่ว่าคุณจะเป็นนักวิ่งมือใหม่หรือมืออาชีพ Letsrun จะเป็นเพื่อนคู่ใจในการตัดสินใจว่าจะวิ่งวันนี้หรือไม่ และคำนวณ pace ที่เหมาะสมสำหรับการฝึกซ้อมของคุณ

## ✨ คุณสมบัติเด่น

- **🤔 ควรวิ่งวันนี้ไหม?** - ฟีเจอร์ที่ช่วยคุณตัดสินใจว่าจะออกกำลังกายวันนี้หรือไม่ โดยพิจารณาจากปัจจัยต่างๆ
- **📊 คำนวณ Pace การวิ่ง** - เครื่องมือคำนวณ pace ที่แม่นยำสำหรับการฝึกซ้อมต่างๆ
- **🎨 อินเทอร์เฟซสวยงาม** - ดีไซน์ที่ทันสมัยด้วย Tailwind CSS และเอฟเฟกต์พื้นหลังแบบ bubble
- **⚡ ประสิทธิภาพสูง** - พัฒนาด้วย Vite สำหรับการโหลดที่รวดเร็ว

## 🚀 การติดตั้งและรัน

### ข้อกำหนดเบื้องต้น
- Node.js (เวอร์ชัน 16 หรือสูงกว่า)
- npm หรือ yarn

### ขั้นตอนการติดตั้ง

1. **โคลนโปรเจกต์**
   ```bash
   git clone <repository-url>
   cd letsrun
   ```

2. **ติดตั้ง dependencies**
   ```bash
   npm install
   ```

3. **รันแอพในโหมดพัฒนา**
   ```bash
   npm run dev
   ```

4. **เปิดเบราว์เซอร์** และไปที่ `http://localhost:5173`

### สร้างสำหรับ production
```bash
npm run build
```

## 🛠️ เทคโนโลยีที่ใช้

- **React 18** - ไลบรารี JavaScript สำหรับสร้าง UI
- **TypeScript** - เพิ่มความปลอดภัยให้กับโค้ด
- **Vite** - เครื่องมือ build ที่รวดเร็ว
- **Tailwind CSS** - CSS framework สำหรับ styling
- **ESLint** - เครื่องมือตรวจสอบโค้ด

## 📁 โครงสร้างโปรเจกต์

```
src/
├── components/
│   ├── common/
│   │   └── BubbleBackground.tsx    # พื้นหลังเอฟเฟกต์ฟอง
│   ├── layout/
│   │   └── MainLayout.tsx          # เลย์เอาต์หลัก
│   └── training/
│       ├── ShouldRunToday.tsx      # คอมโพเนนต์ตัดสินใจการวิ่ง
│       └── TrainingPaceCalculator.tsx  # เครื่องคำนวณ pace
├── pages/
│   └── HomePage.tsx                # หน้าแรก
└── assets/                         # รูปภาพและไฟล์สื่อ
```

## 🎯 วิธีการใช้งาน

1. **เปิดแอพ** - เข้าสู่หน้าแรกของ Letsrun
2. **ตรวจสอบการตัดสินใจ** - ดูส่วน "ควรวิ่งวันนี้ไหม?" เพื่อรับคำแนะนำ
3. **คำนวณ Pace** - ใช้เครื่องมือคำนวณเพื่อวางแผนการฝึกซ้อม
4. **ติดตามความก้าวหน้า** - บันทึกและติดตามการออกกำลังกายของคุณ

## 🤝 การมีส่วนร่วม

เรายินดีรับการมีส่วนร่วมจากทุกคน! หากคุณมีไอเดียหรือพบปัญหา สามารถเปิด issue หรือส่ง pull request ได้

## 📄 สัญญาอนุญาต

โปรเจกต์นี้ใช้สัญญาอนุญาต MIT - ดูรายละเอียดในไฟล์ LICENSE

---

**เริ่มต้นการวิ่งของคุณวันนี้กับ Letsrun! 🏃‍♀️💨**
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
