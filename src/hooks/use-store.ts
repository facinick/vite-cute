import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BearSlice, createBearSlice } from '../store/bearSlice';
import { createFishSlice, FishSlice } from '../store/fishSlice';

// Create a type for our store that combines all slices
type StoreState = BearSlice & FishSlice;

// Create the store
export const useStore = create<StoreState>()(
  persist(
    (set, get, api) => ({
      ...createBearSlice(set, get, api),
      ...createFishSlice(set, get, api),
    }),
    {
      name: 'app-storage',
    },
  ),
); 