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