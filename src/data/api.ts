import { env } from "@/env";

export function api(path: string, init?: RequestInit) {
    const baseUrl = env.NEXT_PUBLIC_API_BASE_URL;
    const apiKey = env.NEXT_PUBLIC_API_KEY;

    const url = new URL(path, baseUrl);

    const headers = new Headers(init?.headers);
    headers.set('Authorization', `Bearer ${apiKey}`);
    headers.set('Accept', 'application/vnd.api+json');

    const updatedInit: RequestInit = {
        ...init,
        headers: headers
    };
    console.log(url)
    return fetch(url, updatedInit);
}
