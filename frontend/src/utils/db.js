const API_BASE_URL = 'http://localhost:3001/api';

export async function getAllProviders() {
    const response = await fetch(`${API_BASE_URL}/providers`);
    if (!response.ok) {
        throw new Error('Failed to fetch providers');
    }
    return response.json();
}

export async function getProviderById(id) {
    const response = await fetch(`${API_BASE_URL}/providers/${id}`);
    if (!response.ok) {
        throw new Error('Failed to fetch provider');
    }
    return response.json();
}

export async function addProvider(provider) {
    const response = await fetch(`${API_BASE_URL}/providers`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
    });
    if (!response.ok) {
        throw new Error('Failed to add provider');
    }
    return response.json();
}

export async function updateProvider(id, provider) {
    const response = await fetch(`${API_BASE_URL}/providers/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(provider),
    });
    if (!response.ok) {
        throw new Error('Failed to update provider');
    }
    return response.json();
}

export async function deleteProvider(id) {
    const response = await fetch(`${API_BASE_URL}/providers/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Failed to delete provider');
    }
    return response.json();
} 