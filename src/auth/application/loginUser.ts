import type {LoginPayload} from "../domain/LoginPayload.ts";
import {login} from "../infraestructure/authAPI.ts";

export async function loginUser(payload: LoginPayload) {
    return await login(payload)
}