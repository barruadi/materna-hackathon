import React from 'react';
import { Form, InputNumber, Select } from 'antd';

interface LaboratoriumFormProps {
  form: any;
  formData: any;
}

const LaboratoriumForm: React.FC<LaboratoriumFormProps> = ({ form, formData }) => {
  return (
    <>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Pengecekan</h1>
      
      <Form.Item 
        name={['laboratorium', 'hemoglobin']} 
        label="Hemoglobin (g/dL)"
      >
        <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Nilai Hb" />
      </Form.Item>
      
      <Form.Item 
        name={['laboratorium', 'proteinUrine']} 
        label="Protein Urine"
      >
        <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Nilai protein urine" />
      </Form.Item>
      
      <Form.Item 
        name={['laboratorium', 'gulaDarah']} 
        label="Gula Darah (mg/dL)"
      >
        <InputNumber style={{ width: '100%' }} min={0} precision={1} placeholder="Nilai gula darah" />
      </Form.Item>
      
      <Form.Item 
        name={['laboratorium', 'talasemia']} 
        label="Talasemia"
      >
        <Select
          placeholder="Pilih status"
          options={[
            { value: 'positif', label: 'Positif' },
            { value: 'negatif', label: 'Negatif' },
            { value: 'tidakDiperiksa', label: 'Tidak Diperiksa' },
          ]}
        />
      </Form.Item>
      
      <Form.Item 
        name={['laboratorium', 'sifilis']} 
        label="Sifilis"
      >
        <Select
          placeholder="Pilih status"
          options={[
            { value: 'positif', label: 'Positif' },
            { value: 'negatif', label: 'Negatif' },
            { value: 'tidakDiperiksa', label: 'Tidak Diperiksa' },
          ]}
        />
      </Form.Item>
      
      <Form.Item 
        name={['laboratorium', 'hbsAg']} 
        label="HBsAg"
      >
        <Select
          placeholder="Pilih status"
          options={[
            { value: 'positif', label: 'Positif' },
            { value: 'negatif', label: 'Negatif' },
            { value: 'tidakDiperiksa', label: 'Tidak Diperiksa' },
          ]}
        />
      </Form.Item>
    </>
  );
};

export default LaboratoriumForm;