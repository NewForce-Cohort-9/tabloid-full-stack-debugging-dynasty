const apiUrl = "https://localhost:5001/api/Subscription";

export const addSubscription = (subscriberId, providerId) => {
    return fetch(`${apiUrl}?subscriberId=${subscriberId}&providerId=${providerId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        // body: JSON.stringify({ subscriberId, providerId })
    }).then(res => res.ok ? res.json() : Promise.reject("Failed to subscribe"));
};