document.addEventListener("DOMContentLoaded", () => {
  let lastScroll = 0;
  const header = document.querySelector(".header");
  const floatingBackBtn = document.querySelector(".back-btn-floating-ui");
  const scrollDelta = 8;

  if (!header) return;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll <= 20) {
      header.classList.remove("header-hidden");

      if (floatingBackBtn) {
        floatingBackBtn.classList.remove("is-visible");
      }

      lastScroll = currentScroll;
      return;
    }

    if (Math.abs(currentScroll - lastScroll) < scrollDelta) {
      return;
    }

    if (currentScroll > lastScroll) {
      header.classList.add("header-hidden");

      if (floatingBackBtn) {
        floatingBackBtn.classList.add("is-visible");
      }
    } else {
      header.classList.remove("header-hidden");

      if (floatingBackBtn) {
        floatingBackBtn.classList.remove("is-visible");
      }
    }

    lastScroll = currentScroll;
  });
});

/* BURGER MENU */

const menuOverlay = document.getElementById("menuOverlay");
const menuClose = document.getElementById("menuClose");
const burgerButtons = document.querySelectorAll(".burger");

burgerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (menuOverlay) {
      menuOverlay.classList.add("active");
      document.body.classList.add("menu-open");
    }
  });
});

if (menuClose) {
  menuClose.addEventListener("click", () => {
    if (menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

if (menuOverlay) {
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      menuOverlay.classList.remove("active");
      document.body.classList.remove("menu-open");
    }
  });
}

/* TRANSLATIONS */

const translations = {
  RU: window.translationsRU,
  DE: window.translationsDE,
  EN: window.translationsEN,
  TR: window.translationsTR
};

function getCurrentLang() {
  return localStorage.getItem("siteLanguage") || "DE";
}

function getText(key) {
  const lang = getCurrentLang();
  const dict = translations[lang] || translations.DE || translations.RU;

  return dict && dict[key] ? dict[key] : key;
}

function translateValue(value) {
  const lang = getCurrentLang();
  const dict = translations[lang] || translations.DE || translations.RU;

 



const map = {
  // СТАТУС
  "В наличии": dict.availableStatus,
  "Недоступно": dict.unavailableStatus,

  // КОРОБКА
  "Автомат": dict.automaticValue,
  "Механика": dict.manualValue,

  // ТОПЛИВО
  "Бензин": dict.petrolValue,
  "Дизель": dict.dieselValue,

  // ПРИВОД
  "Задний": dict.rearDriveValue,
  "Передний": dict.frontDriveValue,

  // ЦВЕТА
  "Чёрный": dict.blackColor,
  "Серый": dict.grayColor,
  "Белый": dict.whiteColor,
  "Синий": dict.blueColor,
  "Красный": dict.redColor,

  // ТЕГИ
  "TÜV до 2027": dict.tagTuv2027,
  "TÜV": dict.tagTuv,
  "Сервисная история": dict.tagServiceHistory,
  "Ухоженный салон": dict.tagCleanInterior,
  "Хорошая комплектация": dict.tagGoodEquipment,
  "Экономичный": dict.tagEconomical,
  "Надёжный": dict.tagReliable,
  "Комплект резины": dict.tagTiresSet,
  "Для семьи": dict.tagFamily,
  "1 владелец": dict.tagOneOwner
};
  return map[value] || value;
}



function translatePage(lang) {
  const dict = translations[lang] || translations.RU;
  if (!dict) return;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (dict[key]) {
      element.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.dataset.i18nPlaceholder;
    if (dict[key]) {
      element.placeholder = dict[key];
    }
  });

  const activeSort = document.querySelector(".custom-sort-option.active");
  const sortLabel = document.getElementById("sortLabel");

  if (activeSort && sortLabel) {
    const key = activeSort.dataset.i18n;

    if (key && dict[key]) {
      sortLabel.textContent = dict[key];
    }
  }
}

/* LANGUAGE DROPDOWN */

const langDropdown = document.getElementById("langDropdown");
const langTrigger = document.getElementById("langTrigger");
const langCurrent = document.getElementById("langCurrent");
const langOptions = document.querySelectorAll(".lang-option");

if (langDropdown && langTrigger && langCurrent && langOptions.length) {
  const savedLang = localStorage.getItem("siteLanguage") || "DE";

function applyLanguage(lang, refreshAdminList = false) {
  langCurrent.textContent = lang;

  langOptions.forEach((option) => {
    option.classList.toggle("active", option.dataset.lang === lang);
  });

  localStorage.setItem("siteLanguage", lang);

  // 🔹 перевод текста
  translatePage(lang);

  // 🔹 пересоздание select
  if (typeof initCustomSelects === "function") {
    document.querySelectorAll(".custom-select").forEach((item) => item.remove());

    document.querySelectorAll(".add-car-form select").forEach((select) => {
      select.style.display = "";
      select.dataset.customReady = "false";
    });

    initCustomSelects();
    if (refreshAdminList && typeof renderCustomCarsList === "function") {
  renderCustomCarsList();
}
  }

  // 🔹 обновление списка машин (ВОТ ЭТО ТЕБЕ НУЖНО)
 const customCarsList = document.getElementById("customCarsList");



  // 🔹 обновление каталога и страницы авто
  setTimeout(() => {
    if (document.getElementById("carsGrid") && typeof renderCatalog === "function") {
      renderCatalog();

      if (typeof syncSortUiFromState === "function") {
        syncSortUiFromState();
      }

      translatePage(lang);
    }

    if (document.getElementById("carPageContent") && typeof renderCarPage === "function") {
      renderCarPage();
      translatePage(lang);
    }
  }, 0);
}

  applyLanguage(savedLang, false);

  langTrigger.addEventListener("click", (e) => {
    e.stopPropagation();
    langDropdown.classList.toggle("open");
  });

  langOptions.forEach((option) => {
    option.addEventListener("click", () => {
      applyLanguage(option.dataset.lang || "DE", true);
      langDropdown.classList.remove("open");
    });
  });

  document.addEventListener("click", (e) => {
    if (!langDropdown.contains(e.target)) {
      langDropdown.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      langDropdown.classList.remove("open");
    }
  });
}

