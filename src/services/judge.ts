import { metadata } from "../layout";

export async function authenticateJudge(payload: any): Promise<any> {
    const response = await fetch('/api/judge',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    );
    return response.json();
}

export async function validateToken(accessToken: string | null) {
    const response = await fetch("/api/judge/" + accessToken,
        {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        }
    )
    return response.json()
}