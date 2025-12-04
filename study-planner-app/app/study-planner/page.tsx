"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2, Check, BookOpen, ArrowLeft } from "lucide-react"
import Link from "next/link"

type Priority = "High" | "Medium" | "Low"
type Filter = "All" | "Completed" | "Pending"

interface StudyTask {
  id: string
  subject: string
  priority: Priority
  date: string
  completed: boolean
}

export default function StudyPlannerPage() {
  const [tasks, setTasks] = useState<StudyTask[]>([])
  const [subject, setSubject] = useState("")
  const [priority, setPriority] = useState<Priority>("Medium")
  const [date, setDate] = useState("")
  const [filter, setFilter] = useState<Filter>("All")

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("studyTasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks.length > 0 || localStorage.getItem("studyTasks")) {
      localStorage.setItem("studyTasks", JSON.stringify(tasks))
    }
  }, [tasks])

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!subject.trim() || !date) return

    const newTask: StudyTask = {
      id: Date.now().toString(),
      subject: subject.trim(),
      priority,
      date,
      completed: false,
    }

    setTasks([...tasks, newTask])
    setSubject("")
    setPriority("Medium")
    setDate("")
  }

  const toggleComplete = (id: string) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case "High":
        return "bg-red-500 text-white"
      case "Medium":
        return "bg-orange-500 text-white"
      case "Low":
        return "bg-green-500 text-white"
    }
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "Completed") return task.completed
    if (filter === "Pending") return !task.completed
    return true
  })

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
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Study Planner</h1>
          </div>
          <p className="text-muted-foreground text-lg">Organize your study sessions and stay on track</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Add Study Task</CardTitle>
              <CardDescription>Create a new study session</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={addTask} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="e.g., Mathematics"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={(value) => setPriority(value as Priority)}>
                    <SelectTrigger id="priority">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>

                <Button type="submit" className="w-full">
                  Add Task
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Study Tasks</CardTitle>
                  <CardDescription>
                    {filteredTasks.length} {filter.toLowerCase()} {filteredTasks.length === 1 ? "task" : "tasks"}
                  </CardDescription>
                </div>
                <Select value={filter} onValueChange={(value) => setFilter(value as Filter)}>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Tasks</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                    <BookOpen className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    {filter === "All"
                      ? "No study tasks yet. Add one to get started!"
                      : `No ${filter.toLowerCase()} tasks.`}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-3 p-4 rounded-lg border transition-all ${
                        task.completed ? "bg-muted/50 opacity-75" : "bg-card"
                      }`}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => toggleComplete(task.id)}
                        className={task.completed ? "bg-primary text-primary-foreground" : ""}
                      >
                        <Check className="w-4 h-4" />
                      </Button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className={`font-semibold ${task.completed ? "line-through text-muted-foreground" : ""}`}>
                            {task.subject}
                          </h3>
                          <span
                            className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}
                          >
                            {task.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(task.date).toLocaleDateString("en-NG", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTask(task.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
