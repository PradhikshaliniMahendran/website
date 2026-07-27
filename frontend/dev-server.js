const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>University Event Management System Pro</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: {
              50: '#f0f6ff', 100: '#e0edff', 400: '#36a9ff', 500: '#0c87f8', 600: '#006ad6', 900: '#0a3c74', 950: '#07264e'
            }
          }
        }
      }
    }
  </script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Inter', sans-serif; }
    .glass-panel { background: rgba(15, 23, 42, 0.85); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.08); }
    .glass-card { background: linear-gradient(135deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.07); }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex antialiased selection:bg-brand-500 selection:text-white">
  
  <!-- Sidebar -->
  <aside class="w-64 border-r border-slate-800/80 bg-slate-950 flex flex-col justify-between p-4 min-h-screen flex-shrink-0">
    <div>
      <div className="flex items-center space-x-3 px-3 py-4 mb-6 border-b border-slate-800/80 flex">
        <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 font-bold text-white text-lg">
          ✦
        </div>
        <div class="ml-3">
          <h1 class="font-bold text-sm text-white tracking-wide">UniEvent Pro</h1>
          <p class="text-[11px] font-medium text-slate-400">University Event Suite</p>
        </div>
      </div>

      <nav class="space-y-6 text-xs">
        <div>
          <h2 class="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">MODULE 1: SECURITY & USERS</h2>
          <div class="space-y-1">
            <button onclick="switchTab('users')" class="w-full text-left px-3 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-900 hover:text-white flex items-center justify-between">
              <span>👤 User Directory</span>
              <span class="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400">5 Users</span>
            </button>
            <button onclick="switchTab('roles')" class="w-full text-left px-3 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-900 hover:text-white">
              🛡️ Role & RBAC Matrix
            </button>
          </div>
        </div>

        <div>
          <h2 class="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">MODULE 2: EVENT MANAGEMENT</h2>
          <div class="space-y-1">
            <button onclick="switchTab('events')" class="w-full text-left px-3 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-900 hover:text-white flex items-center justify-between">
              <span>🎉 Event Catalog</span>
              <span class="text-[9px] bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold">Smart Conflict</span>
            </button>
            <button onclick="switchTab('categories')" class="w-full text-left px-3 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-900 hover:text-white">
              🏷️ Domain Categories
            </button>
          </div>
        </div>

        <div>
          <h2 class="px-3 text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">MODULE 3: VENUE & APPROVALS</h2>
          <div class="space-y-1">
            <button onclick="switchTab('venues')" class="w-full text-left px-3 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-900 hover:text-white">
              🏛️ Campus Venues
            </button>
            <button onclick="switchTab('approvals')" class="w-full text-left px-3 py-2.5 rounded-xl font-medium text-slate-300 hover:bg-slate-900 hover:text-white flex items-center justify-between">
              <span>📋 Multi-Level Approvals</span>
              <span class="text-[9px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded font-bold">Workflow</span>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <div class="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
      <div class="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 font-bold flex items-center justify-center text-xs">EV</div>
      <div class="truncate text-xs">
        <p class="font-semibold text-white truncate">Dr. Eleanor Vance</p>
        <p class="text-[10px] text-slate-400 truncate">System Administrator</p>
      </div>
    </div>
  </aside>

  <!-- Main Workspace -->
  <main class="flex-1 p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto">
    <!-- Header Bar -->
    <header class="flex items-center justify-between pb-6 border-b border-slate-800">
      <div>
        <span id="tabBadge" class="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-500/10 text-blue-400 border border-blue-500/30">
          ENTERPRISE SYSTEM
        </span>
        <h1 id="tabTitle" class="text-3xl font-extrabold text-white tracking-tight mt-1">University Event Command Center</h1>
      </div>
      <div class="flex items-center space-x-3">
        <span class="text-xs text-emerald-400 font-bold px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
          ● Spring Boot + MongoDB Backend Ready
        </span>
      </div>
    </header>

    <!-- TAB CONTENT SECTIONS -->
    
    <!-- DASHBOARD / EVENTS TAB -->
    <section id="tab-events" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div class="glass-card p-5 rounded-2xl border border-slate-800">
          <p class="text-xs text-slate-400 uppercase font-semibold">Total Registered Users</p>
          <p class="text-3xl font-extrabold text-white mt-2">1,710</p>
          <span class="text-[10px] text-emerald-400 font-semibold">+12% this month</span>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800">
          <p class="text-xs text-slate-400 uppercase font-semibold">Published Events</p>
          <p class="text-3xl font-extrabold text-white mt-2">24</p>
          <span class="text-[10px] text-blue-400 font-semibold">Smart Venue Check Active</span>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800">
          <p class="text-xs text-slate-400 uppercase font-semibold">Pending Approvals</p>
          <p class="text-3xl font-extrabold text-white mt-2">6</p>
          <span class="text-[10px] text-amber-400 font-semibold">Level 1 & Level 2 Queue</span>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800">
          <p class="text-xs text-slate-400 uppercase font-semibold">Campus Venues</p>
          <p class="text-3xl font-extrabold text-white mt-2">12</p>
          <span class="text-[10px] text-purple-400 font-semibold">100% Operational</span>
        </div>
      </div>

      <!-- Smart Venue Conflict Test Widget -->
      <div class="glass-card p-6 rounded-2xl border border-blue-500/30 space-y-4 bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40">
        <div class="flex items-center justify-between">
          <h3 class="text-base font-bold text-white flex items-center space-x-2">
            <span>⚡ Interactive Smart Venue Conflict Detection Engine</span>
          </h3>
          <span class="text-xs text-blue-300 font-mono font-bold">Auto Code: EVT-2026-X781</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label class="block text-slate-400 mb-1">Target Venue</label>
            <select id="conflictVenue" onchange="runConflictCheck()" class="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-800">
              <option value="AUD">Grand Innovation Auditorium (Cap: 500)</option>
              <option value="LAB">Cybersecurity & AI Complex Lab (Cap: 120)</option>
              <option value="OUT">Central Campus Amphitheater (Cap: 1500)</option>
            </select>
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Booking Date</label>
            <input id="conflictDate" type="date" value="2026-08-12" onchange="runConflictCheck()" class="w-full bg-slate-950 text-white p-2.5 rounded-xl border border-slate-800">
          </div>
          <div>
            <label class="block text-slate-400 mb-1">Conflict Engine Status</label>
            <div id="conflictResult" class="p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold text-xs">
              ⚠️ VENUE CONFLICT DETECTED! Overlapping event "Global AI Hackathon" booked for this date!
            </div>
          </div>
        </div>
      </div>

      <!-- Events List Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-card rounded-2xl border border-slate-800 overflow-hidden space-y-3">
          <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800" class="h-40 w-full object-cover">
          <div class="p-5 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="font-mono text-blue-400 font-bold">EVT-2026-X781</span>
              <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">PUBLISHED</span>
            </div>
            <h4 class="font-bold text-white text-sm">Global AI & Developer Hackathon 2026</h4>
            <p class="text-xs text-slate-400">36-Hour continuous hackathon bringing together students & faculty to build generative AI apps.</p>
            <div class="pt-2 text-xs text-slate-300 flex justify-between border-t border-slate-800">
              <span>Seats Left: <strong class="text-emerald-400">166 / 350</strong></span>
              <span class="text-slate-400">Grand Auditorium</span>
            </div>
          </div>
        </div>

        <div class="glass-card rounded-2xl border border-slate-800 overflow-hidden space-y-3">
          <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800" class="h-40 w-full object-cover">
          <div class="p-5 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="font-mono text-blue-400 font-bold">EVT-2026-N492</span>
              <span class="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-[10px] font-bold">PENDING APPROVAL</span>
            </div>
            <h4 class="font-bold text-white text-sm">Robotics & Embedded Systems Expo</h4>
            <p class="text-xs text-slate-400">Exhibition of autonomous rovers and micro-controller hardware designed by student teams.</p>
            <div class="pt-2 text-xs text-slate-300 flex justify-between border-t border-slate-800">
              <span>Seats Left: <strong class="text-emerald-400">25 / 120</strong></span>
              <span class="text-slate-400">AI Complex Lab</span>
            </div>
          </div>
        </div>

        <div class="glass-card rounded-2xl border border-slate-800 overflow-hidden space-y-3">
          <img src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800" class="h-40 w-full object-cover">
          <div class="p-5 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="font-mono text-blue-400 font-bold">EVT-2026-C109</span>
              <span class="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-[10px] font-bold">PUBLISHED</span>
            </div>
            <h4 class="font-bold text-white text-sm">Symphony of Lights Concert</h4>
            <p class="text-xs text-slate-400">Annual flagship music and dance festival featuring student bands and special guest performances.</p>
            <div class="pt-2 text-xs text-slate-300 flex justify-between border-t border-slate-800">
              <span>Seats Left: <strong class="text-emerald-400">680 / 1500</strong></span>
              <span class="text-slate-400">Amphitheater</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- USERS TAB -->
    <section id="tab-users" class="space-y-6 hidden">
      <h2 class="text-xl font-bold text-white">Module 1: User Directory & Security Accounts</h2>
      <div class="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <table class="w-full text-left text-xs text-slate-300">
          <thead class="bg-slate-900 text-slate-400 uppercase tracking-wider">
            <tr>
              <th class="p-4">User</th>
              <th class="p-4">Email / Dept</th>
              <th class="p-4">Assigned Roles</th>
              <th class="p-4">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800/80">
            <tr>
              <td class="p-4 font-bold text-white">Dr. Eleanor Vance (@admin)</td>
              <td class="p-4">admin@university.edu • CS Department</td>
              <td class="p-4"><span class="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold">ADMIN</span></td>
              <td class="p-4 text-emerald-400 font-bold">● Active</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-white">Prof. Robert Sterling (@faculty_admin)</td>
              <td class="p-4">faculty@university.edu • Academic Affairs</td>
              <td class="p-4"><span class="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-bold">FACULTY_ADMINISTRATOR</span></td>
              <td class="p-4 text-emerald-400 font-bold">● Active</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-white">Marcus Aurelius Chen (@affairs_manager)</td>
              <td class="p-4">affairs@university.edu • Student Affairs</td>
              <td class="p-4"><span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">STUDENT_AFFAIRS_MANAGER</span></td>
              <td class="p-4 text-emerald-400 font-bold">● Active</td>
            </tr>
            <tr>
              <td class="p-4 font-bold text-white">Sophia Martinez (@student1)</td>
              <td class="p-4">student1@university.edu • Software Eng.</td>
              <td class="p-4"><span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">CLUB_PRESIDENT</span></td>
              <td class="p-4 text-emerald-400 font-bold">● Active</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ROLES TAB -->
    <section id="tab-roles" class="space-y-6 hidden">
      <h2 class="text-xl font-bold text-white">Module 1: Role Based Access Control (RBAC) Matrix</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 class="font-bold text-white">System Administrator</h3>
          <p class="text-xs text-slate-400">Full system permissions across all 3 modules.</p>
          <div class="flex flex-wrap gap-1 text-[10px]">
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">MANAGE_USERS</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">MANAGE_ROLES</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">APPROVE_LEVEL_2</span>
          </div>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 class="font-bold text-white">Faculty Administrator</h3>
          <p class="text-xs text-slate-400">Level 1 event proposal reviewer & venue authority.</p>
          <div class="flex flex-wrap gap-1 text-[10px]">
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">APPROVE_LEVEL_1</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">MANAGE_VENUES</span>
          </div>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <h3 class="font-bold text-white">Student Affairs Manager</h3>
          <p class="text-xs text-slate-400">Final Level 2 event authorization & policy governance.</p>
          <div class="flex flex-wrap gap-1 text-[10px]">
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">APPROVE_LEVEL_2</span>
            <span class="px-2 py-0.5 rounded bg-slate-800 text-slate-300">COMPLIANCE_AUDIT</span>
          </div>
        </div>
      </div>
    </section>

    <!-- VENUES TAB -->
    <section id="tab-venues" class="space-y-6 hidden">
      <h2 class="text-xl font-bold text-white">Module 3: Campus Venues & Hourly Schedule Matrix</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <span class="font-mono text-xs font-bold text-blue-400">AUD-A101</span>
          <h3 class="font-bold text-white text-base">Grand Innovation Auditorium</h3>
          <p class="text-xs text-slate-400">Turing Science Center • Capacity: 500</p>
          <div class="text-[11px] text-emerald-400 font-semibold">● Status: AVAILABLE</div>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <span class="font-mono text-xs font-bold text-blue-400">LAB-B204</span>
          <h3 class="font-bold text-white text-base">Cybersecurity & AI Complex Lab</h3>
          <p class="text-xs text-slate-400">Lovelace Computing Building • Capacity: 120</p>
          <div class="text-[11px] text-emerald-400 font-semibold">● Status: AVAILABLE</div>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-3">
          <span class="font-mono text-xs font-bold text-blue-400">OUT-Q01</span>
          <h3 class="font-bold text-white text-base">Central Campus Amphitheater</h3>
          <p class="text-xs text-slate-400">Main Campus Plaza • Capacity: 1500</p>
          <div class="text-[11px] text-emerald-400 font-semibold">● Status: AVAILABLE</div>
        </div>
      </div>
    </section>

    <!-- APPROVALS TAB -->
    <section id="tab-approvals" class="space-y-6 hidden">
      <h2 class="text-xl font-bold text-white">Module 3: Multi-Level Event Approval Workflow</h2>
      <div class="space-y-4">
        <div class="glass-card p-6 rounded-2xl border border-slate-800 flex justify-between items-center">
          <div class="space-y-1">
            <div class="flex items-center space-x-2">
              <span class="font-mono text-xs font-bold text-blue-400">EVT-2026-N492</span>
              <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">Level 1: Faculty Review</span>
            </div>
            <h4 class="font-bold text-white">Annual Robotics & Embedded Systems Expo</h4>
            <p class="text-xs text-slate-400">Submitted by: Sophia Martinez (Club President) • Venue: Cybersecurity & AI Complex Lab</p>
          </div>
          <button onclick="alert('Level 1 Approval Granted! Event forwarded to Level 2 Student Affairs Manager.')" class="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold">
            Approve Level 1
          </button>
        </div>
      </div>
    </section>

    <!-- CATEGORIES TAB -->
    <section id="tab-categories" class="space-y-6 hidden">
      <h2 class="text-xl font-bold text-white">Module 2: Event Domain Categories</h2>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 class="font-bold text-blue-400">Technology & Coding</h3>
          <p class="text-xs text-slate-400">18 Events</p>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 class="font-bold text-pink-400">Cultural & Arts</h3>
          <p class="text-xs text-slate-400">12 Events</p>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 class="font-bold text-emerald-400">Sports & Athletics</h3>
          <p class="text-xs text-slate-400">9 Events</p>
        </div>
        <div class="glass-card p-5 rounded-2xl border border-slate-800 space-y-2">
          <h3 class="font-bold text-purple-400">Academic & Research</h3>
          <p class="text-xs text-slate-400">15 Events</p>
        </div>
      </div>
    </section>

  </main>

  <script>
    function switchTab(tabId) {
      document.querySelectorAll('section[id^="tab-"]').forEach(el => el.classList.add('hidden'));
      const activeSection = document.getElementById('tab-' + tabId);
      if (activeSection) activeSection.classList.remove('hidden');
      
      const titles = {
        events: 'University Event Command Center',
        users: 'User Directory & Security Accounts',
        roles: 'Role Based Access Control (RBAC) Matrix',
        venues: 'Campus Venues & Hourly Schedule Matrix',
        approvals: 'Multi-Level Event Approval Workflow',
        categories: 'Event Domain Categories'
      };
      document.getElementById('tabTitle').innerText = titles[tabId] || 'Command Center';
    }

    function runConflictCheck() {
      const venue = document.getElementById('conflictVenue').value;
      const date = document.getElementById('conflictDate').value;
      const res = document.getElementById('conflictResult');

      if (venue === 'AUD' && date === '2026-08-12') {
        res.className = "p-2.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 font-semibold text-xs";
        res.innerHTML = "⚠️ VENUE CONFLICT DETECTED! Overlapping event 'Global AI Hackathon' booked for this date!";
      } else {
        res.className = "p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-semibold text-xs";
        res.innerHTML = "✅ Venue check passed! Venue is 100% available for booking.";
      }
    }
  </script>
</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(htmlContent);
});

server.listen(PORT, () => {
  console.log(`University Event Management System running live at http://localhost:${PORT}`);
});
