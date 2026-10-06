// TECH KRITI 2026 - Digital Pass & Ticket Engine (Updated with UTR & DSEU Pass Format)

const TicketEngine = {
  renderTicket(regRecord, containerId) {
    const container = typeof containerId === "string" ? document.getElementById(containerId) : containerId;
    if (!container || !regRecord) return;

    const s = regRecord.student || {};
    const isCheckedIn = !!regRecord.checkedIn;
    const utr = regRecord.utrNumber || regRecord.transactionId || "N/A";
    const verification = regRecord.paymentVerification || "Verified";
    const dateFormatted = new Date(regRecord.registeredAt || Date.now()).toLocaleDateString("en-IN", {
      day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit"
    });

    const isDseu = (s.campus && s.campus.includes("DSEU")) || regRecord.amountPaid === 50;

    const qrPayload = JSON.stringify({
      ticketNumber: regRecord.ticketNumber,
      id: regRecord.id,
      name: s.name,
      roll: s.rollNumber,
      utr: utr,
      campus: s.campus,
      type: isDseu ? "DSEU Student (₹50)" : "Outside Student (₹100)",
      activity: regRecord.activityTitle || "All Events Pass",
      verified: true
    });

    const passHtml = `
      <div id="techkriti-pass-card" class="relative max-w-xl mx-auto bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl shadow-cyan-500/10 overflow-hidden text-slate-100 print:shadow-none print:border-black print:text-black">
        
        <!-- Header Banner -->
        <div class="relative bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 p-6 text-white overflow-hidden">
          <div class="absolute -right-8 -top-8 w-36 h-36 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none"></div>
          
          <div class="flex items-center justify-between relative z-10">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center font-black text-2xl text-cyan-200 shadow-inner">
                ⚡
              </div>
              <div>
                <span class="text-[10px] font-bold tracking-widest uppercase bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  ${isDseu ? '🎓 DSEU CAMPUS ENTRY PASS' : '🌐 FESTIVAL ENTRY PASS'}
                </span>
                <h2 class="text-2xl font-black tracking-tight leading-none mt-1">TECH KRITI 2026</h2>
                <p class="text-xs text-sky-100 font-medium">22 - 23 October 2026 • Campus Auditorium</p>
              </div>
            </div>

            <!-- Gate Check-in Status -->
            <div class="text-right">
              ${isCheckedIn 
                ? `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-400 text-slate-950 shadow-md">
                     <i class="fa-solid fa-circle-check"></i> ADMITTED
                   </span>` 
                : `<span class="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-cyan-400/20 text-cyan-200 border border-cyan-400/40">
                     <i class="fa-solid fa-ticket"></i> ACTIVE PASS
                   </span>`
              }
              <span class="block text-[11px] font-mono text-cyan-200/90 mt-1 font-bold">${regRecord.ticketNumber}</span>
            </div>
          </div>
        </div>

        <!-- Perforated Tear Line -->
        <div class="relative flex items-center justify-between bg-slate-900 px-0 my-[-10px] z-20">
          <div class="w-5 h-6 bg-slate-950 border-r border-slate-700 rounded-r-full"></div>
          <div class="flex-1 border-b-2 border-dashed border-slate-700 mx-2"></div>
          <div class="w-5 h-6 bg-slate-950 border-l border-slate-700 rounded-l-full"></div>
        </div>

        <!-- Pass Details -->
        <div class="p-6 pt-5 space-y-5">
          
          <!-- Activity Headline & Perks -->
          <div class="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 flex items-start justify-between gap-4">
            <div>
              <span class="text-xs uppercase tracking-wider text-cyan-400 font-semibold flex items-center gap-1 font-mono">
                <i class="fa-solid fa-award text-amber-400"></i> ${regRecord.activityTitle || 'Universal Entry Pass'}
              </span>
              <h3 class="text-lg font-bold text-white mt-0.5">All 10 Events Access Included</h3>
              <p class="text-xs text-slate-400 mt-0.5 flex items-center gap-3">
                <span><i class="fa-regular fa-calendar text-cyan-400"></i> Oct 22-23</span>
                <span><i class="fa-solid fa-compact-disc text-pink-400"></i> Open DJ Night Included</span>
              </p>
            </div>
            <div class="text-right shrink-0">
              <span class="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Pass Tier</span>
              <span class="text-xs font-bold ${isDseu ? 'text-cyan-300 bg-cyan-950/60 border-cyan-500/30' : 'text-purple-300 bg-purple-950/60 border-purple-500/30'} px-2.5 py-1 rounded-lg border block mt-0.5">
                ${isDseu ? 'DSEU (₹50)' : 'Outside (₹100)'}
              </span>
            </div>
          </div>

          <!-- Student Profile Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span class="text-slate-400 block text-[11px]">Student Name</span>
              <span class="font-bold text-slate-100 text-sm block truncate">${s.name || 'Student Participant'}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Roll Number</span>
              <span class="font-bold font-mono text-cyan-300 text-sm block">${s.rollNumber || 'N/A'}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Semester & Section</span>
              <span class="font-semibold text-slate-200 block">${s.semester || 'Semester'} • Sec ${s.section || 'A'}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Campus / College</span>
              <span class="font-semibold text-slate-200 block truncate">${s.campus || 'DSEU Campus'}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Phone</span>
              <span class="font-mono text-slate-300 block">${s.phone || 'N/A'}</span>
            </div>
            <div>
              <span class="text-slate-400 block text-[11px]">Email</span>
              <span class="text-slate-300 block truncate">${s.email || 'N/A'}</span>
            </div>
          </div>

          <!-- Activity specific details if provided -->
          ${regRecord.customData && Object.keys(regRecord.customData).length > 0 ? `
            <div class="bg-indigo-950/30 border border-indigo-500/20 p-3 rounded-xl text-xs space-y-1">
              <span class="text-[10px] font-semibold text-indigo-300 uppercase tracking-wider block font-mono">Event Specific Details:</span>
              <div class="grid grid-cols-2 gap-2 text-slate-300 text-[11px]">
                ${Object.entries(regRecord.customData).map(([k, v]) => `
                  <div>
                    <span class="text-slate-400 capitalize text-[10px] block">${k.replace(/([A-Z])/g, ' $1')}:</span>
                    <strong class="text-slate-200">${v}</strong>
                  </div>
                `).join('')}
              </div>
            </div>
          ` : ''}

          <!-- QR Code & UTR Verification Stamp -->
          <div class="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-5">
            <!-- QR Display -->
            <div class="flex items-center gap-4">
              <div id="ticket-qr-canvas-wrapper" class="p-2 bg-white rounded-xl shadow-lg border border-slate-300 shrink-0">
                <!-- QR injected below -->
              </div>
              <div class="space-y-1 text-xs">
                <span class="font-bold text-slate-200 block">Gate Verification QR</span>
                <p class="text-[11px] text-slate-400 leading-snug">Present this QR code at the campus entry gate for fast pass scanning.</p>
                <div class="flex items-center gap-1.5 pt-0.5 text-[11px]">
                  <span class="text-slate-500">UTR:</span>
                  <code class="font-mono text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded text-[11px] font-bold">${utr}</code>
                </div>
              </div>
            </div>

            <!-- Payment Stamp -->
            <div class="text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4 shrink-0 w-full sm:w-auto">
              <div class="inline-block border-2 border-emerald-500/80 rounded-xl px-3 py-1.5 text-center bg-emerald-500/10">
                <span class="text-[10px] uppercase font-bold tracking-wider text-emerald-400 block font-mono">UPI Payment</span>
                <span class="font-black text-lg text-emerald-300 font-mono">₹${regRecord.amountPaid || 0} PAID</span>
              </div>
              <span class="block text-[10px] text-slate-400 mt-1">Paid to: Rishab Kumar Jha</span>
              <span class="block text-[9px] font-mono text-slate-500">6287056243@ptsbi</span>
            </div>
          </div>

          <!-- Bottom Barcode & Security Info -->
          <div class="pt-1 flex flex-col items-center justify-center text-center">
            <div class="font-mono text-xl tracking-[0.35em] text-slate-500 select-none opacity-80 h-6 overflow-hidden flex items-center">
              |||||| | |||| ||| ||||||| || |||||| | ||| ||||||
            </div>
            <span class="text-[10px] font-mono text-slate-500 tracking-wider mt-1">
              STATUS: ${verification.toUpperCase()} • ${dateFormatted}
            </span>
          </div>

        </div>

        <!-- Action Bar (Hidden on print) -->
        <div class="bg-slate-950 px-6 py-4 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3 print:hidden">
          <div class="flex items-center gap-2 text-xs text-slate-400">
            <i class="fa-solid fa-id-card text-cyan-400"></i> Carry College ID Card alongside this Pass
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-print-pass" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs border border-slate-700 transition flex items-center gap-1.5">
              <i class="fa-solid fa-print"></i> Print / Save PDF
            </button>
            <a href="student-portal.html" class="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md transition flex items-center gap-1.5">
              <i class="fa-solid fa-user"></i> My Passes
            </a>
          </div>
        </div>

      </div>
    `;

    container.innerHTML = passHtml;

    // Render QR Code
    const qrContainer = document.getElementById("ticket-qr-canvas-wrapper");
    if (qrContainer) {
      if (typeof QRCode === "function") {
        new QRCode(qrContainer, {
          text: qrPayload,
          width: 96,
          height: 96,
          colorDark: "#070b14",
          colorLight: "#ffffff",
          correctLevel: QRCode.CorrectLevel.M
        });
      } else {
        qrContainer.innerHTML = `<i class="fa-solid fa-qrcode text-3xl text-slate-900 p-2"></i>`;
      }
    }

    const printBtn = document.getElementById("btn-print-pass");
    if (printBtn) {
      printBtn.onclick = () => window.print();
    }
  }
};

if (typeof window !== "undefined") {
  window.TicketEngine = TicketEngine;
}
