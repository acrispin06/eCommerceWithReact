import type {LoginPayload} from "../domain/LoginPayload.ts";

export async function login(payload: LoginPayload): Promise<{ token: string }> {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error('Usuario o contraseña incorrectos');
        return await res.json();
    } catch (error) {
        throw new Error('Error al iniciar sesión: ' + (error as Error).message);
    }
}