/* THEME TOGGLE */

const themeToggle = document.getElementById("themeToggle");

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light-theme");
  } else {
    document.body.classList.remove("light-theme");
  }

  localStorage.setItem("theme", theme);
}

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);

  themeToggle.addEventListener("click", () => {
    const isLight = document.body.classList.contains("light-theme");
    applyTheme(isLight ? "dark" : "light");
  });
}

/* REQUEST MODAL */

const requestModal = document.getElementById("requestModal");
const modalClose = document.getElementById("modalClose");
const requestForm = document.getElementById("requestForm");

function openRequestModal(carTitle = "") {
  if (!requestModal) return;

  const clientCarInput = document.getElementById("clientCar");
  if (clientCarInput) {
  clientCarInput.value = carTitle || "";
}

  requestModal.classList.add("active");
  document.body.classList.add("menu-open");
}

function closeRequestModal() {
  if (!requestModal) return;

  requestModal.classList.remove("active");
  document.body.classList.remove("menu-open");
}

document.addEventListener("click", (e) => {
  const requestBtn = e.target.closest(".btn-detail-dark, .footer-btn, .open-request-modal");

  if (requestBtn) {
    e.preventDefault();

    let carTitle = "";
    const carTitleElement = document.querySelector(".car-info h1");
    if (carTitleElement) {
      carTitle = carTitleElement.textContent.trim();
    }

    openRequestModal(carTitle);
  }
});

if (modalClose) {
  modalClose.addEventListener("click", closeRequestModal);
}

if (requestModal) {
  requestModal.addEventListener("click", (e) => {
    if (e.target === requestModal) {
      closeRequestModal();
    }
  });
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeRequestModal();
  }
});

if (requestForm) {
  requestForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("clientName").value.trim();
    const phone = document.getElementById("clientPhone").value.trim();
    const car = document.getElementById("clientCar")?.value.trim();

    if (!name || !phone) {
      alert("Заполните имя и телефон");
      return;
    }

    const message =
      `🚗 Новая заявка с сайта Autos Germany\n\n` +
      `👤 Имя: ${name}\n` +
      `📞 Телефон: ${phone}\n` +
      `🚘 Автомобиль: ${car || "не указан"}\n\n` +
      `🔗 ${window.location.href}`;

    const token = "8663805008:AAGtCv-aWrAJZ-nWpi6x0JNHcuZ9uj_6P1w";   // ← вставь сюда
    const chatId = "533090637"; // ← вставь сюда

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      });

      alert("Заявка отправлена!");
      requestForm.reset();
      closeRequestModal();

    } catch (error) {
      alert("Ошибка отправки");
      console.error(error);
    }
  });
}



if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}


/* CATALOG STATE MEMORY */

const CATALOG_STATE_KEY = "catalogState";

function saveCatalogState() {
  const isIndexPage = document.getElementById("carsGrid");
  if (!isIndexPage) return;

  const state = {
    scrollY: window.scrollY || window.pageYOffset || 0,
    visibleCars,
    currentSort,
    activeFilters: Array.from(activeFilters)
  };

  sessionStorage.setItem(CATALOG_STATE_KEY, JSON.stringify(state));
  sessionStorage.setItem("shouldRestoreCatalog", "true");
}

function restoreCatalogState() {
  const saved = sessionStorage.getItem(CATALOG_STATE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved);
  } catch (error) {
    return null;
  }
}

function applySavedCatalogState(state) {
  if (!state) return;

  if (typeof state.visibleCars === "number" && state.visibleCars > 0) {
    visibleCars = state.visibleCars;
  }

  if (typeof state.currentSort === "string" && state.currentSort) {
    currentSort = state.currentSort;
  }

  if (Array.isArray(state.activeFilters)) {
    activeFilters = new Set(state.activeFilters);
  }
}

function syncFilterButtonsFromState() {
  const buttons = document.querySelectorAll(".filter-chip");
  if (!buttons.length) return;

  buttons.forEach((button) => {
    const filter = button.dataset.filter;

    if (filter === "all") {
      button.classList.toggle("active", activeFilters.size === 0 || activeFilters.has("all"));
    } else {
      button.classList.toggle("active", activeFilters.has(filter));
    }
  });
}

function syncSortUiFromState() {
  const sortOptions = document.querySelectorAll(".custom-sort-option");
  const sortLabel = document.getElementById("sortLabel");
  const currentLang = localStorage.getItem("siteLanguage") || "DE";
  const dict = translations[currentLang] || translations.RU;

  if (!sortOptions.length || !sortLabel) return;

  let activeOption = null;

  sortOptions.forEach((option) => {
    const isActive = option.dataset.value === currentSort;
    option.classList.toggle("active", isActive);

    if (isActive) {
      activeOption = option;
    }
  });

  if (activeOption) {
    const key = activeOption.dataset.i18n;
    sortLabel.textContent = key && dict[key]
      ? dict[key]
      : activeOption.textContent.trim();
  }
}

function restoreCatalogScroll() {
  if (window.location.hash === "#top") {
    sessionStorage.removeItem("shouldRestoreCatalog");

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "auto"
      });
    });

    return;
  }

  const shouldRestore = sessionStorage.getItem("shouldRestoreCatalog");

  if (shouldRestore !== "true") return;

  const saved = restoreCatalogState();
  if (!saved || typeof saved.scrollY !== "number") return;

  sessionStorage.removeItem("shouldRestoreCatalog");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: saved.scrollY,
        behavior: "auto"
      });
    });
  });
}



