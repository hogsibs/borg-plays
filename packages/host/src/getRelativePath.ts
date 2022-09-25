import { join } from "path";
import { cwd } from "process";

export function getRelativePath(moduleUrl: string, path: string) {
  const cwdParts = cwd()
    .split("/")
    .filter((_) => _.length > 0);
  return join(
    cwd(),
    ...new URL(moduleUrl).pathname.split("/").slice(cwdParts.length + 1, -1),
    path
  );
}
