import React, { useState, useEffect } from 'react';
import Header from '../../ui/Header';
import { Select, Input, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { BlueBtn, Outline } from '../../ui/Button';
import moment from 'moment';
import employeeList from './employeeStaticData'; 

const { Option } = Select;

const initialForm = {
    employeeImage: null,
    firstName: '',
    middleName: '',
    lastName: '',
    ssn: '',
    dob: null,
    placeOfBirth: '',
    address: '',
    city: '',
    state: undefined,
    zipCode: '',
    jobTitle: '',
    department: undefined,
    employmentType: undefined,
    joiningDate: null,
    salary: '',
    email: '',
    phoneNumber: '',
    emergencyContactName: '',
    emergencyContactNumber: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branch: '',
    squadAssignment: undefined,
    rank: undefined,
    hourlyRate: '',
    hireDate: null,
    promotionDate: null,
    endDate: null,
    cjisLogon: '',
    aocLogon: '',
};

const AddEmployee = () => {
    const [step, setStep] = useState(1);
    const [formErrors, setFormErrors] = useState({});
    const [showEmergencyContact, setShowEmergencyContact] = useState(false);
    const [showDependent, setShowDependent] = useState(false);
    const [formData, setFormData] = useState(initialForm);
    const [mode, setMode] = useState('add');
    const [disabled, setDisabled] = useState(false);
    const [isChanged, setIsChanged] = useState(false);
    const [step4SubmitAttempted, setStep4SubmitAttempted] = useState(false);

    useEffect(() => {
        const empId = localStorage.getItem('employeeId');
        const modeFromStorage = localStorage.getItem('employeeMode');
        if (empId && modeFromStorage) {
            setMode(modeFromStorage);
            setDisabled(modeFromStorage === 'view');
            const emp = employeeList.find(e => e.id === empId);
            if (emp) {
                setFormData({
                    employeeImage: emp.photo || null, 
                    firstName: emp.personalInfo.firstName || '',
                    middleName: emp.personalInfo.middleName || '',
                    lastName: emp.personalInfo.lastName || '',
                    ssn: emp.personalInfo.ssn || '',
dob: emp.personalInfo.dob || '',                    placeOfBirth: emp.personalInfo.pob || '',
                    address: emp.personalInfo.address || '',
                    city: emp.personalInfo.city || '', 
                    state: emp.personalInfo.state || '', 
                    zipCode: emp.personalInfo.zipCode || '', 
                    jobTitle: emp.employmentDetails?.position || '',
                    department: emp.employmentDetails?.department || '',
                    employmentType: '', 
                    joiningDate: emp.employmentDetails?.hireDate ? moment(emp.employmentDetails.hireDate, 'YYYY-MM-DD') : null,
                    salary: '', 
                    email: emp.personalInfo.email || '',
                    phoneNumber: emp.contactInfo.phone || '',
                    emergencyContactName: emp.contactInfo.emergencyContact?.name || '',
                    emergencyContactNumber: emp.contactInfo.emergencyContact?.phone || '',
                    bankName: '', 
                    accountNumber: '', 
                    ifscCode: '',
                    branch: '', 
                    squadAssignment: '',
                    rank: emp.rank || '',
                    hourlyRate: emp.employmentDetails?.hourlyRate || '',
                    hireDate: emp.employmentDetails?.hireDate ? moment(emp.employmentDetails.hireDate, 'YYYY-MM-DD') : null,
                    promotionDate: emp.employmentDetails?.promotionDate ? moment(emp.employmentDetails.promotionDate, 'YYYY-MM-DD') : null,
                    endDate: emp.employmentDetails?.endDate ? moment(emp.employmentDetails.endDate, 'YYYY-MM-DD') : null,
                    cjisLogon: '', 
                    aocLogon: '',
                });
            }
            setIsChanged(false);
        } else {
            setMode('add');
            setDisabled(false);
            setFormData(initialForm);
            setIsChanged(false);
        }
    }, []);

    const validateStep = () => {
        const errors = {};
        if (step === 1) {
            if (!formData.employeeImage) errors.employeeImage = "Employee Image is required";
            if (!formData.firstName) errors.firstName = "First Name is required";
            if (!formData.lastName) errors.lastName = "Last Name is required";
            if (!formData.ssn) errors.ssn = "Social Security Number is required";
            if (!formData.dob) errors.dob = "Date of Birth is required";
            if (!formData.placeOfBirth) errors.placeOfBirth = "Place of Birth is required";
            if (!formData.address) errors.address = "Address is required";
            if (!formData.city) errors.city = "City is required";
            if (!formData.state) errors.state = "State is required";
            if (!formData.zipCode) errors.zipCode = "Zip Code is required";
        } else if (step === 2) {
            if (!formData.squadAssignment) errors.squadAssignment = "Squad Assignment is required";
            if (!formData.rank) errors.rank = "Rank is required";
            if (!formData.hourlyRate) errors.hourlyRate = "Hourly Rate is required";
            if (!formData.hireDate) errors.hireDate = "Hire Date is required";
            if (!formData.promotionDate) errors.promotionDate = "Promotion Date is required";
            if (!formData.endDate) errors.endDate = "End Date is required";
            if (!formData.cjisLogon) errors.cjisLogon = "CJIS Logon is required";
            if (!formData.aocLogon) errors.aocLogon = "AOC Logon is required";
        } else if (step === 3) {
            if (!formData.phone) errors.phone = "Phone is required";
            if (!formData.pager) errors.pager = "Pager is required";
            if (!formData.cellPhone) errors.cellPhone = "Cell Phone is required";
            if (!formData.spouseName) errors.spouseName = "Spouse Name is required";
            if (!formData.spouseContact) errors.spouseContact = "Spouse Contact is required";

            if (showEmergencyContact) {
                if (!formData.emergencyContactName) errors.emergencyContactName = "Emergency Contact Name is required";
                if (!formData.emergencyContactPhone) errors.emergencyContactPhone = "Emergency Contact Phone is required";
                if (!formData.emergencyContactAltPhone) errors.emergencyContactAltPhone = "Emergency Contact Alt Phone is required";
                if (!formData.emergencyContactAddress) errors.emergencyContactAddress = "Emergency Contact Address is required";
            }

            if (!formData.employerPrimaryContact) errors.employerPrimaryContact = "Employer Primary Contact is required";
            if (!formData.employerSecondaryContact) errors.employerSecondaryContact = "Employer Secondary Contact is required";
        } else if (step === 4) {
            if (!formData.driverLicenseNo) errors.driverLicenseNo = "Driver License No. is required";
            if (!formData.expirationDate) errors.expirationDate = "Expiration Date is required";

            if (showDependent) {
                if (!formData.dependentName || formData.dependentName.trim() === '') errors.dependentName = "Dependent Name is required";
                if (!formData.dependentPhone || formData.dependentPhone.trim() === '') errors.dependentPhone = "Dependent Phone is required";
                if (!formData.dependentSchool || formData.dependentSchool.trim() === '') errors.dependentSchool = "Dependent School is required";
                if (!formData.dependentDob) errors.dependentDob = "Dependent Date of Birth is required";
            }
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleFieldChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        setFormErrors((prev) => {
            const updatedErrors = { ...prev };
            if (
                (typeof value === 'string' && value.trim() !== '') ||
                (typeof value !== 'string' && value !== undefined && value !== null)
            ) {
                delete updatedErrors[field];
            }
            return updatedErrors;
        });
    };

    // Helper to handle date input change (HTML date field returns string)
    const handleDateChange = (field, e) => {
        handleFieldChange(field, e.target.value);
    };

    const nextStep = () => {
        if (mode === 'view' || validateStep()) {
            setStep((prev) => Math.min(prev + 1, 4));
        }
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const progressPercentage = (step / 4) * 100;

    const stepTitles = [
        "Personal Information",
        "Employment Details",
        "Contact Information",
        "Additional Information",
    ];
    const handleStep4Submit = (e) => {
        e.preventDefault();
        setStep4SubmitAttempted(true);
        if (mode === 'view' || validateStep()) {
        }
    };

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <h1 className="text-2xl font-bold">
                {mode === 'view'
                    ? 'View Employee'
                    : mode === 'edit'
                        ? 'Edit Employee'
                        : 'Add New Employee'}
            </h1>

            <div className="bg-white p-6 rounded-lg shadow-md w-[95%] md:w-[70%] lg:w-[50%] mx-auto">
                <h2 className="text-xl font-bold mb-4">Step {step} of 4: {stepTitles[step - 1]}</h2>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div
                        className="bg-[#1e3a8a] h-2 rounded-full"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>

                {step === 1 && (
                    <div>
                        <form className="grid sm:grid-cols-2 gap-4">
                            <div className='flex flex-col'>
                                <label>
                                    Employee Image <span className="text-red-500">*</span>
                                    <span className="text-xs text-gray-600">[Supported format Jpeg or Png. Size less than 5 Mb]</span>
                                </label>
                                {formData.employeeImage && (
                                    <div className="mb-2">
                                        <img
                                            src={
                                                typeof formData.employeeImage === 'string'
                                                    ? formData.employeeImage
                                                    : URL.createObjectURL(formData.employeeImage)
                                            }
                                            alt="Employee"
                                            className="w-24 h-24 object-cover rounded border"
                                        />
                                    </div>
                                )}
                                <Upload
                                    beforeUpload={(file) => {
                                        const isJpegOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                                        const isLt5M = file.size / 1024 / 1024 < 5;
                                        if (!isJpegOrPng) {
                                            message.error('You can only upload JPEG or PNG files!');
                                            return Upload.LIST_IGNORE;
                                        }
                                        if (!isLt5M) {
                                            message.error('Image must be smaller than 5MB!');
                                            return Upload.LIST_IGNORE;
                                        }
                                        handleFieldChange('employeeImage', file);
                                        return false;
                                    }}
                                    accept="image/jpeg,image/png"
                                    showUploadList={false}
                                    disabled={mode === 'view'}
                                >
                                    <Button icon={<UploadOutlined />} disabled={mode === 'view'}>Upload Image</Button>
                                </Upload>
                                <div className="mt-2 text-sm text-gray-700">
                                    {formData.employeeImage
                                        ? (typeof formData.employeeImage === 'string'
                                            ? 'employee-photo.jpg'
                                            : formData.employeeImage.name)
                                        : ''}
                                </div>
                                {formErrors.employeeImage && <span className="text-red-500 text-xs">{formErrors.employeeImage}</span>}
                            </div>
                            <div>
                                <label>Employee ID</label>
                                <Input placeholder="Auto-Generated" disabled />

                            </div>
                            <div>
                                <label>First Name <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter First Name"
                                    value={formData.firstName}
                                    onChange={(e) => handleFieldChange('firstName', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.firstName && <span className="text-red-500 text-xs">{formErrors.firstName}</span>}
                            </div>
                            <div>
                                <label>Middle Name</label>
                                <Input placeholder="Enter Middle Name"
                                    value={formData.middleName}
                                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                                    disabled={disabled}
                                />
                            </div>
                            <div>
                                <label>Last Name <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Last Name"
                                    value={formData.lastName}
                                    onChange={(e) => handleFieldChange('lastName', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.lastName && <span className="text-red-500 text-xs">{formErrors.lastName}</span>}
                            </div>
                            <div>
                                <label>Social Security Number <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Social Security Number"
                                    value={formData.ssn}
                                    onChange={(e) => handleFieldChange('ssn', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.ssn && <span className="text-red-500 text-xs">{formErrors.ssn}</span>}
                            </div>
                            <div>
                                <label>Date of Birth <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-2 py-1"
                                    value={formData.dob || ''}
                                    onChange={(e) => handleDateChange('dob', e)}
                                    disabled={disabled}
                                />
                                {formErrors.dob && <span className="text-red-500 text-xs">{formErrors.dob}</span>}
                            </div>
                            <div>
                                <label>Place of Birth <span className="text-red-500">*</span></label>
                                <Input placeholder="Enter Place of Birth"
                                    value={formData.placeOfBirth}
                                    onChange={(e) => handleFieldChange('placeOfBirth', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.placeOfBirth && <span className="text-red-500 text-xs">{formErrors.placeOfBirth}</span>}
                            </div>
                            <div>
                                <label>Address <span className="text-red-500">*</span></label>
                                <Input placeholder="Enter Address"
                                    value={formData.address}
                                    onChange={(e) => handleFieldChange('address', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.address && <span className="text-red-500 text-xs">{formErrors.address}</span>}
                            </div>
                            <div>
                                <label>City <span className="text-red-500">*</span></label>
                                <Input placeholder="Enter City"
                                    value={formData.city}
                                    onChange={(e) => handleFieldChange('city', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.city && <span className="text-red-500 text-xs">{formErrors.city}</span>}
                            </div>
                            <div>
                                <label>State <span className="text-red-500">*</span></label>
                                <Select className="w-full" placeholder="Select State"
                                    value={formData.state}
                                    onChange={(value) => handleFieldChange('state', value)}
                                    disabled={disabled}
                                >
                                    <Option value="NJ">New Jersey</Option>
                                    <Option value="NY">New York</Option>
                                    <Option value="CA">California</Option>
                                    {/* Add more states */}
                                </Select>
                                {formErrors.state && <span className="text-red-500 text-xs">{formErrors.state}</span>}
                            </div>
                            <div>
                                <label>Zip Code <span className="text-red-500">*</span></label>
                                <Input placeholder="Enter Zip Code"
                                    value={formData.zipCode}
                                    onChange={(e) => handleFieldChange('zipCode', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.zipCode && <span className="text-red-500 text-xs">{formErrors.zipCode}</span>}
                            </div>
                        </form>
                        <div className="flex justify-end gap-4 mt-4">
                            {mode === 'view' ? (
                                <>
                                    <Outline onClick={prevStep} disabled={step === 1}>Back</Outline>
                                    <BlueBtn onClick={nextStep}>Next</BlueBtn>
                                </>
                            ) : (
                                <>
                                    <Outline onClick={prevStep} disabled={step === 1}>Cancel</Outline>
                                    <BlueBtn type="primary" onClick={nextStep}>Save & Continue</BlueBtn>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <form className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label>Squad Assignment <span className="text-red-500">*</span></label>
                                <Select
                                    className="w-full"
                                    placeholder="Select Squad"
                                    value={formData.squadAssignment}
                                    onChange={(value) => handleFieldChange('squadAssignment', value)}
                                    disabled={disabled}
                                >
                                    <Option value="Alpha">Alpha</Option>
                                    <Option value="Bravo">Bravo</Option>
                                    <Option value="Charlie">Charlie</Option>
                                    {/* Add more squads */}
                                </Select>
                                {formErrors.squadAssignment && <span className="text-red-500 text-xs">{formErrors.squadAssignment}</span>}
                            </div>
                            <div>
                                <label>Rank <span className="text-red-500">*</span></label>
                                <Select
                                    className="w-full"
                                    placeholder="Select Rank"
                                    value={formData.rank}
                                    onChange={(value) => handleFieldChange('rank', value)}
                                    disabled={disabled}
                                >
                                    <Option value="Officer">Officer</Option>
                                    <Option value="Sergeant">Sergeant</Option>
                                    <Option value="Lieutenant">Lieutenant</Option>
                                    {/* Add more ranks */}
                                </Select>
                                {formErrors.rank && <span className="text-red-500 text-xs">{formErrors.rank}</span>}
                            </div>
                            <div>
                                <label>Hourly Rate <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Hourly Rate"
                                    value={formData.hourlyRate}
                                    onChange={(e) => handleFieldChange('hourlyRate', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.hourlyRate && <span className="text-red-500 text-xs">{formErrors.hourlyRate}</span>}
                            </div>
                            <div>
                                <label>Hire Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-2 py-1"
                                    value={formData.hireDate || ''}
                                    onChange={(e) => handleDateChange('hireDate', e)}
                                    disabled={disabled}
                                />
                                {formErrors.hireDate && <span className="text-red-500 text-xs">{formErrors.hireDate}</span>}
                            </div>
                            <div>
                                <label>Promotion Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-2 py-1"
                                    value={formData.promotionDate || ''}
                                    onChange={(e) => handleDateChange('promotionDate', e)}
                                    disabled={disabled}
                                />
                                {formErrors.promotionDate && <span className="text-red-500 text-xs">{formErrors.promotionDate}</span>}
                            </div>
                            <div>
                                <label>End Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-2 py-1"
                                    value={formData.endDate || ''}
                                    onChange={(e) => handleDateChange('endDate', e)}
                                    disabled={disabled}
                                />
                                {formErrors.endDate && <span className="text-red-500 text-xs">{formErrors.endDate}</span>}
                            </div>
                            <div>
                                <label>CJIS Logon <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter CJIS Logon"
                                    value={formData.cjisLogon}
                                    onChange={(e) => handleFieldChange('cjisLogon', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.cjisLogon && <span className="text-red-500 text-xs">{formErrors.cjisLogon}</span>}
                            </div>
                            <div>
                                <label>AOC Logon <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter AOC Logon"
                                    value={formData.aocLogon}
                                    onChange={(e) => handleFieldChange('aocLogon', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.aocLogon && <span className="text-red-500 text-xs">{formErrors.aocLogon}</span>}
                            </div>
                        </form>
                        <div className="flex justify-end gap-4 mt-4">
                            {mode === 'view' ? (
                                <>
                                    <Outline onClick={prevStep}>Back</Outline>
                                    <BlueBtn onClick={nextStep}>Next</BlueBtn>
                                </>
                            ) : (
                                <>
                                    <Outline onClick={prevStep}>Back</Outline>
                                    <BlueBtn onClick={nextStep}>Save & Continue</BlueBtn>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div>
                        <form className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label>Phone <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Phone"
                                    value={formData.phone}
                                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.phone && <span className="text-red-500 text-xs">{formErrors.phone}</span>}
                            </div>
                            <div>
                                <label>Pager <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Pager"
                                    value={formData.pager}
                                    onChange={(e) => handleFieldChange('pager', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.pager && <span className="text-red-500 text-xs">{formErrors.pager}</span>}
                            </div>
                            <div>
                                <label>Cell Phone <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Cell Phone"
                                    value={formData.cellPhone}
                                    onChange={(e) => handleFieldChange('cellPhone', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.cellPhone && <span className="text-red-500 text-xs">{formErrors.cellPhone}</span>}
                            </div>
                            <div>
                                <label>Spouse Name <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Spouse Name"
                                    value={formData.spouseName}
                                    onChange={(e) => handleFieldChange('spouseName', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.spouseName && <span className="text-red-500 text-xs">{formErrors.spouseName}</span>}
                            </div>
                            <div>
                                <label>Spouse Contact <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Spouse Contact"
                                    value={formData.spouseContact}
                                    onChange={(e) => handleFieldChange('spouseContact', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.spouseContact && <span className="text-red-500 text-xs">{formErrors.spouseContact}</span>}
                            </div>

                            {/* Emergency Contact Toggle */}
                            {!showEmergencyContact && (
                                <div className="col-span-2">
                                    <BlueBtn
                                        onClick={() => setShowEmergencyContact(true)}
                                    >
                                        Add Emergency Contact
                                    </BlueBtn>
                                </div>
                            )}

                            {showEmergencyContact && (
                                <>
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-bold">Primary Emergency Contact</h3>
                                    </div>
                                    <div>
                                        <label>Emergency Contact Name <span className="text-red-500">*</span></label>
                                        <Input
                                            placeholder="Enter Emergency Contact Name"
                                            value={formData.emergencyContactName}
                                            onChange={(e) => handleFieldChange('emergencyContactName', e.target.value)}
                                            disabled={disabled}
                                        />
                                        {formErrors.emergencyContactName && <span className="text-red-500 text-xs">{formErrors.emergencyContactName}</span>}
                                    </div>
                                    <div>
                                        <label>Emergency Contact Phone <span className="text-red-500">*</span></label>
                                        <Input
                                            placeholder="Enter Emergency Contact Phone"
                                            value={formData.emergencyContactPhone}
                                            onChange={(e) => handleFieldChange('emergencyContactPhone', e.target.value)}
                                            disabled={disabled}
                                        />
                                        {formErrors.emergencyContactPhone && <span className="text-red-500 text-xs">{formErrors.emergencyContactPhone}</span>}
                                    </div>
                                    <div>
                                        <label>Emergency Contact Alt Phone <span className="text-red-500">*</span></label>
                                        <Input
                                            placeholder="Enter Emergency Contact Alt Phone"
                                            value={formData.emergencyContactAltPhone}
                                            onChange={(e) => handleFieldChange('emergencyContactAltPhone', e.target.value)}
                                            disabled={disabled}
                                        />
                                        {formErrors.emergencyContactAltPhone && <span className="text-red-500 text-xs">{formErrors.emergencyContactAltPhone}</span>}
                                    </div>
                                    <div>
                                        <label>Emergency Contact Address <span className="text-red-500">*</span></label>
                                        <Input
                                            placeholder="Enter Emergency Contact Address"
                                            value={formData.emergencyContactAddress}
                                            onChange={(e) => handleFieldChange('emergencyContactAddress', e.target.value)}
                                            disabled={disabled}
                                        />
                                        {formErrors.emergencyContactAddress && <span className="text-red-500 text-xs">{formErrors.emergencyContactAddress}</span>}
                                    </div>
                                    <div className="col-span-2">
                                        <BlueBtn
                                            onClick={() => setShowEmergencyContact(false)}
                                        >
                                            Remove Emergency Contact
                                        </BlueBtn>
                                    </div>
                                </>
                            )}

                            <div>
                                <label>Employer Primary Contact <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Employer Primary Contact"
                                    value={formData.employerPrimaryContact}
                                    onChange={(e) => handleFieldChange('employerPrimaryContact', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.employerPrimaryContact && <span className="text-red-500 text-xs">{formErrors.employerPrimaryContact}</span>}
                            </div>
                            <div>
                                <label>Employer Secondary Contact <span className="text-red-500">*</span></label>
                                <Input
                                    placeholder="Enter Employer Secondary Contact"
                                    value={formData.employerSecondaryContact}
                                    onChange={(e) => handleFieldChange('employerSecondaryContact', e.target.value)}
                                    disabled={disabled}
                                />
                                {formErrors.employerSecondaryContact && <span className="text-red-500 text-xs">{formErrors.employerSecondaryContact}</span>}
                            </div>
                        </form>
                        <div className="flex justify-end gap-4 mt-4">
                            {mode === 'view' ? (
                                <>
                                    <Outline onClick={prevStep}>Back</Outline>
                                    <BlueBtn onClick={nextStep}>Next</BlueBtn>
                                </>
                            ) : (
                                <>
                                    <Outline onClick={prevStep}>Back</Outline>
                                    <BlueBtn onClick={nextStep}>Save & Continue</BlueBtn>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div>
                        <form className="grid sm:grid-cols-2 gap-4" onSubmit={handleStep4Submit}>
                            <div>
                                <label>Driver License No. <span className="text-red-500">*</span></label>
                                <Select
                                    className="w-full"
                                    placeholder="Select State"
                                    value={formData.driverLicenseNo}
                                    onChange={(value) => handleFieldChange('driverLicenseNo', value)}
                                    onBlur={() => {
                                        if (step4SubmitAttempted && (!formData.driverLicenseNo || formData.driverLicenseNo === '')) {
                                            setFormErrors((prev) => ({ ...prev, driverLicenseNo: "Driver License No. is required" }));
                                        }
                                    }}
                                    disabled={disabled}
                                >
                                    <Option value="NJ">New Jersey</Option>
                                    <Option value="NY">New York</Option>
                                    <Option value="CA">California</Option>
                                    {/* Add more states */}
                                </Select>
                                {formErrors.driverLicenseNo && <span className="text-red-500 text-xs">{formErrors.driverLicenseNo}</span>}
                            </div>
                            <div>
                                <label>Expiration Date <span className="text-red-500">*</span></label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-2 py-1"
                                    value={formData.expirationDate || ''}
                                    onChange={(e) => handleDateChange('expirationDate', e)}
                                    onBlur={() => {
                                        if (step4SubmitAttempted && !formData.expirationDate) {
                                            setFormErrors((prev) => ({ ...prev, expirationDate: "Expiration Date is required" }));
                                        }
                                    }}
                                    disabled={disabled}
                                />
                                {formErrors.expirationDate && <span className="text-red-500 text-xs">{formErrors.expirationDate}</span>}
                            </div>

                            {/* Dependent Toggle */}
                            {!showDependent && (
                                <div className="col-span-2">
                                    <BlueBtn
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setShowDependent(true);
                                        }}
                                    >
                                        Add Dependent
                                    </BlueBtn>
                                </div>
                            )}

                            {showDependent && (
                                <>
                                    <div className="col-span-2">
                                        <h3 className="text-lg font-bold">Primary Dependent</h3>
                                    </div>
                                    <div>
                                        <label>Name <span className="text-red-500">*</span></label>
                                        <Input
                                            placeholder="Enter Name"
                                            value={formData.dependentName}
                                            onChange={(e) => handleFieldChange('dependentName', e.target.value)}
                                            onBlur={() => {
                                                if (step4SubmitAttempted && (!formData.dependentName || formData.dependentName.trim() === '')) {
                                                    setFormErrors((prev) => ({ ...prev, dependentName: "Dependent Name is required" }));
                                                }
                                            }}
                                            disabled={disabled}
                                        />
                                        {formErrors.dependentName && <span className="text-red-500 text-xs">{formErrors.dependentName}</span>}
                                    </div>
                                    <div>
                                        <label>Phone <span className="text-red-500">*</span></label>
                                        <Input
                                            placeholder="Enter Phone"
                                            value={formData.dependentPhone}
                                            onChange={(e) => handleFieldChange('dependentPhone', e.target.value)}
                                            onBlur={() => {
                                                if (step4SubmitAttempted && (!formData.dependentPhone || formData.dependentPhone.trim() === '')) {
                                                    setFormErrors((prev) => ({ ...prev, dependentPhone: "Dependent Phone is required" }));
                                                }
                                            }}
                                            disabled={disabled}
                                        />
                                        {formErrors.dependentPhone && <span className="text-red-500 text-xs">{formErrors.dependentPhone}</span>}
                                    </div>
                                    <div>
                                        <label>School <span className="text-red-500">*</span></label>
                                        <Input
                                            placeholder="Enter School"
                                            value={formData.dependentSchool}
                                            onChange={(e) => handleFieldChange('dependentSchool', e.target.value)}
                                            onBlur={() => {
                                                if (step4SubmitAttempted && (!formData.dependentSchool || formData.dependentSchool.trim() === '')) {
                                                    setFormErrors((prev) => ({ ...prev, dependentSchool: "Dependent School is required" }));
                                                }
                                            }}
                                            disabled={disabled}
                                        />
                                        {formErrors.dependentSchool && <span className="text-red-500 text-xs">{formErrors.dependentSchool}</span>}
                                    </div>
                                    <div>
                                        <label>Date of Birth <span className="text-red-500">*</span></label>
                                        <input
                                            type="date"
                                            className="w-full border rounded px-2 py-1"
                                            value={formData.dependentDob || ''}
                                            onChange={(e) => handleDateChange('dependentDob', e)}
                                            onBlur={() => {
                                                if (step4SubmitAttempted && !formData.dependentDob) {
                                                    setFormErrors((prev) => ({ ...prev, dependentDob: "Dependent Date of Birth is required" }));
                                                }
                                            }}
                                            disabled={disabled}
                                        />
                                        {formErrors.dependentDob && <span className="text-red-500 text-xs">{formErrors.dependentDob}</span>}
                                    </div>
                                    <div className="col-span-2">
                                        <BlueBtn
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setShowDependent(false);
                                                setFormErrors((prev) => {
                                                    const updated = { ...prev };
                                                    delete updated.dependentName;
                                                    delete updated.dependentPhone;
                                                    delete updated.dependentSchool;
                                                    delete updated.dependentDob;
                                                    return updated;
                                                });
                                            }}
                                        >
                                            Remove Dependent
                                        </BlueBtn>
                                    </div>
                                </>
                            )}
                        </form>
                        <div className="flex justify-end gap-4 mt-4">
                            <Outline onClick={prevStep}>Back</Outline>
                                {mode === 'view' ? (
                                   '' 
                                ) : (
                                    <BlueBtn onClick={handleStep4Submit}>Submit</BlueBtn>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddEmployee;