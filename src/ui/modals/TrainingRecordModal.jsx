import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { Input, InputNumber } from 'antd';
import { BlueBtn } from '../Button';
import trainingData from '../../components/pages/Training/trainingStaticData';

const initialState = {
  employeeId: '',
  date: '',
  course: '',
  lastName: '',
  expirationDate: '',
  location: '',
  topic: '',
  instructor: '',
  hours: '',
  remarks: '',
};

const TrainingRecordModal = ({ visible, onClose, mode, editId }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && editId) {
      const record = trainingData.find(d => d.employeeId === editId);
      if (record) {
        setForm({
          ...record,
          expirationDate: record.expirationDate
            ? (() => {
                const months = {
                  January: '01', February: '02', March: '03', April: '04',
                  May: '05', June: '06', July: '07', August: '08',
                  September: '09', October: '10', November: '11', December: '12'
                };
                const parts = record.expirationDate.split(' ');
                if (parts.length === 3 && months[parts[0]]) {
                  return `${parts[2]}-${months[parts[0]]}-${parts[1].padStart(2, '0')}`;
                }
                return '';
              })()
            : '',
          date: record.date
            ? (() => {
                const months = {
                  January: '01', February: '02', March: '03', April: '04',
                  May: '05', June: '06', July: '07', August: '08',
                  September: '09', October: '10', November: '11', December: '12'
                };
                const parts = record.date.split(' ');
                if (parts.length === 3 && months[parts[0]]) {
                  return `${parts[2]}-${months[parts[0]]}-${parts[1].padStart(2, '0')}`;
                }
                return '';
              })()
            : '',
        });
      }
    } else {
      setForm(initialState);
    }
  }, [mode, editId]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleNumberChange = (value, name) => {
    setForm(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.employeeId) newErrors.employeeId = 'Employee Id is required';
    if (!form.date) newErrors.date = 'Date is required';
    if (!form.course) newErrors.course = 'Course is required';
    if (!form.location) newErrors.location = 'Location is required';
    if (!form.topic) newErrors.topic = 'Topic is required';
    if (!form.instructor) newErrors.instructor = 'Instructor is required';
    if (!form.hours) newErrors.hours = 'Hours are required';
    if (!form.remarks) newErrors.remarks = 'Remarks are required';
    return newErrors;
  };

  const handleSubmit = () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      // Submit logic here
      onClose();
    }
  };

  return (
    <Modal
      title={mode === 'edit' ? 'Edit Training Record' : 'Add Training Record'}
      visible={visible}
      onCancel={onClose}
      footer={null}
    >
      <form className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Employee Id*</label>
            <Input
              name="employeeId"
              value={form.employeeId}
              onChange={handleChange}
              placeholder="Select Employee"
              disabled={mode === 'edit'}
            />
            {errors.employeeId && <div className="text-red-500 text-xs mt-1">{errors.employeeId}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Date*</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter Hire Date"
            />
            {errors.date && <div className="text-red-500 text-xs mt-1">{errors.date}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Course*</label>
            <Input
              name="course"
              value={form.course}
              onChange={handleChange}
              placeholder="Enter Course Name"
            />
            {errors.course && <div className="text-red-500 text-xs mt-1">{errors.course}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Expiration Date*</label>
            <input
              type="date"
              name="expirationDate"
              value={form.expirationDate}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Enter End Date"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Location*</label>
            <Input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Enter Location"
            />
            {errors.location && <div className="text-red-500 text-xs mt-1">{errors.location}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Topic*</label>
            <Input
              name="topic"
              value={form.topic}
              onChange={handleChange}
              placeholder="Enter Training Topic"
            />
            {errors.topic && <div className="text-red-500 text-xs mt-1">{errors.topic}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Instructors*</label>
            <Input
              name="instructor"
              value={form.instructor}
              onChange={handleChange}
              placeholder="Enter Instructor Name"
            />
            {errors.instructor && <div className="text-red-500 text-xs mt-1">{errors.instructor}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Hours*</label>
            <InputNumber
              name="hours"
              value={form.hours}
              onChange={value => handleNumberChange(value, 'hours')}
              className="w-full"
              placeholder="Enter Training Hours"
            />
            {errors.hours && <div className="text-red-500 text-xs mt-1">{errors.hours}</div>}
          </div>
          <div>
            <label className="block font-semibold mb-1">Remarks*</label>
            <Input
              name="remarks"
              value={form.remarks}
              onChange={handleChange}
              placeholder="Enter Remarks"
            />
            {errors.remarks && <div className="text-red-500 text-xs mt-1">{errors.remarks}</div>}
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-4">
          <BlueBtn onClick={handleSubmit}>
            {mode === 'edit' ? 'Update Training Record' : 'Add Training Record'}
          </BlueBtn>
        </div>
      </form>
    </Modal>
  );
};

export default TrainingRecordModal;
