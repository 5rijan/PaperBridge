document.addEventListener('DOMContentLoaded', () => {
    const editButton = document.getElementById('edit-button');
    
    if (editButton) {
        editButton.addEventListener('click', () => {
            window.location.href = 'edit.html';
        });
    } else {
        console.error('Edit button not found!');
    }
});
