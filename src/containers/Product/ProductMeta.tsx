import { FunctionComponent } from 'react';
import Link from 'next/link';
import { Space } from 'antd';

interface ProductMetaProps {
  title: string;
  links: { name: string; href: string }[];
}

const ProductMeta: FunctionComponent<ProductMetaProps> = ({ title, links }) => {
  return (
    <Space size={12}>
      <span className="product-meta-title">{title}:</span>
      {links.map((item) => (
        <Link key={item.name} href={item.href}>
          {item.name}
        </Link>
      ))}
    </Space>
  );
};

export default ProductMeta;
