export default function del(
  state = false,
  action: { type: "TOGGLE_DELETE"; payload: boolean }
) {
  switch (action.type) {
    case "TOGGLE_DELETE":
      return action.payload;
    default:
      return state;
  }
}
