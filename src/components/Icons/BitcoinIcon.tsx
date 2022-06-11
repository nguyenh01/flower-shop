import * as React from 'react';

function SvgComponent(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38 24"
      width="38"
      height="24"
      role="img"
      {...props}
    >
      <path
        opacity=".07"
        d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"
      />
      <path
        fill="#fff"
        d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"
      />
      <path
        fill="#EDA024"
        d="M21.6 4.4c-4.2-1.4-8.7.8-10.2 5s.8 8.7 5 10.2 8.7-.8 10.2-5c1.4-4.2-.8-8.7-5-10.2z"
      />
      <path
        fill="#fff"
        d="M16.1 8.3l.3-1c.6.2 1.3.4 1.9.7.2-.5.4-1 .5-1.6l.9.3-.5 1.5.8.3.5-1.5.9.3c-.2.5-.4 1-.5 1.6l.4.2c.3.2.6.4.9.7.3.3.4.6.5 1 0 .3 0 .6-.2.9-.2.5-.5.8-1.1.9h-.2c.2.1.3.2.4.4.4.4.5.8.4 1.4 0 .1 0 .2-.1.3 0 .1 0 .1-.1.2-.1.2-.2.3-.2.5-.3.5-.8.9-1.5.9-.5 0-1 0-1.4-.1l-.4-.1c-.2.5-.4 1-.5 1.6l-.9-.3c.2-.5.4-1 .5-1.5l-.8-.3c-.2.5-.4 1-.5 1.5l-.9-.3c.2-.5.4-1 .5-1.6l-1.9-.6.6-1.1c.2.1.5.2.7.2.2.1.4 0 .5-.2L17 9.3v-.1c0-.3-.1-.5-.4-.5 0-.2-.2-.3-.5-.4zm1.2 6c.5.2.9.3 1.3.4.3.1.5.1.8.1.2 0 .3 0 .5-.1.5-.3.6-1 .2-1.4l-.6-.5c-.3-.2-.7-.3-1.1-.4-.1 0-.3-.1-.4-.2l-.7 2.1zm1-3.1c.3.1.5.2.7.2.3.1.6.2.9.1.4 0 .7-.1.8-.5.1-.3.1-.6 0-.8-.1-.2-.3-.3-.5-.4-.3-.2-.6-.3-1-.4l-.3-.1c-.1.7-.4 1.3-.6 1.9z"
      />
    </svg>
  );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
