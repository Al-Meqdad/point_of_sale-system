export default function edit(
  state = false,
  action: { type: "TOGGLE_CADELETE"; payload: boolean }
) {
  switch (action.type) {
    case "TOGGLE_CADELETE":
      return action.payload;
    default:
      return state;
  }
}
