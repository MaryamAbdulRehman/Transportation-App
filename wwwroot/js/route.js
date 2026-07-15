// API base URL
const API_URL = 'http://localhost:5007';

let routes = [];
const routeModal = new bootstrap.Modal(document.getElementById('routeModal'));

// Load routes data
async function loadRoutes() {
    try {
        const response = await fetch(`${API_URL}/GetRoute`);
        routes = await response.json();
        displayRoutes();
    } catch (error) {
        console.error('Error loading routes:', error);
        alert('Failed to load routes');
    }
}

// Display routes in table
function displayRoutes() {
    const tableBody = document.getElementById('routesTableBody');
    tableBody.innerHTML = '';

    routes.forEach(route => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${route.id}</td>
            <td>${route.name}</td>
            <td>${route.origin}</td>
            <td>${route.destination}</td>
            <td>${route.distance} km</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="showEditRouteModal(${route.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteRoute(${route.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Show add route modal
function showAddRouteModal() {
    document.getElementById('routeId').value = '';
    document.getElementById('routeForm').reset();
    document.getElementById('routeModalTitle').textContent = 'Add Route';
    routeModal.show();
}

// Show edit route modal
function showEditRouteModal(id) {
    const route = routes.find(r => r.id === id);
    if (route) {
        document.getElementById('routeId').value = route.id;
        document.getElementById('routeName').value = route.name;
        document.getElementById('routeOrigin').value = route.origin;
        document.getElementById('routeDestination').value = route.destination;
        document.getElementById('routeDistance').value = route.distance;
        document.getElementById('routeModalTitle').textContent = 'Edit Route';
        routeModal.show();
    }
}

// Save route (create or update)
async function saveRoute() {
    const routeId = document.getElementById('routeId').value;
    const route = {
        name: document.getElementById('routeName').value,
        origin: document.getElementById('routeOrigin').value,
        destination: document.getElementById('routeDestination').value,
        distance: parseFloat(document.getElementById('routeDistance').value)
    };

    try {
        let response;
        if (routeId) {
            response = await fetch(`${API_URL}/UpdateRoute/${routeId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(route)
            });
        } else {
            response = await fetch(`${API_URL}/CreateRoute`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(route)
            });
        }

        if (response.ok) {
            await loadRoutes();
            routeModal.hide();
        } else {
            throw new Error('Failed to save route');
        }
    } catch (error) {
        console.error('Error saving route:', error);
        alert('Failed to save route');
    }
}

// Delete route
async function deleteRoute(id) {
    if (confirm('Are you sure you want to delete this route?')) {
        try {
            const response = await fetch(`${API_URL}/RemoveRoute/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadRoutes();
            } else {
                throw new Error('Failed to delete route');
            }
        } catch (error) {
            console.error('Error deleting route:', error);
            alert('Failed to delete route');
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadRoutes();
});
