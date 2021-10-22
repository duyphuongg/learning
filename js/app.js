function onClick() {
    start();
  }
  
  function start() {
    var str1 = getString1();
    var str2 = getString2();
    if (str1 === '' || str2 === '') {
      label.textContent = 'Error: one or both inputs are empty.';
      return;
    }
    updateLabel();
  }
  
  function updateLabel() {
    var str1 = getString1();
    var str2 = getString2();
    var str = str1 + str2;
    label.textContent = str1 + ' + ' + str2 + ' = ' + str;
  }
  
  function getString1() {
    return inputs[0].value;
  }
  
  function getString2() {
    return inputs[1].value;
  }
  
  var inputs = document.querySelectorAll('input');
  var label = document.querySelector('p');
  var button = document.querySelector('button');
  button.addEventListener('click', onClick);