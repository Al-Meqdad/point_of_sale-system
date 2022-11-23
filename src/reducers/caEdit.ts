

export default function edit( state=false, action: { type:"TOGGLE_CAEDIT"; payload:boolean }){
    switch (action.type){
        case "TOGGLE_CAEDIT":
            return action.payload
        default:
            return state
    }
}
