import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="23"
      viewBox="0 0 24 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="24" height="22.3448" rx="3" fill="#0038A8" />
      <path
        d="M13.0596 17.0803L13.1 17.0503V17V13.6013L18.0791 8.51863C18.0792 8.51851 18.0794 8.51838 18.0795 8.51826C18.3566 8.24095 18.5125 7.86468 18.5125 7.47216V5.68958C18.5125 5.48017 18.4293 5.27934 18.2812 5.13126C18.1332 4.98319 17.9323 4.9 17.7229 4.9H6.68958C6.48017 4.9 6.27934 4.98319 6.13126 5.13126C5.98319 5.27934 5.9 5.48017 5.9 5.68958V7.47216C5.9 7.86485 6.05604 8.24128 6.33339 8.51863L11.4167 13.6019V18.1021V18.301L11.5763 18.1824L13.0596 17.0803Z"
        fill="white"
        stroke="white"
        strokeWidth="0.2"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
