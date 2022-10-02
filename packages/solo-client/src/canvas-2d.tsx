import {
  CanvasHTMLAttributes,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

const canvas2dContext = createContext<CanvasRenderingContext2D | undefined>(
  undefined
);

const Canvas2d: FunctionComponent<
  PropsWithChildren<CanvasHTMLAttributes<HTMLCanvasElement>>
> = ({ children, ...props }) => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D>();
  return (
    <>
      <canvas
        {...props}
        ref={useCallback((canvas: HTMLCanvasElement) => {
          if (canvas) {
            const context = canvas.getContext("2d");
            if (!context) {
              throw new Error("Could not resolve context from canvas");
            }
            setCanvasContext(context);
          }
        }, [])}
      ></canvas>
      {canvasContext && (
        <canvas2dContext.Provider value={canvasContext}>
          {children}
        </canvas2dContext.Provider>
      )}
    </>
  );
};

export default Canvas2d;
export const useCanvas2dContext = () => {
  const value = useContext(canvas2dContext);
  if (typeof value === "undefined") {
    throw new Error(
      "useCanvas2dContext can only be used as a child of Canvas2d"
    );
  }
  return value;
};