/* HELPERS */

function formatMileage(value) {
  return new Intl.NumberFormat("de-DE").format(value) + " " + getText("kmUnit");
}

function formatEngine(value) {
  if (!value) return "";

  return value
    .replace("л", getText("literUnit"))
    .replace("л.", getText("literUnit"));
}

function formatPower(value) {
  if (!value) return "";

  return value
    .replace("л.с.", getText("hpUnit"))
    .replace("л.с", getText("hpUnit"));
}

function formatPrice(value, currency = "€") {
  return new Intl.NumberFormat("ru-RU").format(value) + " " + currency;
}

function shareCar(url, title) {
  if (navigator.share) {
    navigator
      .share({
        title: title,
        text: title,
        url: url
      })
      .catch(() => {});
  } else {
    navigator.clipboard.writeText(url).then(() => {
      alert("Ссылка скопирована");
    });
  }
}

function createCarCard(car) {
  return `
  <article class="car-card ${car.status !== "В наличии" ? "inactive" : ""}">
      <a
  href="${car.status === "В наличии" ? `car.html?id=${car.id}` : "#"}"
  class="car-image-wrap"
  ${car.status !== "В наличии" ? 'tabindex="-1"' : ""}
  onclick="${car.status === "В наличии" ? "saveCatalogState()" : "return false;"}"
>
  <img src="${car.images[0]}" alt="${car.title}" />
  <span class="car-badge ${car.status === "В наличии" ? "blue" : "unavailable"}">
    ${translateValue(car.status)}
  </span>
</a>

      <div class="car-body">
        <div class="car-head">
          <h3>${car.title}</h3>
        </div>

        <p class="car-meta">
          ${car.year} • ${formatMileage(car.mileage)} • ${translateValue(car.transmission)} • ${translateValue(car.fuel)}
        </p>

        <div class="car-tags">
          ${(car.tags || [])
            .slice(0, 3)
            .map((tag) => `<span>${translateValue(tag)}</span>`)
            .join("")}
        </div>

        <div class="car-footer">
          <div>
            <p class="car-price">${formatPrice(car.price, car.currency)}</p>
          </div>

          <a
  href="${car.status === "В наличии" ? `car.html?id=${car.id}` : "#"}"
  class="card-link ${car.status !== "В наличии" ? "disabled" : ""}"
  ${car.status !== "В наличии" ? 'tabindex="-1"' : ""}
  onclick="${car.status === "В наличии" ? "saveCatalogState()" : ""}"
>
  ${getText("detailsBtn")}
</a>
        </div>
      </div>
    </article>
  `;
}

function getCarById(id) {
  if (typeof carsData === "undefined") return null;
  return carsData.find((car) => car.id === id) || null;
}

function getUrlCarId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

/* MAIN PAGE */

let activeFilters = new Set();
let currentSort = "default";
let visibleCars = 6;

function filterCars(cars, filters) {
  if (!filters || filters.size === 0 || filters.has("all")) {
    return cars;
  }

  return cars.filter((car) => {
    const checks = {
      available: car.status.toLowerCase().includes("в наличии"),

      tuv: (car.tags || []).some((tag) => tag.toLowerCase().includes("tüv")),

      automatic: car.transmission.toLowerCase().includes("автомат"),

      gasoline: car.fuel.toLowerCase().includes("бензин"),

      diesel: car.fuel.toLowerCase().includes("дизель")
    };

    return Array.from(filters).every((filter) => checks[filter]);
  });
}

function sortCars(cars, sort) {
  const sorted = [...cars];

  sorted.sort((a, b) => {
    const aInactive = a.status !== "В наличии";
    const bInactive = b.status !== "В наличии";

    if (aInactive !== bInactive) {
      return aInactive - bInactive;
    }

    switch (sort) {
      case "cheap":
        return a.price - b.price;
      case "expensive":
        return b.price - a.price;
      case "new":
        return b.year - a.year;
      default:
        return 0;
    }
  });

  return sorted;
}

function renderCatalog() {
  const carsGrid = document.getElementById("carsGrid");
  const catalogCount = document.getElementById("catalogCount");
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!carsGrid || typeof carsData === "undefined") return;

  const filteredCars = filterCars(carsData, activeFilters);
  const finalCars = sortCars(filteredCars, currentSort);
  const carsToShow = finalCars.slice(0, visibleCars);

  carsGrid.innerHTML = carsToShow.map(createCarCard).join("");

  if (catalogCount) {
    catalogCount.textContent = `${getText("foundCars")} ${filteredCars.length}`;
  }

  if (loadMoreBtn) {
    if (visibleCars >= finalCars.length) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "inline-flex";
    }
  }
}

function setupFilters() {
  const buttons = document.querySelectorAll(".filter-chip");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      if (filter === "all") {
        activeFilters.clear();

        buttons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");
      } else {
        const allButton = document.querySelector('.filter-chip[data-filter="all"]');
        if (allButton) {
          allButton.classList.remove("active");
        }

        if (activeFilters.has(filter)) {
          activeFilters.delete(filter);
          button.classList.remove("active");
        } else {
          activeFilters.add(filter);
          button.classList.add("active");
        }

        if (activeFilters.size === 0 && allButton) {
          allButton.classList.add("active");
        }
      }

      visibleCars = 6;
      saveCatalogState();
      renderCatalog();
    });
  });
}

