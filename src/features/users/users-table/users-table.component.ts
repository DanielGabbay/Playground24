import { Component, computed, inject, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UsersSignalStore } from '../+store/users.signal-store';
import { IUser } from '../data/dtos/user.type';

class TableUser implements Pick<IUser, 'id' | 'name' | 'username'> {
  id: number;
  name: string;
  username: string;
  addressString: string;

  constructor(user: IUser) {
    Object.assign(this, user);
    this._setAddressString(user.address);
  }

  private _setAddressString(address: IUser['address']): void {
    const { street, suite, city, zipcode } = address;
    this.addressString = `${street}, ${suite}, ${city}, ${zipcode}`;
  }
}

type ITableUser = Pick<IUser, 'id' | 'name' | 'username'>;

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [TableModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss',
})
export class UsersTableComponent {
  protected readonly usersStore = inject(UsersSignalStore);

  protected readonly tableUsers$ = computed(() => {
    const storeUsers = this.usersStore.users();
    return storeUsers?.map((backendUser) => new TableUser(backendUser));
  });

  constructor() {}

}
