# Project Store Phone FE

Đây là dự án frontend cho một cửa hàng điện thoại, được xây dựng bằng React và TypeScript, sử dụng Redux Toolkit để quản lý trạng thái.

## Mục lục

-   [Giới thiệu](#giới-thiệu)
-   [Tính năng](#tính-năng)
-   [Cài đặt](#cài-đặt)
-   [Sử dụng](#sử-dụng)
-   [Triển khai với Docker](#triển-khai-với-docker)
-   [Cấu trúc dự án](#cấu-trúc-dự-án)
-   [Redux Workflow](#redux-workflow)
-   [Tích hợp ZaloPay](#tích-hợp-zalopay)
-   [Tích hợp WebSocket IO](#tích-hợp-websocket-io)

## Giới thiệu

Dự án này là giao diện người dùng (frontend) cho một ứng dụng cửa hàng điện thoại, cho phép người dùng duyệt sản phẩm, thêm vào giỏ hàng và thực hiện các thao tác liên quan đến mua sắm.

## Tính năng

-   Hiển thị danh sách sản phẩm
-   Xem chi tiết sản phẩm
-   Thêm sản phẩm vào giỏ hàng
-   Cập nhật số lượng sản phẩm trong giỏ hàng
-   Xóa sản phẩm khỏi giỏ hàng
-   Xóa toàn bộ giỏ hàng
-   Đăng nhập, đăng ký
-   Thanh toán
-   Xem lịch sử đơn hàng
-   Xem chi tiết đơn hàng
-   Hủy đơn hàng
-   Tích hợp thanh toán ZaloPay
-   Thông báo thời gian thực qua WebSocket IO

## Cài đặt

Để cài đặt và chạy dự án trên máy cục bộ của bạn, hãy làm theo các bước sau:

1.  **Clone repository:**
    ```bash
    git clone [URL_REPOSITORY_CỦA_BẠN]
    cd project-store-phone-fe
    ```

2.  **Cài đặt các dependencies:**
    ```bash
    npm install
    # hoặc
    yarn install
    ```

## Sử dụng

Sau khi cài đặt, bạn có thể chạy ứng dụng ở chế độ phát triển:

```bash
npm run dev
# hoặc
yarn dev
```

Ứng dụng sẽ chạy trên `http://localhost:5173` (hoặc một cổng khác nếu 5173 đã được sử dụng).

## Triển khai với Docker

Để triển khai ứng dụng bằng Docker, bạn có thể làm theo các bước sau:

1.  **Build Docker image:**
    ```bash
    docker build -t phone-store-fe .
    ```

2.  **Run Docker container:**
    ```bash
    docker run -p 80:80 phone-store-fe
    ```
    Ứng dụng sẽ có sẵn tại `http://localhost:80`.

## Cấu trúc dự án

```
.
├── public/                 # Các tệp tĩnh
├── src/
│   ├── api/                # Các hàm gọi API
│   ├── assets/             # Tài nguyên tĩnh (hình ảnh, icon)
│   ├── components/         # Các component UI có thể tái sử dụng
│   │   ├── carousel/
│   │   ├── cart/
│   │   ├── forms/
│   │   ├── home/
│   │   ├── layouts/
│   │   ├── modal/
│   │   ├── product/
│   │   ├── product-detail/
│   │   ├── profile/
│   │   └── ui/             # Các component UI chung (shadcn/ui)
│   ├── pages/              # Các trang chính của ứng dụng
│   │   ├── auth/
│   │   ├── product/
│   │   └── ...
│   ├── store/              # Cấu hình Redux Store và Slices
│   │   ├── cartSlice.ts
│   │   └── store.ts
│   ├── types/              # Định nghĩa kiểu TypeScript
│   ├── App.tsx             # Component gốc của ứng dụng
│   ├── main.tsx            # Điểm khởi đầu của ứng dụng
│   └── ...
├── .env                    # Biến môi trường
├── package.json            # Thông tin dự án và dependencies
├── tsconfig.json           # Cấu hình TypeScript
├── vite.config.ts          # Cấu hình Vite
└── tailwind.config.js      # Cấu hình Tailwind CSS
```

## Redux Workflow

Dự án này sử dụng Redux Toolkit để quản lý trạng thái ứng dụng, đặc biệt là cho giỏ hàng.

1.  **Store (`src/store/store.ts`)**:
    *   Là nơi lưu trữ toàn bộ trạng thái của ứng dụng.
    *   Được cấu hình bằng `configureStore`, tích hợp `cartReducer` để quản lý trạng thái giỏ hàng.

2.  **Slice (`src/store/cartSlice.ts`)**:
    *   Được tạo bằng `createSlice`, định nghĩa một phần của trạng thái (state) và các reducer/actions liên quan.
    *   `name: 'cart'`: Tên của slice.
    *   `initialState`: Trạng thái ban đầu của giỏ hàng (mảng `items` rỗng).
    *   `reducers`: Chứa các hàm logic để thay đổi trạng thái.

3.  **Actions**:
    *   Là các đối tượng mô tả những gì đã xảy ra. Redux Toolkit tự động tạo các action creators từ các hàm trong `reducers`.
    *   `addItem(product, quantity)`: Thêm sản phẩm vào giỏ hàng hoặc cập nhật số lượng nếu đã tồn tại.
    *   `removeItem(id)`: Xóa sản phẩm khỏi giỏ hàng theo ID.
    *   `updateQuantity(id, quantity)`: Cập nhật số lượng của một sản phẩm cụ thể.
    *   `clearCart()`: Xóa toàn bộ sản phẩm trong giỏ hàng.
    *   Các component sẽ `dispatch` các action này để yêu cầu thay đổi trạng thái.

4.  **Reducers**:
    *   Là các hàm thuần túy nhận trạng thái hiện tại và một action, sau đó trả về trạng thái mới.
    *   Mỗi hàm trong `reducers` của `cartSlice` là một reducer cụ thể cho action tương ứng. Redux Toolkit sử dụng Immer, cho phép viết code thay đổi trạng thái một cách "bất biến" dễ dàng hơn.

**Quy trình:**

Component -> Dispatch Action -> Store -> Reducer -> Cập nhật State -> Component re-render.

## Tích hợp ZaloPay

Dự án này tích hợp cổng thanh toán ZaloPay để cung cấp phương thức thanh toán trực tuyến an toàn và tiện lợi cho người dùng.

## Tích hợp WebSocket IO

Dự án sử dụng WebSocket IO để cung cấp các thông báo thời gian thực, ví dụ như thông báo trạng thái đơn hàng hoặc các cập nhật quan trọng khác đến người dùng ngay lập tức.
