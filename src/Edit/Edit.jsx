import "./Edit.css";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const Edit = ({ current, Gener }) => {

  const updateList = (array) => {
    fetch(`http://localhost:5050/${Gener}/` + current.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(array),
    });
    window.location.reload(false);
  };
  if (Gener === "products") {
    return (
      <div className="edit-container">
                   <Formik
       initialValues={{name:'', category: '' ,price: 0, image: '../images/'}}
       validate={values => {
         const errors = {};
         if (!values.category && !values.name && !values.price) {
           errors.category = 'Required';
           errors.name="Required"
           errors.price="Required"
           
           
         }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateList(values, null, 4)
          setSubmitting(false);
        }, 400);
      }}
     >
       {({ isSubmitting }) => (
         <Form className='add-form'>
          <label htmlFor="name">
            <div className='error_mess'>
              <div>Product Name</div>
            <ErrorMessage style={{ color: 'red'}} name="name" component="div" />
            </div>
            
           <Field  type="text" name="name" />
            </label>

            <label htmlFor="category">
            <div className='error_mess'>
              <div>Product Category</div>
            <ErrorMessage style={{ color: 'red'}} name="category" component="div" />
            </div>

           <Field type="text" name="category" />

          </label>

          <label htmlFor="price">
            <div className='error_mess'>
              <div>Product price</div>
            <ErrorMessage  style={{ color: 'red'}} name="price" component="div" />

            </div>

           <Field type="number" name="price" />
          </label>

          <label htmlFor='image'>
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
      <div className="edit-container">
       <Formik
       initialValues={{ category: '' }}
       validate={values => {
         const errors = {};
         if (!values.category) {
           errors.category = 'Required';
         } 
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          updateList(values, null, 1)
          setSubmitting(false);
        }, 400);
      }}
     >
       {({ isSubmitting }) => (
         <Form className='add-form'>
                      <label htmlFor="category">
            <div className='error_mess'>
              <div>Category name</div>
            <ErrorMessage  style={{ color: 'red'}} name="category" component="div" />
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

export default Edit;
