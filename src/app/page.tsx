'use client'
import { useEffect, useRef, useState } from "react";

type typeDivProperties = {
  width: number;
  height: number;
}

export default function Home() {

  const parentDivRef = useRef<HTMLDivElement>(null)
  const [parentViewWidthHeight, setParentViewWidthHeight] = useState<typeDivProperties>({
    width: 1,
    height: 1,
  })

  const tempArray: number[] = [...Array(4).keys()];

  const setParentDivDimensions = () => {
    if (parentDivRef && parentDivRef.current) {
      const { offsetWidth, offsetHeight } = parentDivRef.current;
      setParentViewWidthHeight({ width: offsetWidth, height: offsetHeight });
    }
  };

  useEffect(() => {
    const handleResize = () => setParentDivDimensions();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(()=>{
  //   setParentDivDimensions();
  // },[parentDivRef.current])

  return (
    <div style={{ display: "flex" }}>
      {tempArray.map((item) => (
        <div
          key={item}
          ref={item === 0?parentDivRef:null}
          style={{
            height: "200px",
            backgroundColor: "green",
            border: '2px solid black',
            margin: '5px'
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: parentViewWidthHeight.height,
              height: parentViewWidthHeight.width,
              transform: `rotate(270deg) translateY(${
                Math.abs(
                  parentViewWidthHeight.height - parentViewWidthHeight.width
                ) / 2
              }px) translateX(${
                Math.abs(
                  parentViewWidthHeight.height - parentViewWidthHeight.width
                ) / 2
              }px)`,
              backgroundColor: "red",
            }}
          >
            <div
              style={{
                color: "black",
              }}
            >
              Text that rotate
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
