export async function fetchTeamsData() {
    try {
        const response = await fetch('https://f1-api-rfzl.onrender.com/teams/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export async function fetchDriversData() {
    try {
        const response = await fetch('https://f1-api-rfzl.onrender.com/drivers/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}

export async function fetchCircuitsData() {
    try {
        const response = await fetch('https://f1-api-rfzl.onrender.com/circuits/all');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        throw error;
    }
}