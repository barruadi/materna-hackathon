import React, { useEffect, useState } from 'react';
import { Form, Input, Select, DatePicker } from 'antd';
import type { SelectProps } from 'antd';
import dayjs from 'dayjs';

interface RiwayatBasicFormProps {
  form: any;
  formData: any;
}

const RiwayatBasicForm: React.FC<RiwayatBasicFormProps> = ({ form, formData }) => {
  const [pasienOptions, setPasienOptions] = useState<SelectProps['options']>([]);
  const [nakesOptions, setNakesOptions] = useState<SelectProps['options']>([]);
  const [faskesOptions, setFaskesOptions] = useState<SelectProps['options']>([]);
  const [loadingPasien, setLoadingPasien] = useState(false);
  const [loadingNakes, setLoadingNakes] = useState(false);
  const [loadingFaskes, setLoadingFaskes] = useState(false);

  useEffect(() => {
    // Fetch pasien data
    const fetchPasienData = async () => {
      setLoadingPasien(true);
      try {
        const response = await fetch('/api/riwayat/pasien');
        const result = await response.json();
        
        if (result.success) {
          setPasienOptions(result.data);
        } else {
          console.error('Failed to load pasien data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching pasien data:', error);
      } finally {
        setLoadingPasien(false);
      }
    };

    // Fetch nakes data
    const fetchNakesData = async () => {
      setLoadingNakes(true);
      try {
        const response = await fetch('/api/riwayat/nakes');
        const result = await response.json();
        
        if (result.success) {
          setNakesOptions(result.data);
        } else {
          console.error('Failed to load nakes data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching nakes data:', error);
      } finally {
        setLoadingNakes(false);
      }
    };

    // Fetch faskes data
    const fetchFaskesData = async () => {
      setLoadingFaskes(true);
      try {
        const response = await fetch('/api/riwayat/faskes');
        const result = await response.json();
        
        if (result.success) {
          setFaskesOptions(result.data);
        } else {
          console.error('Failed to load faskes data:', result.message);
        }
      } catch (error) {
        console.error('Error fetching faskes data:', error);
      } finally {
        setLoadingFaskes(false);
      }
    };

    fetchPasienData();
    fetchNakesData();
    fetchFaskesData();
  }, []);

  return (
    <>
      <h2>Data Riwayat Dasar</h2>
      <Form.Item
        name="pasienId"
        label="Pasien"
        rules={[{ required: true, message: 'Mohon pilih pasien!' }]}
      >
        <Select
          placeholder="Pilih pasien"
          options={pasienOptions}
          loading={loadingPasien}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      
      <Form.Item
        name="nakesId"
        label="Tenaga Kesehatan"
        rules={[{ required: true, message: 'Mohon pilih tenaga kesehatan!' }]}
      >
        <Select
          placeholder="Pilih tenaga kesehatan"
          options={nakesOptions}
          loading={loadingNakes}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      
      <Form.Item
        name="faskesId"
        label="Fasilitas Kesehatan"
        rules={[{ required: true, message: 'Mohon pilih fasilitas kesehatan!' }]}
      >
        <Select
          placeholder="Pilih fasilitas kesehatan"
          options={faskesOptions}
          loading={loadingFaskes}
          showSearch
          filterOption={(input, option) =>
            (option?.label as string ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Form.Item>
      
      <Form.Item
        name="createdAt"
        label="Tanggal Pemeriksaan"
        rules={[{ required: true, message: 'Mohon isi tanggal pemeriksaan!' }]}
        initialValue={dayjs()}
      >
        <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
      </Form.Item>
    </>
  );
};

export default RiwayatBasicForm;