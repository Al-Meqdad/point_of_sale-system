export default function changeCategory(toggle: string[] | string) {
  return { type: "CHANGE_CATEGORY", payload: toggle };
}
