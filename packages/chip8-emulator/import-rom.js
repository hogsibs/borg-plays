// dev script for importing a binary file into the roms folder

import { readFile, writeFile } from "fs/promises";
import { join } from "path";
import { argv, cwd } from "process";

const rom = argv[2];
const buffer = await readFile(join(cwd(), rom));
const data = buffer.toString("base64");

await writeFile(
  join(cwd(), "src", "roms", `${rom}.ts`),
  `import type Rom from "../types/rom";

const ${rom}: Rom = {
  controlGroups: {},
  data: "${data}",
  name: "${toPascalCase(rom)}"
};
export default ${rom};
`
);

function toPascalCase(string) {
  return `${string[0].toUpperCase()}${string.substring(1)}`;
}
