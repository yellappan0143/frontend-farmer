const API_BASE_URL = 'http://localhost:8080';

export const apiRequest = async (endpoint, options = {}) => {
    const token = localStorage.getItem('farmrideToken');
    console.log('Using token:', token);

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
            ...(token ? { Authorization: `Bearer ${token}` } : {})
        }
    });

    if (response.status === 401) {
        localStorage.removeItem('farmrideToken');
        window.location.href = '/login';
        throw new Error('Session expired. Please log in again.');
    }

    if (!response.ok) {
        throw new Error(await response.text() || 'API request failed.');
    }

    return response;
};


// Fetch the user's profile information from the API
export const getUserProfile = async () => {
    const response = await apiRequest('/api/users/profile');
    return await response.json();
};

export const updateUserProfile = async (profileData) => {
    const response = await apiRequest('/api/users/profile', {
        method:'PUT',
        body: JSON.stringify(profileData)
    })

    return await response.json();
}