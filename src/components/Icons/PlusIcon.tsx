import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.53 5.47a.75.75 0 00-1.28.53v5.25H6a.75.75 0 100 1.5h5.25V18a.75.75 0 101.5 0v-5.25H18a.75.75 0 100-1.5h-5.25V6a.75.75 0 00-.22-.53z"
        fill="#fff"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
