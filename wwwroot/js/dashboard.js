// API base URL
const API_URL = 'http://localhost:5007';

// Load dashboard data
async function loadDashboard() {
    try {
        // Add loading state
        document.querySelectorAll('.stat-value').forEach(el => {
            el.classList.add('loading');
        });
        
        // Fetch routes and fleets
        const [routes, fleets] = await Promise.all([
            fetch(`${API_URL}/GetRoute`).then(res => res.json()),
            fetch(`${API_URL}/GetFleet`).then(res => res.json())
        ]);

        // Update stats with animation
        animateNumber('totalFleets', fleets.length);
        animateNumber('totalRoutes', routes.length);

        // Calculate and update utilization
        const assignedFleets = fleets.filter(fleet => fleet.routeId != null).length;
        const utilization = fleets.length > 0 ? Math.round((assignedFleets / fleets.length) * 100) : 0;
        animateNumber('fleetUtilization', utilization, '%');

        // Update route summary table
        const routeSummaryTable = document.getElementById('routeSummaryTable');
        routeSummaryTable.innerHTML = '';

        routes.forEach(route => {
            const assignedFleets = fleets.filter(f => f.routeId === route.id);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <div class="d-flex align-items-center">
                        <i class="bx bxs-map-pin me-2 text-primary"></i>
                        <span class="fw-medium">${route.name}</span>
                    </div>
                </td>
                <td>${route.origin || '-'}</td>
                <td>${route.destination || '-'}</td>
                <td>
                    <span class="badge bg-primary">${assignedFleets.length} Fleets</span>
                </td>
                <td>
                    <span class="badge ${assignedFleets.length > 0 ? 'bg-success' : 'bg-warning'}">
                        ${assignedFleets.length > 0 ? 'Active' : 'No Fleets'}
                    </span>
                </td>
            `;
            routeSummaryTable.appendChild(row);
        });

        // Remove loading state
        document.querySelectorAll('.stat-value').forEach(el => {
            el.classList.remove('loading');
        });

    } catch (error) {
        console.error('Error loading dashboard:', error);
        // Show error message
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.innerHTML = `
                <div class="card-body text-center text-danger">
                    <i class="bx bx-error-circle display-4 mb-2"></i>
                    <p>Failed to load data</p>
                </div>
            `;
        });
    }
}

// Animate number counting
function animateNumber(elementId, finalValue, suffix = '') {
    const element = document.getElementById(elementId);
    const duration = 1000; // Animation duration in milliseconds
    const steps = 20; // Number of steps in animation
    const stepDuration = duration / steps;
    const increment = finalValue / steps;
    let currentValue = 0;
    let currentStep = 0;

    const timer = setInterval(() => {
        currentStep++;
        currentValue += increment;
        
        if (currentStep === steps) {
            clearInterval(timer);
            currentValue = finalValue;
        }

        element.textContent = Math.round(currentValue) + suffix;
    }, stepDuration);
}

// Initialize dashboard and refresh every minute
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
    setInterval(loadDashboard, 60000); // Refresh every minute
});
