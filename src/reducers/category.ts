export default function edit( state=["vegetables",
"fruits",
"cans",
"cartons",
"chips",
"frozen","snacks"]
, action: { type:"CHANGE_CATEGORY"; payload:string[] | string }){
    switch (action.type){
        case "CHANGE_CATEGORY":
            return action.payload
        default:
            return state
    }
}
