// Date and Time, putting it outside DOMContentLoaded block ensures it is included in DOM Contents Loading Status Check.
const rendertime = () => {

  const dateEl = document.getElementById('date')
  const timeEl = document.getElementById('time')

  setInterval(() => {
    dateEl.textContent = new Date().toLocaleString('en-GB', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })

    timeEl.textContent = new Date().toLocaleString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }, 1000)

}

rendertime()


// Check DOM Contents Loading Status
document.addEventListener('DOMContentLoaded', () => {
  console.log('App ready!')

  // Main App Logic

  const addTaskInput = document.getElementById('add-task-input')
  const addTaskBtn = document.getElementById('add-task-btn')
  const taskListSection = document.getElementById('task-list-section')
  const clearAllBtn = document.getElementById('clear-all-btn')
  
  // Empty array to store task
  let tasks = []

  const renderTasks = () => {
    const taskList = tasks.map((taskObj, i) => `
      <div class="task border" data-task-id="${i}">
        <input type="checkbox" ${taskObj.isChecked ? 'checked' : ''}>
        <span class="${taskObj.isChecked ? 'task-done' : ''}">${taskObj.task}</span>
        <button class="del-btn">X</button>
      </div>`).join("")
    taskListSection.innerHTML = taskList
  }

  // task-done and task-delete logic
  taskListSection.addEventListener('click', (e) => {
    const targetEL = e.target
    const parentEL = targetEL.parentElement
    const tag = targetEL.tagName
    const taskId = Number(parentEL.getAttribute('data-task-id'))

    // Click target validation
    if (tag === 'BUTTON'){
      // Delete task by removing taskID index from tasks array
      tasks.splice(taskId, 1)
      renderTasks()
    } else if (tag === 'INPUT') {
      // Toggle task-done
      tasks[taskId].isChecked = !tasks[taskId].isChecked
      renderTasks()
    }
  })

  // Add task logic with white space filter
  const addTask = () => {
    const taskText = addTaskInput.value.trim()
      if (taskText !== '') {
        tasks.push({
          task : taskText,
          isChecked : false
      })
        renderTasks()
        addTaskInput.value = ''
      }
  }

  // Adds task
  addTaskBtn.addEventListener('click', addTask)

  // Adds task on Enter key press
  addTaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addTask()
    }
  })

  // Claer all task
  clearAllBtn.addEventListener('click', () => {
    tasks = []
    renderTasks()
  })

})