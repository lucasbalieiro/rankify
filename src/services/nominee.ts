interface SetScorePayload {
    token: string
    nominee_id: string
    score: number
}

interface SetPeopleScorePayload {
    nominee_id: string
    score: number
}

export async function getNominees(): Promise<any> {
    const response = await fetch('/api/nominee',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    return response.json();
}

export async function setScore(payload: SetScorePayload) {
    const response = await fetch('/api/nominee',
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    )
    return response.json()
}

export async function setPeopleScore(payload: SetPeopleScorePayload) {
    const response = await fetch('/api/nominee/people',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        }
    )
    return response.json()
}