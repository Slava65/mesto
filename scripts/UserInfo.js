export class UserInfo {
  constructor(profileObject) {
    this._profileName = profileObject.name;
    this._profileInfo = profileObject.info;
  }

  getUserInfo() {
    this._profileValue = {
      name : document.querySelector(this._profileName).textContent,
      info : document.querySelector(this._profileInfo),textContent
    };
    return  this._profileValue;
  }

  setUserInfo(newProfile) {
    document.querySelector(this._profileName).textContent = newProfile.name;
    document.querySelector( this._profileInfo).textContent = newProfile.info;
  }
}
