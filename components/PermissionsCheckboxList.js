import React from 'react';
import styles from '../styles/PermissionsCheckboxList.module.css'; // נתיב נכון לקובץ העיצוב

const PermissionsCheckboxList = ({ permissions, localRolePermissions, handlePermissionChange }) => {
  return (
    <div className={styles.permissionsList}>
      {permissions.map((permission) => (
        <div key={permission.permission_id} className={styles.permissionItem}>
          <label>
            <input
              type="checkbox"
              checked={!!localRolePermissions[permission.permission_id]}
              onChange={(e) => handlePermissionChange(e, permission.permission_id)}
            />
            {permission.description}
          </label>
        </div>
      ))}
    </div>
  );
};

export default PermissionsCheckboxList;
