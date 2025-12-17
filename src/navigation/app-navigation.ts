export interface MenuItem {
  key: string;
  text: string;
  icon: string;
  path: string;
  roles: number[];
  items: MenuItem[];
}
export const navigation: MenuItem[] = [
  {
    key: "home",
    text: "Dashboard",
    icon: "fa fa-cubes",
    path: "/",
    roles: [1, 2],
    items: [],
  },
    {
    key: "users",
    text: "Users",
    icon: "fa fa-bell",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "all-users",
        text: "All Users",
        icon: "",
        path: "/admin/users/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },

  {
    key: "benches",
    text: "Benches",
    icon: "fa fa-exchange",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All benches",
        icon: "",
        path: "/admin/benches/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },
];
