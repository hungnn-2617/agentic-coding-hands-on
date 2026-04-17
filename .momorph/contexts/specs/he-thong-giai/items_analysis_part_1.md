# Items Analysis Part 1 - Hệ thống giải

**Screen Info:**
- Screen ID: zFYDgyj_pD
- Screen Name: Hệ thống giải
- Screen Purpose: Trang thông tin chi tiết hệ thống giải thưởng SAA 2025, hiển thị các hạng mục giải, tiêu chí và giá trị.
- Target User: Nhân viên Sun* (Sunner) - tìm hiểu hệ thống giải thưởng
- Output Language: Vietnamese

---

### Item 1: 3_Keyvisual (`313:8437`)

- hasChildren: true
- Name JP: キービジュアル
- Name Trans: Banner chính (Keyvisual)
- Item Type: others
- Item Subtype: hero_banner
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
Banner chính hiển thị artwork và tiêu đề chiến dịch trên trang Hệ thống giải thưởng.

Hiển thị:
  - Ảnh nền: artwork trang trí toàn chiều rộng (cover, crop trung tâm)
  - Tiêu đề: 'ROOT FURTHER' (font lớn, nổi bật)
  - Phụ đề: 'Sun* Annual Award 2025'
  - Logo và icon trang trí ở góc trên

Chức năng:
- Trang trí, không có hành vi click
- Responsive: scale để cover chiều rộng và crop trung tâm
- Accessibility: alt text 'Keyvisual Sun* Annual Award 2025'

Candidate QA:


---

### Item 2: A_Title hệ thống giải thưởng (`313:8453`)

- hasChildren: false
- Name JP: 賞制度タイトル
- Name Trans: Tiêu đề hệ thống giải thưởng SAA2025
- Item Type: label
- Item Subtype:
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
Tiêu đề phần giới thiệu hệ thống giải thưởng SAA 2025.

Hiển thị:
  - Dòng phụ: 'Sun* annual awards 2025' (text nhỏ, nhạt, phía trên)
  - Tiêu đề chính: 'Hệ thống giải thưởng SAA 2025' (text lớn, nổi bật)

Chức năng:
- Hiển thị tĩnh, không có tương tác

Candidate QA:


---

### Item 3: B_Hệ thống giải thưởng (`313:8458`)

- hasChildren: true
- Name JP: 賞制度セクション
- Name Trans: Hệ thống giải thưởng SAA2025
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
Mục liệt kê toàn bộ hạng mục giải SAA 2025, bao gồm bảng điều hướng bên trái và các thẻ thông tin bên phải.

Hiển thị:
  - Bảng điều hướng (trái): danh sách các mục giải ('Top Talent', 'Top Project', 'Top Project Leader', 'Best Manager', 'Signature 2025 - Creator', 'MVP')
  - Thẻ giải (phải): mỗi thẻ gồm ảnh/biểu tượng, tiêu đề, mô tả, 'Số lượng giải thưởng', 'Giá trị giải thưởng'

Chức năng:
- Click mục bên trái: cuộn tới thẻ giải tương ứng bên phải
- Trạng thái: hiển thị thông tin tĩnh cho các thẻ giải, có tương tác cho menu điều hướng

Candidate QA:


---

### Item 4: C_Menu list (`313:8459`)

- hasChildren: true
- Name JP: メニューリスト
- Name Trans: Danh mục giải thưởng (menu bên trái)
- Item Type: others
- Item Subtype: navigation
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
Cột điều hướng bên trái, liệt kê các hạng mục giải thưởng.

Hiển thị:
  - Danh sách: 6 mục văn bản dọc ('Top Talent', 'Top Project', 'Top Project Leader', 'Best Manager', 'Signature 2025 - Creator', 'MVP')
  - Indicator: mục đang active được đánh dấu bằng màu vàng và underline
  - Vị trí: cố định bên trái khu vực nội dung

Chức năng:
- Click mục: cuộn nội dung phía bên phải tới thẻ giải tương ứng và đặt trạng thái active cho mục đó
- Hover: highlight mục đang trỏ
- Mục mặc định active: 'Top Talent' (mục đầu tiên)

Candidate QA:
- Khi cuộn nội dung bên phải, mục active bên trái có tự động cập nhật theo vị trí cuộn không?

---

### Item 5: C.1_Top talent (`313:8460`)

- hasChildren: false
- Name JP: トップタレント（ナビ項目）
- Name Trans: Mục 'Top Talent'
- Item Type: others
- Item Subtype: navigation_item
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click vào mục này sẽ cuộn nội dung bên phải tới phần thông tin giải 'Top Talent' và đặt trạng thái active cho mục.
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Mục điều hướng 'Top Talent' trong cột danh mục bên trái.

Hiển thị:
  - Text: 'Top Talent'
  - Trạng thái active: màu vàng, có underline
  - Trạng thái bình thường: màu nhạt

Chức năng:
- Click: cuộn tới phần 'Top Talent' (D.1) và đặt trạng thái active
- Hover: highlight mục

