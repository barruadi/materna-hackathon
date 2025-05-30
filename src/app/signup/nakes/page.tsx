"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Layout,
  Space,
  Card,
  Divider,
  SelectProps,
  
} from 'antd';
import { CalendarOutlined, IdcardOutlined, MedicineBoxOutlined, PhoneOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

import { api } from "~/trpc/react";

export default function SignupPage() {

  const [form] = Form.useForm();
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const Router = useRouter();

  const createNakesMutation = api.nakes.createNakes.useMutation();
  const handleSignup = async (values: any) => {
    setLoadingSubmit(true);
    try {
      const response = await createNakesMutation.mutateAsync({
        email: values.email,
        password: values.password,
        nama: values.nama,
        nip: Number(values.nip),
        kontak: Number(values.kontak),
        faskesId: values.faskesId,
      });
      alert("Pendaftaran berhasil!");
      Router.push("/login?type=nakes");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  const [faskesOptions, setFaskesOptions] = useState<SelectProps['options']>([]);
  const [loadingFaskes, setLoadingFaskes] = useState(false);

  useEffect (() => {
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

    fetchFaskesData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-2">
      <h1 className="text-2xl font-bold mt-4">Sign Up</h1>
      <Form
            form={form}
            layout="vertical"
            initialValues={{ variant: 'filled' }}
            onFinish={handleSignup}
            requiredMark="optional"
            className="max-w-[1100px] mx-auto"
          >
            <Divider orientation="center">
              <h1 className="text-black font-bold">Informasi Tenaga Kesehatan</h1>
            </Divider>
            
            <div className="grid grid-cols-1 gap-4">
            <Form.Item 
              label="email" 
              name="email" 
              style={{ marginBottom: 3 }}
              rules={[
                { required: true, message: 'Harap masukkan email!' },
                { type: 'email', message: 'Format email tidak valid!' }
              ]}
            >
              <Input placeholder="Masukkan email" />
            </Form.Item>

            <Form.Item 
              label="password" 
              name="password" 
              style={{ marginBottom: 3 }}
              rules={[
                { required: true, message: 'Harap masukkan password!' },
                { min: 6, message: 'Password minimal 6 karakter' }
              ]}
            >
              <Input.Password placeholder="Masukkan password" />
            </Form.Item>

              <Form.Item 
                label="nama" 
                name="nama" 
                style={{ marginBottom: 3 }}
                rules={[{ required: true, message: 'Harap masukkan nama lengkap!' }]}
                tooltip="Nama lengkap sesuai dengan KTP/KK"
              >
                <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Masukkan nama lengkap" />
              </Form.Item>
              
              <Form.Item 
                label="nip" 
                name="nip" 
                style={{ marginBottom: 3 }}
                rules={[
                  { required: true, message: 'Harap masukkan NIP!' },
                  { pattern: /^\d{16}$/, message: 'NIP harus 16 digit!' }
                ]}
                tooltip="Nomor Induk Penduduk 16 digit"
              >
                <Input prefix={<IdcardOutlined className="text-gray-400" />} placeholder="Masukkan 16 digit NIP" maxLength={16} />
              </Form.Item>
              <Form.Item 
                label="kontak" 
                name="kontak"
                rules={[
                  { required: true, message: 'Harap masukkan nomor telepon!' },
                  { pattern: /^[0-9]+$/, message: 'Hanya boleh berisi angka!' }
                ]}
                tooltip="Nomor telepon aktif yang dapat dihubungi"
              >
                <Input 
                  prefix={<PhoneOutlined className="text-gray-400" />} 
                  placeholder="Contoh: 081234567890" 
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
            </div>
            
            <Form.Item className="mt-8 text-center">
            <button type="submit" className="bg-[#FFF9C2] px-20 py-2 text-black rounded-xl font-bold">
                    Daftar
                  </button>
        
            </Form.Item>
          </Form>
    </div>
  );
}

function setLoadingFaskes(arg0: boolean) {
  throw new Error("Function not implemented.");
}
