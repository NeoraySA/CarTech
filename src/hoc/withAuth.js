import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSettings } from '../../context/SettingsContext';

const withAuth = (Component, requiredPermissions) => {
  return (props) => {
    const { permissions, loading } = useSettings();
    const router = useRouter();

    useEffect(() => {
      if (!loading) {
        const hasPermission = requiredPermissions.some(permission => permissions.includes(permission));
        if (!hasPermission) {
          router.push('/unauthorized'); // ניתוב לדף ללא הרשאה
        }
      }
    }, [loading, permissions, router]);

    if (loading) {
      return <p>Loading...</p>; // תצוגת טעינה בזמן שההרשאות נטענות
    }

    return <Component {...props} />;
  };
};

export default withAuth;
