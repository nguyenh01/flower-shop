import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { SOCKET_URL } = publicRuntimeConfig;

const socketHost = SOCKET_URL;

export default socketHost;
