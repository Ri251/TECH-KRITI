// TECH KRITI 2026 - Clean Database & Registration Manager
// Stores live student registrations, one-time entry passes, and UTR payment verification

const DB_KEYS = {
  REGISTRATIONS: "techkriti_registrations_v2", // Clean V2 namespace
  CURRENT_USER: "techkriti_current_student_v2"
};

const StorageManager = {
  init() {
    // Clean initialized state: starts empty, no fake or random dummy records!
    if (!localStorage.getItem(DB_KEYS.REGISTRATIONS)) {
      localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify([]));
    }
  },

  getAllRegistrations() {
    this.init();
    try {
      const raw = localStorage.getItem(DB_KEYS.REGISTRATIONS);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Storage parse error", e);
      return [];
    }
  },

  // Check if a student already has paid the one-time entry registration pass
  hasEntryPass(rollOrEmail) {
    if (!rollOrEmail) return false;
    const term = rollOrEmail.trim().toLowerCase();
    const list = this.getAllRegistrations();
    return list.some(r => 
      (r.student && r.student.rollNumber && r.student.rollNumber.toLowerCase() === term) ||
      (r.student && r.student.email && r.student.email.toLowerCase() === term)
    );
  },

  // Save new registration / entry pass
  saveRegistration(record) {
    const records = this.getAllRegistrations();

    if (!record.id) {
      record.id = "REG-TK-2026-" + Math.floor(1000 + Math.random() * 9000);
    }
    if (!record.ticketNumber) {
      record.ticketNumber = "TK-PASS-" + Math.floor(1000 + Math.random() * 9000);
    }
    if (!record.registeredAt) {
      record.registeredAt = new Date().toISOString();
    }
    if (!record.ticketStatus) {
      record.ticketStatus = "Confirmed";
    }
    if (!record.paymentVerification) {
      record.paymentVerification = record.amountPaid > 0 ? "Pending Verification" : "Verified (Free Pass)";
    }
    if (record.checkedIn === undefined) {
      record.checkedIn = false;
    }

    records.unshift(record);
    localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify(records));

    // Save as current student session
    this.setCurrentStudent(record.student);

    return record;
  },

  getRegistration(idOrTicket) {
    const list = this.getAllRegistrations();
    return list.find(r => 
      r.id === idOrTicket || 
      r.ticketNumber === idOrTicket || 
      (r.student && r.student.rollNumber && r.student.rollNumber.toLowerCase() === idOrTicket.toLowerCase())
    );
  },

  getStudentRegistrations(rollOrEmail) {
    if (!rollOrEmail) return [];
    const term = rollOrEmail.trim().toLowerCase();
    const list = this.getAllRegistrations();
    return list.filter(r => 
      (r.student && r.student.rollNumber && r.student.rollNumber.toLowerCase() === term) ||
      (r.student && r.student.email && r.student.email.toLowerCase() === term) ||
      (r.student && r.student.phone && r.student.phone.includes(term))
    );
  },

  // Admin verifies student's UTR payment
  verifyPaymentStatus(id, newStatus = "Verified") {
    const records = this.getAllRegistrations();
    const idx = records.findIndex(r => r.id === id || r.ticketNumber === id);
    if (idx !== -1) {
      records[idx].paymentVerification = newStatus;
      localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify(records));
      return records[idx];
    }
    return null;
  },

  togglePaymentVerification(id) {
    const records = this.getAllRegistrations();
    const idx = records.findIndex(r => r.id === id || r.ticketNumber === id);
    if (idx !== -1) {
      const current = records[idx].paymentVerification || "";
      const isVerified = current.toLowerCase().includes("verified");
      records[idx].paymentVerification = isVerified ? "Pending Verification" : "Verified";
      localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify(records));
      return records[idx];
    }
    return null;
  },

  toggleCheckIn(id, status = null) {
    const records = this.getAllRegistrations();
    const idx = records.findIndex(r => r.id === id || r.ticketNumber === id);
    if (idx !== -1) {
      const newStatus = status !== null ? status : !records[idx].checkedIn;
      records[idx].checkedIn = newStatus;
      records[idx].checkedInAt = newStatus ? new Date().toISOString() : null;
      localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify(records));
      return records[idx];
    }
    return null;
  },

  deleteRegistration(id) {
    let records = this.getAllRegistrations();
    records = records.filter(r => r.id !== id);
    localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify(records));
    return true;
  },

  setCurrentStudent(student) {
    if (student) {
      localStorage.setItem(DB_KEYS.CURRENT_USER, JSON.stringify(student));
    } else {
      localStorage.removeItem(DB_KEYS.CURRENT_USER);
    }
  },

  getCurrentStudent() {
    try {
      const data = localStorage.getItem(DB_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  clearAllData() {
    localStorage.setItem(DB_KEYS.REGISTRATIONS, JSON.stringify([]));
    localStorage.removeItem(DB_KEYS.CURRENT_USER);
  }
};

StorageManager.init();

if (typeof window !== "undefined") {
  window.StorageManager = StorageManager;
}
