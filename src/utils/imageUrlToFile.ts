const imageUrlToFile = async (url: string, defaultType = 'image/jpeg') => {
  const response = await fetch(url, { mode: 'no-cors' });
  const data = await response.blob();
  return new File([data], url, {
    type: response.headers.get('content-type') || defaultType,
  });
};

export default imageUrlToFile;
