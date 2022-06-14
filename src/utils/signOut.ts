import Router from "next/router";
import { destroyCookie } from "nookies";

// let authChannel: BroadcastChannel;

export const signOut = () => {
  destroyCookie(undefined, "dashgo.token");
  destroyCookie(undefined, "dashgo.refreshToken");

  // authChannel = new BroadcastChannel("auth");

  // authChannel.postMessage("signOut");
  Router.push("/");
};
