async function newFormHandler(event) {
    event.preventDefault();
  
    const objective = document.querySelector('input[name="goal-title"]').value;
    const hoursEstimate = document.querySelector('input[name="estimatedHours"]').value;
  
    const response = await fetch(`/api/goals`, {
      method: 'POST',
      body: JSON.stringify({
        objective,
        hoursEstimate
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.new-goal-form').addEventListener('submit', newFormHandler);