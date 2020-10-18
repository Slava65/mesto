export class UserInfo {
  constructor(profileObject) {
    this._profileName = document.querySelector(profileObject.name);
    this._profileInfo = document.querySelector(profileObject.info);
  }

  getUserInfo() {
    const profileValue = {
      name : this._profileName.textContent,
      info : this._profileInfo.textContent
    };
    return  profileValue;
  }

  setUserInfo(newProfile) {
    this._profileName.textContent = newProfile.name;
    this._profileInfo.textContent = newProfile.info;
  }
}
