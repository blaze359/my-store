import { getUserProfile } from "@/app/actions/api";
import Image from "next/image";

export default async function MyAccountPage() {
  const profileDate = await getUserProfile(1)

  return (
    <div className="my-6">
      <h1 className="font-bold text-2xl">{profileDate.firstName} {profileDate.lastName}</h1>
      <div className="flex items-center gap-6 mt-4">
        <div>
          <Image 
            src={profileDate.image} 
            alt={`${profileDate.firstName} ${profileDate.lastName}`} 
            width={150} 
            height={150} />
        </div>
        <div>
          <p>Username: {profileDate.username}</p>
          <p>Email: {profileDate.email}</p>
          <p>Phone: {profileDate.phone}</p>
        </div>
      </div>
    </div>
  );
}