const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const CART_STORAGE_KEY = "forge-customs-cart";
const INQUIRY_STORAGE_KEY = "forge-customs-inquiries";
const INQUIRY_EMAIL_ADDRESS = "hello@forgecustoms.com";
const CUSTOM_BUILD_IMAGE = "assets/images/forge-builder-chassis.jpg";
const CUSTOM_BUILD_BASE_PRICE = 1290;
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled]):not([type='hidden'])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "[tabindex]:not([tabindex='-1'])"
].join(", ");

const products = {
  iridium: {
    id: "iridium",
    name: "The Iridium",
    eyebrow: "Workstation Class",
    price: 6990,
    priceLabel: "From $6,990",
    image: "assets/images/forge-system-white-tower.jpg",
    imageAlt: "White custom tower with a minimalist case and warm internal cooling fan",
    summary: "64GB DDR5 | 4TB NVMe Gen5",
    description: "A halo-class workstation and gaming tower built around the newest flagship silicon, tuned for cinematic 4K play, demanding render loads, and a cleaner monochrome presentation.",
    specs: [
      "GeForce RTX 5090 graphics",
      "AMD Ryzen 9 9950X3D processor",
      "64GB DDR5 memory and 4TB Gen5 NVMe storage",
      "White tower chassis with tuned airflow and restrained lighting"
    ]
  },
  ghost: {
    id: "ghost",
    name: "The Ghost",
    eyebrow: "Signature White",
    price: 4790,
    priceLabel: "From $4,790",
    image: "assets/images/forge-hero-white-build.jpg",
    imageAlt: "All-white custom PC build with glass side panel and bright internal lighting",
    summary: "32GB DDR5 | 2TB NVMe Gen5",
    description: "The signature all-white showcase system refreshed around current-gen enthusiast hardware for premium 4K gaming, creator throughput, and a more architectural desk presence.",
    specs: [
      "GeForce RTX 5080 graphics",
      "Intel Core Ultra 9 285K processor",
      "32GB DDR5 memory and 2TB Gen5 NVMe storage",
      "Glass-forward white chassis with cleaner internal lighting"
    ]
  },
  pearl: {
    id: "pearl",
    name: "The Pearl",
    eyebrow: "Compact Performance",
    price: 3390,
    priceLabel: "From $3,390",
    image: "assets/images/forge-system-rgb-tower.jpg",
    imageAlt: "Compact white PC tower with colorful internal lighting on a dark desk",
    summary: "32GB DDR5 | 2TB NVMe",
    description: "A smaller-footprint system with stronger visual contrast, compact proportions, and current-gen Radeon power for high-refresh gaming and mixed creator use.",
    specs: [
      "Radeon RX 9070 XT graphics",
      "AMD Ryzen 7 9850X3D processor",
      "32GB DDR5 memory and 2TB NVMe storage",
      "Compact white case with RGB interior and darker outer shell"
    ]
  }
};

