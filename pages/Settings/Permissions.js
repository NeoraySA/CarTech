import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Notification from '../../components/Notification';
import ListHeader from '../../components/ListHeader';
import PermissionsCheckboxList from '../../components/PermissionsCheckboxList';
import styles from '../../styles/Page.module.css';


import withAuth from '../../src/hoc/withAuth';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function Permissions() {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [rolePermissions, setRolePermissions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);
  const [localRolePermissions, setLocalRolePermissions] = useState({});
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [rolesResponse, permissionsResponse] = await Promise.all([
          axios.get(`${apiUrl}/api/permissions/roles`, { headers: { Authorization: `Bearer ${token}` } }),
          axios.get(`${apiUrl}/api/permissions/permissions`, { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setRoles(rolesResponse.data);
        setPermissions(permissionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setNotification({ message: 'Failed to fetch data', type: 'error' });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedRole) {
      const fetchRolePermissions = async () => {
        const token = localStorage.getItem('token');
        try {
          const rolePermissionsResponse = await axios.get(`${apiUrl}/api/permissions/role-permissions/${selectedRole.role_id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          setRolePermissions(rolePermissionsResponse.data);
          const permissionsMap = rolePermissionsResponse.data.reduce((acc, perm) => {
            acc[perm.permission_id] = true;
            return acc;
          }, {});
          setLocalRolePermissions(permissionsMap);
        } catch (error) {
          console.error('Error fetching role permissions:', error);
          setNotification({ message: 'Failed to fetch role permissions', type: 'error' });
        }
      };

      fetchRolePermissions();
    }
  }, [selectedRole]);

  const handleRoleChange = (event) => {
    const roleId = event.target.value;
    const role = roles.find((role) => role.role_id === parseInt(roleId));
    setSelectedRole(role);
  };

  const handlePermissionChange = (event, permissionId) => {
    const isChecked = event.target.checked;
    setLocalRolePermissions((prevPermissions) => ({
      ...prevPermissions,
      [permissionId]: isChecked
    }));
  };

  const handleSavePermissions = async () => {
    const token = localStorage.getItem('token');
    const permissionsToAdd = [];
    const permissionsToRemove = [];

    Object.keys(localRolePermissions).forEach((permissionId) => {
      if (localRolePermissions[permissionId] && !rolePermissions.some(perm => perm.permission_id === parseInt(permissionId))) {
        permissionsToAdd.push(permissionId);
      } else if (!localRolePermissions[permissionId] && rolePermissions.some(perm => perm.permission_id === parseInt(permissionId))) {
        permissionsToRemove.push(permissionId);
      }
    });

    try {
      await Promise.all([
        ...permissionsToAdd.map(permissionId => axios.post(`${apiUrl}/api/permissions/role-permissions`, {
          role_id: selectedRole.role_id,
          permission_id: parseInt(permissionId)
        }, {
          headers: { Authorization: `Bearer ${token}` }
        })),
        ...permissionsToRemove.map(permissionId => axios.delete(`${apiUrl}/api/permissions/role-permissions/${selectedRole.role_id}/${permissionId}`, {
          headers: { Authorization: `Bearer ${token}` }
        }))
      ]);

      // Fetch updated role permissions
      const updatedRolePermissionsResponse = await axios.get(`${apiUrl}/api/permissions/role-permissions/${selectedRole.role_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRolePermissions(updatedRolePermissionsResponse.data);

      const permissionsMap = updatedRolePermissionsResponse.data.reduce((acc, perm) => {
        acc[perm.permission_id] = true;
        return acc;
      }, {});
      setLocalRolePermissions(permissionsMap);

      setNotification({ message: 'Permissions updated successfully!', type: 'success' });
    } catch (error) {
      console.error('Error updating permissions:', error);
      setNotification({ message: 'Failed to update permissions', type: 'error' });
    }
  };

  return (
    <div>
      <Head>
        <title>Manage Permissions</title>
      </Head>
      <ListHeader
        title="ניהול הרשאות"
        subtitle="ניהול הרשאות ומשתמשים"
        showSearchBox={false}
        buttons={[
          {
            label: 'שמור',
            onClick: handleSavePermissions
          }
        ]}
      />
      <div className={styles.sectionTitle}>
        <div className={styles.card}>
          <label htmlFor="roleSelect">בחירת הרשאה:</label>
          <select id="roleSelect" onChange={handleRoleChange} value={selectedRole ? selectedRole.role_id : ''}>
            <option value="" disabled>Select a role</option>
            {roles.map((role) => (
              <option key={role.role_id} value={role.role_id}>{role.role_name}</option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.mainSection}>
        <div className={styles.section1}>
          <div className={styles.card}>
            {selectedRole && (
              <PermissionsCheckboxList
                permissions={permissions}
                localRolePermissions={localRolePermissions}
                handlePermissionChange={handlePermissionChange}
              />
            )}
          </div>
        </div>
        <div className={styles.section2}>
          {/* Additional content can be placed here */}
        </div>
      </div>
      {notification.message && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ message: '', type: '' })}
        />
      )}
    </div>
  );
}

export default withAuth(Permissions, ['settings_permissions']);