function setupSorting() {
  const customSort = document.getElementById("customSort");
  const sortTrigger = document.getElementById("sortTrigger");
  const sortMenu = document.getElementById("sortMenu");
  const sortLabel = document.getElementById("sortLabel");
  const sortOptions = document.querySelectorAll(".custom-sort-option");

  if (!customSort || !sortTrigger || !sortMenu || !sortLabel || !sortOptions.length) return;

  sortTrigger.addEventListener("click", () => {
    customSort.classList.toggle("open");
  });

  sortOptions.forEach((option) => {
    option.addEventListener("click", () => {
      const value = option.dataset.value || "default";

      currentSort = value;
      const key = option.dataset.i18n;
      const currentLang = localStorage.getItem("siteLanguage") || "DE";
      const dict = translations[currentLang] || translations.RU;

      sortLabel.textContent = key && dict[key] ? dict[key] : option.textContent.trim();
      visibleCars = 6;

      sortOptions.forEach((item) => item.classList.remove("active"));
      option.classList.add("active");

      customSort.classList.remove("open");
      saveCatalogState();
      renderCatalog();
    });
  });

  document.addEventListener("click", (e) => {
    if (!customSort.contains(e.target)) {
      customSort.classList.remove("open");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      customSort.classList.remove("open");
    }
  });
}

function setupLoadMore() {
  const loadMoreBtn = document.getElementById("loadMoreBtn");

  if (!loadMoreBtn) return;

 loadMoreBtn.addEventListener("click", () => {
  visibleCars += 6;
  saveCatalogState();
  renderCatalog();
});
}

/* DETAIL PAGE */

function createThumbs(images, title) {
  return images
    .map(
      (image, index) => `
        <img
          src="${image}"
          alt="${title} ${index + 1}"
          data-index="${index}"
          class="${index === 0 ? "active-thumb" : ""}"
        />
      `
    )
    .join("");
}

function createRelatedCars(currentCarId) {
  if (typeof carsData === "undefined") return "";

  const currentCar = carsData.find((car) => car.id === currentCarId);
  if (!currentCar) return "";

  const relatedCars = carsData
    .filter((car) => car.id !== currentCarId)
    .map((car) => {
      let score = 0;

      if (car.status === "В наличии") score += 5;
      if (car.brand === currentCar.brand) score += 3;
      if (car.fuel === currentCar.fuel) score += 2;
      if (car.transmission === currentCar.transmission) score += 1;

      const priceDiff = Math.abs(car.price - currentCar.price);
      if (priceDiff < 1000) score += 2;
      else if (priceDiff < 2000) score += 1;

      return {
        ...car,
        score,
        random: Math.random()
      };
    })
    .sort((a, b) => {
  if (b.score !== a.score) {
    return b.score - a.score;
  }

  return a.random - b.random;
})
.slice(0, getRelatedCount());

function getRelatedCount() {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // 🔥 твой нужный диапазон
  if (width >= 776 && width <= 1099 && height <= 650) {
    return 4;
  }

  return 3;
}

    

  return relatedCars.map(createCarCard).join("");
}

function renderCarPage() {
  const carPageContent = document.getElementById("carPageContent");
  if (!carPageContent || typeof carsData === "undefined") return;

  const carId = getUrlCarId();
  const car = getCarById(carId) || carsData[0];

  document.title = `${car.title} — Autos Germany`;

  carPageContent.innerHTML = `
    <section class="car-detail">
      <div class="car-gallery">
        <div class="gallery-main">
          <button class="gallery-arrow gallery-arrow-left" type="button" aria-label="Предыдущее фото">
            &#10094;
          </button>

          <img
            id="mainPhoto"
            class="main-photo"
            src="${car.images[0]}"
            alt="${car.title}"
          />

          <button class="gallery-arrow gallery-arrow-right" type="button" aria-label="Следующее фото">
            &#10095;
          </button>
        </div>

        <div class="thumbs" id="thumbsContainer">
          ${createThumbs(car.images, car.title)}
        </div>
      </div>

     <div class="car-info">

  <div class="detail-title-row">
    <h1>${car.title}</h1>
    <div class="detail-status">
      ${translateValue(car.status)}
    </div>
  </div>

        <div class="detail-meta">
          ${car.year} • ${formatMileage(car.mileage)} • ${translateValue(car.transmission)} • ${translateValue(car.fuel)} • ${formatPower(car.power)}
        </div>

        <div class="detail-bottom">
          <div class="detail-tags">
            ${(car.tags || []).map((tag) => `<span>${translateValue(tag)}</span>`).join("")}
          </div>

          <div class="detail-price-row">
            <div class="detail-price">${formatPrice(car.price, car.currency)}</div>

            <button
  class="detail-share-btn"
  type="button"
  aria-label="Поделиться"
  title="Поделиться"
></button>
          </div>

          <div class="detail-buttons">
            <button class="btn-detail-light">${getText("callBtn")}</button>
<button class="btn-detail-dark">${getText("requestBtn")}</button>
          </div>
        </div>
      </div>
    </section>

    <section class="catalog" style="margin-top: 26px;">
      <div class="cars-grid" style="grid-template-columns: 1fr 1fr; gap: 22px;">
        <article class="car-card">
          <div class="car-body">
            <div class="car-head">
              <h3>${getText("specsTitle")}</h3>
            </div>

            <div class="car-tags" style="margin-top: 18px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <span>${getText("brandLabel")}: ${car.brand}</span>
<span>${getText("modelLabel")}: ${car.model}</span>
<span>${getText("engineLabel")}: ${formatEngine(car.engine)}</span>
<span>${getText("powerLabel")}: ${formatPower(car.power)}</span>
<span>${getText("yearLabel")}: ${car.year}</span>
<span>${getText("mileageLabel")}: ${formatMileage(car.mileage)}</span>
<span>${getText("transmissionLabel")}: ${translateValue(car.transmission)}</span>
<span>${getText("fuelLabel")}: ${translateValue(car.fuel)}</span>
<span>${getText("driveLabel")}: ${translateValue(car.drive)}</span>
<span>${getText("colorLabel")}: ${translateValue(car.color)}</span>
            </div>
          </div>
        </article>

        <article class="car-card">
          <div class="car-body">
            <div class="car-head">
              <h3>${getText("descriptionTitle")}</h3>
            </div>

            <p class="car-meta" style="margin-top: 18px;">
              ${car.description}
            </p>

            
          </div>
        </article>
      </div>
    </section>

    <section class="contact-box">
      <h2>${getText("interestedTitle")}</h2>
      <p>
        ${getText("interestedText")}
      </p>

      <div class="contact-actions">
        <button class="btn-detail-dark">${getText("requestBtn")}</button>
<a href="index.html" class="btn-detail-light">${getText("backToCatalog")}</a>
      </div>
    </section>

    <section class="related-cars">
      <div class="section-top">
        <div>
          <p class="section-subtitle">${getText("relatedSubtitle")}</p>
<h2>${getText("relatedTitle")}</h2>
        </div>
      </div>

      <div class="related-grid">
        ${createRelatedCars(car.id)}
      </div>
    </section>
  `;

  setupGallery(car.images);

initImageModal();

}

