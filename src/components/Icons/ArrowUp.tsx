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
        d="M5.494.688c-.254-.229-.635-.229-.863 0L1.178 4.14c-.254.254-.254.634 0 .863l.558.584c.254.228.635.228.864 0l2.462-2.463L7.5 5.588a.63.63 0 00.863 0l.584-.584c.229-.229.229-.61 0-.863L5.494.687z"
        fill="#000"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
