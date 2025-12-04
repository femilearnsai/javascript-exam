"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calculator, ArrowLeft, TrendingUp, TrendingDown, Wallet } from "lucide-react"
import Link from "next/link"

type Action = "spend" | "add"

interface Transaction {
  id: string
  action: Action
  amount: number
  message: string
  timestamp: Date
}

// The trackExpense function from Question 2
function trackExpense(budget: number, action: Action, amount: number): string {
  if (action === "spend") {
    if (amount > budget) {
      return `Insufficient funds! You need ₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })} but only have ₦${budget.toLocaleString("en-NG", { minimumFractionDigits: 2 })}.`
    }
    if (amount > 50000) {
      return `Transaction declined! Single transactions cannot exceed ₦50,000.00. You attempted ₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}.`
    }
    const newBudget = budget - amount
    return `Expense recorded! ₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })} spent. Remaining budget: ₦${newBudget.toLocaleString("en-NG", { minimumFractionDigits: 2 })}.`
  } else if (action === "add") {
    const newBudget = budget + amount
    return `Funds added! ₦${amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })} added to budget. New budget: ₦${newBudget.toLocaleString("en-NG", { minimumFractionDigits: 2 })}.`
  }
  return 'Invalid action. Please use "spend" or "add".'
}

export default function ExpenseTrackerPage() {
  const [budget, setBudget] = useState(100000)
  const [action, setAction] = useState<Action>("spend")
  const [amount, setAmount] = useState("")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [currentMessage, setCurrentMessage] = useState("")

  const handleTransaction = (e: React.FormEvent) => {
    e.preventDefault()
    const amountNum = Number.parseFloat(amount)

    if (isNaN(amountNum) || amountNum <= 0) {
      setCurrentMessage("Please enter a valid amount greater than 0.")
      return
    }

    const message = trackExpense(budget, action, amountNum)

    // Update budget if transaction was successful
    if (action === "spend" && !message.includes("Insufficient") && !message.includes("declined")) {
      setBudget(budget - amountNum)
    } else if (action === "add") {
      setBudget(budget + amountNum)
    }

    // Add to transaction history
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      action,
      amount: amountNum,
      message,
      timestamp: new Date(),
    }
    setTransactions([newTransaction, ...transactions])
    setCurrentMessage(message)
    setAmount("")
  }

  const getMessageType = (message: string): "success" | "error" => {
    if (message.includes("Insufficient") || message.includes("declined") || message.includes("Invalid")) {
      return "error"
    }
    return "success"
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-6">
          <Button variant="ghost" asChild>
            <Link href="/" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Calculator className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Business Expense Tracker</h1>
          </div>
          <p className="text-muted-foreground text-lg">Manage your business budget with transaction validation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wallet className="w-5 h-5" />
                  Current Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">
                  ₦{budget.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>New Transaction</CardTitle>
                <CardDescription>Add or spend funds</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleTransaction} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="action">Action</Label>
                    <Select value={action} onValueChange={(value) => setAction(value as Action)}>
                      <SelectTrigger id="action">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spend">
                          <div className="flex items-center gap-2">
                            <TrendingDown className="w-4 h-4" />
                            Spend Money
                          </div>
                        </SelectItem>
                        <SelectItem value="add">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            Add Money
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount (₦)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      step="0.01"
                      min="0"
                      required
                    />
                    <p className="text-xs text-muted-foreground">Maximum transaction: ₦50,000.00</p>
                  </div>

                  <Button type="submit" className="w-full">
                    {action === "spend" ? "Record Expense" : "Add Funds"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Transaction History</CardTitle>
              <CardDescription>
                {transactions.length} {transactions.length === 1 ? "transaction" : "transactions"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentMessage && (
                <Alert
                  className={`mb-4 ${getMessageType(currentMessage) === "error" ? "border-destructive bg-destructive/10" : "border-primary bg-primary/10"}`}
                >
                  <AlertDescription
                    className={getMessageType(currentMessage) === "error" ? "text-destructive" : "text-primary"}
                  >
                    {currentMessage}
                  </AlertDescription>
                </Alert>
              )}

              {transactions.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <Calculator className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No transactions yet. Start by adding or spending funds.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-start gap-3 p-4 rounded-lg border bg-card">
                      <div
                        className={`p-2 rounded-lg ${transaction.action === "add" ? "bg-green-500/10" : "bg-red-500/10"}`}
                      >
                        {transaction.action === "add" ? (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        ) : (
                          <TrendingDown className="w-5 h-5 text-red-600" />
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-semibold ${transaction.action === "add" ? "text-green-600" : "text-red-600"}`}
                          >
                            {transaction.action === "add" ? "+" : "-"}₦
                            {transaction.amount.toLocaleString("en-NG", { minimumFractionDigits: 2 })}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                            {transaction.action}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{transaction.message}</p>
                        <p className="text-xs text-muted-foreground">{transaction.timestamp.toLocaleString("en-NG")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Function Implementation</CardTitle>
            <CardDescription>The trackExpense function code</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
              <code className="font-mono">{`function trackExpense(budget, action, amount) {
  if (action === 'spend') {
    if (amount > budget) {
      return \`Insufficient funds! You need ₦\${amount.toLocaleString('en-NG', 
        { minimumFractionDigits: 2 })} but only have ₦\${budget.toLocaleString('en-NG', 
        { minimumFractionDigits: 2 })}.\`;
    }
    if (amount > 50000) {
      return \`Transaction declined! Single transactions cannot exceed ₦50,000.00. 
        You attempted ₦\${amount.toLocaleString('en-NG', { minimumFractionDigits: 2 })}.\`;
    }
    const newBudget = budget - amount;
    return \`Expense recorded! ₦\${amount.toLocaleString('en-NG', 
      { minimumFractionDigits: 2 })} spent. Remaining budget: ₦\${newBudget.toLocaleString('en-NG', 
      { minimumFractionDigits: 2 })}.\`;
  } else if (action === 'add') {
    const newBudget = budget + amount;
    return \`Funds added! ₦\${amount.toLocaleString('en-NG', 
      { minimumFractionDigits: 2 })} added to budget. New budget: ₦\${newBudget.toLocaleString('en-NG', 
      { minimumFractionDigits: 2 })}.\`;
  }
  return 'Invalid action. Please use "spend" or "add".';
}`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
