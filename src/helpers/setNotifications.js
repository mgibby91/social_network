

export default function setNotifications(notifNum) {
  console.log('notifNum', notifNum);

  const allMenuTitles = document.querySelectorAll('.menu-title');
  for (let title of allMenuTitles) {
    if (title.textContent === 'Messages') {

      title.parentElement.style.position = 'relative';

      if (document.querySelector('.message-notification-num')) {
        document.querySelector('.message-notification-num').remove();
      }

      const notificationHTML = `
          <div class='message-notification-num'>${notifNum}</div>
        `;

      if (Number(notifNum)) {
        title.insertAdjacentHTML('afterend', notificationHTML);
      }
    }
  }

}