const builderCatalog = {
  focus: {
    "Competitive Gaming": { label: "Competitive Gaming", price: 0, inquiryFocus: "High-end gaming" },
    "4K Showcase": { label: "4K Showcase", price: 120, inquiryFocus: "Luxury showcase build" },
    "Creator Studio": { label: "Creator Studio", price: 180, inquiryFocus: "Streaming and editing" },
    "Rendering Workstation": { label: "Rendering Workstation", price: 260, inquiryFocus: "Workstation rendering" },
    "Compact Hybrid": { label: "Compact Hybrid", price: 80, inquiryFocus: "Compact custom build" }
  },
  cpu: {
    "ryzen-7-9800x3d": { label: "AMD Ryzen 7 9800X3D", price: 480 },
    "ryzen-7-9850x3d": { label: "AMD Ryzen 7 9850X3D", price: 530 },
    "ryzen-9-9900x": { label: "AMD Ryzen 9 9900X", price: 500 },
    "ryzen-9-9900x3d": { label: "AMD Ryzen 9 9900X3D", price: 620 },
    "ryzen-9-9950x": { label: "AMD Ryzen 9 9950X", price: 650 },
    "ryzen-9-9950x3d": { label: "AMD Ryzen 9 9950X3D", price: 760 },
    "intel-core-ultra-5-245k": { label: "Intel Core Ultra 5 245K", price: 330 },
    "intel-core-ultra-7-265k": { label: "Intel Core Ultra 7 265K", price: 430 },
    "intel-core-ultra-9-285k": { label: "Intel Core Ultra 9 285K", price: 620 }
  },
  gpu: {
    "rtx-5050": { label: "GeForce RTX 5050", price: 320 },
    "rtx-5060": { label: "GeForce RTX 5060", price: 390 },
    "rtx-5060-ti": { label: "GeForce RTX 5060 Ti", price: 490 },
    "rtx-5070": { label: "GeForce RTX 5070", price: 620 },
    "rtx-5070-ti": { label: "GeForce RTX 5070 Ti", price: 820 },
    "rtx-5080": { label: "GeForce RTX 5080", price: 1190 },
    "rtx-5090": { label: "GeForce RTX 5090", price: 2280 },
    "radeon-rx-9060": { label: "Radeon RX 9060", price: 340 },
    "radeon-rx-9060-xt": { label: "Radeon RX 9060 XT", price: 430 },
    "radeon-rx-9070": { label: "Radeon RX 9070", price: 650 },
    "radeon-rx-9070-xt": { label: "Radeon RX 9070 XT", price: 790 },
    "intel-arc-b570": { label: "Intel Arc B570", price: 240 },
    "intel-arc-b580": { label: "Intel Arc B580", price: 320 }
  },
  memory: {
    "32gb-ddr5": { label: "32GB DDR5", price: 180 },
    "64gb-ddr5": { label: "64GB DDR5", price: 320 },
    "96gb-ddr5": { label: "96GB DDR5", price: 470 },
    "128gb-ddr5": { label: "128GB DDR5", price: 650 }
  },
  storage: {
    "2tb-gen4": { label: "2TB Gen4 NVMe", price: 180 },
    "4tb-gen4": { label: "4TB Gen4 NVMe", price: 320 },
    "4tb-gen5": { label: "4TB Gen5 NVMe", price: 480 },
    "8tb-mixed": { label: "8TB Mixed NVMe Array", price: 860 }
  },
  cooling: {
    "360mm-aio": { label: "360mm AIO Liquid Cooling", price: 240 },
    "performance-air": { label: "Performance Air Cooling", price: 120 },
    "soft-tube-loop": { label: "Soft Tube Custom Loop", price: 720 },
    "hardline-loop": { label: "Hardline Custom Loop", price: 980 }
  },
  case: {
    "atelier-mid": { label: "Atelier Mid Tower", price: 280 },
    "panorama-glass": { label: "Panorama Glass Tower", price: 340 },
    "studio-compact": { label: "Studio Compact Chassis", price: 220 },
    "monolith-full": { label: "Monolith Full Tower", price: 420 }
  },
  finish: {
    "frost-white": { label: "Frost White", price: 0 },
    "satin-black": { label: "Satin Black", price: 80 },
    "champagne-metal": { label: "Champagne Metal", price: 160 },
    "graphite-dual-tone": { label: "Graphite Dual-Tone", price: 140 }
  }
};

const builderSpecOrder = [
  { key: "cpu", label: "Processor" },
  { key: "gpu", label: "Graphics" },
  { key: "memory", label: "Memory" },
  { key: "storage", label: "Storage" },
  { key: "cooling", label: "Cooling" },
  { key: "case", label: "Chassis" },
  { key: "finish", label: "Finish" }
];

const siteHeader = document.getElementById("siteHeader");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const cartBtn = document.getElementById("cartBtn");
const cartCount = document.getElementById("cartCount");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartCloseBtn = document.getElementById("cartCloseBtn");
const cartItems = document.getElementById("cartItems");
const cartEmpty = document.getElementById("cartEmpty");
const cartSubtotal = document.getElementById("cartSubtotal");
const clearCartBtn = document.getElementById("clearCartBtn");
const cartInquiryBtn = document.getElementById("cartInquiryBtn");
const dialogBackdrop = document.getElementById("dialogBackdrop");
const productDialog = document.getElementById("productDialog");
const productDialogClose = document.getElementById("productDialogClose");
const productDialogImage = document.getElementById("productDialogImage");
const productDialogTitle = document.getElementById("productDialogTitle");
const productDialogEyebrow = document.getElementById("productDialogEyebrow");
const productDialogDescription = document.getElementById("productDialogDescription");
const productDialogSpecs = document.getElementById("productDialogSpecs");
const productDialogPrice = document.getElementById("productDialogPrice");
const productDialogAdd = document.getElementById("productDialogAdd");
const productDialogInquiry = document.getElementById("productDialogInquiry");
const inquiryDialog = document.getElementById("inquiryDialog");
const inquiryDialogClose = document.getElementById("inquiryDialogClose");
const inquiryForm = document.getElementById("inquiryForm");
const inquiryContext = document.getElementById("inquiryContext");
const inquiryCartSummary = document.getElementById("inquiryCartSummary");
const inquiryUseCartBtn = document.getElementById("inquiryUseCartBtn");
const inquirySuccess = document.getElementById("inquirySuccess");
const inquirySuccessLead = document.getElementById("inquirySuccessLead");
const inquirySuccessSummary = document.getElementById("inquirySuccessSummary");
const inquiryEmailBtn = document.getElementById("inquiryEmailBtn");
const inquiryCopyBtn = document.getElementById("inquiryCopyBtn");
const inquiryDownloadBtn = document.getElementById("inquiryDownloadBtn");
const inquirySuccessClose = document.getElementById("inquirySuccessClose");
const siteToast = document.getElementById("siteToast");
const customBuilderForm = document.getElementById("customBuilderForm");
const customBuilderInquiryBtn = document.getElementById("customBuilderInquiryBtn");
const customBuilderTitle = document.getElementById("customBuilderTitle");
const customBuilderLead = document.getElementById("customBuilderLead");
const customBuilderPrice = document.getElementById("customBuilderPrice");
const customBuilderMeta = document.getElementById("customBuilderMeta");
const customBuilderSpecs = document.getElementById("customBuilderSpecs");
const customBuilderLeadTime = document.getElementById("customBuilderLeadTime");

