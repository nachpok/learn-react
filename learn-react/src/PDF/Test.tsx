import { CSSProperties, FC, useState } from "react";
import { useDraggable } from "@dnd-kit/core";

interface TestProps {
  id: string;
}

const Test: FC<TestProps> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const [isHovered, setIsHovered] = useState(false);

  const style: CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  return (
    <div
      className="svg-container"
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div dangerouslySetInnerHTML={{ __html: sampleSVG }} />
      {isHovered && <button>Drag Signature</button>}
    </div>
  );
};

export default Test;
const sampleSVG = `<svg style="width:200px;height:100px;"  xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 450 224.66666666666666" width="450" height="224.66666666666666"><path d="M 327.000,51.000 C 324.645,52.711 325.000,53.000 323.000,55.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 323.000,55.000 C 318.199,64.337 316.978,63.378 311.667,72.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 311.667,72.333 C 299.898,89.627 298.866,88.004 284.333,102.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 284.333,102.333 C 266.151,115.869 267.232,116.294 246.333,125.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 246.333,125.667 C 235.863,129.828 236.484,130.536 225.000,131.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 225.000,131.667 C 213.931,133.405 214.196,133.495 203.000,133.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 203.000,133.000 C 195.245,133.172 195.931,132.738 189.000,130.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 189.000,130.333 C 183.912,127.438 184.245,128.172 181.000,123.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 181.000,123.000 C 176.662,116.360 176.912,116.771 175.000,109.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 175.000,109.000 C 171.520,95.339 171.995,95.694 171.667,81.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 171.667,81.667 C 170.978,63.298 171.853,64.339 175.667,47.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 175.667,47.000 C 179.833,39.058 177.978,38.965 185.667,33.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 185.667,33.000 C 189.120,30.164 188.499,30.058 193.000,29.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 193.000,29.000 C 196.830,27.302 195.787,28.164 199.000,29.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 199.000,29.000 C 206.865,34.058 204.497,33.302 208.333,41.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 208.333,41.000 C 210.449,53.449 210.532,51.391 206.333,63.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 206.333,63.667 C 199.691,78.309 200.782,77.449 189.000,89.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 189.000,89.000 C 175.335,100.410 176.691,101.309 160.333,109.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 160.333,109.667 C 143.671,119.392 144.002,119.743 126.333,127.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 126.333,127.667 C 113.892,132.427 114.338,133.392 101.667,137.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path></svg>
`;

const longSVG = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 450 224.66666666666666" width="450" height="224.66666666666666"><path d="M 341.333,56.333 C 338.940,62.407 338.333,62.000 335.333,67.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 335.333,67.667 C 330.157,73.527 330.940,74.074 325.333,79.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 325.333,79.667 C 319.789,88.053 319.157,87.527 313.333,95.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 313.333,95.667 C 306.733,103.427 306.789,103.386 299.333,110.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 299.333,110.333 C 291.853,117.755 291.733,117.427 283.333,123.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 283.333,123.667 C 275.361,129.107 275.520,129.089 266.667,133.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 266.667,133.000 C 253.063,140.165 253.028,139.107 238.667,143.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 238.667,143.667 C 227.981,144.113 228.396,146.165 217.333,145.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 217.333,145.000 C 208.024,146.450 207.981,145.779 198.667,147.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 198.667,147.000 C 191.000,147.000 191.024,147.450 183.333,147.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 183.333,147.000 C 176.882,149.427 178.667,147.000 174.000,147.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 174.000,147.000 C 171.121,141.790 170.549,144.094 170.667,136.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 170.667,136.333 C 170.501,129.426 170.121,129.790 172.000,123.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 172.000,123.000 C 173.633,119.649 172.834,119.426 175.333,116.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 175.333,116.333 C 179.328,105.897 180.299,106.649 185.333,97.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 185.333,97.000 C 189.076,92.998 188.328,92.564 193.333,89.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 193.333,89.667 C 197.082,87.452 196.743,86.998 200.667,85.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 200.667,85.000 C 203.124,82.618 203.416,83.119 206.000,81.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 206.000,81.000 C 208.590,79.722 208.457,79.618 211.333,79.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 211.333,79.000 C 214.968,77.975 214.923,78.055 218.667,77.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 218.667,77.667 C 223.000,77.667 222.968,77.308 227.333,77.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 227.333,77.667 C 230.667,77.667 230.667,77.667 234.000,77.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 234.000,77.667 C 239.410,76.221 238.667,77.667 243.333,77.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 243.333,77.667 C 246.332,79.825 245.744,78.555 246.667,82.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 246.667,82.333 C 246.134,85.266 246.999,84.825 244.667,87.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 244.667,87.667 C 242.333,91.333 242.467,91.266 239.333,94.333" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 239.333,94.333 C 236.056,97.075 236.333,97.333 232.667,99.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 232.667,99.667 C 230.474,101.568 230.390,101.408 228.000,103.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 228.000,103.000 C 223.930,104.871 224.141,105.234 220.000,107.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 220.000,107.000 C 216.265,110.067 215.930,109.204 212.000,111.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 212.000,111.667 C 208.028,112.583 208.265,113.067 204.000,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 204.000,113.000 C 198.337,113.464 198.361,113.583 192.667,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 192.667,113.667 C 189.000,113.667 189.004,113.798 185.333,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 185.333,113.667 C 182.000,113.667 182.000,113.667 178.667,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 178.667,113.667 C 176.000,113.667 176.000,113.667 173.333,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 173.333,113.667 C 169.333,113.667 169.333,113.667 165.333,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 165.333,113.667 C 161.333,113.667 161.333,113.667 157.333,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 157.333,113.667 C 152.333,113.667 152.333,113.667 147.333,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 147.333,113.667 C 141.000,113.667 141.000,113.667 134.667,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 134.667,113.667 C 131.667,113.667 131.667,113.667 128.667,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 128.667,113.667 C 125.000,113.667 125.000,113.667 121.333,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 121.333,113.667 C 115.176,113.824 118.333,113.667 115.333,113.667" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 115.333,113.667 C 118.657,113.139 115.509,113.491 122.000,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 122.000,113.000 C 126.667,113.000 126.657,112.806 131.333,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 131.333,113.000 C 137.333,113.000 137.333,113.000 143.333,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 143.333,113.000 C 149.667,113.000 149.667,113.000 156.000,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 156.000,113.000 C 164.667,113.000 164.667,113.000 173.333,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 173.333,113.000 C 183.333,113.000 183.333,113.000 193.333,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 193.333,113.000 C 202.000,113.000 202.000,113.000 210.667,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 210.667,113.000 C 220.333,113.000 220.333,113.000 230.000,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 230.000,113.000 C 239.000,113.000 239.000,113.000 248.000,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 248.000,113.000 C 258.667,113.000 258.667,113.000 269.333,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 269.333,113.000 C 276.000,113.000 276.000,113.000 282.667,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 282.667,113.000 C 287.333,113.000 287.333,113.000 292.000,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 292.000,113.000 C 297.333,113.000 297.333,113.000 302.667,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 302.667,113.000 C 309.667,113.000 309.667,113.000 316.667,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 316.667,113.000 C 322.000,113.000 322.000,113.000 327.333,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 327.333,113.000 C 332.667,113.000 332.667,113.000 338.000,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path><path d="M 338.000,113.000 C 343.000,113.000 343.000,113.000 348.000,113.000" stroke-width="1.125" stroke="black" fill="none" stroke-linecap="round"></path></svg>`;

const arrP = [
  "M 341.333,56.333 C 338.940,62.407 338.333,62.000 335.333,67.667",
  "M 335.333,67.667 C 330.157,73.527 330.940,74.074 325.333,79.667",
  "M 325.333,79.667 C 319.789,88.053 319.157,87.527 313.333,95.667",
  "M 313.333,95.667 C 306.733,103.427 306.789,103.386 299.333,110.333",
  "M 299.333,110.333 C 291.853,117.755 291.733,117.427 283.333,123.667",
  "M 283.333,123.667 C 275.361,129.107 275.520,129.089 266.667,133.000",
  "M 266.667,133.000 C 253.063,140.165 253.028,139.107 238.667,143.667",
  "M 238.667,143.667 C 227.981,144.113 228.396,146.165 217.333,145.000",
  "M 217.333,145.000 C 208.024,146.450 207.981,145.779 198.667,147.000",
  "M 198.667,147.000 C 191.000,147.000 191.024,147.450 183.333,147.000",
  "M 183.333,147.000 C 176.882,149.427 178.667,147.000 174.000,147.000",
  "M 174.000,147.000 C 171.121,141.790 170.549,144.094 170.667,136.333",
  "M 170.667,136.333 C 170.501,129.426 170.121,129.790 172.000,123.000",
  "M 172.000,123.000 C 173.633,119.649 172.834,119.426 175.333,116.333",
  "M 175.333,116.333 C 179.328,105.897 180.299,106.649 185.333,97.000",
  "M 185.333,97.000 C 189.076,92.998 188.328,92.564 193.333,89.667",
  "M 193.333,89.667 C 197.082,87.452 196.743,86.998 200.667,85.000",
  "M 200.667,85.000 C 203.124,82.618 203.416,83.119 206.000,81.000",
  "M 206.000,81.000 C 208.590,79.722 208.457,79.618 211.333,79.000",
  "M 211.333,79.000 C 214.968,77.975 214.923,78.055 218.667,77.667",
  "M 218.667,77.667 C 223.000,77.667 222.968,77.308 227.333,77.667",
  "M 227.333,77.667 C 230.667,77.667 230.667,77.667 234.000,77.667",
  "M 234.000,77.667 C 239.410,76.221 238.667,77.667 243.333,77.667",
  "M 243.333,77.667 C 246.332,79.825 245.744,78.555 246.667,82.333",
  "M 246.667,82.333 C 246.134,85.266 246.999,84.825 244.667,87.667",
  "M 244.667,87.667 C 242.333,91.333 242.467,91.266 239.333,94.333",
  "M 239.333,94.333 C 236.056,97.075 236.333,97.333 232.667,99.667",
  "M 232.667,99.667 C 230.474,101.568 230.390,101.408 228.000,103.000",
  "M 228.000,103.000 C 223.930,104.871 224.141,105.234 220.000,107.000",
  "M 220.000,107.000 C 216.265,110.067 215.930,109.204 212.000,111.667",
  "M 212.000,111.667 C 208.028,112.583 208.265,113.067 204.000,113.000",
  "M 204.000,113.000 C 198.337,113.464 198.361,113.583 192.667,113.667",
  "M 192.667,113.667 C 189.000,113.667 189.004,113.798 185.333,113.667",
  "M 185.333,113.667 C 182.000,113.667 182.000,113.667 178.667,113.667",
  "M 178.667,113.667 C 176.000,113.667 176.000,113.667 173.333,113.667",
  "M 173.333,113.667 C 169.333,113.667 169.333,113.667 165.333,113.667",
  "M 165.333,113.667 C 161.333,113.667 161.333,113.667 157.333,113.667",
  "M 157.333,113.667 C 152.333,113.667 152.333,113.667 147.333,113.667",
  "M 147.333,113.667 C 141.000,113.667 141.000,113.667 134.667,113.667",
  "M 134.667,113.667 C 131.667,113.667 131.667,113.667 128.667,113.667",
  "M 128.667,113.667 C 125.000,113.667 125.000,113.667 121.333,113.667",
  "M 121.333,113.667 C 115.176,113.824 118.333,113.667 115.333,113.667",
  "M 115.333,113.667 C 118.657,113.139 115.509,113.491 122.000,113.000",
  "M 122.000,113.000 C 126.667,113.000 126.657,112.806 131.333,113.000",
  "M 131.333,113.000 C 137.333,113.000 137.333,113.000 143.333,113.000",
  "M 143.333,113.000 C 149.667,113.000 149.667,113.000 156.000,113.000",
  "M 156.000,113.000 C 164.667,113.000 164.667,113.000 173.333,113.000",
  "M 173.333,113.000 C 183.333,113.000 183.333,113.000 193.333,113.000",
  "M 193.333,113.000 C 202.000,113.000 202.000,113.000 210.667,113.000",
  "M 210.667,113.000 C 220.333,113.000 220.333,113.000 230.000,113.000",
  "M 230.000,113.000 C 239.000,113.000 239.000,113.000 248.000,113.000",
  "M 248.000,113.000 C 258.667,113.000 258.667,113.000 269.333,113.000",
  "M 269.333,113.000 C 276.000,113.000 276.000,113.000 282.667,113.000",
  "M 282.667,113.000 C 287.333,113.000 287.333,113.000 292.000,113.000",
  "M 292.000,113.000 C 297.333,113.000 297.333,113.000 302.667,113.000",
  "M 302.667,113.000 C 309.667,113.000 309.667,113.000 316.667,113.000",
  "M 316.667,113.000 C 322.000,113.000 322.000,113.000 327.333,113.000",
  "M 327.333,113.000 C 332.667,113.000 332.667,113.000 338.000,113.000",
  "M 338.000,113.000 C 343.000,113.000 343.000,113.000 348.000,113.000",
];
