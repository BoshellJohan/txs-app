import { IJwtPayload } from "../modules/auth/types/auth.types.js";

export function isJWTPayload(payload: any): payload is IJwtPayload {
    return (
    typeof payload === 'object' &&
    payload !== null &&
    typeof payload.id === 'string' &&
    typeof payload.email === 'string' &&
    typeof payload.role === 'string'
  );
}