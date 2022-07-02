import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Space } from 'antd';

interface ProductMetaProps {
  title: string;
  item: { name: string; href: string };
}

const ProductMeta: FunctionComponent<ProductMetaProps> = ({ title, item }) => {
  return (
    <Space size={12}>
      <span className="product-meta-title">{title}:</span>
      <Link href={item.href}>{item.name}</Link>
    </Space>
  );
};

export default ProductMeta;
