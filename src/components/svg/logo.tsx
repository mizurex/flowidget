interface LogoProps {
  width?: number;
  height?: number;
}

export default function Logo({ width = 20, height = 20 }: LogoProps) {
    return (
        <svg
        width={width}
        height={height}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="5"
          width="15"
          height="15"
          fill="white"
          stroke="black"
          strokeWidth="3"
        />

        <rect
          x="15"
          y="15"
          width="10"
          height="10"
          fill="white"
          stroke="black"
          strokeWidth="2"
        />
      </svg>
    )
}