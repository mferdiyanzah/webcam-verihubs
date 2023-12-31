export default function Filter() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0">
      <filter id="thermal" colorInterpolationFilters="sRGB">
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0  0.125  0.8    1      1" />
          <feFuncG type="table" tableValues="0  0      0      0.843  1" />
          <feFuncB type="table" tableValues="0  0.549  0.466  0      1" />
        </feComponentTransfer>
      </filter>
      <filter id="grain">
        <feTurbulence baseFrequency="0.60,0.90" result="colorNoise" />
        <feColorMatrix
          in="colorNoise"
          type="matrix"
          values=".33 .33 .33 0 0 .33 .33 .33 0 0 .33 .33 .33 0 0 0 0 0 1 0"
        />
        <feComposite operator="in" in2="SourceGraphic" result="monoNoise" />
        <feBlend in="SourceGraphic" in2="monoNoise" mode="multiply" />
      </filter>
      <filter id="blur">
        <feGaussianBlur stdDeviation="5"></feGaussianBlur>
      </filter>
      <filter id="turbulence">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.01"
          numOctaves="2"
          result="turbulence"
        />
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="90"
          in="SourceGraphic"
          in2="turbulence"
        />
      </filter>
      <filter id="vhs">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.05"
          numOctaves="10"
          result="vhs"
        />
        <feDisplacementMap
          xChannelSelector="R"
          yChannelSelector="G"
          scale="90"
          in="SourceGraphic"
          in2="vhs"
        />
      </filter>
      <filter id="noise" x="0%" y="0%" width="100%" height="100%">
        <feTurbulence baseFrequency="0.01 0.4" result="NOISE" numOctaves="2" />
        <feDisplacementMap
          in="SourceGraphic"
          in2="NOISE"
          scale="20"
          xChannelSelector="R"
          yChannelSelector="R"
        ></feDisplacementMap>
      </filter>
      <filter id="convolve">
        <feComponentTransfer>
          <feFuncR type="table" tableValues="0 0.5 0 1" />
          <feFuncG type="table" tableValues="0 0.5 0 1" />
          <feFuncB type="table" tableValues="0 0.5 0 1" />
          <feFuncA type="table" tableValues="0 0.5 0 1" />
        </feComponentTransfer>
      </filter>
    </svg>
  );
}
