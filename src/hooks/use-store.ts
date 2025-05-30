import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BearSlice, createBearSlice } from '../store/bearSlice';
import { createFishSlice, FishSlice } from '../store/fishSlice';

export const useStore = create<BearSlice & FishSlice>()(
  // Adding persist middleware as an example
  persist(
    (...a) => ({
      ...createBearSlice(...a),
      ...createFishSlice(...a),
    }),
    { name: 'store' },
  ),
); 