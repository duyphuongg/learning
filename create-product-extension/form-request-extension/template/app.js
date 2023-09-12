const button = document.createElement('button');
button.textContent = 'Greet me!'
document.body.insertAdjacentElement('afterbegin', button);
button.addEventListener('click', () => {
  chrome.runtime.sendMessage('', {
    type: 'notification',
    options: {
      title: 'Just wanted to notify you',
      message: 'How great it is!',
      iconUrl: 'images/icon-32.png',
      type: 'basic'
    }
  });
});