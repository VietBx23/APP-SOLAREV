# APP-SOLAREV

Ứng dụng **SOLAREV** hỗ trợ người dùng sạc xe điện nhanh chóng, thuận tiện thông qua việc quét mã QR tại các trạm sạc. Ứng dụng tích hợp các chức năng từ tìm kiếm trạm sạc, đặt lịch, thanh toán online đến quản lý ví và lịch sử giao dịch.

---

## 🚀 Tính năng chính

- 🔌 Quét **QR Code** để bắt đầu sạc xe
- 💰 **Nạp tiền** vào ví bằng **VNPay**
- 🎁 Áp dụng **voucher giảm giá**
- 📅 **Đặt lịch sạc xe** tại trạm
- 🧾 Xem **lịch sử đơn sạc** và **giao dịch nạp tiền**
- 📍 Hiển thị **vị trí trạm sạc** gần nhất qua bản đồ
- 👤 Quản lý và **cập nhật thông tin cá nhân**
- 🔒 Bảo mật và xác thực tài khoản

---

## 🛠️ Công nghệ sử dụng

- **React Native** (Expo)
- **TypeScript**, **JavaScript**
- **React Navigation**, **Redux**, **Axios**
- **Google Maps API** (định vị & tìm trạm sạc)
- **VNPay API** (thanh toán)
- **Firebase** (authentication, realtime data)
- **QR Code Scanner**
- **Node.js / Express** (cho phần backend API)
- **SQL Server / MySQL** (Cơ sở dữ liệu)

---

## 📱 Tải ứng dụng

- [📲 Android (CH Play)](https://play.google.com/store/apps/details?id=com.solarev.app)  
- [📲 iOS (App Store)](https://apps.apple.com/vn/app/solarev-tr%E1%BA%A1m-s%E1%BA%A1c-xe-%C4%91i%E1%BB%87n/id6470471363)

---

## 🧑‍💻 Cài đặt (Dành cho developer)

```bash
git clone https://github.com/VietBx23/APP-SOLAREV.git
cd APP-SOLAREV
npm install
npx expo start
