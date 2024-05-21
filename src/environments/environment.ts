// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const firebaseConfig = {
  apiKey: "AIzaSyAseXEWPYViZGX5plzBkC0KDTIXjzxP9oU",
  authDomain: "reservas-f930a.firebaseapp.com",
  projectId: "reservas-f930a",
  storageBucket: "reservas-f930a.appspot.com",
  messagingSenderId: "121547109154",
  appId: "1:121547109154:web:8794bc04775c6439106b7b"
};

export const environment = {
  production: false,
  baseUrl:'https://rentcabinsproyect.tk/',
  firebaseConfig
};