Candidate QA:


---

### Item 6: C.2_Top project (`313:8461`)

- hasChildren: false
- Name JP: トッププロジェクト（ナビ項目）
- Name Trans: Mục 'Top Project' (danh mục điều hướng)
- Item Type: others
- Item Subtype: navigation_item
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click vào mục này sẽ cuộn nội dung bên phải tới phần thông tin giải 'Top Project' và đặt trạng thái active cho mục.
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Mục điều hướng 'Top Project' trong cột danh mục bên trái.

Hiển thị:
  - Text: 'Top Project'
  - Trạng thái active: màu vàng, có underline
  - Trạng thái bình thường: màu nhạt

Chức năng:
- Click: cuộn tới phần 'Top Project' (D.2) và đặt trạng thái active
- Hover: highlight mục

Candidate QA:


---

### Item 7: C.3_Top Project leader (`313:8462`)

- hasChildren: false
- Name JP: トッププロジェクトリーダー（ナビ項目）
- Name Trans: Người Dẫn Dự Án Xuất Sắc
- Item Type: others
- Item Subtype: navigation_item
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click vào mục này sẽ cuộn nội dung bên phải tới phần thông tin giải 'Top Project Leader' và đặt trạng thái active cho mục.
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Mục điều hướng 'Top Project Leader' trong cột danh mục bên trái.

Hiển thị:
  - Text: 'Top Project Leader'
  - Trạng thái active: màu vàng, có underline
  - Trạng thái bình thường: màu nhạt

Chức năng:
- Click: cuộn tới phần 'Top Project Leader' (D.3) và đặt trạng thái active
- Hover: highlight mục

Candidate QA:


---

### Item 8: C.4_Best manager (`313:8463`)

- hasChildren: false
- Name JP: ベストマネージャー（ナビ項目）
- Name Trans: Quản lý xuất sắc
- Item Type: others
- Item Subtype: navigation_item
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click vào mục này sẽ cuộn nội dung bên phải tới phần thông tin giải 'Best Manager' và đặt trạng thái active cho mục.
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Mục điều hướng 'Best Manager' trong cột danh mục bên trái.

Hiển thị:
  - Text: 'Best Manager'
  - Trạng thái active: màu vàng, có underline
  - Trạng thái bình thường: màu nhạt

Chức năng:
- Click: cuộn tới phần 'Best Manager' (D.4) và đặt trạng thái active
- Hover: highlight mục

Candidate QA:


---

### Item 9: C.5_Signature 2025 (`313:8464`)

- hasChildren: false
- Name JP: シグネチャー2025（ナビ項目）
- Name Trans: Giải Signature 2025 - Creator
- Item Type: others
- Item Subtype: navigation_item
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click vào mục này sẽ cuộn nội dung bên phải tới phần thông tin giải 'Signature 2025 - Creator' và đặt trạng thái active cho mục.
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Mục điều hướng 'Signature 2025 - Creator' trong cột danh mục bên trái.

Hiển thị:
  - Text: 'Signature 2025 - Creator'
  - Trạng thái active: màu vàng, có underline
  - Trạng thái bình thường: màu nhạt

Chức năng:
- Click: cuộn tới phần 'Signature 2025 - Creator' (D.5) và đặt trạng thái active
- Hover: highlight mục

Candidate QA:


---

### Item 10: C.6_MVP (`313:8465`)

- hasChildren: false
- Name JP: MVP（ナビ項目）
- Name Trans: MVP (Người có giá trị nhất)
- Item Type: others
- Item Subtype: navigation_item
- Button Type:
- Data Type:
- Format:
- Required: false
- Min Length: -
- Max Length: -
- Default Value:
- User Action: on_click
- Transition Note: Click vào mục này sẽ cuộn nội dung bên phải tới phần thông tin giải 'MVP' và đặt trạng thái active cho mục.
- Database Table: -
- Database Column: -
- Database Note: -

Validation Note:


Description:
Mục điều hướng 'MVP' trong cột danh mục bên trái.

Hiển thị:
  - Text: 'MVP'
  - Trạng thái active: màu vàng, có underline
  - Trạng thái bình thường: màu nhạt

Chức năng:
- Click: cuộn tới phần 'MVP' (thẻ giải MVP phía dưới) và đặt trạng thái active
- Hover: highlight mục

Candidate QA:


---

### Item 11: D.1_Top talent (`313:8467`)

- hasChildren: false
- Name JP: トップタレント（情報ブロック）
- Name Trans: Top Talent (Giải Nhân Tài)
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
Thẻ thông tin giải thưởng 'Top Talent' trên trang Hệ thống giải thưởng SAA 2025.

Hiển thị:
  - Hình: khung ảnh/biểu tượng giải 'TOP TALENT' (bên trái thẻ)
  - Tiêu đề: 'Top Talent'
  - Mô tả: đoạn văn giải thích về tiêu chí, ý nghĩa và đối tượng của giải thưởng
  - Số lượng giải thưởng: '10' - 'Đơn vị' (cá nhân lẫn tập thể)
  - Giá trị giải thưởng: '7.000.000 VNĐ' - 'cho mỗi giải thưởng'