function setupGallery(images) {
  const mainPhoto = document.getElementById("mainPhoto");
  const thumbsContainer = document.getElementById("thumbsContainer");
  const leftArrow = document.querySelector(".gallery-arrow-left");
  const rightArrow = document.querySelector(".gallery-arrow-right");

  if (!mainPhoto || !thumbsContainer || !leftArrow || !rightArrow) return;

  let currentIndex = 0;
  const thumbs = thumbsContainer.querySelectorAll("img");

  function updateGallery(index) {
  currentIndex = index;
  mainPhoto.src = images[currentIndex];
  mainPhoto.alt = `Фото ${currentIndex + 1}`;

  thumbs.forEach((thumb, thumbIndex) => {
    thumb.classList.toggle("active-thumb", thumbIndex === currentIndex);
  });

  // 👉 ВОТ ЭТО ДОБАВЬ
  const activeThumb = thumbs[currentIndex];

  if (activeThumb) {
    activeThumb.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest"
    });
  }
}

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => {
      updateGallery(index);
    });
  });

  rightArrow.addEventListener("click", () => {
    const nextIndex = (currentIndex + 1) % images.length;
    updateGallery(nextIndex);
  });

  leftArrow.addEventListener("click", () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    updateGallery(prevIndex);
  });
}

/* INIT */
activeFilters.clear();
document.addEventListener("DOMContentLoaded", () => {
  const savedCatalogState = restoreCatalogState();

  if (document.getElementById("carsGrid") && savedCatalogState) {
    applySavedCatalogState(savedCatalogState);
  }

  renderCatalog();

  renderCarPage();
  loadStoredCars();
  setupFilters();
  setupSorting();
  setupLoadMore();

  if (document.getElementById("carsGrid")) {
    syncFilterButtonsFromState();
    syncSortUiFromState();
    restoreCatalogScroll();
  }
});

let uploadedImages = [];

const imageInput = document.getElementById("newImages");
const imagePreview = document.getElementById("imagePreview");
const clearImagesBtn = document.getElementById("clearImagesBtn");
const clearFormBtn = document.getElementById("clearFormBtn");

function renderImagePreview() {
  if (!imagePreview) return;

  imagePreview.innerHTML = "";

  uploadedImages.forEach((src, index) => {
    const item = document.createElement("div");
    item.className = `image-preview-item ${index === 0 ? "is-primary" : ""}`;
    item.setAttribute("draggable", "true");
    item.dataset.index = index;

    item.innerHTML = `
      ${index === 0 ? '<div class="image-preview-badge">Главное фото</div>' : ""}
      <img src="${src}" alt="Фото ${index + 1}">
      <div class="image-preview-controls">
        <button type="button" class="image-preview-btn delete" data-action="delete" data-index="${index}">
          Удалить
        </button>
      </div>
    `;

    item.addEventListener("dragstart", () => {
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    imagePreview.appendChild(item);
  });
}

function compressImage(file, maxWidth = 900, quality = 0.55) {
  return new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");

        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const compressedDataUrl = canvas.toDataURL("image/jpeg", quality);
        resolve(compressedDataUrl);
      };

      img.src = event.target.result;
    };

    reader.readAsDataURL(file);
  });
}

if (imageInput && imagePreview) {
  imageInput.addEventListener("change", () => {
    const files = Array.from(imageInput.files);

    files.forEach((file) => {
      const reader = new FileReader();

      compressImage(file, 900, 0.55).then((compressedImage) => {
  uploadedImages.push(compressedImage);
  renderImagePreview();
});

      reader.readAsDataURL(file);
    });

    imageInput.value = "";
  });
}

if (clearImagesBtn) {
  clearImagesBtn.addEventListener("click", () => {
    uploadedImages = [];
    if (imageInput) imageInput.value = "";
    renderImagePreview();
  });
}

if (clearFormBtn) {
  clearFormBtn.addEventListener("click", () => {
    if (!addCarForm) return;

    addCarForm.reset();
    uploadedImages = [];

    if (imageInput) imageInput.value = "";

    renderImagePreview();

    const statusField = document.getElementById("newStatus");
    if (statusField) statusField.value = "В наличии";
  });
}

document.addEventListener("click", (e) => {
  const previewBtn = e.target.closest(".image-preview-btn");
  if (!previewBtn) return;

  const index = Number(previewBtn.dataset.index);

  uploadedImages.splice(index, 1);
  renderImagePreview();
});

