import type { SVGProps } from "react";

export function AppLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M5 18a4 4 0 1 0 8 0a4 4 0 1 0-8 0m-2 2l-1-1l2-2m9-6a4 4 0 1 0 8 0a4 4 0 1 0-8 0m6 2l2 2l-1 1"></path>
        <path d="m10.5 10.5l-2-2l-3 3l2 2zm1-6l2-2l3 3l-2 2z"></path>
      </g>
    </svg>
  );
}
