const {MemoryDataSource} = require('@gqlify/server');
/** Firebase required packages
 * // firebase
 * const {FirebaseDataSource} = require('@gqlify/firebase');
 * // firestore
 * const {FirestoreDataSource} = require('@gqlify/firestore);
 * // both needs
 * const admin = require('firebase-admin');
 * const cert = require('./cert.json');
 */


exports.common = {
  // hostname?: string;
  // cannerSchemaPath?: string;
  // cookieKeys?: string[];
  // public?: boolean;
  // clientId?: string;
  // clientSecret?: string;
}

exports.cms = {
  style: {
  navbarTheme: "dark",
  sidebarTheme: "light",
  sidebarMenuStyle: {
    height: '100%'
  },
  theme: {
    "primary-color": "#337ab7",
    "btn-primary-bg": "#337ab7",
    "progress-default-color": "#158ebd",
    // navbar
    "layout-header-background": "#4b4949",
    "menu-dark-bg": "#4b4949",
    "menu-dark-item-selected-bg": "#4b4949",
    "menu-dark-item-active-bg": "#4b4949",

    // sidebar
    "layout-sider-background-light": "#fdfdfd",
    "menu-bg": "#fdfdfd",
    "menu-item-selected-bg": "#f9f9f9",
    "menu-item-active-bg": "#f9f9f9",
    "layout-trigger-background": "#fdfdfd",
    "border-radius-base": "3px",

    // body
    "layout-body-background": "#fdfdfd"
  }
},
  sidebarMenu: [{
  title: 'Posts',
  pathname: 'posts'
}, {
  title: 'Categories',
  pathname: 'categories'
}],
  // hostname?: string;
  // staticsPath?: string;
  // clientBundledDir?: string;

  // /**
  //  * OIDC config
  //  * If `oidc` is null, all oidc features will be disabled
  //  */
  // oidc?: {
  //   // issuer
  //   // via Discovery
  //   discoveryUrl?: string;
  //   // manually
  //   issuer?: string;
  //   authorizationEndpoint?: string;
  //   tokenEndpoint?: string;
  //   userinfoEndpoint?: string;
  //   jwksUri?: string;

  //   // client
  //   clientId?: string;
  //   clientSecret?: string;

  //   // What attribute of claim should we use as username
  //   usernameClaim?: string;
  //   // Additional scopes we ask in authorization
  //   additionalScopes?: string[];
  //   // Whether we should force SSO to kill session as well or not during logout process
  //   forceSsoLogout?: boolean;
  //   // Customize SSO provider's logout procedure
  //   ssoLogout?: (ctx: Context) => Promise<any>;
  // } | null;

  // /**
  //  * Fully auth customizable middleware
  //  */
  // beforeRenderCms?: (ctx: Context, next: () => Promise<any>) => Promise<void>;
  // authCallback?: (ctx: Context, next: () => Promise<any>) => Promise<void>;
  // logout?: (ctx: Context, next: () => Promise<any>) => Promise<void>;

  // /**
  //  * Cookie
  //  */
  // cookieKeys?: string[];
}

exports.graphql = {
  dataSources: {
    // the keys below is correspoing the `name` of `dataSource` property in your schema.
    // eg:
    //   <array keyName="posts" dataSource={{
    //     name: 'memory'
    //   }}
    // Notice that the memory dataSource is the default dataSource, you don't have to add it here. 
    // 
    // firebase: args => new FirebaseDataSource({
    //   config: {
    //     credential: admin.credential.cert(cert),
    //     databaseURL: `https://${cert.project_id}.firebaseio.com`, 
    //   },
    //   path: args.key
    // }),
    // firestore: args => new FirebaseDataSource({
    //   config: {
    //     credential: admin.credential.cert(cert),
    //     databaseURL: `https://${cert.project_id}.firebaseio.com`, 
    //   },
    //   collection: args.key
    // })
  }
}

exports.auth = {
  // mountPath?: string;
  accounts: [{
    username: 'canner',
    password: 'canner',
  }]
}
