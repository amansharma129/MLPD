import React, { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import { Select, Input } from 'antd';
import { BlueBtn, Outline } from '../ui/Button';

const quantityOptions = [1, 2, 3, 4, 5];

const initialState = {
    quantity: undefined,
    item: '',
    dateIssued: '',
    condition: '',
    dateReturned: '',
    conditionReturned: '',
    make: '',
    model: '',
    serialNo: '',
    remarks: '',
};

const AddEquipmentModal = ({ isOpen, onClose, onAdd, onUpdate, equipment, isEdit }) => {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (isOpen) {
            if (equipment && isEdit) {
                setForm({
                    quantity: equipment.quantity,
                    item: equipment.item,
                    dateIssued: equipment.dateIssued,
                    condition: equipment.condition,
                    dateReturned: equipment.dateReturned,
                    conditionReturned: equipment.conditionReturned,
                    make: equipment.make,
                    model: equipment.model,
                    serialNo: equipment.serialNo,
                    remarks: equipment.remarks,
                });
            } else {
                setForm(initialState);
            }
            setErrors({});
        }
        // Do not reset form when closing
    }, [equipment, isEdit, isOpen]);

    const requiredFields = ['quantity', 'item', 'dateIssued', 'condition', 'make', 'model', 'serialNo', 'remarks'];

    const handleChange = (field, value) => {
        setForm((prev) => ({ ...prev, [field]: value }));
        setErrors((prev) => {
            const updated = { ...prev };
            // Only call trim if value is a string
            if (
                (typeof value === 'string' && value.trim() !== '') ||
                (typeof value !== 'string' && value !== undefined && value !== '')
            ) {
                delete updated[field];
            }
            return updated;
        });
    };

    const handleSubmit = () => {
        const newErrors = {};
        requiredFields.forEach((field) => {
            const val = form[field];
            if (
                (typeof val === 'string' && val.trim() === '') ||
                (typeof val !== 'string' && (val === undefined || val === ''))
            ) {
                newErrors[field] = `Please provide a valid ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}.`;
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

    const handleCancel = () => {
        if (onClose) onClose();
    };

    const modalTitle = isEdit ? 'Edit Equipment' : 'Add Equipment';

    return (
        <Modal isOpen={isOpen} onClose={handleCancel} title={modalTitle}>
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <label>Quantity<span className="text-red-500">*</span></label>
                    <Select
                        placeholder="Select Quantity"
                        value={form.quantity}
                        onChange={(value) => handleChange('quantity', value)}
                        className="w-full"
                    >
                        {quantityOptions.map((option) => (
                            <Select.Option key={option} value={option}>
                                {option}
                            </Select.Option>
                        ))}
                    </Select>
                    {errors.quantity && <span className="text-red-500 text-xs">{errors.quantity}</span>}
                </div>
                <div>
                    <label>Item<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="Enter Item name"
                        value={form.item}
                        onChange={(e) => handleChange('item', e.target.value)}
                    />
                    {errors.item && <span className="text-red-500 text-xs">{errors.item}</span>}
                </div>
                <div>
                    <label>Date Issued<span className="text-red-500">*</span></label>
                    <Input
                        type="date"
                        value={form.dateIssued}
                        onChange={(e) => handleChange('dateIssued', e.target.value)}
                    />
                    {errors.dateIssued && <span className="text-red-500 text-xs">{errors.dateIssued}</span>}
                </div>
                <div>
                    <label>Condition</label>
                    <Input
                        placeholder="Enter Issue Condition"
                        value={form.condition}
                        onChange={(e) => handleChange('condition', e.target.value)}
                    />
                </div>
                <div>
                    <label>Date Returned</label>
                    <Input
                        type="date"
                        value={form.dateReturned}
                        onChange={(e) => handleChange('dateReturned', e.target.value)}
                    />
                </div>
                <div>
                    <label>Condition Returned</label>
                    <Input
                        placeholder="Enter Return Condition"
                        value={form.conditionReturned}
                        onChange={(e) => handleChange('conditionReturned', e.target.value)}
                    />
                </div>
                <div>
                    <label>Make<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="Enter Make"
                        value={form.make}
                        onChange={(e) => handleChange('make', e.target.value)}
                    />
                    {errors.make && <span className="text-red-500 text-xs">{errors.make}</span>}
                </div>
                <div>
                    <label>Model<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="Enter Model"
                        value={form.model}
                        onChange={(e) => handleChange('model', e.target.value)}
                    />
                    {errors.model && <span className="text-red-500 text-xs">{errors.model}</span>}
                </div>
                <div>
                    <label>Serial No.<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="Enter Serial No."
                        value={form.serialNo}
                        onChange={(e) => handleChange('serialNo', e.target.value)}
                    />
                    {errors.serialNo && <span className="text-red-500 text-xs">{errors.serialNo}</span>}
                </div>
                <div>
                    <label>Remarks<span className="text-red-500">*</span></label>
                    <Input
                        placeholder="Enter Remarks"
                        value={form.remarks}
                        onChange={(e) => handleChange('remarks', e.target.value)}
                    />
                    {errors.remarks && <span className="text-red-500 text-xs">{errors.remarks}</span>}
                </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
                <Outline onClick={handleCancel}>Cancel</Outline>
                <BlueBtn onClick={handleSubmit}>{isEdit ? 'Update Equipment' : 'Add Equipment'}</BlueBtn>
            </div>
        </Modal>
    );
};

export default AddEquipmentModal;