let draggedIndex = null;

document.addEventListener("dragstart", (e) => {
  const item = e.target.closest(".image-preview-item");
  if (!item) return;

  draggedIndex = Number(item.dataset.index);
});

if (imagePreview) {
  imagePreview.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  imagePreview.addEventListener("drop", (e) => {
    e.preventDefault();

    const targetItem = e.target.closest(".image-preview-item");
    if (!targetItem || draggedIndex === null) return;

    const targetIndex = Number(targetItem.dataset.index);

    if (draggedIndex === targetIndex) return;

    const movedImage = uploadedImages.splice(draggedIndex, 1)[0];
    uploadedImages.splice(targetIndex, 0, movedImage);

    renderImagePreview();
  });
}

/* ADD CAR FORM */

const addCarWrap = document.getElementById("addCarWrap");
const toggleAddCarForm = document.getElementById("toggleAddCarForm");
const addCarForm = document.getElementById("addCarForm");
const clearCustomCarsBtn = document.getElementById("clearCustomCars");

let storedCars = [];

const DB_NAME = "autosAdminDB";
const DB_VERSION = 1;
const STORE_NAME = "customCars";

function openCarsDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = () => {
      const db = request.result;

      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getCarsFromDB() {
  const db = await openCarsDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

async function saveCarToDB(car) {
  const db = await openCarsDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    store.put(car);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function deleteCarFromDB(id) {
  const db = await openCarsDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    store.delete(id);

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function clearCarsDB() {
  const db = await openCarsDB();

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);

    store.clear();

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

async function loadStoredCars() {
  storedCars = await getCarsFromDB();

  if (storedCars.length) {
    carsData.push(...storedCars);
  }

  visibleCars = carsData.length;
  renderCatalog();
  renderCustomCarsList();
}
if (toggleAddCarForm) {
  toggleAddCarForm.addEventListener("click", () => {
    addCarWrap.classList.toggle("active");

    toggleAddCarForm.textContent = addCarWrap.classList.contains("active")
      ? "Скрыть форму"
      : "Открыть форму";
  });
}

if (addCarForm) {
  addCarForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {

      const brand = document.getElementById("newBrand").value.trim();
      const model = document.getElementById("newModel").value.trim();
      const title = `${brand} ${model}`.trim();
      const year = Number(document.getElementById("newYear").value);
      const mileage = Number(document.getElementById("newMileage").value);
      const transmission = document.getElementById("newTransmission").value.trim();
      const fuel = document.getElementById("newFuel").value.trim();
      const engine = document.getElementById("newEngine").value.trim();
      const power = document.getElementById("newPower").value.trim();
      const drive = document.getElementById("newDrive").value.trim();
      const color = document.getElementById("newColor").value.trim();
      const price = Number(document.getElementById("newPrice").value);
      const status = document.getElementById("newStatus").value.trim() || "В наличии";

      const typedDescription = document.getElementById("newDescription").value.trim();
const description = typedDescription || getText("descriptionTemplate");

      const tags = document
        .getElementById("newTags")
        .value
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

      const images = uploadedImages.length ? uploadedImages : [];

      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9а-яё]+/gi, "-")
        .replace(/^-|-$/g, "");

      const newCar = {
        id: `${slug}-${Date.now()}`,
        title,
        brand,
        model,
        year,
        mileage,
        transmission,
        fuel,
        engine,
        power,
        drive,
        color,
        price,
        currency: "€",
        status,
        badge: "blue",
        tags,
        shortDescription: description,
        description,
        features: tags.slice(0, 3),
        images
      };

      carsData.unshift(newCar);
      storedCars.unshift(newCar);

await saveCarToDB(newCar);

      visibleCars = carsData.length;
      renderCatalog();
      renderCustomCarsList();

      addCarForm.reset();
      uploadedImages = [];
      renderImagePreview();

      const statusField = document.getElementById("newStatus");
      if (statusField) statusField.value = "В наличии";

      document.querySelectorAll(".custom-select").forEach((item) => item.remove());

      document.querySelectorAll(".add-car-form select").forEach((select) => {
        select.style.display = "";
        select.dataset.customReady = "false";
      });

      if (typeof initCustomSelects === "function") {
        initCustomSelects();
      }

      alert("Автомобиль добавлен");

    } catch (error) {
      console.error("Ошибка при добавлении машины:", error);

      if (error.name === "QuotaExceededError") {
        alert("Слишком большие фотографии. Уменьши количество или размер.");
      } else {
        alert("Ошибка при добавлении. Проверь данные.");
      }
    }
  });
}

uploadedImages = [];
if (imagePreview) {
  imagePreview.innerHTML = "";
}

if (clearCustomCarsBtn) {
  clearCustomCarsBtn.addEventListener("click", () => {
    const confirmed = confirm("Удалить все добавленные вручную автомобили?");
    if (!confirmed) return;

    clearCarsDB().then(() => {
  location.reload();
});
});
}

/* CUSTOM CARS MANAGER */

function renderCustomCarsList() {
  const customCarsList = document.getElementById("customCarsList");

  if (!customCarsList) return;

  if (!storedCars.length) {
  customCarsList.innerHTML = `
    <div class="custom-car-item">
      <div class="custom-car-info">
        <strong>${getText("noCarsTitle")}</strong>
        <span>${getText("noCarsText")}</span>
      </div>
    </div>
  `;
  return;
}

  customCarsList.innerHTML = storedCars
    .map(
      (car) => `
        <div class="custom-car-item" data-id="${car.id}">
          <div class="custom-car-info">
            <strong>${car.title}</strong>
            <span>${car.year} • ${formatPrice(car.price, car.currency)}</span>
          </div>

          <div class="custom-car-actions">
            <button class="custom-car-btn status" data-action="status">
  ${car.status === "В наличии" ? getText("soldBtn") : getText("returnBtn")}
</button>

<button class="custom-car-btn edit" data-action="edit">
  ${getText("editBtn")}
</button>

<button class="custom-car-btn delete" data-action="delete">
  ${getText("deleteBtn")}
</button>
          </div>
        </div>
      `
    )
    .join("");
}



