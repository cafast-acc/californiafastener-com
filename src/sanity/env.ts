function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing ${name}`);
  }
  return value;
}

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "";
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-10-01";

export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";

export function assertConfigured(): void {
  requireEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  requireEnv("NEXT_PUBLIC_SANITY_DATASET");
}

export const isConfigured = Boolean(projectId && dataset);
