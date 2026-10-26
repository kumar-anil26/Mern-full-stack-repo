import React from "react";
import UserRegistration from "./constroller/user/UserRegistration";
import GetAllUsers from "./constroller/user/GetAllUsers";

export default function App() {
  return (
    <div>
      <UserRegistration />
      <GetAllUsers/>
    </div>
  );
}