document.addEventListener("click", async (e) => {
  const button = e.target.closest(".custom-car-btn");
  if (!button) return;

  const item = button.closest(".custom-car-item");
  const id = item.dataset.id;
  const action = button.dataset.action;

  const car = storedCars.find((c) => c.id === id);
  if (!car) return;

  if (action === "status") {
  car.status = car.status === "В наличии" ? "Недоступно" : "В наличии";

  await saveCarToDB(car);

  visibleCars = carsData.length;
  renderCatalog();
  renderCustomCarsList();
}

  if (action === "delete") {
    const confirmed = confirm(`Удалить ${car.title}?`);
    if (!confirmed) return;

    storedCars = storedCars.filter((c) => c.id !== id);

    const carIndex = carsData.findIndex((c) => c.id === id);
    if (carIndex !== -1) {
      carsData.splice(carIndex, 1);
    }

    deleteCarFromDB(id);

    visibleCars = carsData.length;
    renderCatalog();
    renderCustomCarsList();
  }

  if (action === "edit") {
    const titleParts = car.title.split(" ");
    document.getElementById("newBrand").value = titleParts[0] || "";
    document.getElementById("newModel").value = titleParts.slice(1).join(" ") || "";
    document.getElementById("newYear").value = car.year;
    document.getElementById("newMileage").value = car.mileage;
    document.getElementById("newTransmission").value = car.transmission;
    document.getElementById("newFuel").value = car.fuel;
    document.getElementById("newEngine").value = car.engine || "";
    document.getElementById("newPower").value = car.power || "";
    document.getElementById("newDrive").value = car.drive || "";
    document.getElementById("newColor").value = car.color || "";
    document.getElementById("newPrice").value = car.price;
    document.getElementById("newStatus").value = car.status;
    document.getElementById("newTags").value = (car.tags || []).join(", ");
    document.getElementById("newDescription").value = car.description || "";

    uploadedImages = Array.isArray(car.images) ? [...car.images] : [];
    renderImagePreview();

    storedCars = storedCars.filter((c) => c.id !== id);

    const carIndex = carsData.findIndex((c) => c.id === id);
    if (carIndex !== -1) {
      carsData.splice(carIndex, 1);
    }

    deleteCarFromDB(id);

    if (addCarWrap) {
      addCarWrap.classList.add("active");
    }

    if (toggleAddCarForm) {
      toggleAddCarForm.textContent = "Скрыть форму";
    }

    window.scrollTo({
      top: addCarWrap ? addCarWrap.offsetTop - 120 : 0,
      behavior: "smooth"
    });

    visibleCars = carsData.length;
    renderCatalog();
    renderCustomCarsList();
  }
});

/* ADMIN LOGIN */

const adminLogin = document.getElementById("adminLogin");
const adminContent = document.getElementById("adminContent");
const adminLoginBtn = document.getElementById("adminLoginBtn");
const adminPassword = document.getElementById("adminPassword");
const adminLoginError = document.getElementById("adminLoginError");

if (adminLogin && adminContent) {
  adminLogin.style.display = "flex";
  adminContent.style.display = "none";

  if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", () => {
      const password = adminPassword.value.trim();

      if (password === "autos2026") {
        adminLogin.style.display = "none";
        adminContent.style.display = "block";
        adminPassword.value = "";
        adminLoginError.textContent = "";
      } else {
        adminLoginError.textContent = "Неверный пароль";
      }
    });
  }

  if (adminPassword) {
    adminPassword.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        adminLoginBtn.click();
      }
    });
  }
}



// IMAGE MODAL

function initImageModal() {
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("modalImage");
  const closeBtn = document.querySelector(".image-modal-close");

  const leftArrow = document.querySelector(".modal-arrow-left");
  const rightArrow = document.querySelector(".modal-arrow-right");

  if (!modal || !modalImg) return;

  const images = Array.from(document.querySelectorAll(".thumbs img"));
  let currentIndex = 0;

  function openModal(index) {
    currentIndex = index;
    modal.style.display = "flex";
    modalImg.src = images[currentIndex].src;
  }

  images.forEach((img, index) => {
    img.addEventListener("click", () => openModal(index));
  });

  const mainPhoto = document.querySelector(".main-photo");

if (mainPhoto && images.length) {
  mainPhoto.addEventListener("click", () => {
    // ищем текущий индекс по src
    const currentSrc = mainPhoto.src;
    const index = images.findIndex(img => img.src === currentSrc);

    openModal(index !== -1 ? index : 0);
  });
}

  function showNext() {
    currentIndex = (currentIndex + 1) % images.length;
    changeModalImage(images[currentIndex].src);
 
  }

function changeModalImage(src) {
  modalImg.classList.add("is-changing");

  setTimeout(() => {
    modalImg.src = src;
    modalImg.classList.remove("is-changing");
  }, 180);
}


  function showPrev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    changeModalImage(images[currentIndex].src);
 
  }

  if (rightArrow) rightArrow.addEventListener("click", showNext);
  if (leftArrow) leftArrow.addEventListener("click", showPrev);

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });

  // 👉 СВАЙП
  let startX = 0;

  modal.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  modal.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    let diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNext(); // свайп влево
      } else {
        showPrev(); // свайп вправо
      }
    }
  });

  // 👉 КЛАВИАТУРА
  document.addEventListener("keydown", (e) => {
    if (modal.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") modal.style.display = "none";
    }
  });


  let scale = 1;

