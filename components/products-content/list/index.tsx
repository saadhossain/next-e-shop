import useSwr from "swr";
import type { ProductTypeList } from "types";

import { useRouter } from 'next/router';
import ProductItem from "../../product-item";
import ProductsLoading from "./loading";

const ProductsContent = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr("/api/products", fetcher);
  if (error) return <div>Failed to load users</div>;
  const router = useRouter();
  //Get the Search Text from the router query
  const searchText = router.query.search as string;
  //Get the Search Text from the router query
  const selectedCategory = router.query.category as string;

  //Filter the Products depending on the search text and category
  const filteredProducts = searchText
    ? data?.filter((d: ProductTypeList) => d.name.toLowerCase().includes(searchText))
    : data && selectedCategory ? data?.filter((d: ProductTypeList) => d.category === selectedCategory) : data
  return (
    <>
      {!filteredProducts && <ProductsLoading />}

      {filteredProducts && (
        <section className="products-list">
          {filteredProducts.map((item: ProductTypeList) => (
            <ProductItem
              id={item.id}
              name={item.name}
              price={item.price}
              color={item.color}
              currentPrice={item.currentPrice}
              key={item.id}
              images={item.images}
            />
          ))}
        </section>
      )}
    </>
  );
};

export default ProductsContent;
