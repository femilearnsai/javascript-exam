function trackExpense(budget, action, amount) {
    
    if (action !== "spend" && action !== "add") {
      return "Invalid action. Use 'spend' or 'add'."
    }

    if (amount <= 0) {
      return "Amount must be greater than zero."
    }

    if (amount > 50000) {
      return "Transaction limit exceeded. Maximum allowed is ₦50,000.00"
    }


    
    if (action === "spend") {
      if (amount > budget) {
        return `Insufficient budget. Cannot complete amount `
      }
      const newBudget = budget - amount
      return `You spent ₦${amount.toFixed(2)}. Remaining budget: ₦${newBudget.toFixed(2)}`
    } else {
      const newBudget = budget + amount
      return `You added ₦${amount.toFixed(2)}. New budget: ₦${newBudget.toFixed(2)}`
    }
  }