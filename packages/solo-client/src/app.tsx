import Emulator from "./emulator";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import { Rom, roms } from "chip8-emulator";

const App: FunctionComponent = () => {
  const [enableAudio, setEnableAudio] = useState(false);
  const romSelectRef = useRef<HTMLSelectElement>(null);
  const [romKey, setRomKey] = useState(Object.keys(roms)[0]);
  const [rom, setRom] = useState<Rom>();
  useEffect(() => {
    setRom(roms[romKey as keyof typeof roms]);
    return () => {
      // noop
    };
  }, [romKey]);
  return (
    <>
      <h1>Chip-8 Emulator Solo Play</h1>
      <Emulator enableAudio={enableAudio} rom={rom} />
      <section>
        <h2>Settings</h2>
        <table>
          <tbody>
            <tr>
              <td style={{ textAlign: "right" }}>
                <label htmlFor="enableAudio">Enable Audio</label>
              </td>
              <td>
                <label>
                  <input
                    id="enableAudio"
                    type="checkbox"
                    onChange={(event) => setEnableAudio(event.target.checked)}
                  />
                </label>
              </td>
            </tr>
            <tr>
              <td style={{ textAlign: "right" }}>Game</td>
              <td>
                <select
                  onChange={({ target }) =>
                    setRomKey(target.selectedOptions[0].value)
                  }
                  defaultValue={romKey}
                  ref={romSelectRef}
                >
                  {Object.entries(roms).map(([id, rom]) => (
                    <option key={id} value={id}>
                      {rom.name}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section>
        <h2>Controls</h2>
        <table>
          <tbody>
            <tr>
              <td style={{ paddingRight: "1em" }}>
                <table>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                    </tr>
                    <tr>
                      <td>q</td>
                      <td>w</td>
                      <td>e</td>
                      <td>r</td>
                    </tr>
                    <tr>
                      <td>a</td>
                      <td>s</td>
                      <td>d</td>
                      <td>f</td>
                    </tr>
                    <tr>
                      <td>z</td>
                      <td>x</td>
                      <td>c</td>
                      <td>v</td>
                    </tr>
                  </tbody>
                </table>
              </td>
              <td style={{ paddingRight: "1em" }}>{"=>"}</td>
              <td style={{ paddingRight: "1em" }}>
                <table>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>c</td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>5</td>
                      <td>6</td>
                      <td>d</td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>8</td>
                      <td>9</td>
                      <td>e</td>
                    </tr>
                    <tr>
                      <td>a</td>
                      <td>0</td>
                      <td>b</td>
                      <td>f</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </>
  );
};
export default App;
