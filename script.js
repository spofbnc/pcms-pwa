const form = document.getElementById('vehicleForm');
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const imageDataInput = document.getElementById('imageData');

navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
  .then(stream => video.srcObject = stream)
  .catch(err => console.error('Camera error:', err));

form.addEventListener('submit', function(e) {
  e.preventDefault();
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  imageDataInput.value = canvas.toDataURL('image/jpeg');

  const formData = new FormData(form);
  fetch('PASTE_YOUR_DEPLOYED_SCRIPT_URL_HERE', {
    method: 'POST',
    body: formData
  })
  .then(response => response.text())
  .then(data => alert('Submitted successfully!'))
  .catch(error => alert('Submission failed.'));
});