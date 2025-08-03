let userRole = null;
const users = {
  sp_office: {role: "Admin", password: "sp123"},
  oc: {role: "OC/IC", password: "oc123"},
  io: {role: "IO", password: "io123"},
  pi_pasi: {role: "PI/PASI", password: "pi123"}
};

async function loadCases() {
  const response = await fetch("Pending_Cases_Biswanath_Cleaned.csv");
  const data = await response.text();
  const rows = data.split("\n").map(r => r.split(","));
  return rows;
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const status = document.getElementById("login-status");

  if (users[username] && users[username].password === password) {
    userRole = users[username].role;
    status.textContent = "✅ Login successful as " + userRole;
    document.getElementById("login").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    displayCases();
  } else {
    status.textContent = "❌ Invalid credentials";
  }
}

async function displayCases() {
  const cases = await loadCases();
  const psFilter = document.getElementById("psFilter");
  const table = document.getElementById("casesTable");

  const psList = [...new Set(cases.slice(1).map(row => row[2]))];
  psFilter.innerHTML = "<option value=''>All</option>" + psList.map(ps => `<option>${ps}</option>`).join("");

  psFilter.onchange = () => renderTable(cases, psFilter.value);
  renderTable(cases, "");
}

function renderTable(cases, psFilter) {
  const table = document.getElementById("casesTable");
  let html = "<tr><th>Sl No</th><th>PS</th><th>Case Reference</th><th>Date</th><th>Reason</th><th>IO</th><th>Remarks</th></tr>";

  cases.slice(1).forEach(row => {
    if (!row[2]) return;
    if (psFilter && row[2] !== psFilter) return;
    html += `<tr>
      <td>${row[0]}</td>
      <td>${row[2]}</td>
      <td>${row[3]}</td>
      <td>${row[4]}</td>
      <td>${row[5]}</td>
      <td>${row[7]}</td>
      <td>${row[8]}</td>
    </tr>`;
  });
  table.innerHTML = html;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js');
}