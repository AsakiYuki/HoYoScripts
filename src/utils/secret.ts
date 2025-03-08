import fs from "fs";

// Define the secret interface
interface Secret {
    cookies: string[];
    hoyolog: {
        api: string;
        name: string;
        avatar: string;
    };
    database: {
        api: string;
        key: string;
    };
}

// Read the secret file
const secret: Secret = JSON.parse(fs.readFileSync("secret.json", "utf-8"));

// Export the secret
export default secret;
