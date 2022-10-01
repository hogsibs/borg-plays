import Emulator from "./emulator";
import { FunctionComponent, useState } from "react";

const App: FunctionComponent = () => {
  const [enableAudio, setEnableAudio] = useState(false);
  return (
    <>
      <h1>Chip-8 Emulator Solo Play</h1>
      <Emulator enableAudio={enableAudio} />
      <p>
        <h2>Settings</h2>
        <label>
          Enable Audio
          <input
            type="checkbox"
            onChange={(event) => setEnableAudio(event.target.checked)}
          />
        </label>
      </p>
      <p>
        <h2>Controls</h2>
        <table>
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
        </table>
      </p>
    </>
  );
};
export default App;
