// TECH KRITI 2026 - Global Frontend Controller & UI Utilities

const App = {
  init() {
    this.setupMobileMenu();
    this.setupCountdown();
    this.setupQuickSearch();
  },

  // Mobile navigation drawer toggle
  setupMobileMenu() {
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileBtn && mobileMenu) {
      mobileBtn.onclick = () => {
        mobileMenu.classList.toggle("hidden");
      };
    }
  },

  // Countdown timer to Pre-Events & Main Event
  setupCountdown() {
    const preTimerEl = document.getElementById("countdown-pre");
    const mainTimerEl = document.getElementById("countdown-main");

    // Pre-event target: Oct 22, 2026 12:00:00 IST
    const preTarget = new Date("2026-10-22T12:00:00+05:30").getTime();
    const mainTarget = new Date("2026-10-23T09:30:00+05:30").getTime();

    function updateTimers() {
      const now = Date.now();

      // Pre event calculation
      if (preTimerEl) {
        const diffPre = preTarget - now;
        if (diffPre > 0) {
          const days = Math.floor(diffPre / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diffPre % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const mins = Math.floor((diffPre % (1000 * 60 * 60)) / (1000 * 60));
          const secs = Math.floor((diffPre % (1000 * 60)) / 1000);

          preTimerEl.innerHTML = `
            <div class="flex items-center gap-2 sm:gap-3 text-center">
              <div class="bg-slate-950/90 border border-cyan-500/30 p-2 sm:p-3 rounded-2xl min-w-[58px] shadow-lg shadow-cyan-500/10 backdrop-blur-md">
                <span class="block text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">${days}</span>
                <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Days</span>
              </div>
              <span class="text-cyan-500 font-bold text-lg animate-pulse">:</span>
              <div class="bg-slate-950/90 border border-cyan-500/30 p-2 sm:p-3 rounded-2xl min-w-[58px] shadow-lg shadow-cyan-500/10 backdrop-blur-md">
                <span class="block text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">${hours}</span>
                <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Hours</span>
              </div>
              <span class="text-cyan-500 font-bold text-lg animate-pulse">:</span>
              <div class="bg-slate-950/90 border border-cyan-500/30 p-2 sm:p-3 rounded-2xl min-w-[58px] shadow-lg shadow-cyan-500/10 backdrop-blur-md">
                <span class="block text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">${mins}</span>
                <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mins</span>
              </div>
              <span class="text-cyan-500 font-bold text-lg animate-pulse">:</span>
              <div class="bg-slate-950/90 border border-cyan-500/30 p-2 sm:p-3 rounded-2xl min-w-[58px] shadow-lg shadow-cyan-500/10 backdrop-blur-md">
                <span class="block text-2xl sm:text-3xl font-black text-cyan-400 font-mono tracking-tight">${secs}</span>
                <span class="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Secs</span>
              </div>
            </div>
          `;
        } else {
          preTimerEl.innerHTML = `<span class="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold text-sm">🎉 Pre-Events LIVE NOW!</span>`;
        }
      }
    }

    updateTimers();
    setInterval(updateTimers, 1000);
  },

  // Global Quick Search modal or search bar
  setupQuickSearch() {
    const searchInput = document.getElementById("event-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const val = e.target.value.toLowerCase().trim();
        const eventCards = document.querySelectorAll(".event-card-item");
        eventCards.forEach(card => {
          const title = card.getAttribute("data-title")?.toLowerCase() || "";
          const cat = card.getAttribute("data-category")?.toLowerCase() || "";
          const desc = card.textContent.toLowerCase();
          if (title.includes(val) || cat.includes(val) || desc.includes(val)) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    }
  },

  // Toast notification
  toast(msg, type = "success") {
    const toast = document.createElement("div");
    const color = type === "success" ? "border-emerald-500 bg-slate-900 text-emerald-300" : (type === "error" ? "border-rose-500 bg-slate-900 text-rose-300" : "border-cyan-500 bg-slate-900 text-cyan-300");
    const icon = type === "success" ? "fa-circle-check" : (type === "error" ? "fa-circle-exclamation" : "fa-info-circle");
    
    toast.className = `fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl ${color} animate-in fade-in slide-in-from-bottom-3 duration-300 text-xs font-semibold max-w-sm`;
    toast.innerHTML = `<i class="fa-solid ${icon} text-base"></i><span>${msg}</span>`;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add("opacity-0", "transition-opacity", "duration-300");
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
};

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

if (typeof window !== "undefined") {
  window.App = App;
}
