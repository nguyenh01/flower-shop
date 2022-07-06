import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { URL } = publicRuntimeConfig;

const host = URL;

export default host;
