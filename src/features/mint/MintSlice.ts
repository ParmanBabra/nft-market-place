import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import Moralis from "moralis/types";
import { AppThunk, RootState } from "../../app/store";

export interface MintState {
  strength: number;
  agility: number;
  vitality: number;
  intelligence: number;
  dexterity: number;
  statusPoint: number;
  maxStatusPoint: number;
  star: number;
  chibi?: string;
  normal?: string;
}

export interface IStatus {
  strength: number;
  agility: number;
  vitality: number;
  intelligence: number;
  dexterity: number;
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
    updateNormalFile: (state, action: PayloadAction<string>) => {
      state.normal = action.payload;
    },
    updateChibiFile: (state, action: PayloadAction<string>) => {
      state.chibi = action.payload;
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
  updateNormalFile,
  updateChibiFile,
} = mintSlice.actions;

export const getStatusPoint = (state: RootState) => state.mint.statusPoint;
export const getStar = (state: RootState) => state.mint.star;
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

    const normal = await axios.get(mint.normal);
    const chibi = await axios.get(mint.chibi);

    
  };

export default mintSlice.reducer;