let cart = loadCart();
let activeProductId = null;
let toastTimerId = null;
let activeFocusTrap = null;
let lastFocusedElement = null;
let preparedInquiry = null;

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return replacements[character];
  });
}

function toPositiveInteger(value, fallback = 1) {
  const parsed = Number.parseInt(value, 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function normalizeCartItem(item) {
  if (!item || typeof item !== "object") {
    return null;
  }

  const quantity = toPositiveInteger(item.quantity, 1);

  if (item.type === "custom") {
    if (
      typeof item.id !== "string" ||
      typeof item.name !== "string" ||
      typeof item.summary !== "string" ||
      typeof item.image !== "string" ||
      !item.image.startsWith("assets/") ||
      !Number.isFinite(item.price)
    ) {
      return null;
    }

    return {
      type: "custom",
      id: item.id,
      quantity,
      name: item.name.trim(),
      summary: item.summary.trim(),
      price: item.price,
      image: item.image.trim(),
      specs: Array.isArray(item.specs)
        ? item.specs.filter((spec) => typeof spec === "string").slice(0, 10)
        : [],
      leadTime: typeof item.leadTime === "string" ? item.leadTime.trim() : ""
    };
  }

  if (typeof item.id === "string" && products[item.id]) {
    return { id: item.id, quantity };
  }

  return null;
}

function loadCart() {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.map(normalizeCartItem).filter(Boolean)
      : [];
  } catch {
    return [];
  }
}

function saveCart() {
  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}

function getCartItemData(item) {
  if (item?.type === "custom") {
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      priceLabel: formatCurrency(item.price),
      image: item.image || CUSTOM_BUILD_IMAGE,
      summary: item.summary,
      description: item.summary,
      specs: item.specs || [],
      leadTime: item.leadTime || ""
    };
  }

  const product = products[item?.id];
  return product || null;
}

function getCartItemCount() {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
  return cart.reduce((total, item) => {
    const itemData = getCartItemData(item);
    return total + (itemData ? itemData.price * item.quantity : 0);
  }, 0);
}

function hasVisibleOverlay() {
  return (
    mobileMenu?.classList.contains("is-open") ||
    cartDrawer?.classList.contains("is-open") ||
    !productDialog?.hidden ||
    !inquiryDialog?.hidden
  );
}

function rememberFocusTrigger() {
  if (hasVisibleOverlay()) return;

  if (document.activeElement instanceof HTMLElement) {
    lastFocusedElement = document.activeElement;
  }
}

function restoreFocusTrigger() {
  if (lastFocusedElement instanceof HTMLElement && lastFocusedElement.isConnected) {
    lastFocusedElement.focus();
  }
}

function getFocusableElements(container) {
  if (!(container instanceof HTMLElement)) {
    return [];
  }

  return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
    if (!(element instanceof HTMLElement)) {
      return false;
    }

    return !element.hidden && element.getAttribute("aria-hidden") !== "true" && element.getClientRects().length > 0;
  });
}

function setFocusTrap(container, preferredFocus = null) {
  if (!(container instanceof HTMLElement)) return;

  activeFocusTrap = container;
  const focusTarget =
    preferredFocus instanceof HTMLElement && preferredFocus.isConnected
      ? preferredFocus
      : getFocusableElements(container)[0] || container;

  window.requestAnimationFrame(() => {
    if (focusTarget instanceof HTMLElement) {
      focusTarget.focus();
    }
  });
}

function clearFocusTrap({ restoreFocus = false } = {}) {
  activeFocusTrap = null;

  if (restoreFocus) {
    window.requestAnimationFrame(restoreFocusTrigger);
  }
}

