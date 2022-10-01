export default interface Rom {
  controlGroups: {
    [groupName: string]: { up: Mapping; hold: string; down: Mapping };
  };
  data: string;
  name: string;
}

interface Mapping {
  key: string;
  flag: number;
}
