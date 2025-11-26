import React, { useState, useEffect } from 'react';
import Header from '../../ui/Header';
import { BlueBtn, Outline } from '../../ui/Button';
import { Select, Input, Checkbox } from 'antd';
import moment from 'moment';
import medicalStaticData from './medicalStaticData';

const steps = [
  { label: 'Personal Information' },
  { label: 'Medical Information' },
  { label: 'Hepatitis B Vaccination' },
  { label: 'Doctor Information' },
  { label: 'Medical Conditions & Medications' },
];

const initialForm = {
  employee: '',
  employeeName: '',
  bloodType: '',
  allergies: '',
  conditions: '',
  hepB1: '',
  hepB2: '',
  hepB3: '',
  hepBDeclined: false,
  doctorName: '',
  doctorPhone: '',
  doctorAddress: '',
  doctorCity: '',
  doctorState: '',
  doctorZip: '',
  medicalConditions: '',
  medications: '',
};

const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const states = ['California', 'Texas', 'New York', 'Florida'];

const AddEmployeeMedical = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [mode, setMode] = useState('add');
  const [disabled, setDisabled] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const empId = localStorage.getItem('medicalEmployeeId');
    const modeFromStorage = localStorage.getItem('medicalMode');
    if (empId && modeFromStorage) {
      setMode(modeFromStorage);
      setDisabled(modeFromStorage === 'view');
      const emp = medicalStaticData.find(e => e.employeeId === empId);
      if (emp) {
        setForm({
          employee: emp.employeeId,
          employeeName: emp.name,
          bloodType: emp.bloodType || '',
          allergies: emp.allergies || '',
          conditions: emp.condition || '',
          hepB1: emp.hepB1 ? moment(emp.hepB1, moment(emp.hepB1, 'YYYY-MM-DD', true).isValid() ? 'YYYY-MM-DD' : undefined) : null,
          hepB2: emp.hepB2 ? moment(emp.hepB2, moment(emp.hepB2, 'YYYY-MM-DD', true).isValid() ? 'YYYY-MM-DD' : undefined) : null,
          hepB3: emp.hepB3 ? moment(emp.hepB3, moment(emp.hepB3, 'YYYY-MM-DD', true).isValid() ? 'YYYY-MM-DD' : undefined) : null,
          hepBDeclined: !!emp.hepBDeclined,
          doctorName: emp.doctor || '',
          doctorPhone: emp.doctorPhone || '',
          doctorAddress: emp.doctorAddress || '',
          doctorCity: emp.doctorCity || '',
          doctorState: emp.doctorState || '',
          doctorZip: emp.doctorZip || '',
          medicalConditions: emp.medicalConditions || '',
          medications: emp.medications || '',
        });
      }
      setIsChanged(false);
    } else {
      setMode('add');
      setDisabled(false);
      setForm(initialForm);
      setIsChanged(false);
    }
  }, []);

  const handleChange = (field, value) => {
    setForm(prev => {
      const updated = { ...prev, [field]: value };
      if (mode === 'edit') {
        const empId = localStorage.getItem('medicalEmployeeId');
        const emp = medicalStaticData.find(e => e.employeeId === empId);
        if (emp) {
          const original = {
            employee: emp.employeeId,
            employeeName: emp.name,
            bloodType: emp.bloodType || '',
            allergies: emp.allergies || '',
            conditions: emp.condition || '',
            hepB1: emp.hepB1 || '',
            hepB2: emp.hepB2 || '',
            hepB3: emp.hepB3 || '',
            hepBDeclined: !!emp.hepBDeclined,
            doctorName: emp.doctor || '',
            doctorPhone: emp.doctorPhone || '',
            doctorAddress: emp.doctorAddress || '',
            doctorCity: emp.doctorCity || '',
            doctorState: emp.doctorState || '',
            doctorZip: emp.doctorZip || '',
            medicalConditions: emp.medicalConditions || '',
            medications: emp.medications || '',
          };
          setIsChanged(
            Object.keys(updated).some(key => updated[key] !== original[key])
          );
        }
      }
      return updated;
    });
  };

  const renderButtons = () => {
    if (mode === 'view') {
      return (
        <div className="flex justify-end gap-4 mt-8">
          {step < steps.length - 1 ? (
            <BlueBtn onClick={() => setStep(s => s + 1)}>Next</BlueBtn>
          ) : (
            <Outline onClick={() => window.history.back()}>Cancel</Outline>
          )}
        </div>
      );
    }
    if (mode === 'edit') {
      return (
        <div className="flex justify-end gap-4 mt-8">
          {step > 0 && <Outline onClick={() => setStep(s => s - 1)}>Back</Outline>}
          {step < steps.length - 1 ? (
            <BlueBtn onClick={() => setStep(s => s + 1)}>Save & Continue</BlueBtn>
          ) : (
            isChanged
              ? <BlueBtn>Update</BlueBtn>
              : <Outline onClick={() => window.history.back()}>Cancel</Outline>
          )}
        </div>
      );
    }
    return (
      <div className="flex justify-end gap-4 mt-8">
        {step > 0 && <Outline onClick={() => setStep(s => s - 1)}>Back</Outline>}
        {step < steps.length - 1 ? (
          <BlueBtn onClick={() => setStep(s => s + 1)}>Save & Continue</BlueBtn>
        ) : (
          <BlueBtn>Save & Preview</BlueBtn>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
      <Header />
      <h2 className="text-2xl font-bold">Add Employee Medical Info</h2>
      <div className="w-[95%] md:w-[70%] lg:w-[50%] mx-auto w-full">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="font-semibold mb-2">Step {step + 1} of {steps.length}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-[#1e3a8a] h-2 rounded-full" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
          </div>
          <div className="text-lg font-bold mb-4">{steps[step].label}</div>
          {step === 0 && (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label>Employee</label>
                  <Select
                    className="w-full"
                    value={form.employee || undefined}
                    onChange={value => handleChange('employee', value)}
                    placeholder="Select Employee"
                    allowClear
                    disabled={disabled}
                  >
                    <Select.Option value="E001">Michael J. Rodriguez</Select.Option>
                    <Select.Option value="E002">Sarah A. Johnson</Select.Option>
                  </Select>
                </div>
                <div>
                  <label>Employee Name</label>
                  <Input
                    className="w-full"
                    value={form.employeeName}
                    onChange={e => handleChange('employeeName', e.target.value)}
                    placeholder="Employee Name"
                    disabled={disabled}
                  />
                </div>
              </div>
            </>
          )}
          {step === 1 && (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label>Blood Type</label>
                  <Select
                    className="w-full"
                    value={form.bloodType || undefined}
                    onChange={value => handleChange('bloodType', value)}
                    placeholder="Select"
                    allowClear
                    disabled={disabled}
                  >
                    {bloodTypes.map(bt => <Select.Option key={bt} value={bt}>{bt}</Select.Option>)}
                  </Select>
                </div>
                <div>
                  <label>Allergies</label>
                  <Input
                    className="w-full"
                    value={form.allergies}
                    onChange={e => handleChange('allergies', e.target.value)}
                    placeholder="Enter Allergies"
                    disabled={disabled}
                  />
                </div>
                <div className="col-span-2">
                  <label>Conditions</label>
                  <Input
                    className="w-full"
                    value={form.conditions}
                    onChange={e => handleChange('conditions', e.target.value)}
                    placeholder="List Current Medical Conditions"
                    disabled={disabled}
                  />
                </div>
              </div>
            </>
          )}
          {step === 2 && (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label>Hep B 1 Dose</label>
                  <input
                    type="date"
                    className="w-full border rounded px-2 py-1"
                    value={form.hepB1 ? (typeof form.hepB1 === 'string' ? form.hepB1 : form.hepB1.format('YYYY-MM-DD')) : ''}
                    onChange={e => handleChange('hepB1', e.target.value)}
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label>Hep B 2 Dose</label>
                  <input
                    type="date"
                    className="w-full border rounded px-2 py-1"
                    value={form.hepB2 ? (typeof form.hepB2 === 'string' ? form.hepB2 : form.hepB2.format('YYYY-MM-DD')) : ''}
                    onChange={e => handleChange('hepB2', e.target.value)}
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label>Hep B 3 Dose</label>
                  <input
                    type="date"
                    className="w-full border rounded px-2 py-1"
                    value={form.hepB3 ? (typeof form.hepB3 === 'string' ? form.hepB3 : form.hepB3.format('YYYY-MM-DD')) : ''}
                    onChange={e => handleChange('hepB3', e.target.value)}
                    disabled={disabled}
                  />
                </div>
                <div className="flex items-center mt-6">
                  <Checkbox
                    checked={form.hepBDeclined}
                    onChange={e => handleChange('hepBDeclined', e.target.checked)}
                    disabled={disabled}
                  >
                    Vaccination Declined
                  </Checkbox>
                </div>
              </div>
            </>
          )}
          {step === 3 && (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label>Doctor Name</label>
                  <Input
                    className="w-full"
                    value={form.doctorName}
                    onChange={e => handleChange('doctorName', e.target.value)}
                    placeholder="Enter Doctor Name"
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label>Phone</label>
                  <Input
                    className="w-full"
                    value={form.doctorPhone}
                    onChange={e => handleChange('doctorPhone', e.target.value)}
                    placeholder="Enter Phone"
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label>Address</label>
                  <Input
                    className="w-full"
                    value={form.doctorAddress}
                    onChange={e => handleChange('doctorAddress', e.target.value)}
                    placeholder="Enter Address"
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label>City</label>
                  <Input
                    className="w-full"
                    value={form.doctorCity}
                    onChange={e => handleChange('doctorCity', e.target.value)}
                    placeholder="Enter City"
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label>State</label>
                  <Select
                    className="w-full"
                    value={form.doctorState || undefined}
                    onChange={value => handleChange('doctorState', value)}
                    placeholder="Select State"
                    allowClear
                    disabled={disabled}
                  >
                    {states.map(st => <Select.Option key={st} value={st}>{st}</Select.Option>)}
                  </Select>
                </div>
                <div>
                  <label>Zip Code</label>
                  <Input
                    className="w-full"
                    value={form.doctorZip}
                    onChange={e => handleChange('doctorZip', e.target.value)}
                    placeholder="Enter Zip Code"
                    disabled={disabled}
                  />
                </div>
              </div>
            </>
          )}
          {step === 4 && (
            <>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label>Medical Conditions</label>
                  <Input
                    className="w-full"
                    value={form.medicalConditions}
                    onChange={e => handleChange('medicalConditions', e.target.value)}
                    placeholder="Enter Medical Conditions"
                    disabled={disabled}
                  />
                </div>
                <div>
                  <label>Medications</label>
                  <Input
                    className="w-full"
                    value={form.medications}
                    onChange={e => handleChange('medications', e.target.value)}
                    placeholder="Enter Medications"
                    disabled={disabled}
                  />
                </div>
              </div>
            </>
          )}
          {renderButtons()}
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeMedical;
