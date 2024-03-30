document.getElementById('pollForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    var formData = new FormData(this);

    fetch('/submit_vote', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Display poll results
        document.getElementById('pollResults').innerHTML = data;
    })
    .catch(error => console.error('Error:', error));
});
