import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { Image } from 'antd';
import host from '@src/utils/host';

interface ProductImageProps {
  thumbnails?: string[];
}

const ProductImage: FunctionComponent<ProductImageProps> = ({ thumbnails }) => {
  const [thumbnail, setThumbnail] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const [source, setSource] = useState<string>();

  useEffect(() => {
    if (thumbnails) {
      setThumbnail(thumbnails);
      setSource(thumbnails[index]);
    }
  }, [thumbnails, index]);

  useEffect(() => {
    const time = setInterval(() => {
      if (index === 0) {
        setSource(thumbnail[1]);
        setIndex(1);
      } else if (index === 1) {
        setSource(thumbnail[2]);
        setIndex(2);
      } else {
        setSource(thumbnail[0]);
        setIndex(0);
      }
    }, 4000);

    return () => clearInterval(time);
  }, [index]);

  const thumbnailClassName = (idx: number) => {
    if (idx === index) {
      return 'thumbnail active';
    } else {
      return 'thumbnail';
    }
  };

  const handleClickThumbnail = (src: string, index: number) => {
    setSource(src);
    setIndex(index);
  };

  return (
    <Fragment>
      <div className="product-image mb-40">
        <Image className="image" width={470} src={`${host}${source}`} alt="img" />
      </div>
      <div className="product-thumbnail">
        {thumbnails?.map((item, index) => (
          <Image
            key={index}
            className={thumbnailClassName(index)}
            width={108}
            src={`${host}${item}`}
            preview={false}
            onClick={() => handleClickThumbnail(item as string, index)}
            alt="img"
          />
        ))}
      </div>
    </Fragment>
  );
};

export default ProductImage;
