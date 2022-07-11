import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

export default function Home(props) {
  const { products } = props;
  return (
    <Fragment>
      <ul>
        {products.map((product) => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </Fragment>
  );
}

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
  };
};
