import store from "@/store";

export function getCurrentAuthority() {
  if (isLogin()) {
    if (store.state.user.userInfo.role == 0) {
      return ["user"];
    } else {
      return ["admin"];
    }
  } else {
    return ["guest"];
  }
}

export function check(authority) {
  const current = getCurrentAuthority();
  return current.some((item) => authority.includes(item));
}

export function isLogin() {
  const current = store.state.user.loginStatus;
  return current;
}
