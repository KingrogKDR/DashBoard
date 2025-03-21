import ProfileCard from "../../components/ProfileCard";

export default function ProfilePage() {
  const username = process.env.NEXT_PUBLIC_ADMIN_USERNAME; 
  
  return (
    <div className="container ml-64 flex justify-center items-center py-10">
      <ProfileCard username={username} />
    </div>
  );
}