function trapFocus(event) {
  if (event.key !== "Tab" || !(activeFocusTrap instanceof HTMLElement)) return;

  const focusable = getFocusableElements(activeFocusTrap);
  if (!focusable.length) {
    event.preventDefault();
    activeFocusTrap.focus();
    return;
  }

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
    return;
  }

  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function syncHeaderState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 20);
}

function syncBodyLock() {
  document.body.classList.toggle("menu-open", hasVisibleOverlay());
}

function setMobileMenu(open, { restoreFocus = true } = {}) {
  if (!menuBtn || !mobileMenu) return;

  if (open) {
    rememberFocusTrigger();
  }

  mobileMenu.classList.toggle("is-open", open);
  menuBtn.classList.toggle("is-open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  mobileMenu.setAttribute("aria-hidden", String(!open));

  if (open) {
    setFocusTrap(mobileMenu, mobileMenu.querySelector("a"));
  } else if (activeFocusTrap === mobileMenu) {
    clearFocusTrap({ restoreFocus });
  }

  syncBodyLock();
}

function openCart() {
  if (!cartDrawer || !cartBackdrop || !cartBtn) return;

  rememberFocusTrigger();
  setMobileMenu(false, { restoreFocus: false });
  closeDialogs({ restoreFocus: false });
  cartBackdrop.hidden = false;
  cartDrawer.classList.add("is-open");
  cartDrawer.setAttribute("aria-hidden", "false");
  cartBtn.setAttribute("aria-expanded", "true");
  setFocusTrap(cartDrawer, cartCloseBtn);
  syncBodyLock();
}

function closeCart({ restoreFocus = true } = {}) {
  if (!cartDrawer || !cartBackdrop || !cartBtn) return;
  cartBackdrop.hidden = true;
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartBtn.setAttribute("aria-expanded", "false");

  if (activeFocusTrap === cartDrawer) {
    clearFocusTrap({ restoreFocus });
  }

  syncBodyLock();
}

function openDialog(dialog) {
  if (!dialog || !dialogBackdrop) return;

  rememberFocusTrigger();
  setMobileMenu(false, { restoreFocus: false });
  closeCart({ restoreFocus: false });

  if (activeFocusTrap && activeFocusTrap !== dialog) {
    clearFocusTrap();
  }

  if (productDialog) {
    productDialog.hidden = true;
  }
  if (inquiryDialog) {
    inquiryDialog.hidden = true;
  }

  dialog.hidden = false;
  dialogBackdrop.hidden = false;
  setFocusTrap(
    dialog,
    dialog === inquiryDialog ? inquiryForm?.querySelector("input[name='name']") : productDialogClose
  );
  syncBodyLock();
}

function closeDialogs({ restoreFocus = true } = {}) {
  if (dialogBackdrop) {
    dialogBackdrop.hidden = true;
  }
  if (productDialog) {
    productDialog.hidden = true;
  }
  if (inquiryDialog) {
    inquiryDialog.hidden = true;
  }

  if (activeFocusTrap === productDialog || activeFocusTrap === inquiryDialog) {
    clearFocusTrap({ restoreFocus });
  }

  syncBodyLock();
}

function showToast(message) {
  if (!siteToast) return;

  window.clearTimeout(toastTimerId);
  siteToast.textContent = message;
  siteToast.hidden = false;

  toastTimerId = window.setTimeout(() => {
    siteToast.hidden = true;
  }, 2200);
}

function renderCart() {
  if (!cartItems || !cartEmpty || !cartSubtotal || !cartCount) return;

  const itemCount = getCartItemCount();
  const subtotal = getCartSubtotal();

  cartCount.textContent = String(itemCount);
  cartCount.hidden = itemCount === 0;
  cartSubtotal.textContent = formatCurrency(subtotal);
  cartEmpty.hidden = cart.length > 0;

  if (clearCartBtn) {
    clearCartBtn.disabled = cart.length === 0;
  }
  if (cartInquiryBtn) {
    cartInquiryBtn.disabled = cart.length === 0;
  }

  if (!cart.length) {
    cartItems.innerHTML = "";
    return;
  }

  cartItems.innerHTML = cart
    .map((item) => {
      const itemData = getCartItemData(item);
      if (!itemData) {
        return "";
      }

      const leadTimeMarkup =
        item.type === "custom" && itemData.leadTime
          ? `<p class="cart-item__meta">Estimated lead time: ${escapeHtml(itemData.leadTime)}</p>`
          : "";

      return `
        <article class="cart-item">
          <img class="cart-item__image" src="${escapeHtml(itemData.image)}" alt="${escapeHtml(itemData.name)}">
          <div class="cart-item__body">
            <h3 class="cart-item__title">${escapeHtml(itemData.name)}</h3>
            <p class="cart-item__meta">${escapeHtml(itemData.summary)}</p>
            <p class="cart-item__meta">${escapeHtml(formatCurrency(itemData.price))} each</p>
            ${leadTimeMarkup}
            <div class="cart-item__controls">
              <div class="cart-item__quantity" aria-label="Quantity controls for ${escapeHtml(itemData.name)}">
                <button type="button" data-cart-decrement="${escapeHtml(item.id)}" aria-label="Decrease quantity">-</button>
                <span>${item.quantity}</span>
                <button type="button" data-cart-increment="${escapeHtml(item.id)}" aria-label="Increase quantity">+</button>
              </div>
              <button class="cart-item__remove" type="button" data-cart-remove="${escapeHtml(item.id)}">Remove</button>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function addToCart(productId, quantity = 1) {
  const product = products[productId];
  if (!product) return;

  const existing = cart.find((item) => item.id === productId && item.type !== "custom");

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  saveCart();
  renderCart();
  showToast(`${product.name} added to cart.`);
}

function addCustomBuildToCart(build) {
  if (!build) return;

  const customItem = {
    type: "custom",
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    quantity: 1,
    name: build.name,
    summary: build.summary,
    price: build.total,
    image: CUSTOM_BUILD_IMAGE,
    specs: build.specs.map((item) => `${item.label}: ${item.value}`),
    leadTime: build.leadTime
  };

  cart.unshift(customItem);
  saveCart();
  renderCart();
  showToast("Custom build added to cart.");
}

function updateCartQuantity(itemId, nextQuantity) {
  const item = cart.find((entry) => entry.id === itemId);
  if (!item) return;

  if (nextQuantity <= 0) {
    removeFromCart(itemId);
    return;
  }

  item.quantity = nextQuantity;
  saveCart();
  renderCart();
}

function removeFromCart(itemId) {
  const item = cart.find((entry) => entry.id === itemId);
  const itemData = item ? getCartItemData(item) : null;

  cart = cart.filter((entry) => entry.id !== itemId);
  saveCart();
  renderCart();

  if (itemData) {
    showToast(`${itemData.name} removed from cart.`);
  }
}

function openProductDialog(productId) {
  const product = products[productId];
  if (!product) return;

  activeProductId = productId;
  productDialogImage.src = product.image;
  productDialogImage.alt = product.imageAlt || `${product.name} product detail`;
  productDialogTitle.textContent = product.name;
  productDialogEyebrow.textContent = product.eyebrow;
  productDialogDescription.textContent = product.description;
  productDialogPrice.textContent = product.priceLabel;
  productDialogSpecs.innerHTML = product.specs.map((spec) => `<li>${escapeHtml(spec)}</li>`).join("");
  openDialog(productDialog);
}

function getCartSummaryText() {
  if (!cart.length) {
    return "No cart items selected yet.";
  }

  return cart
    .map((item) => {
      const itemData = getCartItemData(item);
      if (!itemData) {
        return "";
      }

      return item.type === "custom"
        ? `${itemData.name} (${itemData.summary}) x${item.quantity}`
        : `${itemData.name} x${item.quantity}`;
    })
    .filter(Boolean)
    .join(", ");
}

function loadInquiryHistory() {
  try {
    const raw = window.localStorage.getItem(INQUIRY_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((item) => item && typeof item === "object") : [];
  } catch {
    return [];
  }
}

function saveInquiryRecord(payload) {
  try {
    const history = loadInquiryHistory().slice(0, 14);
    history.unshift(payload);
    window.localStorage.setItem(INQUIRY_STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Ignore storage errors so the request handoff can still continue.
  }
}

function formatContextLabel(context) {
  if (!context) return "General inquiry";

  return String(context)
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildInquiryPayload() {
  if (!inquiryForm) return null;

  const formData = new FormData(inquiryForm);
  return {
    submittedAt: new Date().toISOString(),
    context: String(formData.get("context") || "general"),
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    focus: String(formData.get("focus") || "").trim(),
    budget: String(formData.get("budget") || "").trim(),
    notes: String(formData.get("notes") || "").trim(),
    cartSummary: cart.length ? getCartSummaryText() : "",
    cartSubtotal: cart.length ? formatCurrency(getCartSubtotal()) : ""
  };
}

function formatInquiryRequest(payload) {
  if (!payload) return "";

  const submittedAt = new Date(payload.submittedAt).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short"
  });

  const lines = [
    "FORGE CUSTOMS Build Request",
    `Submitted: ${submittedAt}`,
    `Request type: ${formatContextLabel(payload.context)}`,
    `Client name: ${payload.name || "Not provided"}`,
    `Client email: ${payload.email || "Not provided"}`,
    `Build focus: ${payload.focus || "Not provided"}`,
    `Budget range: ${payload.budget || "Not provided"}`
  ];

  if (payload.cartSummary) {
    lines.push(`Cart items: ${payload.cartSummary}`);
  }

  if (payload.cartSubtotal) {
    lines.push(`Cart subtotal: ${payload.cartSubtotal}`);
  }

  if (payload.notes) {
    lines.push("", "Notes:", payload.notes);
  }

  return lines.join("\n");
}

function updateInquirySuccessUI(payload) {
  if (!payload || !inquirySuccessLead || !inquirySuccessSummary) return;

  inquirySuccessLead.textContent = `Prepared for ${payload.name || "your client"} with ${
    payload.focus || "a custom build"
  } in the ${payload.budget || "open"} range.`;
  inquirySuccessSummary.textContent = formatInquiryRequest(payload);
}

function getInquiryEmailHref(payload) {
  const subject = encodeURIComponent(
    `FORGE build request | ${payload.name || "Prospective client"} | ${payload.focus || "Custom build"}`
  );
  const body = encodeURIComponent(formatInquiryRequest(payload));
  return `mailto:${INQUIRY_EMAIL_ADDRESS}?subject=${subject}&body=${body}`;
}

function openPreparedInquiryEmail() {
  if (!preparedInquiry) return;

  window.location.href = getInquiryEmailHref(preparedInquiry);
  showToast("Email draft opened.");
}

async function copyPreparedInquiry() {
  if (!preparedInquiry) return;

  const requestText = formatInquiryRequest(preparedInquiry);

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(requestText);
    } else {
      const helper = document.createElement("textarea");
      helper.value = requestText;
      helper.setAttribute("readonly", "");
      helper.style.position = "fixed";
      helper.style.opacity = "0";
      document.body.append(helper);
      helper.select();
      document.execCommand("copy");
      helper.remove();
    }

    showToast("Request copied to clipboard.");
  } catch {
    showToast("Clipboard copy failed. Try downloading the brief.");
  }
}

function downloadPreparedInquiry() {
  if (!preparedInquiry) return;

  const slug = (preparedInquiry.name || "build-request")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const filename = `forge-build-request-${slug || "client"}-${preparedInquiry.submittedAt.slice(0, 10)}.txt`;
  const file = new Blob([formatInquiryRequest(preparedInquiry)], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
  showToast("Request brief downloaded.");
}

function setSelectValue(field, value) {
  if (!(field instanceof HTMLSelectElement) || !value) return;

  const option = Array.from(field.options).find((item) => item.value === value || item.text === value);
  if (option) {
    field.value = option.value;
  }
}

function getBudgetRangeForPrice(price) {
  if (price < 3000) return "$2,000 - $3,000";
  if (price < 4500) return "$3,000 - $4,500";
  if (price < 6000) return "$4,500 - $6,000";
  return "$6,000+";
}

function openInquiryDialog(context = "general", productId = null, prefill = null) {
  if (!inquiryForm || !inquiryContext) return;

  inquiryForm.hidden = false;
  inquirySuccess.hidden = true;
  preparedInquiry = null;
  inquiryForm.reset();

  if (inquirySuccessLead) {
    inquirySuccessLead.textContent =
      "Your build brief is prepared. Open the email draft, copy the request, or download it for handoff.";
  }
  if (inquirySuccessSummary) {
    inquirySuccessSummary.textContent = "";
  }

  const notesField = inquiryForm.elements.namedItem("notes");
  const focusField = inquiryForm.elements.namedItem("focus");
  const budgetField = inquiryForm.elements.namedItem("budget");

  inquiryContext.value = context;

  if (productId && products[productId]) {
    const product = products[productId];
    notesField.value = `Interested in ${product.name}. ${product.summary}.`;
    setSelectValue(focusField, "Luxury showcase build");
  }

  if (prefill?.notes) {
    notesField.value = prefill.notes;
  }

  if (prefill?.focus) {
    setSelectValue(focusField, prefill.focus);
  }

  if (prefill?.budget) {
    setSelectValue(budgetField, prefill.budget);
  }

  if (context === "cart") {
    inquiryCartSummary.hidden = false;
    inquiryCartSummary.textContent = `Cart items: ${getCartSummaryText()}`;
  } else {
    inquiryCartSummary.hidden = cart.length === 0;
    inquiryCartSummary.textContent = cart.length
      ? `Current cart: ${getCartSummaryText()}`
      : "";
  }

  inquiryUseCartBtn.hidden = cart.length === 0;
  openDialog(inquiryDialog);
}

function applyCartToInquiry() {
  if (!inquiryForm || !cart.length) {
    showToast("Your cart is currently empty.");
    return;
  }

  const notesField = inquiryForm.elements.namedItem("notes");
  const summary = `Cart selection: ${getCartSummaryText()}.`;

  notesField.value = notesField.value
    ? `${notesField.value}\n${summary}`
    : summary;

  inquiryCartSummary.hidden = false;
  inquiryCartSummary.textContent = summary;
  showToast("Cart items added to inquiry.");
}

function handleInquirySubmit(event) {
  event.preventDefault();

  const payload = buildInquiryPayload();
  if (!payload) return;

  preparedInquiry = payload;
  saveInquiryRecord(payload);
  updateInquirySuccessUI(payload);
  inquiryForm.hidden = true;
  inquirySuccess.hidden = false;
  setFocusTrap(inquiryDialog, inquiryEmailBtn || inquirySuccessClose);
  showToast("Build request prepared.");
}

function getBuilderOption(groupKey, value) {
  const group = builderCatalog[groupKey];
  if (!group) return null;

  if (value && group[value]) {
    return { id: value, ...group[value] };
  }

  const [fallbackId] = Object.keys(group);
  return fallbackId ? { id: fallbackId, ...group[fallbackId] } : null;
}

function getCurrentBuilderSelections() {
  if (!customBuilderForm) return null;

  const formData = new FormData(customBuilderForm);
  return Object.keys(builderCatalog).reduce((config, groupKey) => {
    config[groupKey] = getBuilderOption(groupKey, formData.get(groupKey));
    return config;
  }, {});
}

function getBuilderLeadTime(selections) {
  if (!selections) return "8-12 business days";

  if (selections.cooling?.id === "hardline-loop") {
    return "14-21 business days";
  }

  if (selections.cooling?.id === "soft-tube-loop") {
    return "12-16 business days";
  }

  if (selections.case?.id === "studio-compact") {
    return "7-10 business days";
  }

  if (selections.case?.id === "monolith-full" || selections.finish?.id === "champagne-metal") {
    return "10-14 business days";
  }

  return "8-12 business days";
}

function buildCustomConfiguration() {
  const selections = getCurrentBuilderSelections();
  if (!selections) return null;

  const total =
    CUSTOM_BUILD_BASE_PRICE +
    Object.values(selections).reduce((sum, item) => sum + (item?.price || 0), 0);

  const leadTime = getBuilderLeadTime(selections);
  const focusLabel = selections.focus?.label || "Custom Build";
  const summary = [
    selections.gpu?.label,
    selections.cpu?.label,
    selections.memory?.label,
    selections.storage?.label
  ]
    .filter(Boolean)
    .join(" | ");

  const specs = builderSpecOrder.map((item) => ({
    label: item.label,
    value: selections[item.key]?.label || ""
  }));

  return {
    name: `FORGE Custom | ${focusLabel}`,
    title: "FORGE Custom Build",
    lead: `${focusLabel} | ${selections.case?.label || "Custom Chassis"}`,
    summary,
    total,
    leadTime,
    budget: getBudgetRangeForPrice(total),
    inquiryFocus: selections.focus?.inquiryFocus || "Luxury showcase build",
    meta: `Includes ${selections.cooling?.label || "premium cooling"}, artisan assembly, 72-hour burn-in, and premium packaging.`,
    specs,
    inquiryNotes: [
      `Custom build target: ${focusLabel}`,
      `Estimated total: ${formatCurrency(total)}`,
      `Processor: ${selections.cpu?.label || ""}`,
      `Graphics: ${selections.gpu?.label || ""}`,
      `Memory: ${selections.memory?.label || ""}`,
      `Storage: ${selections.storage?.label || ""}`,
      `Cooling: ${selections.cooling?.label || ""}`,
      `Chassis: ${selections.case?.label || ""}`,
      `Finish: ${selections.finish?.label || ""}`,
      `Estimated build window: ${leadTime}`
    ].join("\n")
  };
}

function updateCustomBuilderUI() {
  const build = buildCustomConfiguration();
  if (!build) return;

  if (customBuilderTitle) {
    customBuilderTitle.textContent = build.title;
  }
  if (customBuilderLead) {
    customBuilderLead.textContent = build.lead;
  }
  if (customBuilderPrice) {
    customBuilderPrice.textContent = formatCurrency(build.total);
  }
  if (customBuilderMeta) {
    customBuilderMeta.textContent = `${build.meta} Estimated build window: ${build.leadTime}.`;
  }
  if (customBuilderLeadTime) {
    customBuilderLeadTime.textContent = build.leadTime;
  }
  if (customBuilderSpecs) {
    customBuilderSpecs.innerHTML = build.specs
      .map(
        (item) => `
          <li>
            <span class="builder-summary__spec-label">${escapeHtml(item.label)}</span>
            <span class="builder-summary__spec-value">${escapeHtml(item.value)}</span>
          </li>
        `
      )
      .join("");
  }
}

function openCustomBuildInquiry() {
  const build = buildCustomConfiguration();
  if (!build) return;

  openInquiryDialog("custom-builder", null, {
    focus: build.inquiryFocus,
    budget: build.budget,
    notes: build.inquiryNotes
  });
}

menuBtn?.addEventListener("click", () => {
  const isOpen = menuBtn.getAttribute("aria-expanded") === "true";
  setMobileMenu(!isOpen);
});

mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMobileMenu(false));
});

cartBtn?.addEventListener("click", () => {
  const isOpen = cartDrawer.classList.contains("is-open");
  if (isOpen) {
    closeCart();
  } else {
    openCart();
  }
});

cartCloseBtn?.addEventListener("click", closeCart);
cartBackdrop?.addEventListener("click", closeCart);
dialogBackdrop?.addEventListener("click", closeDialogs);
productDialogClose?.addEventListener("click", closeDialogs);
inquiryDialogClose?.addEventListener("click", closeDialogs);

clearCartBtn?.addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
  showToast("Cart cleared.");
});

cartInquiryBtn?.addEventListener("click", () => openInquiryDialog("cart"));

productDialogAdd?.addEventListener("click", () => {
  if (activeProductId) {
    addToCart(activeProductId, 1);
  }
});

productDialogInquiry?.addEventListener("click", () => {
  openInquiryDialog("product-dialog", activeProductId);
});

inquiryUseCartBtn?.addEventListener("click", applyCartToInquiry);
inquiryForm?.addEventListener("submit", handleInquirySubmit);
inquiryEmailBtn?.addEventListener("click", openPreparedInquiryEmail);
inquiryCopyBtn?.addEventListener("click", () => {
  void copyPreparedInquiry();
});
inquiryDownloadBtn?.addEventListener("click", downloadPreparedInquiry);
inquirySuccessClose?.addEventListener("click", closeDialogs);

customBuilderForm?.addEventListener("change", updateCustomBuilderUI);
customBuilderForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  addCustomBuildToCart(buildCustomConfiguration());
});
customBuilderForm?.addEventListener("reset", () => {
  window.requestAnimationFrame(() => {
    updateCustomBuilderUI();
    showToast("Custom builder reset.");
  });
});

customBuilderInquiryBtn?.addEventListener("click", openCustomBuildInquiry);

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add-to-cart]");
  if (addButton) {
    addToCart(addButton.dataset.addToCart);
    return;
  }

  const detailsButton = event.target.closest("[data-product]");
  if (detailsButton) {
    openProductDialog(detailsButton.dataset.product);
    return;
  }

  const inquiryTrigger = event.target.closest("[data-open-inquiry]");
  if (inquiryTrigger) {
    event.preventDefault();
    const context = inquiryTrigger.dataset.openInquiry;
    const maybeProductId = products[context] ? context : null;
    openInquiryDialog(context, maybeProductId);
    return;
  }

  const incrementButton = event.target.closest("[data-cart-increment]");
  if (incrementButton) {
    const item = cart.find((entry) => entry.id === incrementButton.dataset.cartIncrement);
    if (item) {
      updateCartQuantity(item.id, item.quantity + 1);
    }
    return;
  }

  const decrementButton = event.target.closest("[data-cart-decrement]");
  if (decrementButton) {
    const item = cart.find((entry) => entry.id === decrementButton.dataset.cartDecrement);
    if (item) {
      updateCartQuantity(item.id, item.quantity - 1);
    }
    return;
  }

  const removeButton = event.target.closest("[data-cart-remove]");
  if (removeButton) {
    removeFromCart(removeButton.dataset.cartRemove);
  }
});

document.addEventListener("keydown", (event) => {
  trapFocus(event);

  if (event.key !== "Escape") return;

  if (!productDialog.hidden || !inquiryDialog.hidden) {
    closeDialogs();
    return;
  }

  if (cartDrawer.classList.contains("is-open")) {
    closeCart();
    return;
  }

  if (mobileMenu?.classList.contains("is-open")) {
    setMobileMenu(false);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) {
    setMobileMenu(false);
  }
});

window.addEventListener("scroll", syncHeaderState, { passive: true });
syncHeaderState();

function initRevealObserver() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18, rootMargin: "0px 0px -50px 0px" }
  );

  items.forEach((item) => observer.observe(item));
}

const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

renderCart();
updateCustomBuilderUI();
initRevealObserver();
