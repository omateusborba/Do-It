const taskForm = document.querySelector('.inserirTarefa');
const taskInput = document.getElementById('input');
const taskList = document.querySelector('.ListaDeTarefas');
const messageDiv = document.querySelector('.message');


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
function atualizarHora() {
    const hoje = document.querySelector('.data')
    const agora = document.querySelector('.hora')

    let dia = new Date()

    hoje.innerHTML = `Para hoje: ${dia.toLocaleDateString()}`
    if (dia.getMinutes() < 10) {
        agora.innerHTML = `${dia.getHours()}:0${dia.getMinutes()}`
    }
    else{
        agora.innerHTML = `${dia.getHours()}:${dia.getMinutes()}`
    }

    
}

setInterval(atualizarHora, 1000);


function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <p class="tarefa">${task}</p>
            <button class="btn" onclick="deleteTask(${index})">Concluir Tarefa</button>
        `;
        taskList.appendChild(li);
    });
}

function addTask(task) {
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const task = taskInput.value.trim();
    if (task) {
        addTask(task);
        taskInput.value = '';
        messageDiv.textContent = ''; // Limpa a mensagem de erro
    } else {
        messageDiv.textContent = 'Por favor, insira uma tarefa.'; // Exibe mensagem de erro
    }
});

atualizarHora()
renderTasks();