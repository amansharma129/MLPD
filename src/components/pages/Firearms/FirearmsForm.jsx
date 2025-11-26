import React, { useState } from 'react';
import { Input, DatePicker, Radio, Select } from 'antd';
import { BlueBtn, Outline } from '../../ui/Button';
import Header from '../../ui/Header';

const { Option } = Select;

const initialForm = {
    // Step 1: Personal Information
    employee: undefined,
    date: null,
    range: '',
    trainingCategory: '',
    // Step 2: Weapon Detail
    make: '',
    model: '',
    serialNo: '',
    roundCapacity: '',
    ammoBrand: '',
    calibre: '',
    ammoCalibre: '',
    grain: '',
    projectileType: '',
    // Step 3: Qualification Scores
    handgunDay: '',
    handgunNight: '',
    shotgunSlugDay: '',
    shotgunSlugNight: '',
    rifleDay: '',
    rifleNight: '',
    // Step 4: Training & Flags
    trainingType: 'FATS',
    roundShot: '',
    remedialTrainingCompleted: null,
    // Step 5: Instructors & Remarks
    instructor1: '',
    instructor2: '',
    remarks: '',
};

const stepTitles = [
    'Personal Information',
    'Weapon Detail',
    'Qualification Scores',
    'Training & Flags',
    'Instructors & Remarks',
];

const FirearmsForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState(initialForm);

    const handleFieldChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    return (
        <div className="min-h-screen p-2 sm:p-8 flex flex-col gap-8">
            <Header />
            <div className="bg-white p-6 rounded-xl shadow-md md:w-[60%] w-full mx-auto">
                <h2 className="text-lg font-semibold mb-2">Step {step} of 5</h2>
                <div className="w-full bg-gray-200 rounded-full h-1 mb-2">
                    <div
                        className="bg-[#1e3a8a] h-1 rounded-full"
                        style={{ width: `${(step / 5) * 100}%` }}
                    ></div>
                </div>
                <h3 className="text-xl font-bold mb-4">{stepTitles[step - 1]}</h3>
                {/* Step 1: Personal Information */}
                {step === 1 && (
                    <form>
                        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                            <div>
                                <label>Employee *</label>
                                <Select
                                    className="w-full"
                                    placeholder="Select Employee"
                                    value={formData.employee}
                                    onChange={value => handleFieldChange('employee', value)}
                                >
                                    <Option value="emp1">Michael J. Rodriguez</Option>
                                    <Option value="emp2">Jane Doe</Option>
                                </Select>
                            </div>
                            <div>
                                <label>Date *</label>
                                <input
                                    type="date"
                                    className="w-full border rounded px-2 py-1"
                                    value={formData.date ? (typeof formData.date === 'string' ? formData.date : formData.date.format('YYYY-MM-DD')) : ''}
                                    onChange={e => handleFieldChange('date', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Range *</label>
                                <Input
                                    placeholder="Enter Range"
                                    value={formData.range}
                                    onChange={e => handleFieldChange('range', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Training Category *</label>
                                <Input
                                    placeholder="Enter Training Category"
                                    value={formData.trainingCategory}
                                    onChange={e => handleFieldChange('trainingCategory', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <Outline onClick={prevStep} disabled={step === 1}>Cancel</Outline>
                            <BlueBtn onClick={nextStep}>Save & Continue</BlueBtn>
                        </div>
                    </form>
                )}
                {/* Step 2: Weapon Detail */}
                {step === 2 && (
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label>Make *</label>
                                <Input
                                    placeholder="Enter Make"
                                    value={formData.make}
                                    onChange={(e) => handleFieldChange('make', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Model *</label>
                                <Input
                                    placeholder="Enter Model"
                                    value={formData.model}
                                    onChange={(e) => handleFieldChange('model', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Serial No *</label>
                                <Input
                                    placeholder="Enter Serial NO."
                                    value={formData.serialNo}
                                    onChange={(e) => handleFieldChange('serialNo', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Round Capacity *</label>
                                <Input
                                    placeholder="Enter Round Capacity"
                                    value={formData.roundCapacity}
                                    onChange={(e) => handleFieldChange('roundCapacity', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Ammo Brand *</label>
                                <Input
                                    placeholder="Enter Ammo Brand"
                                    value={formData.ammoBrand}
                                    onChange={(e) => handleFieldChange('ammoBrand', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Calibre *</label>
                                <Input
                                    placeholder="Enter Calibre"
                                    value={formData.calibre}
                                    onChange={(e) => handleFieldChange('calibre', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Ammo Calibre *</label>
                                <Input
                                    placeholder="Enter Ammo Calibre"
                                    value={formData.ammoCalibre}
                                    onChange={(e) => handleFieldChange('ammoCalibre', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Grain *</label>
                                <Input
                                    placeholder="Enter Grain"
                                    value={formData.grain}
                                    onChange={(e) => handleFieldChange('grain', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Projectile Type *</label>
                                <Input
                                    placeholder="Enter Projectile Type"
                                    value={formData.projectileType}
                                    onChange={(e) => handleFieldChange('projectileType', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <Outline onClick={prevStep} disabled={step === 1}>Back</Outline>
                            <BlueBtn onClick={nextStep}>Save & Continue</BlueBtn>
                        </div>
                    </form>
                )}
                {/* Step 3: Qualification Scores */}
                {step === 3 && (
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label>Handgun Day *</label>
                                <Input
                                    placeholder="Handgun Day Score"
                                    value={formData.handgunDay}
                                    onChange={(e) => handleFieldChange('handgunDay', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Handgun Night *</label>
                                <Input
                                    placeholder="Handgun Night Score"
                                    value={formData.handgunNight}
                                    onChange={(e) => handleFieldChange('handgunNight', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Shotgun Slug Day *</label>
                                <Input
                                    placeholder="Shotgun Slug Day Score"
                                    value={formData.shotgunSlugDay}
                                    onChange={(e) => handleFieldChange('shotgunSlugDay', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Shotgun Slug Night *</label>
                                <Input
                                    placeholder="Shotgun Slug Night Score"
                                    value={formData.shotgunSlugNight}
                                    onChange={(e) => handleFieldChange('shotgunSlugNight', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Rifle Day *</label>
                                <Input
                                    placeholder="Rifle Day Score"
                                    value={formData.rifleDay}
                                    onChange={(e) => handleFieldChange('rifleDay', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Rifle Night *</label>
                                <Input
                                    placeholder="Rifle Night Score"
                                    value={formData.rifleNight}
                                    onChange={(e) => handleFieldChange('rifleNight', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <Outline onClick={prevStep}>Back</Outline>
                            <BlueBtn onClick={nextStep}>Save & Continue</BlueBtn>
                        </div>
                    </form>
                )}
                {/* Step 4: Training & Flags */}
                {step === 4 && (
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex flex-col gap-4">
                                <Radio.Group
                                    value={formData.trainingType}
                                    onChange={e => handleFieldChange('trainingType', e.target.value)}
                                    className="flex flex-col gap-4"
                                >
                                    <Radio value="FATS">FATS</Radio>
                                    <Radio value="Remedial Training Required">Remedial Training Required</Radio>
                                    <Radio value="Other Training">Other Training</Radio>
                                </Radio.Group>
                            </div>
                            <div className="flex flex-col gap-4">
                                <div>
                                    <label>Round Shot *</label>
                                    <Input
                                        placeholder="Rounds"
                                        value={formData.roundShot}
                                        onChange={e => handleFieldChange('roundShot', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label>Remedial Training Completed *</label>
                                    <DatePicker
                                        className="w-full"
                                        value={formData.remedialTrainingCompleted}
                                        onChange={date => handleFieldChange('remedialTrainingCompleted', date)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <Outline onClick={prevStep}>Back</Outline>
                            <BlueBtn onClick={nextStep}>Save & Continue</BlueBtn>
                        </div>
                    </form>
                )}
                {/* Step 5: Instructors & Remarks */}
                {step === 5 && (
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label>Instructor 1 *</label>
                                <Input
                                    placeholder="Enter Instructor Name"
                                    value={formData.instructor1}
                                    onChange={e => handleFieldChange('instructor1', e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Instructor 2 *</label>
                                <Input
                                    placeholder="Enter Instructor Name"
                                    value={formData.instructor2}
                                    onChange={e => handleFieldChange('instructor2', e.target.value)}
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label>Remarks *</label>
                                <Input
                                    placeholder="Enter Remarks"
                                    value={formData.remarks}
                                    onChange={e => handleFieldChange('remarks', e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 flex justify-end gap-4 mt-4">
                            <Outline onClick={prevStep}>Back</Outline>
                            <BlueBtn>Save & Preview</BlueBtn>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default FirearmsForm;
