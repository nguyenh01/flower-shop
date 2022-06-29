import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={10}
      height={6}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.63 5.588c.23.228.61.228.839 0l3.453-3.453c.254-.254.254-.635 0-.864L8.363.688C8.11.459 7.73.459 7.5.688L5.037 3.15 2.6.688c-.229-.229-.61-.229-.864 0l-.558.583c-.254.229-.254.61 0 .864L4.63 5.588z"
        fill="#000"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
