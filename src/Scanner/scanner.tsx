import { FunctionComponent, useEffect, useState } from "react";
import "./scanner.css";
//import * as tf from "@tensorflow/tfjs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { ProductsApi } from "../ApiRespones";

interface PageProps {
  onAdd: ({ product }: { product: ProductsApi }) => void;
}

const Scanner: FunctionComponent<PageProps> = ({ onAdd }) => {
  const idFinder = (values: { barCode: number }) => {
    const product = products.find((x) => x.Barcode === values.barCode);
    if (product) {
      onAdd({ product });
    }
  };
  const [products, setProducts] = useState([] as ProductsApi[]);

  useEffect(() => {
    async function requestProducts() {
      const res = await fetch(`http://localhost:5050/products`);
      const json = (await res.json()) as ProductsApi[];
      setProducts(json);
    }
    void requestProducts();
  }, []);

  return (
    <div>
      <Formik
        initialValues={{
          barCode: 0 as number,
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            idFinder(values);
            setSubmitting(false);
          }, 100);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="barCode_scanner">
            <label htmlFor="barCode">
              <div className="error_mess">
                <div>BarCode Scanner</div>
                <ErrorMessage
                  className="Error_Message"
                  name="barCode"
                  component="div"
                />
              </div>

              <Field type="number" name="barCode" />
            </label>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Scanner;
