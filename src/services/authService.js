const AUTH_URL = "https://taskflow-api-pztk.onrender.com/api"

export const loginUser = async (data) => {
    const response = await fetch(`${AUTH_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    const result = await response.json()

    if(!response.ok){
        throw new Error(result.error || "Error al iniciar sesion")
    }

    return result
}