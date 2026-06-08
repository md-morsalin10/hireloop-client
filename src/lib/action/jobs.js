
const API_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000";
export const createJob = async (data) => {
    const res = await fetch(`${API_URL}/api/jobs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify(data)
    });
    return res.json();
}