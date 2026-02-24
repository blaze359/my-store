import { getUserProfile } from '@/app/actions/api';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function MyAccountPage() {
  const profileDate = await getUserProfile(1);
  const t = await getTranslations('MyAccount');
  return (
    <div className="my-6">
      <h1 className="font-bold text-2xl">
        {profileDate.firstName} {profileDate.lastName}
      </h1>
      <div className="flex items-center gap-6 mt-4">
        <div>
          <Image
            src={profileDate.image}
            alt={`${profileDate.firstName} ${profileDate.lastName}`}
            width={150}
            height={150}
          />
        </div>
        <div>
          <p>{t('Username')}: {profileDate.username}</p>
          <p>{t('Email')}: {profileDate.email}</p>
          <p>{t('Phone')}: {profileDate.phone}</p>
        </div>
      </div>
    </div>
  );
}
