import React from 'react';
import ColorEditor from './ColorEditor'; // מייבאים את הקומפוננטה של הצבעים

import './UserSettings.css'; // ייבוא קובץ הסגנון

function UserSettings() {
  return (
    <div className="user-settings">
      <h2>User Settings</h2>
      <ColorEditor /> {/* מכניסים את הקומפוננטה של הצבעים */}
    </div>
  );
}

export default UserSettings;
