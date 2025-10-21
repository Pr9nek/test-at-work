import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient();

export async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to load');
    return res.json();
}