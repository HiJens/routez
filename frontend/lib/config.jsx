export const Config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"
};

console.log(Config.apiUrl)