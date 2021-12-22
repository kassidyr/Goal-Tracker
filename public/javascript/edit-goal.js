async function editFormHandler(event) {
    event.preventDefault();
  
    const objective = document.querySelector('input[name="goal-title"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/goals/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        objective
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-goal-form').addEventListener('submit', editFormHandler);