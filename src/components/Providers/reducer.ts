//GENSHIN IMPACT REDUCER
export interface GIMaterialState{
    data: GenshinImpact.Material
}

enum GIMaterialStateActionKind{
CHANGE_INPUT = "CHANGE_INPUT",
}

const data :GenshinImpact.Material= {
    name:"",
    typeMaterial:undefined,
    lore:"",
    rarity:"",
    gainedFrom:[],
    image:""
};

export interface GIMaterialStateAction {
    type: GIMaterialStateActionKind;
    payload?: { id?: string; value?: string };
  }


  export const GI_MATERIAL_INITIAL_STATE: GIMaterialState = {
    data, 
  }
  
export function giMaterialReducer(state: GIMaterialState, action: GIMaterialStateAction) {
  switch (action.type) {
    case GIMaterialStateActionKind.CHANGE_INPUT: {
      return { ...state, data: { ...state.data, [action.payload?.id as string]: action.payload?.value } };
    }
    default:
      return state;
  }
}