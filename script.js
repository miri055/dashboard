// Load completed days from localStorage and mark them as 'done' in the DOM
function loadCompletedDays() {
    const completedDays = JSON.parse(localStorage.getItem('completedDays')) || [];
    completedDays.forEach(day => {
        const dayElement = document.querySelector(`.day[data-date="${day}"]`);
        if (dayElement) {
            dayElement.classList.add('done');
        }
    });
}

// Save completed days to localStorage
function saveCompletedDays() {
    const completedDays = [];
    document.querySelectorAll('.day.done').forEach(day => {
        const date = day.getAttribute('data-date'); // This should have full date, like "2024-11-01"
        completedDays.push(date);
    });
    localStorage.setItem('completedDays', JSON.stringify(completedDays));
}

// Toggle 'done' class on click and save updated status
function initializeDayClickEvent() {
    const days = document.querySelectorAll('.day');
    days.forEach(day => {
        day.addEventListener('click', function() {
            day.classList.toggle('done'); // Toggle completion status
            saveCompletedDays(); // Save changes to localStorage
        });
    });
}

// Load a note for a selected date from localStorage
function loadNoteForDate(date) {
    const savedNote = localStorage.getItem(`note_${date}`);
    const noteTextarea = document.getElementById('note-textarea');
    if (noteTextarea) {
        noteTextarea.value = savedNote ? savedNote : ''; // Populate textarea with saved note
    }
}

// Handle saving a note for the selected date
function handleSaveNoteBtn() {
    const saveNoteBtn = document.getElementById('save-note-btn');
    const noteTextarea = document.getElementById('note-textarea');

    if (saveNoteBtn && noteTextarea) {
        saveNoteBtn.addEventListener('click', function() {
            const selectedDate = document.querySelector('.day.selected')?.getAttribute('data-date');
            if (selectedDate) {
                const noteContent = noteTextarea.value;
                localStorage.setItem(`note_${selectedDate}`, noteContent); // Save note content
                alert(`Note saved for ${selectedDate}`);
            } else {
                alert('Please select a date first.');
            }
        });
    }
}

// Handle deleting a note for the selected date
function handleDeleteNoteBtn() {
    const deleteNoteBtn = document.getElementById('delete-note-btn');
    const noteTextarea = document.getElementById('note-textarea');

    if (deleteNoteBtn && noteTextarea) {
        deleteNoteBtn.addEventListener('click', function() {
            const selectedDate = document.querySelector('.day.selected')?.getAttribute('data-date');
            if (selectedDate) {
                noteTextarea.value = ''; // Clear textarea
                localStorage.removeItem(`note_${selectedDate}`); // Remove note from localStorage
                alert(`Note cleared for ${selectedDate}`);
            } else {
                alert('Please select a date first.');
            }
        });
    }
}

// Set up the click events for days and note functionality
function initializeNoteFunctionality() {
    let selectedDate = null;
    const days = document.querySelectorAll('.day');

    days.forEach(day => {
        day.addEventListener('click', function() {
            // Clear previous selection
            document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
            day.classList.add('selected'); // Mark the clicked day as selected

            selectedDate = day.getAttribute('data-date'); // Get selected date
            loadNoteForDate(selectedDate); // Load the corresponding note
        });
    });

    // Initialize Save and Delete buttons
    handleSaveNoteBtn();
    handleDeleteNoteBtn();
}

// Initialize the app once the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadCompletedDays(); // Load and mark completed days on page load
    initializeDayClickEvent(); // Set up day click event for marking completion
    initializeNoteFunctionality(); // Set up note functionality for saving/deleting notes
});
