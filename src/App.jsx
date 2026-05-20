import { useState } from "react"
import { ShoppingCart, Search, Star, X, Plus, Minus, Heart, ChevronRight, Zap } from "lucide-react"

const PRODUCTS = [
  { id: 1,  name: "iPhone 15 Pro",        category: "phones",    price: 999,  originalPrice: 1099, rating: 4.8, reviews: 2341, badge: "New"         },
  { id: 2,  name: "Galaxy S24 Ultra",      category: "phones",    price: 1199, originalPrice: 1299, rating: 4.7, reviews: 1892, badge: "Hot"         },
  { id: 3,  name: "MacBook Pro M3",        category: "laptops",   price: 1999, originalPrice: 2199, rating: 4.9, reviews: 3211, badge: "Best Seller" },
  { id: 4,  name: "Dell XPS 15",           category: "laptops",   price: 1499, originalPrice: 1699, rating: 4.6, reviews: 1543, badge: null          },
  { id: 5,  name: "Sony WH-1000XM5",       category: "audio",     price: 299,  originalPrice: 349,  rating: 4.8, reviews: 5621, badge: "Top Pick"    },
  { id: 6,  name: "AirPods Pro 2",         category: "audio",     price: 229,  originalPrice: 249,  rating: 4.7, reviews: 8932, badge: null          },
  { id: 7,  name: 'iPad Pro 12.9"',        category: "tablets",   price: 1099, originalPrice: 1199, rating: 4.8, reviews: 2109, badge: "Sale"        },
  { id: 8,  name: "Galaxy Tab S9+",        category: "tablets",   price: 699,  originalPrice: 799,  rating: 4.5, reviews: 987,  badge: null          },
  { id: 9,  name: "Sony A7 IV",            category: "cameras",   price: 2499, originalPrice: 2699, rating: 4.9, reviews: 1234, badge: "Pro"         },
  { id: 10, name: "Canon EOS R6 Mark II",  category: "cameras",   price: 2099, originalPrice: 2299, rating: 4.8, reviews: 876,  badge: null          },
  { id: 11, name: "Apple Watch Ultra 2",   category: "wearables", price: 799,  originalPrice: 899,  rating: 4.7, reviews: 3421, badge: "New"         },
  { id: 12, name: "Samsung Galaxy Watch 6",category: "wearables", price: 279,  originalPrice: 299,  rating: 4.4, reviews: 2134, badge: null          },
]

const CATEGORIES = ["all", "phones", "laptops", "audio", "tablets", "cameras", "wearables"]

