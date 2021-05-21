const FtpDeploy = require('ftp-deploy');
const path = require('path');
const ftpDeploy = new FtpDeploy();

const localPath = path.join(__dirname + '/../build/');

console.log(localPath);

var config = {
  user: process.env.FTP_USERNAME,
  password: process.env.FTP_PASSWORD,
  host: process.env.FTP_HOST,
  port: 22,
  localRoot: localPath,
  remoteRoot: '/',
  include: ['*', '**/*', '.*'],
  deleteRemote: false,
  forcePasv: true,
  sftp: true,
};

ftpDeploy
  .deploy(config)
  .then((res) => console.log('finished:', res))
  .catch((err) => console.log(err));
