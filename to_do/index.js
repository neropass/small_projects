document.querySelector('#push').onclick = function() {
  if(document.querySelector('#newtask input').value.length == 0) {
    alert("Please enter a Task")
  }
}