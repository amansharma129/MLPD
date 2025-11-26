import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { Select, Input } from 'antd';
import { BlueBtn, Outline } from '../ui/Button';
import moment from 'moment';

const rankOptions = [
  'Lieutenant',
  'Chief',
  'Sergeant',
  'Police Officer'
];

const initialState = {
  employeeId: undefined,
  firstName: '',
  middleName: '',
  lastName: '',
  rank: undefined,
  hireDate: null,
  promotionDate: null,
};

function OfficerForm({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  officer,
  isEdit,
  isView
}) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if ((officer && (isEdit || isView))) {
        const hireDate =
          officer.hireDate && officer.hireDate !== 'NA'
            ? moment(officer.hireDate, ['DD-MM-YYYY', 'YYYY-MM-DD'])
            : null;
        const promotionDate =
          (officer.promotedDate || officer.promotionDate) && (officer.promotedDate !== 'NA' && officer.promotionDate !== 'NA')
            ? moment(officer.promotedDate || officer.promotionDate, ['DD-MM-YYYY', 'YYYY-MM-DD'])
            : null;
        setForm({
          employeeId: officer.employeeId,
          firstName: officer.firstName,
          middleName: officer.middleName,
          lastName: officer.lastName,
          rank: officer.rank,
          hireDate: hireDate && hireDate.isValid() ? hireDate : null,
          promotionDate: promotionDate && promotionDate.isValid() ? promotionDate : null,
        });
      } else {
        setForm(initialState);
      }
      setErrors({});
    }
    // Do not reset form when closing
  }, [officer, isEdit, isView, isOpen]);

  const requiredFields = ['firstName', 'lastName', 'rank', 'hireDate', 'promotionDate'];

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => {
      const updated = { ...prev };
      if (
        (typeof value === 'string' && value.trim() !== '') ||
        (typeof value !== 'string' && value !== undefined && value !== null)
      ) {
        delete updated[field];
      }
      return updated;
    });
  };

  const handleSubmit = () => {
    const newErrors = {};
    requiredFields.forEach(field => {
      if (
        !form[field] ||
        (typeof form[field] === 'string' && form[field].trim() === '')
      ) {
        newErrors[field] = 'Required';
      }
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      if (isEdit && onUpdate) {
        onUpdate(form);
      } else if (onAdd) {
        onAdd(form);
      }
      setForm(initialState);
      setErrors({});
    }
  };

  const modalTitle = isView
    ? 'View Officer'
    : isEdit
    ? 'Edit Officer'
    : 'Add Officer';

  if (!isOpen) return null; // Prevent rendering when closed

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={modalTitle}>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label>Employee Id</label>
          <Input
            placeholder="Auto-generated"
            value={form.employeeId || 'Auto-generated'}
            disabled
            className="w-full"
          />
        </div>
        <div>
          <label>First Name<span className="text-red-500">*</span></label>
          <Input
            placeholder="Enter First name"
            value={form.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
            disabled={isView}
          />
          {errors.firstName && !isView && <span className="text-red-500 text-xs">{errors.firstName}</span>}
        </div>
        <div>
          <label>Middle Name</label>
          <Input
            placeholder="Enter Middle name"
            value={form.middleName}
            onChange={e => handleChange('middleName', e.target.value)}
            disabled={isView}
          />
        </div>
        <div>
          <label>Last Name<span className="text-red-500">*</span></label>
          <Input
            placeholder="Enter Last name"
            value={form.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
            disabled={isView}
          />
          {errors.lastName && !isView && <span className="text-red-500 text-xs">{errors.lastName}</span>}
        </div>
        <div>
          <label>Rank<span className="text-red-500">*</span></label>
          <Select
            placeholder="Select Rank"
            value={form.rank}
            onChange={val => handleChange('rank', val)}
            className="w-full"
            disabled={isView}
          >
            {rankOptions.map(rank => (
              <Select.Option key={rank} value={rank}>{rank}</Select.Option>
            ))}
          </Select>
          {errors.rank && !isView && <span className="text-red-500 text-xs">{errors.rank}</span>}
        </div>
        <div>
          <label>Hire Date<span className="text-red-500">*</span></label>
          <input
            type="date"
            className="w-full border rounded px-2 py-2"
            value={form.hireDate ? form.hireDate.format('YYYY-MM-DD') : ''}
            onChange={e => handleChange('hireDate', e.target.value ? moment(e.target.value, 'YYYY-MM-DD') : null)}
            disabled={isView}
          />
          {errors.hireDate && !isView && <span className="text-red-500 text-xs">{errors.hireDate}</span>}
        </div>
        <div>
          <label>Promotion Date<span className="text-red-500">*</span></label>
          <input
            type="date"
            className="w-full border rounded px-2 py-2"
            value={form.promotionDate ? form.promotionDate.format('YYYY-MM-DD') : ''}
            onChange={e => handleChange('promotionDate', e.target.value ? moment(e.target.value, 'YYYY-MM-DD') : null)}
            disabled={isView}
          />
          {errors.promotionDate && !isView && <span className="text-red-500 text-xs">{errors.promotionDate}</span>}
        </div>
      </div>
      <div className="flex justify-end gap-4 mt-8">
        <Outline onClick={onClose}>{isView ? 'Close' : 'Cancel'}</Outline>
        {!isView && (
          <BlueBtn onClick={handleSubmit}>
            {isEdit ? 'Update Officer' : 'Add Officer'}
          </BlueBtn>
        )}
      </div>
    </Modal>
  );
}

// Parent modal controller
const AddOfficerModal = ({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  officer,
  isView,
  isEdit
}) => (
  <OfficerForm
    isOpen={isOpen}
    onClose={onClose}
    onAdd={onAdd}
    onUpdate={onUpdate}
    officer={officer}
    isView={isView}
    isEdit={isEdit}
  />
);

export default AddOfficerModal;