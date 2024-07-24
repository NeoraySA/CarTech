import React from 'react';
import ModalComponent from './ModalComponent';
import EditDetailsForm from './EditDetailsForm';
import Notification from './Notification';
import UniversalTable from './UniversalTable';
import styles from '../styles/UniversalDataList.module.css';
import { useSettings } from '../context/SettingsContext';

const UniversalDataList = ({ 
  data, 
  formFields, 
  columns, 
  title,
  description, 
  addButtonLabel, 
  addButtonPermissions = [], 
  onSave, 
  onDelete, 
  notification, 
  setNotification,
  customRenderers = {}, 
  actionButtons = [],
  editFormFields = [], // שדות חדשים לטופס העריכה
  editFormData = {}, // נתוני הטופס לעריכה
  onEditFormChange, // פונקציה לשינוי שדות הטופס
  showEditForm = false // האם להציג את טופס העריכה
}) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState({});
  const { permissions } = useSettings();

  const hasPermission = (requiredPermissions) => {
    return requiredPermissions.some(permission => permissions.includes(permission));
  };

  const handleAdd = () => {
    setNewItem({});
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setNewItem(row);
    setIsModalOpen(true);
  };

  const handleDelete = (row) => {
    setNotification({
      message: 'האם אתה בטוח שברצונך למחוק את הפריט?',
      type: 'confirm',
      onConfirm: () => onDelete(row)
    });
  };

  return (
    <div className={styles.section}>
      <div className={styles.sectionTitle}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </div>
      {showEditForm && (
        <form onSubmit={(e) => { e.preventDefault(); onSave(editFormData); }}>
          {editFormFields.map(field => (
            <div key={field.name}>
              <label>{field.label}:</label>
              <input
                type={field.type || 'text'}
                name={field.name}
                value={editFormData[field.name] || ''}
                onChange={onEditFormChange}
              />
            </div>
          ))}
          <button type="submit">שמור</button>
        </form>
      )}
      <Notification
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ message: '', type: '', onConfirm: null })}
        onConfirm={notification.onConfirm}
      />
      <ModalComponent isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={addButtonLabel}>
        <EditDetailsForm
          details={newItem}
          group={{ fields: formFields }}
          onClose={() => setIsModalOpen(false)}
          onSave={(formData) => { onSave(formData); setIsModalOpen(false); }}
          customRenderers={customRenderers}
        />
      </ModalComponent>
      <UniversalTable 
        data={data} 
        columns={columns} 
        actionButtons={actionButtons.filter(button => hasPermission(button.permissions || []))} 
        expandable={false} 
        onRowEdit={handleEdit} 
        onRowDelete={handleDelete} 
      />
      {addButtonLabel && hasPermission(addButtonPermissions) && (
        <div className={styles.divButton}>
          <button onClick={handleAdd} className="Button1">{addButtonLabel}</button>
        </div>
      )}
    </div>
  );
};

export default UniversalDataList;