Chức năng:
- Chỉ hiển thị thông tin, không có hành vi click
- Là mục đích đến khi click mục 'Top Talent' trong menu điều hướng bên trái

Candidate QA:


---

### Item 12: D.2_Top Project (`313:8468`)

- hasChildren: false
- Name JP: トッププロジェクト（情報ブロック）
- Name Trans: Top Project (Giải Dự Án Xuất Sắc)
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
Thẻ thông tin giải thưởng 'Top Project' trên trang Hệ thống giải thưởng SAA 2025.

Hiển thị:
  - Hình: khung ảnh/biểu tượng giải 'TOP PROJECT' (bên trái thẻ)
  - Tiêu đề: 'Top Project'
  - Mô tả: đoạn văn giải thích về tiêu chí, ý nghĩa và phạm vi của giải thưởng dự án
  - Số lượng giải thưởng: '02' - 'Tập thể'
  - Giá trị giải thưởng: '15.000.000 VNĐ' - 'cho mỗi giải thưởng'

Chức năng:
- Chỉ hiển thị thông tin, không có hành vi click
- Là mục đích đến khi click mục 'Top Project' trong menu điều hướng bên trái

Candidate QA:


---

### Item 13: D.3_Top Project Leader (`313:8469`)

- hasChildren: false
- Name JP: トッププロジェクトリーダー（情報ブロック）
- Name Trans: Giải thưởng Top Project Leader
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
Thẻ thông tin giải thưởng 'Top Project Leader' trên trang Hệ thống giải thưởng SAA 2025.

Hiển thị:
  - Hình: khung ảnh/biểu tượng giải 'TOP PROJECT LEADER' (bên trái thẻ)
  - Tiêu đề: 'Top Project Leader'
  - Mô tả: đoạn văn giải thích về tiêu chí, ý nghĩa giải thưởng dành cho người dẫn dự án
  - Số lượng giải thưởng: '03' - 'Cá nhân'
  - Giá trị giải thưởng: '7.000.000 VNĐ' - 'cho mỗi giải thưởng'

Chức năng:
- Chỉ hiển thị thông tin, không có hành vi click
- Là mục đích đến khi click mục 'Top Project Leader' trong menu điều hướng bên trái

Candidate QA:


---

### Item 14: D.4_Thông tin giải (`313:8470`)

- hasChildren: false
- Name JP: ベストマネージャー（情報ブロック）
- Name Trans: Thông tin giải 'Best Manager'
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
Thẻ thông tin giải thưởng 'Best Manager' trên trang Hệ thống giải thưởng SAA 2025.

Hiển thị:
  - Hình: khung ảnh/biểu tượng giải 'BEST MANAGER' (bên trái thẻ)
  - Tiêu đề: 'Best Manager'
  - Mô tả: đoạn văn mô tả tiêu chí, ý nghĩa giải thưởng dành cho quản lý xuất sắc
  - Số lượng giải thưởng: '01' - 'Cá nhân'
  - Giá trị giải thưởng: '10.000.000 VNĐ'

Chức năng:
- Chỉ hiển thị thông tin, không có hành vi click
- Là mục đích đến khi click mục 'Best Manager' trong menu điều hướng bên trái

Candidate QA:


---

### Item 15: D.5_Signature 2025 (`313:8471`)

- hasChildren: false
- Name JP: シグネチャー2025（情報ブロック）
- Name Trans: Signature 2025 - Creator (Giải thưởng)
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
Thẻ thông tin giải thưởng 'Signature 2025 - Creator' trên trang Hệ thống giải thưởng SAA 2025.

Hiển thị:
  - Hình: khung ảnh/biểu tượng giải 'SIGNATURE 2025 CREATOR' (bên trái thẻ)
  - Tiêu đề: 'Signature 2025 - Creator'
  - Mô tả: đoạn văn tóm tắt mục tiêu và ý nghĩa giải thưởng sáng tạo
  - Số lượng giải thưởng: '01' - bao gồm cả 'Cá nhân' và 'Tập thể'
  - Giá trị giải thưởng (cá nhân): '5.000.000 VNĐ' - 'cho giải cá nhân'
  - Giá trị giải thưởng (tập thể): '8.000.000 VNĐ' - 'cho giải tập thể'

Chức năng:
- Chỉ hiển thị thông tin, không có hành vi click
- Là mục đích đến khi click mục 'Signature 2025 - Creator' trong menu điều hướng bên trái
- Đặc biệt: thẻ này có 2 mức giá trị giải thưởng (cá nhân và tập thể), khác với các thẻ khác chỉ có 1 mức

Candidate QA:
- Giải 'Signature 2025 - Creator' có 2 giá trị (cá nhân: 5tr, tập thể: 8tr). Cần xác nhận logic hiển thị khi số lượng giải chỉ là '01' nhưng có cả cá nhân và tập thể.
