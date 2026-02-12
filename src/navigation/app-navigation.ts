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
    key: "labs",
    text: "Labs",
    icon: "fa fa-building",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All labs",
        icon: "",
        path: "/admin/labs/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },
  
  {
    key: "reagents",
    text: "Reagents",
    icon: "fa fa-flask",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All reagents",
        icon: "",
        path: "/admin/reagents/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },

  
  {
    key: "instruments",
    text: "Instruments",
    icon: "fa fa-dashboard",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All instruments",
        icon: "",
        path: "/admin/instruments/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },

  
  {
    key: "tests",
    text: "Tests",
    icon: "fa fa-cubes",
    path: "#",
    roles: [1, 2],
    items: [
      {
        key: "groups",
        text: "All tests",
        icon: "",
        path: "/admin/tests/list",
        roles: [1, 2],
        items: [],
      },
    ],
  },
];
