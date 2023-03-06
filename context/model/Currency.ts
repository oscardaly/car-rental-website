export const currencies = ["GBP", "EUR"] as const;
export type Currency = typeof currencies[number];