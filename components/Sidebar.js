import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useSettings } from '../context/SettingsContext';

const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const { permissions, loading, error } = useSettings();
  const [openCategories, setOpenCategories] = useState({});
  const [user, setUser] = useState({ name: '', image: '', companyName: '', branchName: '' });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`${apiUrl}/api/menu/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser({
        name: userData.user_name || 'שם לא זמין',
        image: userData.profile_image_url || 'https://via.placeholder.com/150',
        companyName: userData.company_name || 'שם החברה לא זמין',
        branchName: userData.branch_name || 'סניף לא זמין'
      });
    }
  }, []);

  const toggleCategory = (name) => {
    setOpenCategories(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const hasPermission = (permissionsRequired) => {
    if (!Array.isArray(permissionsRequired)) {
      permissionsRequired = [permissionsRequired];
    }
    return permissionsRequired.some(perm => permissions.includes(perm));
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "close"}`}>
      <div className="sidebar-header">
        {loading ? (
          <h2>Loading...</h2>
        ) : error ? (
          <h2>Error: {error}</h2>
        ) : (
          <>
            <h2>{user.companyName}</h2>
            <p>סניף {user.branchName}</p>
          </>
        )}
      </div>

      <div className="sidebar-content">
        {categories.filter(category => {
          console.log(`Checking category permissions for ${category.name}`, category.permissions);
          return hasPermission(category.permissions);
        }).map(({ name, icon, items }) => (
          <div key={name}>
            <a className="sidebar-link" onClick={() => toggleCategory(name)}>
              <FontAwesomeIcon icon={['fas', icon.replace('fa', '').toLowerCase()]} className="sidebar-icon" />
              <span>{name}</span>
              <FontAwesomeIcon icon={openCategories[name] ? faChevronUp : faChevronDown} className="sidebar-chevron" />
            </a>
            {openCategories[name] && (
              <div className="sidebar-sublinks">
                {items.filter(item => {
                  console.log(`Checking item permissions for ${item.name}`, item.permissions);
                  return hasPermission(item.permissions);
                }).map(({ name, path }) => (
                  <Link key={name} href={path} onClick={toggleSidebar}>
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <img src={user.image} alt="User" className="user-image" />
        <span>{user.name}</span>
      </div>
    </div>
  );
};

export default Sidebar;
