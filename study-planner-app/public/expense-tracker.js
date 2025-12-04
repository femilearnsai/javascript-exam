// Business Expense Tracker
// Implementation of trackExpense function with UI

class ExpenseTracker {
  constructor() {
    this.budget = 0
    this.transactions = []
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.updateDisplay()
  }

  setupEventListeners() {
    document.getElementById("transactionForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.processTransaction()
    })
  }

  // Core function as per assignment requirements
  trackExpense(budget, action, amount) {
    // Validate action
    if (action !== "spend" && action !== "add") {
      return "Invalid action. Use 'spend' or 'add'."
    }

    // Validate amount
    if (amount <= 0) {
      return "Amount must be greater than zero."
    }

    // Check transaction limit
    if (amount > 50000) {
      return "Transaction limit exceeded. Maximum allowed is ₦50,000.00"
    }

    // Process transaction
    if (action === "spend") {
      if (amount > budget) {
        return `Insufficient funds. Available budget: ₦${budget.toFixed(2)}`
      }
      const newBudget = budget - amount
      return `Spent ₦${amount.toFixed(2)}. Remaining budget: ₦${newBudget.toFixed(2)}`
    } else {
      const newBudget = budget + amount
      return `Added ₦${amount.toFixed(2)}. New budget: ₦${newBudget.toFixed(2)}`
    }
  }

  processTransaction() {
    const action = document.getElementById("action").value
    const amount = Number.parseFloat(document.getElementById("amount").value)

    if (!action || isNaN(amount)) {
      this.showMessage("Please fill in all fields", "error")
      return
    }

    // Call the trackExpense function
    const result = this.trackExpense(this.budget, action, amount)

    // Check if transaction was successful
    const isSuccess = !result.includes("Invalid") && !result.includes("Insufficient") && !result.includes("exceeded")

    if (isSuccess) {
      // Update budget
      if (action === "spend") {
        this.budget -= amount
      } else {
        this.budget += amount
      }

      // Add to transaction history
      this.transactions.unshift({
        action,
        amount,
        timestamp: new Date().toISOString(),
        result,
      })

      this.showMessage(result, "success")
      this.updateDisplay()

      // Reset form
      document.getElementById("transactionForm").reset()
    } else {
      this.showMessage(result, "error")
    }
  }

  showMessage(text, type) {
    const messageEl = document.getElementById("message")
    messageEl.textContent = text
    messageEl.className = `message ${type}`
    messageEl.classList.remove("hidden")

    // Hide after 5 seconds
    setTimeout(() => {
      messageEl.classList.add("hidden")
    }, 5000)
  }

  updateDisplay() {
    // Update budget display
    document.getElementById("budgetAmount").textContent = this.budget.toFixed(2)

    // Update transaction history
    const historyEl = document.getElementById("transactionHistory")

    if (this.transactions.length === 0) {
      historyEl.innerHTML = '<div class="empty-state"><p>No transactions yet</p></div>'
      return
    }

    historyEl.innerHTML = this.transactions
      .map(
        (t) => `
            <div class="history-item ${t.action}">
                <div class="history-info">
                    <div class="history-action">${t.action}</div>
                    <div class="history-time">${this.formatTime(t.timestamp)}</div>
                </div>
                <div class="history-amount ${t.action}">
                    ${t.action === "spend" ? "-" : "+"}₦${t.amount.toFixed(2)}
                </div>
            </div>
        `,
      )
      .join("")
  }

  formatTime(timestamp) {
    const date = new Date(timestamp)
    const options = {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return date.toLocaleDateString("en-US", options)
  }
}

// Initialize the app
const tracker = new ExpenseTracker()
