import { create } from 'zustand';

type ApiUser = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: { city: string };
  company: { name: string };
};

type State = {
  archivedIds: Set<number>;
  hiddenIds: Set<number>;
  editedUsers: Map<number, ApiUser>;
};

type Actions = {
  archiveUser: (id: number) => void;
  unarchiveUser: (id: number) => void;
  hideUser: (id: number) => void;
  upsertEditedUser: (user: ApiUser) => void;
  getEffectiveUser: (apiUser: ApiUser) => ApiUser;
};

export const useUserStore = create<State & Actions>((set, get) => ({
  archivedIds: new Set(),
  hiddenIds: new Set(),
  editedUsers: new Map(),

  archiveUser: (id) => set((s) => ({ archivedIds: new Set(s.archivedIds).add(id) })),
  unarchiveUser: (id) => set((s) => {
    const next = new Set(s.archivedIds);
    next.delete(id);
    return { archivedIds: next };
  }),
  hideUser: (id) => set((s) => ({ hiddenIds: new Set(s.hiddenIds).add(id) })),
  upsertEditedUser: (user) => set((s) => {
    const next = new Map(s.editedUsers);
    next.set(user.id, user);
    return { editedUsers: next };
  }),
  getEffectiveUser: (apiUser) => {
    const edited = get().editedUsers.get(apiUser.id);
    return edited ?? apiUser;
  },
}));


