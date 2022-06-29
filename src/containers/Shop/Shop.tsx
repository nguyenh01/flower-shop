import { FunctionComponent, useEffect, useState, Fragment } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import FilterCheckbox from '@src/containers/Shop/FilterCheckbox';
import { optionAvailabilities } from '@src/containers/Shop/constant';
import Wrapper from '@src/components/Layout/Wrapper';
import ShopToolbar from '@src/containers/Shop/ShopToolbar';
import Product from '@src/components/Product/Product';
import { useGetProductsQuery } from '@src/api/ProductAPI';
import { useGetCategoriesQuery } from '@src/api/CategoryAPI';
import Pagination from '@src/components/Pagination/Pagination';
import { useGetMaterialsQuery } from '@src/api/MaterialAPI';
import SpinnerFullScreen from '@src/components/SpinnerFullScreen/SpinnerFullScreen';
import { useRouter } from 'next/router';

interface Option {
  label: string;
  value: string;
}

const Shop: FunctionComponent = () => {
  const router = useRouter();
  const { product_name } = router.query;

  const [page, setPage] = useState(1);
  const { data: categories } = useGetCategoriesQuery({ is_paging: false });
  const { data: materials } = useGetMaterialsQuery({ is_paging: false });

  const [stock, setStock] = useState<boolean[]>([]);
  const [category, setCategory] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);
  const [sort, setSort] = useState<string>();

  const [optionCategories, setOptionCategories] = useState<Option[]>([]);
  const [optionMaterials, setOptionMaterials] = useState<Option[]>([]);

  const {
    data: product,
    isLoading,
    isFetching,
  } = useGetProductsQuery({
    size: 9,
    page: page,
    cate_id: category.length === 0 ? undefined : category,
    mate_id: material.length === 0 ? undefined : material,
    order_by: sort || undefined,
    is_instock: stock.length === 0 ? undefined : stock,
    name: product_name,
  });

  useEffect(() => {
    if (categories) {
      const formatOption = categories.data.result.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setOptionCategories(formatOption);
    }
  }, [categories]);

  useEffect(() => {
    if (materials) {
      const formatOption = materials.data.result.map((item) => ({
        label: item.name,
        value: item._id,
      }));
      setOptionMaterials(formatOption);
    }
  }, [materials]);

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleChangeAvailability = (value: boolean[]) => {
    setStock(value);
  };

  const handleChangeCategory = (value: string[]) => {
    setCategory(value);
  };

  const handleChangeMaterial = (value: string[]) => {
    setMaterial(value);
  };

  const handleChangeSort = (value: string) => {
    setSort(value);
  };

  return (
    <Container>
      <Wrapper>
        <Row gutter={[30, 0]}>
          <Col lg={6} span={24}>
            <FilterCheckbox
              className="mb-35"
              title="Availability"
              options={optionAvailabilities}
              onChange={handleChangeAvailability}
            />
            <FilterCheckbox
              className="mb-35"
              title="Category"
              options={optionCategories}
              onChange={handleChangeCategory}
            />
            <FilterCheckbox
              className="mb-35"
              title="Material"
              options={optionMaterials}
              onChange={handleChangeMaterial}
            />
          </Col>
          <Col lg={18} span={24}>
            {product?.data?.total_element === 0 ? (
              <div>No products were found</div>
            ) : (
              <Fragment>
                <ShopToolbar onChange={handleChangeSort} />
                <Row className="mb-30" gutter={[30, 10]} wrap>
                  {product?.data?.result.map((item) => (
                    <Col className="product-col" key={item._id} span={8}>
                      <Product product={item} />
                    </Col>
                  ))}
                </Row>
                <Pagination
                  currentPage={page}
                  pageSize={9}
                  totalItems={product?.data?.total_element ?? 0}
                  onChange={handleChangePage}
                />
              </Fragment>
            )}
          </Col>
        </Row>
      </Wrapper>
      {(isLoading || isFetching) && <SpinnerFullScreen />}
    </Container>
  );
};

const Container = styled.div`
  padding-top: 80px;
  padding-bottom: 80px;
`;

export default Shop;
