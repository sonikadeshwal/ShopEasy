# ⚡ ShopEasy — Electronics E-Commerce Store

Hey! This is my e-commerce project built as part of the PEP course at LPU. I built a fully functional electronics store using React and Vite, and then tested it manually across multiple modules like cart, search, and checkout.

🔗 **Live Site:** [https://shop-easy-beige.vercel.app/](https://shop-easy-beige.vercel.app/)

---

## 💡 Why I Built This

For our PEP class, we had to either build or pick an e-commerce site and write a complete test plan + test cases for it. I decided to build one from scratch so I could understand both the development and testing sides of the same project. It helped me see exactly where bugs can occur and why structured testing matters.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛍️ Product Catalog | 12 products across 6 categories |
| 🔍 Search | Real-time product search by name |
| 🗂️ Category Filter | Phones, Laptops, Audio, Tablets, Cameras, Wearables |
| 🛒 Shopping Cart | Add, remove, update quantity, running total |
| ❤️ Wishlist | Save favourite products |
| 📱 Responsive Design | Works on mobile, tablet, and desktop |
| 🎨 Dark Theme | Clean dark UI with blue accents |

---

## 🛠️ Tech Stack

- **React 18** — component-based UI
- **Vite** — fast build tool and dev server
- **lucide-react** — icon library
- **Google Fonts** — Outfit + DM Sans
- **Vercel** — deployment platform

---

## 📁 Folder Structure

```
ShopEasy/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx       # app entry point
    └── App.jsx        # main component (all logic + UI)
```

---

## ⚙️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/sonikadeshwal/ShopEasy.git
cd ShopEasy

# Install dependencies
npm install

# Start development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

---

## 🧪 Testing

This project is also used as the **system under test** for my PEP course testing assignment. I have written:

- ✅ Test Plan (based on teacher's template)
- ✅ Test Cases for 4 modules
- ✅ Manual testing results

### Modules Tested

| Module | What I Tested |
|---|---|
| Product Catalog | Search, filter by category, product display |
| Shopping Cart | Add to cart, update quantity, remove item, total calculation |
| Wishlist | Add/remove from wishlist, state persistence |
| Checkout | Order placement, cart reset after checkout |

---

## 🚀 Deployment

Deployed on Vercel via GitHub integration — any push to `main` automatically redeploys the site.

---

**Sonika Deshwal**
B.Tech CSE (AI & ML) — Batch 2023–2027
Lovely Professional University
