import React, { useRef, useEffect, useState } from "react";
import SignaturePad from "signature_pad";
import DrawSign from "./DrawSign";
import SignPopover from "./SignPopover";

function Test() {
  const [svg, setSvg] = useState<string>("");
  useEffect(() => {
    console.log("Tick");
  }, [svg]);
  useEffect(() => {}, [svg]);
  return (
    <div style={{ height: "1000px", width: "1000px", backgroundColor: "gray" }}>
      <SignPopover svg={svg} onNewSignature={setSvg} />
    </div>
  );
}

export default Test;
const sampleSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 450 224.66666666666666" width="450" height="224.66666666666666"><path d="M 327.000,51.000 C 324.645,52.711 325.000,53.000 323.000,55.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 323.000,55.000 C 318.199,64.337 316.978,63.378 311.667,72.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 311.667,72.333 C 299.898,89.627 298.866,88.004 284.333,102.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 284.333,102.333 C 266.151,115.869 267.232,116.294 246.333,125.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 246.333,125.667 C 235.863,129.828 236.484,130.536 225.000,131.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 225.000,131.667 C 213.931,133.405 214.196,133.495 203.000,133.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 203.000,133.000 C 195.245,133.172 195.931,132.738 189.000,130.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 189.000,130.333 C 183.912,127.438 184.245,128.172 181.000,123.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 181.000,123.000 C 176.662,116.360 176.912,116.771 175.000,109.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 175.000,109.000 C 171.520,95.339 171.995,95.694 171.667,81.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 171.667,81.667 C 170.978,63.298 171.853,64.339 175.667,47.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 175.667,47.000 C 179.833,39.058 177.978,38.965 185.667,33.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 185.667,33.000 C 189.120,30.164 188.499,30.058 193.000,29.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 193.000,29.000 C 196.830,27.302 195.787,28.164 199.000,29.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 199.000,29.000 C 206.865,34.058 204.497,33.302 208.333,41.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 208.333,41.000 C 210.449,53.449 210.532,51.391 206.333,63.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 206.333,63.667 C 199.691,78.309 200.782,77.449 189.000,89.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 189.000,89.000 C 175.335,100.410 176.691,101.309 160.333,109.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 160.333,109.667 C 143.671,119.392 144.002,119.743 126.333,127.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 126.333,127.667 C 113.892,132.427 114.338,133.392 101.667,137.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path></svg>
`;
