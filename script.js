const bells = new Audio('./sounds/mixkit-achievement-bell-600.wav'); 
const resetBell = new Audio('./sounds/mixkit-arcade-retro-game-over-213.wav'); 
const session = document.querySelector('.minutes'); 
let myInterval; 
let state = true;
let minuteDiv = document.querySelector('.minutes');
let secondDiv = document.querySelector('.seconds');

// Start Button
document.querySelector('.btn-start').addEventListener('click', function() {
    const sessionAmount = Number.parseInt(session.textContent)
    bells.play()
    if(state) {
      state = false;
      let totalSeconds = sessionAmount * 60;
      document.querySelector('.app-message').textContent = 'running';
      const updateSeconds = () => {
            totalSeconds--;
          
            let minutesLeft = Math.floor(totalSeconds/60);
            let secondsLeft = totalSeconds % 60;
          
            if(secondsLeft < 10) {
              secondDiv.textContent = '0' + secondsLeft;
            } else {
              secondDiv.textContent = secondsLeft;
            }
            minuteDiv.textContent = `${minutesLeft}`
          
            if(minutesLeft === 0 && secondsLeft === 0) {
              bells.play()
              reset();
            }
          
      }
      myInterval = setInterval(updateSeconds, 1000);
    } else {
      alert('Session has already started.')
    }
  });


// Todo Button
  document.getElementById('add-todo-btn').addEventListener('click', function() {
    var todoText = document.getElementById('todo-input').value;

    if (todoText !== '') {
  
        var newTodo = document.createElement('li');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'todo' + (document.querySelectorAll('.todo-list li').length + 1);
        checkbox.name = checkbox.id;
        var label = document.createElement('label');
        label.htmlFor = checkbox.id;
        label.textContent = todoText;
    
        newTodo.appendChild(checkbox);
        newTodo.appendChild(label);

        document.querySelector('.todo-list').appendChild(newTodo);
    
        document.getElementById('todo-input').value = '';

        document.querySelector('.btn-remove-checked').style.display = 'inline-block';
    } else {
        alert('Please enter a todo item');
    }

  });

  // Remove Checked ToDos Button
  document.querySelector('.btn-remove-checked').addEventListener('click', function() {
    var checkboxes = document.querySelectorAll('.todo-list input[type="checkbox"]');
    if (checkboxes.length === 0) {
      alert('No todos to remove');
      return;
    }

    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxes[i].parentNode.remove();
      }
    }

    if (document.querySelectorAll('.todo-list li').length === 0) {
        document.querySelector('.btn-remove-checked').style.display = 'none';
      }
  });

  // Only visible when there are todos
  document.querySelector('.btn-remove-checked').style.display = 'none';

  // Avoid Redundant Code
  function reset() {
    if (state === false) {
        resetBell.play();
        clearInterval(myInterval);
        document.querySelector('.minutes').textContent = '25';
        document.querySelector('.seconds').textContent = '00';
        document.querySelector('.app-message').textContent = 'press start to begin';
        state = true;
    } else {
        alert('Session has not started yet.');
    }
    
  }

  // Reset Timer Button
  document.querySelector('.reset-timer-btn').addEventListener('click', function() {
    reset();
  });

