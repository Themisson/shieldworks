import fs from "node:fs";
import { spawn } from "node:child_process";
import { parseArgs } from "node:util";

const { values } = parseArgs({
  options: { hostname: { type: "string" }, port: { type: "string" } },
});
if (!fs.existsSync(".next/standalone/server.js"))
  throw new Error("Execute npm run build antes de npm run start.");
fs.cpSync("public", ".next/standalone/public", { recursive: true });
fs.cpSync(".next/static", ".next/standalone/.next/static", { recursive: true });
const server = spawn(process.execPath, [".next/standalone/server.js"], {
  stdio: "inherit",
  env: {
    ...process.env,
    HOSTNAME: values.hostname ?? "127.0.0.1",
    PORT: values.port ?? process.env.PORT ?? "3000",
  },
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => server.kill(signal));
server.on("exit", (code) => {
  process.exitCode = code ?? 1;
});
