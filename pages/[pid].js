import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

const ProductDetail = (props) => {
  const { loadedProduct } = props;

  if (!loadedProduct) {
    return <p>Loading...</p>;
  }
  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <h3>{loadedProduct.description}</h3>
    </Fragment>
  );
};

const getData = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
};

export const getStaticProps = async (context) => {
  const { params } = context;
  const productID = params.pid;
  const data = await getData();
  const product = data.products.find((product) => product.id === productID);

  if (!product) {
    //condition-- if we have no data on that id next js through an error if fallback is true ,its initially load
    //the data and loading screen will appear first then it will through an error on screen
    //so with true fallnack we use notFound key in getStaticProps if data not found it will redirect to 404 page after loading screen disappear
    return { notFound: true };
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
};

export const getStaticPaths = async () => {
  const data = await getData(); //loading paths dynamically
  const ids = data.products.map((product) => product.id);
  const pathsWithParams = ids.map((id) => {
    return { params: { pid: id } };
  });
  return {
    // paths: [
    //   { params: { pid: "p1" } },
    //   { params: { pid: "p2" } },
    //   // { params: { pid: "p3" } },
    // ],
    paths: pathsWithParams,
    fallback: true,
    //1-fallback "false" take care of only those pages whom id's are mentioned there else shows 404 page

    //2-fallback "true" shows pre generated pages whom id's are mentioned there and also fetched data from id's
    //which are not mentioned there but it will take a while, while fetching data so error handling is must here

    //3-fallback "blocking" work same as true but the error handling here is excluded because when we fetching data
    // from server , it will loading page until data is not fetched completely
  };
};

export default ProductDetail;
