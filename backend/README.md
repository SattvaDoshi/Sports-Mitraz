# SportzMitra Backend API

Node.js + Express backend for the SportzMitra sports e-commerce site.  
No user authentication. No payment gateway. Orders come in as **enquiry forms** and are notified to the admin via **WhatsApp (RichAutomate)**.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js + Express |
| Database | MySQL + Sequelize ORM |
| Image Uploads | Multer (memory) → Cloudinary |
| WhatsApp | RichAutomate API |
| Admin Auth | Static `X-Admin-Key` header |

---

## Setup

### 1. Prerequisites
- Node.js 18+
- MySQL running locally

### 2. Create the MySQL database
```sql
CREATE DATABASE sportzmitra;
```

### 3. Configure environment
Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Key variables:
```
DB_NAME=sportzmitra
DB_USER=root
DB_PASS=your_password

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

RICH_AUTOMATE_API_URL=https://api.richautomate.in/api/v1/send-template
RICH_AUTOMATE_API_KEY=ra_live_...
WHATSAPP_TEMPLATE_NAME=sportzmitra_enquiry
WHATSAPP_ADMIN_NUMBER=919658369520

ADMIN_SECRET_KEY=choose_a_strong_secret
```

### 4. Install & Run
```bash
npm install
npm run dev     # development (nodemon)
npm start       # production
```

The server auto-syncs the DB schema on startup (`sequelize.sync({ alter: true })`).

---

## API Reference

### Public Endpoints (no auth)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/categories` | All top-level categories + subcategories |
| GET | `/api/categories/:slug` | Single category with full tree + products |
| GET | `/api/products` | All active products (`?category=slug` filter) |
| GET | `/api/products/:slug` | Single product detail |
| POST | `/api/enquiry` | Submit enquiry form |

**POST /api/enquiry body:**
```json
{
  "name": "Ravi Shah",
  "phone": "+91 9876543210",
  "email": "ravi@example.com",
  "product": "Custom Jerseys",
  "message": "Need 50 jerseys with name & number printing",
  "productId": 3
}
```

---

### Admin Endpoints (`X-Admin-Key: <your_secret>` header required)

#### Orders
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/orders` | List orders (`?status=&search=&page=&limit=`) |
| GET | `/api/admin/orders/stats` | Count per status (dashboard) |
| GET | `/api/admin/orders/:id` | Single order |
| PATCH | `/api/admin/orders/:id/status` | Update status |
| PATCH | `/api/admin/orders/:id/notes` | Update admin notes |
| DELETE | `/api/admin/orders/:id` | Delete order |

**PATCH /api/admin/orders/:id/status body:**
```json
{
  "status": "confirmed",
  "adminNotes": "Confirmed 50 jerseys, delivery in 10 days"
}
```
Valid statuses: `pending` → `confirmed` → `booked` → `cancelled`

#### Categories
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/categories` | Full tree |
| GET | `/api/admin/categories/flat` | Flat list (for dropdowns) |
| POST | `/api/admin/categories` | Create category/subcategory |
| PUT | `/api/admin/categories/:id` | Update |
| DELETE | `/api/admin/categories/:id` | Delete (blocked if has children/products) |

**POST /api/admin/categories** — `multipart/form-data`:
- `name` (required)
- `description`
- `parentId` — omit for top-level, set to parent's `id` for subcategory
- `isLeaf` — `true` if this subcategory IS a product (leaf node)
- `image` (file, optional)
- `sortOrder`, `isActive`

#### Products
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/admin/products` | List products (`?categoryId=`) |
| GET | `/api/admin/products/:id` | Single product |
| POST | `/api/admin/products` | Create with images |
| PUT | `/api/admin/products/:id` | Update (append/replace images) |
| DELETE | `/api/admin/products/:id` | Delete |

**POST /api/admin/products** — `multipart/form-data`:
- `name` (required)
- `categoryId` (required)
- `description`, `startingPrice`
- `tags` — comma-separated or JSON array string
- `images[]` — up to 10 image files
- `catalogPdf` — single PDF file
- `isActive`, `sortOrder`

**PUT /api/admin/products/:id** — same fields plus:
- `replaceImages=true` — replace all images instead of appending
- `removeImageUrls` — JSON array of Cloudinary URLs to remove

---

## Category / Subcategory Structure

```
Category (top-level)
  └── Subcategory (parentId = category.id)
        └── Subcategory (parentId = subcategory.id, isLeaf=true)
              └── Products (categoryId = leaf subcategory.id)
```

`isLeaf=true` on a subcategory signals to the frontend that this node should be treated as a product rather than a container for more subcategories.

---

## WhatsApp (RichAutomate)

1. Create a template in your RichAutomate dashboard with 5 variables:
   - `{{1}}` = Customer Name
   - `{{2}}` = Phone
   - `{{3}}` = Email
   - `{{4}}` = Product/Requirement
   - `{{5}}` = Message

2. Set `WHATSAPP_TEMPLATE_NAME` in `.env` to match your template name exactly.

3. Messages are sent to `WHATSAPP_ADMIN_NUMBER` (+919658369520) on every enquiry.  
   If the API call fails, the error is logged but the order is **still saved to the DB**.
