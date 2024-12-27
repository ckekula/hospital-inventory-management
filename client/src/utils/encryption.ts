import Cryptr from "cryptr";

export function encrypt(text: string) {
    const secretKey = process.env.NEXTAUTH_SECRET;
    if (!secretKey) {
        throw new Error('NEXTAUTH_SECRET is not set');
    }
    const cryptr = new Cryptr(secretKey);

    const encryptedString = cryptr.encrypt(text);
    return encryptedString; 
}

export function decrypt(encryptedString: string) {
    const secretKey = process.env.NEXTAUTH_SECRET;
    if (!secretKey) {
        throw new Error('NEXTAUTH_SECRET is not set');
    }
    const cryptr = new Cryptr(secretKey);

    const text = cryptr.decrypt(encryptedString);
    return text;
}