const oneDriveAPI = require('onedrive-api');
const SECRETS = require('oneDrive.env').config();
const {
  ClientCredentials,
  ResourceOwnerPassword,
  AuthorizationCode
} = require('simple-oauth2');

const config = {
  client: {
    id: SECRETS.CLIENT_ID,
    secret: SECRETS.CLIENT_SECRET
  },
  auth: {
    tokenHost: 'https://api.oauth.com'
  }
};

let accessToken = null;

async function run() {
  const client = new AuthorizationCode(config);

  const authorizationUri = client.authorizeURL({
    redirect_uri: 'http://localhost:3000/callback',
    scope: '<scope>',
    state: '<state>'
  });

  // Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
  //   res.redirect(authorizationUri);

  const tokenParams = {
    code: '<code>',
    redirect_uri: 'http://localhost:3000/callback',
    scope: '<scope>'
  };

  try {
    const accessToken = await client.getToken(tokenParams);
  } catch (error) {
    console.log('Access Token Error', error.message);
  }
}

run();

export async function getBackups() {
  return oneDriveAPI.items
    .listChildren({
      accessToken: accessToken,
      itemId: 'root',
      drive: 'me', // 'me' | 'user' | 'drive' | 'group' | 'site'
      driveId: '' // BLANK | {user_id} | {drive_id} | {group_id} | {sharepoint_site_id}
    })
    .then(childrens => {
      // list all children of given root directory
      //
      // console.log(childrens);
      // returns body of https://dev.onedrive.com/items/list.htm#response
      return childrens;
    });
}

oneDriveAPI.items
  .createFolder({
    accessToken: accessToken,
    rootItemId: 'root',
    name: 'Folder name'
  })
  .then(item => {
    // console.log(item)
    // returns body of https://dev.onedrive.com/items/create.htm#response
  });

export async function createBackup(filename, readableStream) {
  oneDriveAPI.items
    .uploadSession(
      {
        accessToken: accessToken,
        filename: filename,
        fileSize: null,
        readableStream: readableStream
      },
      bytesUploaded => {
        console.log(bytesUploaded);
      }
    )
    .then(item => {
      // console.log(item);
      // returns body of https://docs.microsoft.com/en-us/onedrive/developer/rest-api/api/driveitem_createuploadsession?view=odsp-graph-online#http-response
    });
}