const CAT_ICONS   = { all:"⚡", phones:"📱", laptops:"💻", audio:"🎧", tablets:"📲", cameras:"📷", wearables:"⌚" }
const CAT_COLORS  = {
  phones:   { bg:"#1e3a5f", accent:"#3b82f6" },
  laptops:  { bg:"#1a2744", accent:"#6366f1" },
  audio:    { bg:"#2d1b3d", accent:"#a855f7" },
  tablets:  { bg:"#0d2d2d", accent:"#14b8a6" },
  cameras:  { bg:"#2d1a1a", accent:"#ef4444" },
  wearables:{ bg:"#1a2d1a", accent:"#22c55e" },
}
const BADGE_COLORS= { "New":"#3b82f6","Hot":"#ef4444","Best Seller":"#f59e0b","Sale":"#22c55e","Top Pick":"#3b82f6","Pro":"#8b5cf6" }

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { min-height: 100vh; background: #080b14; }
  body { font-family: 'DM Sans', sans-serif; color: #fff; }
  h1,h2,h3 { font-family: 'Outfit', sans-serif; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #080b14; }
  ::-webkit-scrollbar-thumb { background: #1e2d4a; border-radius: 4px; }

  .product-card {
    background: #0d1321; border: 1px solid #1e2d4a; border-radius: 16px;
    overflow: hidden; transition: transform .22s ease, border-color .22s ease, box-shadow .22s ease;
  }
  .product-card:hover {
    transform: translateY(-5px); border-color: #3b82f6;
    box-shadow: 0 8px 36px rgba(59,130,246,.18);
  }
  .add-btn {
    background: #3b82f6; color: #fff; border: none; border-radius: 10px;
    padding: 10px 20px; font-size: 14px; font-weight: 600; cursor: pointer; width: 100%;
    transition: background .2s; font-family: 'Outfit', sans-serif; letter-spacing: .2px;
  }
  .add-btn:hover { background: #2563eb; }

  .cat-btn {
    background: transparent; color: #6b7fa3; border: 1px solid #1e2d4a;
    border-radius: 100px; padding: 8px 18px; font-size: 14px; font-weight: 500;
    cursor: pointer; transition: all .15s ease; white-space: nowrap;
    font-family: 'DM Sans', sans-serif; text-transform: capitalize;
  }
  .cat-btn:hover { color: #93c5fd; border-color: #3b82f6; }
  .cat-btn.active { background: #3b82f6; color: #fff; border-color: #3b82f6; }

  .search-input {
    background: #0d1321; border: 1px solid #1e2d4a; border-radius: 10px;
    color: #fff; padding: 10px 16px 10px 40px; font-size: 14px; width: 280px;
    outline: none; transition: border-color .2s; font-family: 'DM Sans', sans-serif;
  }
  .search-input:focus { border-color: #3b82f6; }
  .search-input::placeholder { color: #4a5a7a; }

  .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.6); z-index: 100; }
  .cart-sidebar {
    position: fixed; right: 0; top: 0; bottom: 0; width: 400px;
    background: #0d1321; border-left: 1px solid #1e2d4a; z-index: 101;
    display: flex; flex-direction: column; overflow: hidden;
  }

  .qty-btn {
    background: #1e2d4a; border: none; color: #fff; width: 28px; height: 28px;
    border-radius: 6px; cursor: pointer; display: flex; align-items: center;
    justify-content: center; transition: background .15s;
  }
  .qty-btn:hover { background: #3b82f6; }

  .wishlist-btn {
    background: rgba(255,255,255,.05); border: none; border-radius: 8px;
    width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: background .2s; flex-shrink: 0;
  }
  .wishlist-btn:hover { background: rgba(255,255,255,.12); }

  .toast {
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    background: #3b82f6; color: #fff; padding: 12px 28px; border-radius: 100px;
    font-size: 14px; font-weight: 600; z-index: 200;
    animation: slideUp .3s ease; font-family: 'Outfit', sans-serif; white-space: nowrap;
  }
  @keyframes slideUp {
    from { opacity:0; transform:translateX(-50%) translateY(20px); }
    to   { opacity:1; transform:translateX(-50%) translateY(0);    }
  }

  .hero-cta {
    background: #3b82f6; color: #fff; border: none; border-radius: 12px;
    padding: 14px 32px; font-size: 16px; font-weight: 700; cursor: pointer;
    display: inline-flex; align-items: center; gap: 8px;
    transition: background .2s, transform .15s; font-family: 'Outfit', sans-serif;
  }
  .hero-cta:hover { background: #2563eb; transform: scale(1.02); }

  .checkout-btn {
    background: linear-gradient(135deg,#3b82f6,#6366f1); color: #fff; border: none;
    border-radius: 12px; padding: 14px; font-size: 16px; font-weight: 700;
    cursor: pointer; width: 100%; transition: opacity .2s; font-family: 'Outfit', sans-serif;
  }
  .checkout-btn:hover { opacity: .88; }

  .footer-link { color: #4a5a7a; font-size: 14px; margin-bottom: 8px; cursor: pointer; transition: color .15s; }
  .footer-link:hover { color: #93c5fd; }

  @media (max-width: 768px) {
    .hero-stats { display: none !important; }
    .hero-title { font-size: 36px !important; }
    .search-input { width: 180px; }
    .footer-grid { grid-template-columns: 1fr 1fr !important; }
    .cart-sidebar { width: 100%; }
    .products-grid { grid-template-columns: 1fr 1fr !important; }
  }
  @media (max-width: 480px) {
    .products-grid { grid-template-columns: 1fr !important; }
    .search-input { display: none; }
  }
`

function ProductImage({ product }) {
  const theme = CAT_COLORS[product.category] || { bg: "#1e2d4a", accent: "#3b82f6" }
  return (
    <div style={{ background: theme.bg, height: 200, display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden" }}>
      <div style={{
        position:"absolute", width:200, height:200, borderRadius:"50%",
        background:`radial-gradient(circle, ${theme.accent}33, transparent 70%)`,
        top:"50%", left:"50%", transform:"translate(-50%,-50%)"
      }}/>
      <span style={{ fontSize: 72, lineHeight:1, zIndex:1, userSelect:"none" }}>
        {CAT_ICONS[product.category]}
      </span>
    </div>
  )
}

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [cart,     setCart]     = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlist, setWishlist] = useState([])
  const [search,   setSearch]   = useState("")
  const [toast,    setToast]    = useState(null)

  const filtered = PRODUCTS.filter(p =>
    (activeCategory === "all" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const cartCount = cart.reduce((s, i) => s + i.qty, 0)
  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)

  const addToCart = (product) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id)
      return ex
        ? prev.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
        : [...prev, { ...product, qty: 1 }]
    })
    showToast(`${product.name} added to cart!`)
  }

  const updateQty = (id, delta) =>
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i))

  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id))

  const toggleWishlist = (id) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  return (
    <>
      <style>{css}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        background:"rgba(8,11,20,.95)", borderBottom:"1px solid #1e2d4a",
        padding:"0 32px", height:64, display:"flex", alignItems:"center",
        justifyContent:"space-between", position:"sticky", top:0, zIndex:50,
        backdropFilter:"blur(12px)",
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ background:"#3b82f6", borderRadius:8, width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <Zap size={17} color="#fff" fill="#fff"/>
          </div>
          <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, letterSpacing:"-.5px" }}>
            Shop<span style={{ color:"#3b82f6" }}>Easy</span>
          </span>
        </div>

        <div style={{ position:"relative" }}>
          <Search size={15} color="#4a5a7a" style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)" }}/>
          <input className="search-input" placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)}/>
        </div>

        <div style={{ display:"flex", alignItems:"center", gap:24 }}>
          <span style={{ color:"#6b7fa3", fontSize:14, cursor:"pointer" }}>Deals</span>
          <span style={{ color:"#6b7fa3", fontSize:14, cursor:"pointer" }}>Support</span>
          <button onClick={() => setCartOpen(true)} style={{
            background:"transparent", border:"1px solid #1e2d4a", borderRadius:10,
            padding:"8px 16px", color:"#fff", cursor:"pointer",
            display:"flex", alignItems:"center", gap:8, position:"relative",
          }}>
            <ShoppingCart size={18}/>
            <span style={{ fontSize:14, fontWeight:500 }}>Cart</span>
            {cartCount > 0 && (
              <span style={{
                background:"#3b82f6", color:"#fff", borderRadius:"50%",
                width:20, height:20, fontSize:11, fontWeight:700,
                display:"flex", alignItems:"center", justifyContent:"center",
                position:"absolute", top:-8, right:-8,
              }}>{cartCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{
        background:"linear-gradient(135deg,#0d1321 0%,#0f1e3d 50%,#0d1321 100%)",
        padding:"64px 32px", position:"relative", overflow:"hidden",
        borderBottom:"1px solid #1e2d4a",
      }}>
        <div style={{
          position:"absolute", width:500, height:500, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(59,130,246,.12),transparent 70%)",
          top:-120, right:80, pointerEvents:"none",
        }}/>
        <div style={{
          position:"absolute", width:300, height:300, borderRadius:"50%",
          background:"radial-gradient(circle,rgba(99,102,241,.08),transparent 70%)",
          bottom:-80, left:160, pointerEvents:"none",
        }}/>

        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ maxWidth:580 }}>
            <div style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:"rgba(59,130,246,.12)", border:"1px solid rgba(59,130,246,.3)",
              borderRadius:100, padding:"4px 14px", marginBottom:20,
            }}>
              <Zap size={12} color="#3b82f6"/>
              <span style={{ color:"#93c5fd", fontSize:13, fontWeight:600 }}>Summer Sale — Up to 30% Off</span>
            </div>

            <h1 className="hero-title" style={{ fontSize:56, fontWeight:800, lineHeight:1.1, letterSpacing:"-1.5px", marginBottom:16 }}>
              Next-Gen Tech<br/>
              <span style={{ color:"#3b82f6" }}>At Your Fingertips</span>
            </h1>

            <p style={{ color:"#6b7fa3", fontSize:18, marginBottom:32, lineHeight:1.6 }}>
              Discover the latest smartphones, laptops, audio gear &amp; more.
              Free shipping on orders over $99.
            </p>

            <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
              <button className="hero-cta" onClick={() => { setActiveCategory("all"); setSearch("") }}>
                Shop Now <ChevronRight size={18}/>
              </button>
              <button style={{
                background:"transparent", border:"1px solid #1e2d4a", borderRadius:12,
                padding:"14px 28px", color:"#93c5fd", cursor:"pointer", fontSize:15,
                fontWeight:600, fontFamily:"'Outfit',sans-serif", transition:"border-color .2s",
              }}>View Deals</button>
            </div>
          </div>

          <div className="hero-stats" style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {[
              { label:"Products",         value:"10K+" },
              { label:"Happy Customers",  value:"500K+" },
              { label:"Brands",           value:"200+" },
            ].map(s => (
              <div key={s.label} style={{
                background:"rgba(255,255,255,.03)", border:"1px solid #1e2d4a",
                borderRadius:14, padding:"16px 32px", textAlign:"center",
              }}>
                <div style={{ fontFamily:"'Outfit',sans-serif", fontSize:28, fontWeight:800 }}>{s.value}</div>
                <div style={{ color:"#6b7fa3", fontSize:13 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <main style={{ maxWidth:1200, margin:"0 auto", padding:"48px 32px" }}>

        {/* Category tabs */}
        <div style={{ display:"flex", gap:10, marginBottom:36, flexWrap:"wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat === "all"
                ? "⚡ All Products"
                : `${CAT_ICONS[cat]} ${cat.charAt(0).toUpperCase() + cat.slice(1)}`}
            </button>
          ))}
        </div>

        <p style={{ color:"#4a5a7a", fontSize:14, marginBottom:24 }}>
          Showing{" "}
          <span style={{ color:"#93c5fd", fontWeight:600 }}>{filtered.length}</span> products
          {search && ` for "${search}"`}
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", padding:"80px 0", color:"#4a5a7a" }}>
            <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
            <p style={{ fontSize:18, fontFamily:"'Outfit',sans-serif", fontWeight:600 }}>No products found</p>
            <p style={{ fontSize:14, marginTop:8 }}>Try a different search or category</p>
          </div>
        ) : (
          <div className="products-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))", gap:24 }}>
            {filtered.map(p => {
              const discount = Math.round((1 - p.price / p.originalPrice) * 100)
              return (
                <div key={p.id} className="product-card">
                  <div style={{ position:"relative" }}>
                    <ProductImage product={p}/>
                    {p.badge && (
                      <span style={{
                        position:"absolute", top:12, left:12,
                        background: BADGE_COLORS[p.badge] || "#3b82f6",
                        color:"#fff", borderRadius:6, padding:"3px 10px",
                        fontSize:11, fontWeight:700, fontFamily:"'Outfit',sans-serif",
                        textTransform:"uppercase", letterSpacing:".5px",
                      }}>{p.badge}</span>
                    )}
                    <button className="wishlist-btn" style={{ position:"absolute", top:12, right:12 }}
                      onClick={() => toggleWishlist(p.id)}>
                      <Heart size={16}
                        color={wishlist.includes(p.id) ? "#ef4444" : "#6b7fa3"}
                        fill={wishlist.includes(p.id)  ? "#ef4444" : "none"}/>
                    </button>
                  </div>

                  <div style={{ padding:16 }}>
                    <p style={{ color:"#4a5a7a", fontSize:12, textTransform:"capitalize", marginBottom:4 }}>
                      {p.category}
                    </p>
                    <h3 style={{ fontSize:16, fontWeight:700, marginBottom:8 }}>{p.name}</h3>

                    <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
                      <div style={{ display:"flex", gap:2 }}>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} color="#f59e0b"
                            fill={i < Math.round(p.rating) ? "#f59e0b" : "none"}/>
                        ))}
                      </div>
                      <span style={{ color:"#6b7fa3", fontSize:12 }}>
                        {p.rating} ({p.reviews.toLocaleString()})
                      </span>
                    </div>

                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
                      <div>
                        <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:22, fontWeight:800, color:"#3b82f6" }}>
                          ${p.price.toLocaleString()}
                        </span>
                        <span style={{ color:"#4a5a7a", fontSize:13, textDecoration:"line-through", marginLeft:8 }}>
                          ${p.originalPrice.toLocaleString()}
                        </span>
                      </div>
                      <span style={{ color:"#22c55e", fontSize:12, fontWeight:600 }}>-{discount}%</span>
                    </div>

                    <button className="add-btn" onClick={() => addToCart(p)}>Add to Cart</button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background:"#0d1321", borderTop:"1px solid #1e2d4a", padding:"48px 32px 24px", marginTop:32 }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <div className="footer-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr", gap:32, marginBottom:40 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                <div style={{ background:"#3b82f6", borderRadius:8, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Zap size={14} color="#fff" fill="#fff"/>
                </div>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:20, fontWeight:800 }}>
                  Shop<span style={{ color:"#3b82f6" }}>Easy</span>
                </span>
              </div>
              <p style={{ color:"#4a5a7a", fontSize:14, lineHeight:1.7, maxWidth:260 }}>
                Your one-stop destination for the latest electronics and tech accessories.
              </p>
            </div>
            {[
              { title:"Shop",    links:["Smartphones","Laptops","Audio","Cameras"] },
              { title:"Company", links:["About Us","Blog","Careers","Press"]       },
              { title:"Support", links:["Help Center","Returns","Shipping","Contact"] },
            ].map(col => (
              <div key={col.title}>
                <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:14, marginBottom:16 }}>{col.title}</p>
                {col.links.map(l => (
                  <p key={l} className="footer-link">{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop:"1px solid #1e2d4a", paddingTop:24, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12 }}>
            <p style={{ color:"#4a5a7a", fontSize:13 }}>© 2024 ShopEasy. All rights reserved.</p>
            <p style={{ color:"#4a5a7a", fontSize:13 }}>Built with React · Deployed on Vercel</p>
          </div>
        </div>
      </footer>

      {/* ── CART SIDEBAR ── */}
      {cartOpen && (
        <>
          <div className="cart-overlay" onClick={() => setCartOpen(false)}/>
          <div className="cart-sidebar">
            <div style={{ padding:"20px 24px", borderBottom:"1px solid #1e2d4a", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <ShoppingCart size={20} color="#3b82f6"/>
                <span style={{ fontFamily:"'Outfit',sans-serif", fontSize:18, fontWeight:700 }}>Cart ({cartCount})</span>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background:"transparent", border:"none", color:"#6b7fa3", cursor:"pointer" }}>
                <X size={20}/>
              </button>
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:"16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 0", color:"#4a5a7a" }}>
                  <ShoppingCart size={40} color="#1e2d4a" style={{ margin:"0 auto 16px" }}/>
                  <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, marginBottom:8 }}>Cart is empty</p>
                  <p style={{ fontSize:13 }}>Add some products to get started</p>
                </div>
              ) : cart.map(item => (
                <div key={item.id} style={{ display:"flex", gap:12, padding:"16px 0", borderBottom:"1px solid #1e2d4a" }}>
                  <div style={{
                    background: CAT_COLORS[item.category]?.bg || "#1e2d4a",
                    borderRadius:10, width:56, height:56,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:24, flexShrink:0,
                  }}>{CAT_ICONS[item.category]}</div>

                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontFamily:"'Outfit',sans-serif", fontWeight:600, fontSize:14, marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                      {item.name}
                    </p>
                    <p style={{ color:"#3b82f6", fontWeight:700, fontSize:15, marginBottom:8, fontFamily:"'Outfit',sans-serif" }}>
                      ${(item.price * item.qty).toLocaleString()}
                    </p>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}><Minus size={12}/></button>
                      <span style={{ fontSize:14, fontWeight:600, minWidth:20, textAlign:"center" }}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, +1)}><Plus size={12}/></button>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item.id)} style={{ background:"transparent", border:"none", color:"#4a5a7a", cursor:"pointer", alignSelf:"flex-start", padding:4 }}>
                    <X size={14}/>
                  </button>
                </div>
              ))}
            </div>

            {cart.length > 0 && (
              <div style={{ padding:"20px 24px", borderTop:"1px solid #1e2d4a", flexShrink:0 }}>
                {[["Subtotal", `$${cartTotal.toLocaleString()}`],["Shipping","Free"]].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                    <span style={{ color:"#6b7fa3", fontSize:14 }}>{k}</span>
                    <span style={{ fontSize:14, color: k==="Shipping" ? "#22c55e" : "#fff", fontWeight: k==="Shipping" ? 600:400 }}>{v}</span>
                  </div>
                ))}
                <div style={{ display:"flex", justifyContent:"space-between", padding:"12px 0", borderTop:"1px solid #1e2d4a", marginBottom:16 }}>
                  <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:700, fontSize:16 }}>Total</span>
                  <span style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:20, color:"#3b82f6" }}>
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>
                <button className="checkout-btn" onClick={() => { setCartOpen(false); showToast("Order placed! Thank you 🎉") }}>
                  Checkout →
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {toast && <div className="toast">✓ {toast}</div>}
    </>
  )
}
