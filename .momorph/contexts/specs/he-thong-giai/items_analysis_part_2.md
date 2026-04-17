# Items Analysis - Hệ thống giải (Part 2)

**Screen Context:**
- Screen Purpose: Trang thông tin chi tiết hệ thống giải thưởng SAA 2025, hiển thị các hạng mục giải, tiêu chí và giá trị.
- Target User Type: Nhân viên Sun* (Sunner) - tìm hiểu hệ thống giải thưởng

---

### Item 16: D.6_MVP (`313:8510`)

- hasChildren: false
- Name JP: MVP
- Name Trans: Giải MVP (Most Valuable Person)
- Item Type: others
- Item Subtype: info_block
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Thẻ hiển thị thông tin hạng mục giải thưởng "MVP (Most Valuable Person)" trên trang hệ thống giải SAA 2025.

Hiển thị:
  - Hình minh hoạ: Graphic vuông biểu tượng giải thưởng MVP (bên trái)
  - Tiêu đề: 'MVP (Most Valuable Person)'
  - Mô tả: Đoạn văn giải thích mục đích giải thưởng - vinh danh gương sáng tiêu biểu đại diện cho toàn bộ tập thể, thể hiện năng lực vượt trội, tinh thần cống hiến và tầm ảnh hưởng sâu rộng
  - Thông số: 'Số lượng giải thưởng:' '01' và 'Giá trị giải thưởng:' '15.000.000 VNĐ'

Chức năng:
- Chỉ hiển thị thông tin (read-only), không có tương tác

Candidate QA:


---

### Item 17: D1_Sunkudos (`335:12023`)

- hasChildren: true
- Name JP: Sun* Kudos
- Name Trans: Sun* Kudos - Phong trào ghi nhận
- Item Type: others
- Item Subtype: info_block
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click nút 'Chi tiết': điều hướng tới trang chi tiết Sun* Kudos
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Khối quảng bá 'Sun* Kudos' với tiêu đề, mô tả ngắn và nút hành động, nằm ở cuối trang hệ thống giải.

Hiển thị:
  - Nhãn phụ: 'ĐIỂM MỚI CỦA SAA 2025'
  - Label: 'Phong trào ghi nhận'
  - Tiêu đề: 'Sun* Kudos'
  - Mô tả: Đoạn tóm tắt hoạt động ghi nhận và cảm ơn đồng nghiệp, tạo nên câu chuyện Sun*
  - Logo/ảnh: Hình minh hoạ "KUDOS" bên phải
  - Nút: 'Chi tiết' (kèm icon mũi tên)

Chức năng:
- Click nút 'Chi tiết': điều hướng tới trang chi tiết Sun* Kudos

Candidate QA:


---

### Item 18: D.1.1_Picture-Award (`I313:8467;214:2525`)

- hasChildren: false
- Name JP: 画像
- Name Trans: Hình ảnh giải thưởng
- Item Type: others
- Item Subtype: image
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Hình ảnh biểu thị giải thưởng dùng trong thẻ giải thưởng (ví dụ: thẻ 'Top Talent').

Hiển thị:
  - Hình vuông (336x336px): Graphic/ảnh minh hoạ biểu tượng giải thưởng với hiệu ứng vòng sáng
  - Vị trí: Phần trên hoặc bên trái của thẻ giải thưởng

Chức năng:
- Chỉ hiển thị ảnh (read-only), không có tương tác

Candidate QA:


---

### Item 19: D.1.2_Content (`I313:8467;214:2526`)

- hasChildren: false
- Name JP: コンテンツ
- Name Trans: Khối nội dung 'Top Talent'
- Item Type: others
- Item Subtype: info_block
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action:
- Transition Note:
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Khối thông tin giải thưởng 'Top Talent' trên trang hệ thống giải SAA 2025.

Hiển thị:
  - Tiêu đề: 'Top Talent'
  - Mô tả: Đoạn văn giải thích mục đích giải thưởng - vinh danh top cá nhân xuất sắc trên mọi phương diện
  - Thông số:
    + 'Số lượng giải thưởng:' '10' 'Đơn vị'
    + 'Giá trị giải thưởng:' '7.000.000 VNĐ' 'cho mỗi giải thưởng'

Chức năng:
- Chỉ hiển thị thông tin (read-only), không có tương tác

Candidate QA:


---

### Item 20: D2_Content (`I335:12023;313:8419`)

- hasChildren: true
- Name JP: コンテンツ
- Name Trans: Khối nội dung 'Sun* Kudos'
- Item Type: others
- Item Subtype: info_block
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click nút 'Chi tiết': điều hướng tới trang chi tiết Sun* Kudos
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Khối thông tin 'Sun* Kudos' giới thiệu chương trình ghi nhận nhân sự trên trang hệ thống giải.

Hiển thị:
  - Nhãn phụ: 'ĐIỂM MỚI CỦA SAA 2025'
  - Label: 'Phong trào ghi nhận'
  - Tiêu đề: 'Sun* Kudos'
  - Mô tả: Đoạn tóm tắt hoạt động ghi nhận và cảm ơn đồng nghiệp, giới thiệu lợi ích của chương trình
  - Logo/ảnh: Hình minh hoạ "KUDOS" bên phải
  - Nút: 'Chi tiết' (CTA, kèm icon mũi tên)

Chức năng:
- Click nút 'Chi tiết': điều hướng tới trang chi tiết Sun* Kudos
- Hover nút: hiệu ứng nổi nhẹ

Candidate QA:


---

### Item 21: D2.1_Button-IC (`I335:12023;313:8426`)

- hasChildren: false
- Name JP: ボタン
- Name Trans: Nút 'Chi tiết'
- Item Type: button
- Item Subtype:
- Button Type: text_link
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click: điều hướng tới trang chi tiết Sun* Kudos
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Nút 'Chi tiết' nằm trong khối Sun* Kudos, cho phép người dùng mở trang chi tiết.

Hiển thị:
  - Text: 'Chi tiết'
  - Icon: mũi tên phải (arrow-right)
  - Kiểu: text link với icon

Chức năng:
- Click: điều hướng tới trang chi tiết Sun* Kudos
- Hover: hiệu ứng nổi nhẹ

Candidate QA:
