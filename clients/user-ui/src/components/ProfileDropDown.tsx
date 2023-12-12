"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import AuthScreen from "../screens/AuthScreen";
import useUser from "../hooks/useUser";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const ProfileDropDown = () => {
  const [singedIn, setSignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading } = useUser();
  console.log(user, "========>user");

  useEffect(() => {
    if (!loading) {
      setSignedIn(!!user);
    }
  }, [loading, user]);

  const logoutHandler = () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    toast.success("Logged out successfully!");
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-4">
      {singedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              src={user?.avatar?.url}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">iamrajatjaswal@gmail.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem key="all_orders">All Orders</DropdownItem>
            <DropdownItem key="apply_for_seller_account">
              Apply for seller account
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logoutHandler}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CgProfile
          className="text-2xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <AuthScreen setOpen={setOpen} />}
    </div>
  );
};

export default ProfileDropDown;
