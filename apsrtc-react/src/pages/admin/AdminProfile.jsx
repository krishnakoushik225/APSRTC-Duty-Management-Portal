import UserProfile from "../../components/UserProfile";

export default function AdminProfile({ admin }) {

  const initials =
    admin?.name
      ?.split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return <UserProfile user={admin} initials={initials} forAdminProfile={true}/>;
}
