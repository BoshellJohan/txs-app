import bcrypt from "bcryptjs";

export async function hashString(str: string){
    return await bcrypt.hash(str, 10);
}

export async function compareHashes(hash1: string, hash2: string){
    return await bcrypt.compare(hash1, hash2);
}