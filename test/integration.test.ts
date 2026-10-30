/** Integration tests against live Pepkio Tools API. */

import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { config as loadEnv } from "dotenv";
import { describe, expect, it } from "vitest";

import { PepkioClient } from "../src/client.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load monorepo .env for local integration runs (never log keys).
const monorepoEnv = resolve(__dirname, "../../../.env");
if (existsSync(monorepoEnv)) {
  loadEnv({ path: monorepoEnv });
}

const packageEnv = resolve(__dirname, "../.env");
if (existsSync(packageEnv)) {
  loadEnv({ path: packageEnv });
}

const ALL_ENVIRONMENTS = [
  { name: "local", baseUrl: "https://tools.localtest.me" },
  { name: "production", baseUrl: "https://tools.pepkio.com" },
] as const;

const overrideBaseUrl = process.env.PEPKIO_API_BASE_URL?.replace(/\/$/, "");
const ENVIRONMENTS = overrideBaseUrl
  ? ALL_ENVIRONMENTS.filter((env) => env.baseUrl === overrideBaseUrl)
  : ALL_ENVIRONMENTS;

function apiKeyFor(baseUrl: string): string | undefined {
  if (baseUrl.includes("localtest.me")) {
    return process.env.LOCAL_PEPKIO_API_KEY ?? process.env.PEPKIO_API_KEY;
  }
  return process.env.PEPKIO_API_KEY;
}

function clientFor(env: (typeof ALL_ENVIRONMENTS)[number]): PepkioClient | null {
  const apiKey = apiKeyFor(env.baseUrl);
  if (!apiKey) {
    return null;
  }
  return new PepkioClient({ apiKey, baseUrl: env.baseUrl });
}

describe.each(ENVIRONMENTS)("$name integration", (env) => {
  const client = clientFor(env);
  const maybeIt = client ? it : it.skip;

  maybeIt("fetches manifest", async () => {
    const manifest = await client!.getManifest({ refresh: true });
    expect(manifest.tool_id).toBe("mendelian-cross-solver");
    const names = await client!.listExamples();
    expect(names).toContain("complete_monohybrid");
    expect(names).toContain("abo_cross");
  });

  maybeIt("runs complete_monohybrid example", async () => {
    const input = await client!.getExampleInput("complete_monohybrid");
    const result = await client!.run(input);
    expect(result.status).toBe("completed");
    expect(result.run_id).toBeTruthy();
    expect(result.permalink).toBeTruthy();
    expect(result.result).toBeTruthy();
    expect(result.result?.can_compute).toBe(true);
    expect(Array.isArray(result.result?.grid)).toBe(true);
    expect(result.result?.phenotype_ratios).toBeTruthy();
    expect(result.result?.error).toBeUndefined();
  });

  maybeIt("runs abo_cross example", async () => {
    const input = await client!.getExampleInput("abo_cross");
    const result = await client!.run(input);
    expect(result.status).toBe("completed");
    expect(result.result?.can_compute).toBe(true);
    expect(Array.isArray(result.result?.grid)).toBe(true);
    expect(result.result?.phenotype_ratios).toBeTruthy();
  });
});
