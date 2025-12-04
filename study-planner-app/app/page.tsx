import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Calculator } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4 text-balance">Programming Assignment Solutions</h1>
            <p className="text-xl text-muted-foreground text-balance">
              Two complete applications built with modern web technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Question 1</CardTitle>
                </div>
                <CardDescription className="text-base">Study Planner Application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A full-featured task management app for Nigerian students with priority levels, filtering, and
                  localStorage persistence.
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Add, view, complete, and delete study tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Color-coded priority levels (High/Medium/Low)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Filter by status and persistent storage</span>
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link href="/study-planner">Open Study Planner</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Question 2</CardTitle>
                </div>
                <CardDescription className="text-base">Business Expense Tracker</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A JavaScript function that manages business expenses with budget validation and transaction limits.
                </p>
                <ul className="text-sm space-y-2 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Track spending and add money to budget</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Validates sufficient funds before spending</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>₦50,000 transaction limit enforcement</span>
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/expense-tracker">Open Expense Tracker</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
