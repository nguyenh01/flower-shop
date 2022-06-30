const convertImageUrlToFile = async (url: string) => {
  const response = await fetch(url, { mode: 'no-cors' });
  const data = await response.blob();
  const type = url.split('.').pop();
  const filename = url.split('/').pop();
  const metadata = { type: `image/${type}` };

  return new File([data], filename!, metadata);
};

export default convertImageUrlToFile;
