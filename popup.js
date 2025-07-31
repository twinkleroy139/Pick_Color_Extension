//  for only pick color javascript

// document.getElementById('pickColorBtn').addEventListener('click', async () => {
//     if (!window.EyeDropper) {
//       alert('EyeDropper API is not supported in your browser. Thanks By Twinkle_MorningStar');
//       return;
//     }
  

  
//     // Check if the EyeDropper API is supported
//     try {
//       const eyeDropper = new EyeDropper();
//       const result = await eyeDropper.open();
//       const color = result.sRGBHex;
  
//       // Display the selected color
//       const colorDisplay = document.getElementById('colorDisplay');
//       colorDisplay.textContent = `Selected Color: ${color}`;
//       colorDisplay.style.backgroundColor = color;

  
//       // Copy the color to the clipboard
//       await navigator.clipboard.writeText(color);
//       alert(`Color ${color} copied to clipboard! Thanks By Twinkle_MorningStar`);
//     } catch (err) {
//       console.error('Error picking color:', err);
//     }



//   });
  







// // Add logic to store picked colors in localStorage and render history:

// const colorBtn = document.getElementById('pickColorBtn');
// const colorDisplay = document.getElementById('colorDisplay');
// const historyList = document.getElementById('colorHistory');

// function updateHistory(newColor) {
//   let colors = JSON.parse(localStorage.getItem('colorHistory') || '[]');
//   colors.unshift(newColor); // Add new color to the beginning
//   colors = colors.slice(0, 10); // Keep only last 10
//   localStorage.setItem('colorHistory', JSON.stringify(colors));
//   renderHistory();
// }

// // Function to render the color history and clear color history
// function renderHistory() {
//   const colors = JSON.parse(localStorage.getItem('colorHistory') || '[]');
//   historyList.innerHTML = '';
//   colors.forEach(color => {
//     const div = document.createElement('div');
//     div.className = 'history-item';
//     div.textContent = color;
//     div.style.backgroundColor = color;
//     div.style.color = '#fff';
//     div.style.padding = '5px';
//     div.style.margin = '2px 0';
//     div.style.cursor = 'pointer';
//     div.addEventListener('click', async () => {
//       await navigator.clipboard.writeText(color);
//       alert(`Copied ${color} to clipboard!`);
//     });
//     historyList.appendChild(div);
//   });
// }



// // Check if the EyeDropper API is supported
// colorBtn.addEventListener('click', async () => {
//   if (!window.EyeDropper) {
//     alert('EyeDropper API is not supported in your browser.');
//     return;
//   }
//   try {
//     const eyeDropper = new EyeDropper();
//     const result = await eyeDropper.open();
//     const color = result.sRGBHex;

//     colorDisplay.textContent = `Selected Color: ${color}`;
//     colorDisplay.style.backgroundColor = color;
//     await navigator.clipboard.writeText(color);
//     updateHistory(color);
//   } catch (err) {
//     console.error('Error picking color:', err);
//   }
// });


// // Clear history button
// const clearBtn = document.getElementById('clearHistoryBtn');
// clearBtn.addEventListener('click', () => {
//   localStorage.removeItem('colorHistory');
//   renderHistory();
// });





// // Add Hex & RGB Format Toggle (Optional)Let users view colors in both formats.Add a toggle checkbox
// const formatToggle = document.getElementById('toggleFormat');

// function hexToRgb(hex) {
//   const r = parseInt(hex.slice(1, 3), 16);
//   const g = parseInt(hex.slice(3, 5), 16);
//   const b = parseInt(hex.slice(5, 7), 16);
//   return `rgb(${r}, ${g}, ${b})`;
// }

// function renderHistory() {
//   const colors = JSON.parse(localStorage.getItem('colorHistory') || '[]');
//   historyList.innerHTML = '';
//   colors.forEach(color => {
//     const displayColor = formatToggle.checked ? hexToRgb(color) : color;
//     const div = document.createElement('div');
//     div.className = 'history-item';
//     div.textContent = displayColor;
//     div.style.backgroundColor = color;
//     div.style.color = '#fff';
//     div.style.padding = '5px';
//     div.style.margin = '2px 0';
//     div.style.cursor = 'pointer';
//     div.addEventListener('click', async () => {
//       await navigator.clipboard.writeText(displayColor);
//       alert(`Copied ${displayColor} to clipboard!`);
//     });
//     historyList.appendChild(div);
//   });
// }

// formatToggle.addEventListener('change', renderHistory);



// // Add a Tooltip or Toast Notification (Optional UX) Instead of alert(), use a better UI message:;
// function showToast(message) {
//     const toast = document.getElementById('toast');
//     toast.textContent = message;
//     toast.classList.add('show');
    
//     setTimeout(() => {
//       toast.classList.remove('show');
//     }, 2500);
//   }
//   b


// document.addEventListener('DOMContentLoaded', renderHistory);














// with toast, color history, RGB toggle
const colorBtn = document.getElementById('pickColorBtn');
const colorDisplay = document.getElementById('colorDisplay');
const historyList = document.getElementById('colorHistory');
const clearBtn = document.getElementById('clearHistoryBtn');
const formatToggle = document.getElementById('toggleFormat');

// --- Helper: Toast notification ---
function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// --- Helper: Convert HEX to RGB ---
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

// --- Update color history ---
function updateHistory(newColor) {
  let colors = JSON.parse(localStorage.getItem('colorHistory') || '[]');
  colors.unshift(newColor);
  colors = colors.slice(0, 10); // last 10 only
  localStorage.setItem('colorHistory', JSON.stringify(colors));
  renderHistory();
}

// --- Render history (hex or rgb based on toggle) ---
function renderHistory() {
  const colors = JSON.parse(localStorage.getItem('colorHistory') || '[]');
  historyList.innerHTML = '';
  colors.forEach(color => {
    const displayColor = formatToggle.checked ? hexToRgb(color) : color;
    const div = document.createElement('div');
    div.className = 'history-item';
    div.textContent = displayColor;
    div.style.backgroundColor = color;
    div.style.color = '#fff';
    div.style.padding = '5px';
    div.style.margin = '2px 0';
    div.style.cursor = 'pointer';
    div.addEventListener('click', async () => {
      await navigator.clipboard.writeText(displayColor);
      showToast(`Copied ${displayColor}`);
    });
    historyList.appendChild(div);
  });
}

// --- Pick color on button click ---
colorBtn.addEventListener('click', async () => {
  if (!window.EyeDropper) {
    showToast('EyeDropper API not supported');
    return;
  }
  try {
    const eyeDropper = new EyeDropper();
    const result = await eyeDropper.open();
    const color = result.sRGBHex;
    colorDisplay.textContent = `Selected Color: ${color}`;
    colorDisplay.style.backgroundColor = color;
    await navigator.clipboard.writeText(color);
    updateHistory(color);
    showToast("Copied!");
  } catch (err) {
    console.error('EyeDropper error:', err);
  }
});

// --- Clear history ---
clearBtn.addEventListener('click', () => {
  localStorage.removeItem('colorHistory');
  renderHistory();
  showToast("History cleared!");
});

// --- RGB/Hex toggle ---
formatToggle.addEventListener('change', renderHistory);

// --- Initial load ---
document.addEventListener('DOMContentLoaded', renderHistory);
