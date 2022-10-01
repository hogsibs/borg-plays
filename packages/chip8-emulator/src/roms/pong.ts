import type Rom from "../types/rom";

const pong: Rom = {
  controlGroups: {
    left: {
      up: { flag: 0x1, key: "1" },
      hold: "q",
      down: { flag: 0x4, key: "a" },
    },
    right: {
      up: { flag: 0xc, key: "3" },
      hold: "e",
      down: { flag: 0xd, key: "d" },
    },
  },
  data: "agJrDGw/bQyi6tq23NZuACLUZgNoAmBg8BXwBzAAEhrHF3cIaf+i8NZxourattzWYAHgoXv+YATgoXsCYB+LAtq2YAzgoX3+YA3goX0CYB+NAtzWovDWcYaEh5RgP4YCYR+HEkYCEnhGPxKCRx9p/0cAaQHWcRIqaAJjAYBwgLUSimj+YwqAcIDVPwESomECgBU/ARK6gBU/ARLIgBU/ARLCYCDwGCLUjjQi1GY+MwFmA2j+MwFoAhIWef9J/mn/Esh5AUkCaQFgBPAYdgFGQHb+Emyi8v4z8mXxKWQUZQDUVXQV8inUVQDugICAgICAgAAAAAAA",
  name: "Pong",
};
export default pong;
