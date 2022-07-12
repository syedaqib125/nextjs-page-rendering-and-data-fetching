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
// Static Site Generation fetch all data while build prepare and rendered pre rendered data as static ,
// npm run dev start serve as development
// after run npm run build cmd you can start production server on your local machine with npm start
// recomended mostly SSG as compare to SSR
// because SSR generate while server call but SSG pre fetched all data while buil process and shows all data as static

export const getStaticProps = async () => {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // ISR Incremental Static Generation which work as useEffect to update page after given time completed
  };
};
