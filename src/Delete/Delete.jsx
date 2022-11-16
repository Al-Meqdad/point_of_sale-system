
const deleteDbElm = ({ Gener, id }) => {
  const del = () => {
    fetch(`http://localhost:5050/${Gener}/` + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
 <form
  className="edit-form"
  onSubmit={(e) => {
    del()
  }}
>
<button>Confrim Deletion</button>
    </form>
    );
};

export default deleteDbElm;
