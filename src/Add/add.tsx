import { Formik, Form, Field, ErrorMessage } from "formik";
import "./add.css";
import { FunctionComponent } from "react";
import { ProductsRequest } from "../ApiRespones";

interface PageProps {
  Gener: string;
}
const Add: FunctionComponent<PageProps> = (props) => {
  async function postList(array: ProductsRequest) {
    await fetch(`http://localhost:5050/${props.Gener}/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(array),
    });
    window.location.reload();
  }

  if (props.Gener === "products") {
    return (
      <div>
        <Formik
          initialValues={{
            name: "" as string,
            category: "" as string,
            price: 0 as number,
            image: "../images/" as string,
          }}
          validate={(values) => {
            const errors = {
              name: "" as string,
              category: "" as string,
              price: "" as string,
            };
            if (!values.category && !values.name && !values.price) {
              errors.category = "Required";
              errors.name = "Required";
              errors.price = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              void postList(values as ProductsRequest);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="add-form">
              <label htmlFor="name">
                <div className="error_mess">
                  <div>Product Name</div>
                  <ErrorMessage
                    className="Error_Message"
                    name="name"
                    component="div"
                  />
                </div>

                <Field type="text" name="name" />
              </label>

              <label htmlFor="category">
                <div className="error_mess">
                  <div>Product Category</div>
                  <ErrorMessage
                    className="Error_Message"
                    name="category"
                    component="div"
                  />
                </div>

                <Field type="text" name="category" />
              </label>

              <label htmlFor="price">
                <div className="error_mess">
                  <div>Product price</div>
                  <ErrorMessage
                    className="Error_Message"
                    name="price"
                    component="div"
                  />
                </div>

                <Field type="number" name="price" />
              </label>

              <label htmlFor="image">
                <div>image URL</div>
                <Field type="text" name="image" />
              </label>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  } else {
    return (
      <div>
        <Formik
          initialValues={{ category: "" }}
          validate={(values) => {
            const errors = {
              category: "" as string,
            };
            if (!values.category) {
              errors.category = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              void postList(values as ProductsRequest);
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="add-form">
              <label htmlFor="category">
                <div className="error_mess">
                  <div>Category name</div>
                  <ErrorMessage
                    className="Error_Message"
                    name="category"
                    component="div"
                  />
                </div>

                <Field type="text" name="category" />
              </label>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }
};

export default Add;
