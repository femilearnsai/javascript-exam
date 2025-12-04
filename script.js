

class StudyPlanner {
  constructor() {
    this.tasks = this.loadTasks()
    this.currentFilter = "all"
    this.init()
  }

  init() {
    this.setupEventListeners()
    this.renderTasks()
  }

  
  setupEventListeners() {
    
    document.getElementById("taskForm").addEventListener("submit", (e) => {
      e.preventDefault()
      this.addTask()
    })

    
  
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.setFilter(e.target.dataset.filter)
      })
    })
  }

  addTask() {
    const subject = document.getElementById("subject").value.trim()
    const priority = document.getElementById("priority").value
    const date = document.getElementById("date").value

    if (!subject || !priority || !date) {
      alert("Please fill in all fields")
      return
    }

    const task = {
      id: Date.now(),
      subject,
      priority,
      date,
      completed: false,
      createdAt: new Date().toISOString(),
    }

    this.tasks.push(task)
    this.saveTasks()
    this.renderTasks()

    
    document.getElementById("taskForm").reset()
  }

  toggleComplete(id) {
    const task = this.tasks.find((t) => t.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveTasks()
      this.renderTasks()
    }
  }

  deleteTask(id) {
    if (confirm("Are you sure you want to delete this task?")) {
      this.tasks = this.tasks.filter((t) => t.id !== id)
      this.saveTasks()
      this.renderTasks()
    }
  }

  setFilter(filter) {
    this.currentFilter = filter

   
    document.querySelectorAll(".filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.filter === filter)
    })

    this.renderTasks()
  }

  getFilteredTasks() {
    switch (this.currentFilter) {
      case "completed":
        return this.tasks.filter((t) => t.completed)
      case "pending":
        return this.tasks.filter((t) => !t.completed)
      default:
        return this.tasks
    }
  }

  renderTasks() {
    const tasksList = document.getElementById("tasksList")
    const emptyState = document.getElementById("emptyState")
    const filteredTasks = this.getFilteredTasks()

    if (filteredTasks.length === 0) {
      tasksList.innerHTML = ""
      emptyState.classList.remove("hidden")
      return
    }

    emptyState.classList.add("hidden")

    tasksList.innerHTML = filteredTasks
      .map(
        (task) => `
            <div class="task-item ${task.priority} ${task.completed ? "completed" : ""}">
                <div class="task-header">
                    <h3 class="task-subject">${this.escapeHtml(task.subject)}</h3>
                    <div class="task-actions">
                        <button onclick="planner.toggleComplete(${task.id})" title="${task.completed ? "Mark as pending" : "Mark as completed"}">
                            ${task.completed ? "↶" : "✓"}
                        </button>
                        <button class="delete-btn" onclick="planner.deleteTask(${task.id})" title="Delete task">
                            ✕
                        </button>
                    </div>
                </div>
                <div class="task-meta">
                    <div class="task-priority">
                        <span class="priority-badge ${task.priority}">
                            ${task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                    </div>
                    <div class="task-date">
                        📅 ${this.formatDate(task.date)}
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

 formatDate(dateString) {
    const date = new Date(dateString)
    const options = { year: "numeric", month: "long", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  escapeHtml(text) {
    const div = document.createElement("div")
    div.textContent = text
    return div.innerHTML
  }

  saveTasks() {
    localStorage.setItem("studyPlannerTasks", JSON.stringify(this.tasks))
  }

  loadTasks() {
    const saved = localStorage.getItem("studyPlannerTasks")
    return saved ? JSON.parse(saved) : []
  }
}


const planner = new StudyPlanner()
