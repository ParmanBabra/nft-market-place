import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import Moralis from "moralis";
import { Base64 } from "js-base64";
import { AppThunk, RootState } from "../../app/store";

export interface MintState {
  name?: string;
  description?: string;
  strength: number;
  agility: number;
  vitality: number;
  intelligence: number;
  dexterity: number;
  statusPoint: number;
  maxStatusPoint: number;
  star: number;
  image?: string;
  chibi?: string;
  normal?: string;
  imageFileName?: string;
  chibiFileName?: string;
  normalFileName?: string;
}

export interface IStatus {
  strength: number;
  agility: number;
  vitality: number;
  intelligence: number;
  dexterity: number;
}

export interface IMintFile {
  content: string;
  fileName: string;
}

const initialState: MintState = {
  strength: 1,
  agility: 1,
  vitality: 1,
  intelligence: 1,
  dexterity: 1,
  statusPoint: 5,
  maxStatusPoint: 10,
  star: 1,
};

function getUsedStatusPoint(state: MintState): number {
  return (
    state.strength +
    state.agility +
    state.dexterity +
    state.intelligence +
    state.vitality
  );
}

function resetStatusPoint(state: MintState): MintState {
  state.strength = 1;
  state.agility = 1;
  state.dexterity = 1;
  state.intelligence = 1;
  state.vitality = 1;

  return state;
}

export const mintSlice = createSlice({
  name: "mint",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    updateDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    updateImageFile: (state, action: PayloadAction<IMintFile>) => {
      state.image = action.payload.content;
      state.imageFileName = action.payload.fileName;
    },
    updateNormalFile: (state, action: PayloadAction<IMintFile>) => {
      state.normal = action.payload.content;
      state.normalFileName = action.payload.fileName;
    },
    updateChibiFile: (state, action: PayloadAction<IMintFile>) => {
      state.chibi = action.payload.content;
      state.chibiFileName = action.payload.fileName;
    },
    updateStar: (state, action: PayloadAction<number>) => {
      if (action.payload < 1) return;

      if (action.payload > 5) return;

      state.star = action.payload;
      state.maxStatusPoint = 10 + (state.star - 1) * 2;

      state = resetStatusPoint(state);
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    decrementStrength: (state) => {
      if (state.strength === 1) {
        return;
      }

      state.strength -= 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    incrementStrength: (state) => {
      const availablePoint = state.maxStatusPoint - getUsedStatusPoint(state);
      if (availablePoint === 0) {
        return;
      }

      state.strength += 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    decrementAgility: (state) => {
      if (state.agility === 1) {
        return;
      }

      state.agility -= 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    incrementAgility: (state) => {
      const availablePoint = state.maxStatusPoint - getUsedStatusPoint(state);
      if (availablePoint === 0) {
        return;
      }

      state.agility += 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    decrementDexterity: (state) => {
      if (state.dexterity === 1) {
        return;
      }

      state.dexterity -= 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    incrementDexterity: (state) => {
      const availablePoint = state.maxStatusPoint - getUsedStatusPoint(state);
      if (availablePoint === 0) {
        return;
      }

      state.dexterity += 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    decrementIntelligence: (state) => {
      if (state.intelligence === 1) {
        return;
      }

      state.intelligence -= 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    incrementIntelligence: (state) => {
      const availablePoint = state.maxStatusPoint - getUsedStatusPoint(state);
      if (availablePoint === 0) {
        return;
      }

      state.intelligence += 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    decrementVitality: (state) => {
      if (state.vitality === 1) {
        return;
      }

      state.vitality -= 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
    incrementVitality: (state) => {
      const availablePoint = state.maxStatusPoint - getUsedStatusPoint(state);
      if (availablePoint === 0) {
        return;
      }

      state.vitality += 1;
      state.statusPoint = state.maxStatusPoint - getUsedStatusPoint(state);
    },
  },
});

export const {
  decrementStrength,
  incrementStrength,
  decrementAgility,
  incrementAgility,
  decrementDexterity,
  incrementDexterity,
  decrementIntelligence,
  incrementIntelligence,
  decrementVitality,
  incrementVitality,
  updateStar,
  updateImageFile,
  updateNormalFile,
  updateChibiFile,
  updateName,
  updateDescription,
} = mintSlice.actions;

export const getStatusPoint = (state: RootState) => state.mint.statusPoint;
export const getStar = (state: RootState) => state.mint.star;
export const getImage = (state: RootState) => state.mint.image;
export const getNormal = (state: RootState) => state.mint.normal;
export const getChibi = (state: RootState) => state.mint.chibi;

export const getStatus = (state: RootState): IStatus => {
  const status: IStatus = {
    strength: state.mint.strength,
    agility: state.mint.agility,
    vitality: state.mint.vitality,
    intelligence: state.mint.intelligence,
    dexterity: state.mint.dexterity,
  };
  return status;
};

export const mint =
  (amount: number): AppThunk =>
  async (dispatch, getState) => {
    const { mint } = getState();
    if (!mint.normal) return;

    if (!mint.chibi) return;

    if (!mint.image) return;

    let imageFile = new Moralis.File(mint.imageFileName as string, {
      uri: mint.image,
    });
    await imageFile.save();

    let normalFile = new Moralis.File(mint.normalFileName as string, {
      uri: mint.normal,
    });
    await normalFile.save();

    let chibiFile = new Moralis.File(mint.chibiFileName as string, {
      uri: mint.chibi,
    });
    await chibiFile.save();

    let mata = {
      name: mint.name,
      description: mint.description,
      image: imageFile.url(),
      animation_url: normalFile.url(),
      chbi_animation_url: chibiFile.url(),
      star: mint.star,
      strength: mint.strength,
      dexterity: mint.dexterity,
      agility: mint.agility,
      intelligence: mint.intelligence,
      vitality: mint.vitality,
      attributes: [
        {
          trait_type: "Star",
          value: mint.star,
        },
        {
          trait_type: "Strength",
          value: mint.strength,
        },
        {
          trait_type: "Dexterity",
          value: mint.dexterity,
        },
        {
          trait_type: "Agility",
          value: mint.agility,
        },
        {
          trait_type: "Intelligence",
          value: mint.intelligence,
        },
        {
          trait_type: "Vitality",
          value: mint.vitality,
        },
      ],
    };
    let jsonMata = JSON.stringify(mata);

    let mataFile = new Moralis.File(`${mint.name}.json`, {
      base64: Base64.btoa(jsonMata),
    });

    await mataFile.save();

    console.log(mataFile);
  };

export default mintSlice.reducer;
