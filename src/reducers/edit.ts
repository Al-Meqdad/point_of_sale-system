

export default function edit( state=false, action: { type:"TOGGLE_EDIT"; payload:boolean }){
    switch (action.type){
        case "TOGGLE_EDIT":
            return action.payload
        default:
            return state
    }
}
