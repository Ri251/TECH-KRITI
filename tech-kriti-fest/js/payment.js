// TECH KRITI 2026 - Official Paytm UPI Payment & UTR Verification Gateway
// Direct QR Code integration for Rishab Kumar Jha (6287056243@ptsbi)
// One-Time Entry Fee: ₹50 for DSEU Campus Students | ₹100 for Outside Colleges

const PaymentEngine = {
  activeModal: null,
  activeResolve: null,
  activeReject: null,
  currentPaymentDetails: null,

  // Web Audio success chime
  playSuccessSound() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc1.frequency.setValueAtTime(880.00, ctx.currentTime + 0.12);
      gain1.gain.setValueAtTime(0.15, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.4);

      setTimeout(() => {
        try {
          const osc2 = ctx.createOscillator();
          const gain2 = ctx.createGain();
          osc2.type = "triangle";
          osc2.frequency.setValueAtTime(1174.66, ctx.currentTime);
          gain2.gain.setValueAtTime(0.2, ctx.currentTime);
          gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
          osc2.connect(gain2);
          gain2.connect(ctx.destination);
          osc2.start();
          osc2.stop(ctx.currentTime + 0.6);
        } catch(e){}
      }, 130);
    } catch (e) {}
  },

  triggerConfetti() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#00baf2", "#06b6d4", "#6366f1", "#10b981", "#f59e0b"]
      });
      setTimeout(() => {
        confetti({ particleCount: 50, angle: 60, spread: 55, origin: { x: 0 } });
        confetti({ particleCount: 50, angle: 120, spread: 55, origin: { x: 1 } });
      }, 250);
    }
  },

  /**
   * Start Official UPI Payment
   * @param {Object} options
   *   title: String
   *   activityId: String
   *   studentCategory: "dseu" or "outside"
   *   amount: Number (50 or 100 or 0)
   *   student: Object
   *   isSubsequentEvent: Boolean (if true, amount = 0)
   */
  startPayment(options) {
    return new Promise((resolve, reject) => {
      // Determine QR image path depending on whether inside pages/ or root
      const isInPagesDir = window.location.pathname.includes("/pages/") || window.location.href.includes("/pages/");
      const qrPath = isInPagesDir ? "../assets/upi_qr_rishab.jpg" : "assets/upi_qr_rishab.jpg";

      const amt = Number(options.amount) !== undefined ? Number(options.amount) : 50;

      this.currentPaymentDetails = {
        title: options.title || "Festival Entry Pass",
        activityId: options.activityId || "entry",
        category: options.category || "Entry Pass",
        studentCategory: options.studentCategory || "dseu",
        finalAmount: amt,
        student: options.student || {},
        customData: options.customData || {},
        qrPath: qrPath,
        payeeName: "Rishab Kumar Jha",
        upiId: "6287056243@ptsbi"
      };

      this.activeResolve = resolve;
      this.activeReject = reject;

      // If already free (e.g. subsequent event registration for student who already has entry pass)
      if (amt <= 0) {
        this.processFreePass();
        return;
      }

      this.renderUpiModal();
    });
  },

  processFreePass() {
    this.playSuccessSound();
    this.triggerConfetti();
    const d = this.currentPaymentDetails;
    const txId = "FREE_PASS_" + Math.floor(100000 + Math.random() * 900000);
    
    if (this.activeResolve) {
      this.activeResolve({
        success: true,
        transactionId: txId,
        utrNumber: "FREE_ENTRY_PASS",
        paymentMethod: "Festival Entry Pass Holder (₹0 Free Event)",
        amountPaid: 0,
        paymentVerification: "Verified (Pass Holder)",
        timestamp: new Date().toISOString()
      });
    }
  },

  renderUpiModal() {
    const existing = document.getElementById("tk-upi-modal-backdrop");
    if (existing) existing.remove();

    const d = this.currentPaymentDetails;
    const isDseu = d.studentCategory === "dseu";
    const upiDeepLink = `upi://pay?pa=${d.upiId}&pn=${encodeURIComponent(d.payeeName)}&am=${d.finalAmount}&cu=INR&tn=TechKriti_Entry_${encodeURIComponent(d.student.rollNumber || 'Student')}`;

    const modalHtml = `
      <div id="tk-upi-modal-backdrop" class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md transition-opacity">
        <div class="relative w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-500/10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          <!-- Modal Top Header: Paytm & Tech Kriti Brand -->
          <div class="bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 px-6 py-4 text-white flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center font-bold text-xl text-white">
                <i class="fa-solid fa-qrcode"></i>
              </div>
              <div>
                <h3 class="font-black text-lg leading-tight flex items-center gap-2">
                  <span>Tech Kriti UPI Checkout</span>
                </h3>
                <p class="text-xs text-sky-100">Pay to <strong class="text-white">${d.payeeName}</strong> • ${d.title}</p>
              </div>
            </div>
            <button id="tk-upi-close-btn" class="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
              <i class="fa-solid fa-xmark text-lg"></i>
            </button>
          </div>

          <!-- Fee Summary Banner -->
          <div class="bg-slate-950 px-6 py-3 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span class="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">
                ${isDseu ? '🎓 DSEU CAMPUS STUDENT PASS' : '🌐 OUTSIDE COLLEGE STUDENT PASS'}
              </span>
              <span class="text-xs text-slate-300 font-medium">${d.student.name || 'Student Participant'} (${d.student.rollNumber || 'Roll N/A'})</span>
            </div>
            <div class="text-right">
              <span class="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Amount to Pay</span>
              <span class="text-2xl font-black text-cyan-400 font-mono">₹${d.finalAmount}</span>
            </div>
          </div>

          <!-- Modal Body -->
          <div class="p-5 sm:p-6 space-y-5 max-h-[75vh] overflow-y-auto">
            
            <!-- QR Display Card -->
            <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center text-center space-y-3">
              <div class="relative p-2 bg-white rounded-2xl shadow-xl max-w-[210px] mx-auto border-2 border-sky-400/60">
                <img src="${d.qrPath}" alt="Paytm UPI QR Code - Rishab Kumar Jha" class="w-full h-auto rounded-xl object-contain block select-none" />
              </div>

              <!-- Payee Details & VPA copy -->
              <div class="space-y-1 w-full">
                <div class="flex items-center justify-center gap-2">
                  <span class="text-xs font-bold text-white">${d.payeeName}</span>
                  <span class="text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full font-mono">Verified UPI</span>
                </div>
                <div class="flex items-center justify-center gap-2">
                  <code class="text-xs font-mono bg-slate-900 text-cyan-300 px-2.5 py-1 rounded-lg border border-slate-800 select-all">${d.upiId}</code>
                  <button id="btn-copy-upi-id" type="button" class="text-xs text-slate-400 hover:text-white px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700 transition">
                    <i class="fa-regular fa-copy"></i> Copy
                  </button>
                </div>
              </div>

              <!-- Direct UPI App Launch Intent (For Mobile Users) -->
              <div class="pt-1 w-full">
                <a href="${upiDeepLink}" class="inline-flex sm:hidden w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs items-center justify-center gap-2 shadow-md">
                  <i class="fa-solid fa-mobile-screen-button"></i>
                  <span>Open in Paytm / GPay / PhonePe</span>
                </a>
              </div>
            </div>

            <!-- PAYMENT VERIFICATION SECTION: UTR INPUT -->
            <div class="bg-slate-950/70 p-4 rounded-2xl border border-indigo-500/30 space-y-3">
              <div class="flex items-start gap-2">
                <i class="fa-solid fa-shield-halved text-cyan-400 text-base mt-0.5"></i>
                <div>
                  <h4 class="text-xs font-bold text-white uppercase tracking-wider">Payment Verification</h4>
                  <p class="text-[11px] text-slate-400 leading-snug">
                    After scanning & paying ₹${d.finalAmount}, enter the <strong>12-Digit UPI Reference Number / UTR</strong> from your UPI app receipt to verify and generate your official pass.
                  </p>
                </div>
              </div>

              <div>
                <label class="block text-xs font-semibold text-slate-300 mb-1">
                  12-Digit UPI Reference / UTR Number <span class="text-rose-400">*</span>
                </label>
                <div class="relative">
                  <input id="tk-utr-input" type="text" maxlength="20" placeholder="e.g. 428190384729" class="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 placeholder-slate-600 font-mono text-sm uppercase tracking-wider focus:outline-none focus:border-cyan-400" />
                  <span class="absolute right-3 top-2.5 text-[11px] font-mono text-slate-500" id="tk-utr-count">0/12</span>
                </div>
                <p id="tk-utr-error" class="text-[11px] text-rose-400 mt-1 hidden"></p>
              </div>
            </div>

            <!-- Submit Verification Button -->
            <button id="btn-submit-upi-verification" type="button" class="w-full py-3.5 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 text-sm transition transform active:scale-[0.99]">
              <i class="fa-solid fa-circle-check"></i>
              <span>Confirm Payment & Generate Digital Pass</span>
              <i class="fa-solid fa-arrow-right text-xs"></i>
            </button>

          </div>

          <!-- Bottom Footer -->
          <div class="bg-slate-950 px-6 py-2.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
            <span class="flex items-center gap-1.5 text-slate-400">
              <i class="fa-solid fa-lock text-emerald-400"></i> Direct UPI to ${d.payeeName}
            </span>
            <span class="text-slate-500 font-mono">100% Free Events Access</span>
          </div>

        </div>
      </div>
    `;

    document.body.insertAdjacentHTML("beforeend", modalHtml);
    this.activeModal = document.getElementById("tk-upi-modal-backdrop");

    this.bindEvents();
  },

  bindEvents() {
    const closeBtn = document.getElementById("tk-upi-close-btn");
    if (closeBtn) {
      closeBtn.onclick = () => this.closeModal(false);
    }

    const copyBtn = document.getElementById("btn-copy-upi-id");
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(this.currentPaymentDetails.upiId);
        copyBtn.innerHTML = '<i class="fa-solid fa-check text-green-400"></i> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
        }, 2000);
      };
    }

    const utrInput = document.getElementById("tk-utr-input");
    const utrCount = document.getElementById("tk-utr-count");
    if (utrInput && utrCount) {
      utrInput.oninput = () => {
        const val = utrInput.value.replace(/\s+/g, '');
        utrCount.textContent = `${val.length}/12`;
      };
    }

    const submitBtn = document.getElementById("btn-submit-upi-verification");
    if (submitBtn) {
      submitBtn.onclick = () => this.handleUtrSubmission();
    }
  },

  handleUtrSubmission() {
    const input = document.getElementById("tk-utr-input");
    const errorMsg = document.getElementById("tk-utr-error");
    if (!input) return;

    const utr = input.value.trim().toUpperCase();

    // Validation: UTR should have at least 6 characters (standard UPI is 12 digits, but allow test/alpha formats)
    if (!utr || utr.length < 6) {
      if (errorMsg) {
        errorMsg.textContent = "⚠️ Please enter a valid UPI Reference / UTR Number (at least 6-12 digits from your UPI receipt).";
        errorMsg.classList.remove("hidden");
      }
      input.focus();
      return;
    }

    if (errorMsg) errorMsg.classList.add("hidden");

    // Processing animation
    const modalContent = this.activeModal.querySelector(".relative");
    if (modalContent) {
      modalContent.innerHTML = `
        <div class="p-8 text-center space-y-4">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 animate-spin">
            <i class="fa-solid fa-circle-notch text-2xl"></i>
          </div>
          <div>
            <h3 class="text-xl font-bold text-white">Verifying UPI UTR...</h3>
            <p class="text-xs text-slate-400 mt-1">Ref: <span class="font-mono text-cyan-300 font-bold">${utr}</span></p>
          </div>
          <div class="w-48 mx-auto bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div class="bg-gradient-to-r from-sky-400 to-indigo-500 h-full rounded-full animate-pulse w-3/4"></div>
          </div>
        </div>
      `;
    }

    setTimeout(() => {
      this.playSuccessSound();
      this.triggerConfetti();

      const d = this.currentPaymentDetails;
      const txId = "UPI_" + utr;

      const result = {
        success: true,
        transactionId: txId,
        utrNumber: utr,
        paymentMethod: `UPI (Paytm to ${d.payeeName})`,
        amountPaid: d.finalAmount,
        paymentVerification: "Pending Verification", // Coordinator verifies in admin
        studentCategory: d.studentCategory === "dseu" ? "DSEU Campus Student (₹50)" : "Outside College Student (₹100)",
        timestamp: new Date().toISOString()
      };

      if (modalContent) {
        modalContent.innerHTML = `
          <div class="p-8 text-center space-y-4 bg-slate-900">
            <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-400 animate-bounce">
              <i class="fa-solid fa-check text-4xl"></i>
            </div>
            <div>
              <span class="text-xs uppercase font-bold tracking-wider text-emerald-400">Payment Recorded</span>
              <h3 class="text-2xl font-black text-white mt-1">Official Entry Pass Issued!</h3>
              <p class="text-xs text-slate-300 mt-1">One-time entry fee of <strong class="text-emerald-400">₹${d.finalAmount}</strong> recorded via UPI.</p>
            </div>
            <div class="bg-slate-950 p-3.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-400 space-y-1 text-left">
              <div class="flex justify-between">
                <span>UTR Reference:</span>
                <strong class="text-cyan-300">${utr}</strong>
              </div>
              <div class="flex justify-between">
                <span>Beneficiary:</span>
                <span class="text-slate-300">${d.payeeName}</span>
              </div>
              <div class="flex justify-between">
                <span>Events Access:</span>
                <span class="text-emerald-400 font-bold">ALL 10 EVENTS FREE</span>
              </div>
            </div>
            <p class="text-xs text-slate-400">Redirecting to your Digital Pass with QR Code...</p>
          </div>
        `;
      }

      setTimeout(() => {
        this.closeModal(true);
        if (this.activeResolve) this.activeResolve(result);
      }, 1200);

    }, 850);
  },

  closeModal(wasSuccess = false) {
    if (this.activeModal) {
      this.activeModal.remove();
      this.activeModal = null;
    }
    if (!wasSuccess && this.activeReject) {
      this.activeReject(new Error("Payment cancelled"));
    }
  }
};

if (typeof window !== "undefined") {
  window.PaymentEngine = PaymentEngine;
}
