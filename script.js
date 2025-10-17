const rendertime = () => {

  const dateEl = document.getElementById('date')
  const timeEl = document.getElementById('time')

  setInterval(() => {
    dateEl.textContent = new Date().toLocaleString('en-GB', {
      weekday: 'short', // Day of the week (e.g. 'Wednesday')
      year: 'numeric', // Full year (e.g. '2025')
      month: 'short', // Full month name (e.g. 'October')
      day: 'numeric', // Day of the month (e.g. '8')
    })

    timeEl.textContent = new Date().toLocaleString('en-GB', {
      hour: '2-digit', // Hour in 24-hour format (e.g. '21')
      minute: '2-digit', // Minute (e.g. '15')
    })
  }, 1000)

}

rendertime()

document.addEventListener('DOMContentLoaded', () => {
  console.log('App ready!');
  // Your logic goes here
  
  const addTaskInput = document.getElementById('add-task-input')
  const addTaskBtn = document.getElementById('add-task-btn')
  const taskListSection = document.getElementById('task-list-section')
  const clearAllBtn = document.getElementById('clear-all-btn')
  

  let tasks = []
  // let taskArr = ['task 1', 'task 2', 'task 3', 'task 4']
  


  // V1 Made the DOM update and delete button work

  // const renderTasks = () => {
  //   let taskList = ""
  //   for (let i = 0; i < (tasks.length); i++)
  //     taskList += `<div class="task border">
  //                     <input type="checkbox">
  //                     <span>${tasks[i]}</span>
  //                     <button class="del-btn" data-task-id="${i}">X</button>
  //                   </div>`
  //   console.log(taskList)
  //   taskListSection.innerHTML = taskList

  //   const delBtns = taskListSection.querySelectorAll('.del-btn')
  //   console.log(delBtns)
  //   for (let btn of delBtns) {
  //     console.log(btn)
  //     btn.addEventListener('click', () => {
  //       console.log('this log', Number(btn.getAttribute('data-task-id')))
  //       console.log(tasks)
  //       tasks.splice(Number(btn.getAttribute('data-task-id')), 1)
  //       console.log(tasks)
  //       renderTasks()
  //     })
  //   }
  // }



  // V2 Inporve the delete buttons code

  // const renderTasks = () => {
  //   let taskList = ""
  //   for (let i = 0; i < (tasks.length); i++) {
  //     taskList += `<div class="task border">
  //                     <input type="checkbox">
  //                     <span>${tasks[i]}</span>
  //                     <button class="del-btn" data-task-id="${i}">X</button>
  //                   </div>`
  //   }
  //   taskListSection.innerHTML = taskList
  // }

  
  // taskListSection.addEventListener('click', (e) => {
  //   tasks.splice(Number(e.target.getAttribute('data-task-id')), 1)
  //   renderTasks()
  // })



  // V3 Inporved the DOM update code

  const renderTasks = () => {
    const taskList = tasks.map((task, i) => `
      <div class="task border">
        <input type="checkbox">
        <span>${task}</span>
        <button class="del-btn" data-task-id="${i}">X</button>
      </div>`).join("")
    taskListSection.innerHTML = taskList
  }

  
  taskListSection.addEventListener('click', (e) => {
    tasks.splice(Number(e.target.getAttribute('data-task-id')), 1)
    renderTasks()
  })


  // From ChatGPT: For reference only, the code is broken but the code above was made from referencing this.

  // const renderTasks = () => {
  //   let taskList = ""
  //   for (let i = 0; i < tasks.length; i++) 
  //     taskList += `<div class="task border">
  //                   <input type="checkbox">
  //                   <span>${tasks[i]}</span>
  //                   <button class="del-btn" data-task-id="${i}">X</button>
  //                 </div>`

  //   taskListSection.innerHTML = taskList  // Update the DOM with new task list

  //   // Attach one event listener to the parent container for all delete buttons
  //   taskListSection.addEventListener('click', (e) => {
  //     if (e.target && e.target.classList.contains('del-btn')) {
  //       const taskId = Number(e.target.getAttribute('data-task-id'))  // Get the task ID
  //       tasks.splice(taskId, 1)  // Remove the task from the array
  //       renderTasks()  // Re-render tasks after deletion
  //     }
  //   })
  // }


  addTaskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const taskText = addTaskInput.value.trim();
      if (taskText !== '') {
        tasks.push(taskText); 
        renderTasks(); 
        addTaskInput.value = ''; // Clear the input field after adding the task
      }
    }
  });

  addTaskBtn.addEventListener('click', () => {
    const taskText = addTaskInput.value.trim()
    if (taskText != ''){
      tasks.push(taskText)
      renderTasks()
      addTaskInput.value = ''; // Clear the input field after adding the task
    }

  })

  clearAllBtn.addEventListener('click', () => {
    tasks = []
    renderTasks()
  })

});