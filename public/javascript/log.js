async function logFormHandler(event) {
    event.preventDefault();
  
    const hoursCompleted = document.querySelector('textarea[name="log-body"]').value.trim();
  
    const goal_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (hoursCompleted) {
        const response = await fetch('/api/log', {
          method: 'POST',
          body: JSON.stringify({
            goal_id,
            hoursCompleted
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload();
        } else {
          alert(response.statusText);
        }
      }
  }
  
  document.querySelector('.comment-form').addEventListener('submit', logFormHandler);