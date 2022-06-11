import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

const host = process.env.NODE_ENV === 'production' || API_URL;

export default host;