modalImg.addEventListener("wheel", (e) => {
  e.preventDefault();

  scale += e.deltaY * -0.001;
  scale = Math.min(Math.max(1, scale), 3);

  modalImg.style.transform = `scale(${scale})`;
});

let lastTap = 0;

modalImg.addEventListener("touchend", (e) => {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;

  if (tapLength < 300 && tapLength > 0) {
    // двойной тап
    if (scale > 1) {
      scale = 1;
    } else {
      scale = 2;
    }

    modalImg.style.transform = `scale(${scale})`;
  }

  lastTap = currentTime;
});
}



document.addEventListener("click", (e) => {
  const shareBtn = e.target.closest(".detail-share-btn");
  if (!shareBtn) return;

  e.preventDefault();

  shareCar(window.location.href, document.title);
});






document.addEventListener("click", (e) => {
  const menuLink = e.target.closest(".menu-nav a");
  if (!menuLink) return;

  if (menuOverlay) {
    menuOverlay.classList.remove("active");
    document.body.classList.remove("menu-open");
  }
});








// ===== EXPORT CARS =====
const exportBtn = document.getElementById("exportCarsBtn");

if (exportBtn) {
  exportBtn.addEventListener("click", () => {
    const cars = storedCars || [];

    if (!cars.length) {
      alert("Нет машин для сохранения");
      return;
    }

    const blob = new Blob([JSON.stringify(cars, null, 2)], {
      type: "application/json"
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "cars-backup.json";
    a.click();

    URL.revokeObjectURL(url);
  });
}


// ===== IMPORT CARS =====
const importInput = document.getElementById("importCarsInput");

if (importInput) {
  importInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function (event) {
      try {
        const data = JSON.parse(event.target.result);

        if (!Array.isArray(data)) {
          alert("Неверный файл");
          return;
        }

        await clearCarsDB();

        for (const car of data) {
          await saveCarToDB(car);
        }

        alert("Машины успешно загружены");
        location.reload();

      } catch (error) {
        console.error(error);
        alert("Ошибка при загрузке файла");
      }
    };

    reader.readAsText(file);
  });
}


/* ENGINE AUTO FORMAT */

const engineInput = document.getElementById("newEngine");

if (engineInput) {
  engineInput.addEventListener("input", (e) => {
    let value = e.target.value;

    // убираем лишние символы (но оставляем пробел)
    value = value.replace(/[^0-9a-zA-Zа-яА-Я.\s]/g, "");

    // если уже есть точка — не трогаем (даём писать дальше)
    if (value.includes(".")) {
      e.target.value = value;
      return;
    }

    // 20 → 2.0 + пробел
    if (/^[0-9]{2}$/.test(value)) {
      value = value[0] + "." + value[1] + " ";
    }

    e.target.value = value;
  });
}




/* UNIVERSAL CUSTOM SELECTS */

function initCustomSelects() {
  const selects = document.querySelectorAll(".add-car-form select");

  selects.forEach((select) => {
    if (select.dataset.customReady === "true") return;

    select.dataset.customReady = "true";

    const wrapper = document.createElement("div");
    wrapper.className = "custom-select";

    const trigger = document.createElement("div");
    trigger.className = "custom-select__trigger";
    trigger.textContent = select.options[select.selectedIndex]?.text || "Выбрать";

    const dropdown = document.createElement("div");
    dropdown.className = "custom-select__dropdown";

    Array.from(select.options).forEach((option) => {
      const customOption = document.createElement("div");
      customOption.className = "custom-select__option";
      customOption.textContent = option.textContent;

      if (option.value === select.value) {
        customOption.classList.add("selected");
      }

      customOption.addEventListener("click", () => {
        select.value = option.value;
        trigger.textContent = option.textContent;

        dropdown.querySelectorAll(".custom-select__option").forEach((item) => {
          item.classList.remove("selected");
        });

        customOption.classList.add("selected");
        wrapper.classList.remove("open");
      });

      dropdown.appendChild(customOption);
    });

    trigger.addEventListener("click", (e) => {
      e.stopPropagation();

      document.querySelectorAll(".custom-select").forEach((item) => {
        if (item !== wrapper) item.classList.remove("open");
      });

      wrapper.classList.toggle("open");
    });

    select.required = false;
select.removeAttribute("required");
select.style.display = "none";
select.parentNode.insertBefore(wrapper, select);

    wrapper.appendChild(trigger);
    wrapper.appendChild(dropdown);
  });
}

document.addEventListener("DOMContentLoaded", initCustomSelects);

document.addEventListener("click", () => {
  document.querySelectorAll(".custom-select").forEach((select) => {
    select.classList.remove("open");
  });
});


/* ===== WHEEL SCROLL FOR PHOTO THUMBNAILS ===== */

window.addEventListener("load", function () {
  const thumbs = document.querySelector(".thumbs");

  if (!thumbs) return;

  thumbs.addEventListener(
    "wheel",
    function (e) {
      e.preventDefault();
      thumbs.scrollLeft += e.deltaY;
    },
    { passive: false }
  );
});





/* TAG PRESETS */

document.addEventListener("click", (e) => {
  const tagButton = e.target.closest(".tag-presets button");
  if (!tagButton) return;

  const input = document.getElementById("newTags");
  if (!input) return;

  const tag = tagButton.dataset.tag;
  if (!tag) return;

  const currentTags = input.value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  if (!currentTags.includes(tag)) {
    currentTags.push(tag);
  }

  input.value = currentTags.join(", ");
});
