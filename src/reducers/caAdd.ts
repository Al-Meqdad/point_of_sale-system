export default function edit(
  state = false,
  action: { type: "TOGGLE_CAADD"; payload: boolean }
) {
  switch (action.type) {
    case "TOGGLE_CAADD":
      return action.payload;
    default:
      return state;
  }
}
