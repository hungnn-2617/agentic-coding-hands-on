# Reference Specs

## Item: Keyvisual (Type: GROUP)
**Description:**
Banner chính trên trang chủ giới thiệu chủ đề 'ROOT FURTHER' và đồng hồ đếm ngược.

Hiển thị:
  - Tiêu đề lớn: 'ROOT FURTHER' (font rất lớn)
  - Dòng phụ: 'Coming soon'
  - Đồng hồ đếm ngược: 3 module hiển thị 'DAYS' / 'HOURS' / 'MINUTES'
  - Thông tin sự kiện: 'Thời gian: 18h30  Địa điểm: Nhà hát nghệ thuật quân đội'
  - Nút hành động: 'ABOUT AWARDS' (hover state), 'ABOUT KUDOS' (normal state)
  - Hình nền: họa tiết dạng rễ/đường nét trang trí

Chức năng:
- Click nút 'ABOUT AWARDS': điều hướng sang trang Awards Information
- Click nút 'ABOUT KUDOS': điều hướng sang trang Sun* Kudos
- Đồng hồ: cập nhật thời gian thực cho các module, hiển thị số có 0-padding
- Trạng thái: nút có hover/active, focus rõ ràng
- Responsive: các phần co lại hoặc xếp chồng trên màn hình nhỏ để duy trì đọc được

**Validation:**


## Item: Header Giải thưởng (Type: FRAME)
**Description:**
Tiêu đề section giới thiệu hệ thống giải thưởng.

Display:
  - 'Sun* annual awards 2025': caption nhỏ
  - 'Hệ thống giải thưởng': tiêu đề lớn
  - 'Các hạng mục sẽ được trao giải theo TOP những người xuất sắc nhất.': mô tả phụ

Function:
- Static: chỉ hiển thị thông tin, không tương tác

**Validation:**


## Item: Thẻ giải 'Top Talent' (Type: INSTANCE)
**Description:**
Thẻ hiển thị thông tin hạng mục giải thưởng "Top Talent".

Hiển thị:
  - Hình thu nhỏ: Graphic vuông (phần trên của thẻ)
  - Tiêu đề: 'Top Talent'
  - Mô tả: 'Vinh danh top cá nhân xuất sắc trên mọi phương diện'
  - Link: 'Chi tiết'

Chức năng:
- Click hình hoặc tiêu đề hoặc 'Chi tiết': mở trang 'Awards Information' kèm hashtag là slug của hạng mục để trình duyệt tự động cuộn tới đúng vị trí chứa thông tin chi tiết về giải thưởng
- Hover: nâng nhẹ và viền/ánh sáng nổi bật

**Validation:**


## Item: Award list (Type: GROUP)
**Description:**
Danh sách các hạng mục giải thưởng hiển thị dạng lưới thẻ trên trang chủ.

Hiển thị:
  - Hình thẻ: ảnh vuông/hiệu ứng vòng sáng
  - Tiêu đề: 'Top Talent', 'Top Project', ...
  - Mô tả ngắn: 1-2 dòng
  - Link: 'Chi tiết' (kèm icon)
  - Hiển thị của các hạng mục sẽ tương tự nhau, chỉ khác nội dung

Chức năng:
- Click vào hình ảnh, tiêu đề hoặc 'Chi tiết': mở trang 'Awards Information' kèm hashtag là slug của hạng mục để trình duyệt tự động cuộn tới đúng vị trí chứa thông tin chi tiết về giải thưởng
- Hover: nâng nhẹ và viền/ánh sáng nổi bật
- Responsive: Mobile và Tablet: Grid 2 cột; Desktop: grid 3 cột

**Validation:**


## Item: Sunkudos (Type: INSTANCE)
**Description:**
Khối quảng bá 'Sun* Kudos' với tiêu đề, mô tả ngắn và nút hành động.
Display:
  - Label: 'Phong trào ghi nhận'
  - Title: 'Sun* Kudos'
  - Description: đoạn mô tả tóm tắt
  - Button: 'Chi tiết' (icon)
Function:
- Click 'Chi tiết': mở trang chi tiết Sun* Kudos

**Validation:**


## Item: Button-IC (Type: INSTANCE)
**Description:**
Nút 'Chi tiết' mở thông tin chi tiết của tab 'Sun* Kudos'

Function:
- Click: Mở tab 'Sun* Kudos'

**Validation:**


## Item: Footer (Type: INSTANCE)
**Description:**
Thanh footer chứa logo, liên kết điều hướng và thông tin bản quyền ở cuối trang.

Display:
  - Logo: biểu tượng SAA (trái)
  - Liên kết: 'About SAA 2025', 'Awards Information', 'Sun* Kudos' (giữa)
  - Bản quyền: 'Bản quyền thuộc vè Sun* © 2025' (phải)

Function:
- Click link: điều hướng tới trang tương ứng
- Click logo: về đầu trang chủ
- Hover/active/normal state: tương tự các item ở header

**Validation:**
