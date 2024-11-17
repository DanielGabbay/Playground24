import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { initialUsersState, IUsersState } from './users-store.data';
import { computed, inject } from '@angular/core';
import { UsersService } from '../users.service';
import { delay } from 'rxjs';

export const UsersSignalStore = signalStore(
  { providedIn: 'root', protectedState: false },
  withState<IUsersState>(initialUsersState),
  withMethods((state, usersService: UsersService = inject(UsersService)) => {
    function loadUsers(): void {
      const { loading, loaded } = state.usersIndicators();
      if (loading || loaded) return;
      patchState(state, (innerState) => {
        innerState.usersIndicators.loading = true;
        return innerState;
      });
      usersService
        .getUsers()
        .pipe(delay(2000))
        .subscribe((backendUsers) => {
          // patchState(state, { users: backendUsers });
          patchState(state, (actualState) => {
            actualState.users = backendUsers;
            actualState.usersIndicators = {
              loading: false,
              loaded: true,
            };
            return actualState;
          });
        });
    }

    return {
      loadUsers,
    };
  }),

  withComputed((state) => ({
    stillLoadUsers$: computed(
      () => state.usersIndicators.loading() && !state.usersIndicators.loaded()
    ),
    usersCount$: computed(() => state.users()?.length || 0),
  })),
  withHooks((state) => {
    function onInit() {
      state.loadUsers();
    }
    return {
      onInit,
    };
  })
);
