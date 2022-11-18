import { FunctionComponent } from "react";

interface PageProps {
  Gener : string
  id:number
}

const deleteDbElm:FunctionComponent <PageProps>= (props) => {
  async function del ()  {
    await fetch(`http://localhost:5050/${props.Gener}/${props.id}`,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form
      className="edit-form"
      onSubmit={() => {
        void del();
      }}
    >
      <button>Confrim Deletion</button>
    </form>
  );
};

export default deleteDbElm;
