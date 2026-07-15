// API base URL
const API_URL = 'http://localhost:5007';

let fleets = [];
let routes = [];
const fleetModal = new bootstrap.Modal(document.getElementById('fleetModal'));

// Load fleets and routes data
async function loadData() {
    try {
        const [fleetsResponse, routesResponse] = await Promise.all([
            fetch(`${API_URL}/GetFleet`),
            fetch(`${API_URL}/GetRoute`)
        ]);

        fleets = await fleetsResponse.json();
        routes = await routesResponse.json();

        displayFleets();
        updateRouteSelect();
    } catch (error) {
        console.error('Error loading data:', error);
        alert('Failed to load data');
    }
}

// Display fleets in table
function displayFleets() {
    const tableBody = document.getElementById('fleetsTableBody');
    tableBody.innerHTML = '';

    fleets.forEach(fleet => {
        const route = routes.find(r => r.id === fleet.routeId);
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fleet.id}</td>
            <td>${fleet.type}</td>
            <td>${fleet.vehicleNumber}</td>
            <td>${route ? route.name : 'Not assigned'}</td>
            <td>${fleet.capacity}</td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="showEditFleetModal(${fleet.id})">Edit</button>
                <button class="btn btn-sm btn-danger" onclick="deleteFleet(${fleet.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Update route select options
function updateRouteSelect() {
    const routeSelect = document.getElementById('routeSelect');
    routeSelect.innerHTML = '<option value="">Select a route</option>';
    routes.forEach(route => {
        routeSelect.innerHTML += `<option value="${route.id}">${route.name}</option>`;
    });
}

// Show add fleet modal
function showAddFleetModal() {
    document.getElementById('fleetId').value = '';
    document.getElementById('fleetForm').reset();
    document.getElementById('fleetModalTitle').textContent = 'Add Fleet';
    fleetModal.show();
}

// Show edit fleet modal
function showEditFleetModal(id) {
    const fleet = fleets.find(f => f.id === id);
    if (fleet) {
        document.getElementById('fleetId').value = fleet.id;
        document.getElementById('fleetType').value = fleet.type;
        document.getElementById('vehicleNumber').value = fleet.vehicleNumber;
        document.getElementById('routeSelect').value = fleet.routeId;
        document.getElementById('capacity').value = fleet.capacity;
        document.getElementById('fleetModalTitle').textContent = 'Edit Fleet';
        fleetModal.show();
    }
}

// Save fleet (create or update)
async function saveFleet() {
    const fleetId = document.getElementById('fleetId').value;
    const fleet = {
        type: document.getElementById('fleetType').value,
        vehicleNumber: document.getElementById('vehicleNumber').value,
        routeId: parseInt(document.getElementById('routeSelect').value),
        capacity: parseFloat(document.getElementById('capacity').value)
    };

    try {
        let response;
        if (fleetId) {
            response = await fetch(`${API_URL}/UpdateFleet/${fleetId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fleet)
            });
        } else {
            response = await fetch(`${API_URL}/CreateFleet`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(fleet)
            });
        }

        if (response.ok) {
            await loadData();
            fleetModal.hide();
        } else {
            throw new Error('Failed to save fleet');
        }
    } catch (error) {
        console.error('Error saving fleet:', error);
        alert('Failed to save fleet');
    }
}

// Delete fleet
async function deleteFleet(id) {
    if (confirm('Are you sure you want to delete this fleet?')) {
        try {
            const response = await fetch(`${API_URL}/RemoveFleet/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                await loadData();
            } else {
                throw new Error('Failed to delete fleet');
            }
        } catch (error) {
            console.error('Error deleting fleet:', error);
            alert('Failed to delete fleet');
        }
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadData();
});
