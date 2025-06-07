import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createStudent } from "../../../service/student";

export const Route = createLazyFileRoute("/admin/student/create")({
  component: CreateStudent,
});

function CreateStudent() {
  const navigate = useNavigate();

  // ✅ Hapus duplicate state - pakai formData saja
  const { mutate: create, isPending } = useMutation({
    mutationFn: (request) => createStudent(request),
    onSuccess: () => {
      toast.success("Data siswa berhasil disimpan!");
      navigate({ to: "/admin/student" });
    },
    onError: (error) => {
      toast.error(error?.message || "Terjadi kesalahan saat menyimpan data");
    },
  });

  // ✅ Konsisten field names dengan API
  const [formData, setFormData] = useState({
    full_name: "", // ✅ Sesuai API
    NIS: "", // ✅ Sesuai API
    class_name: "", // ✅ Sesuai API
    graduation_year: new Date().getFullYear(), // ✅ Sesuai API
  });

  const [errors, setErrors] = useState({});

  // ✅ Update untuk enum backend
  const kelasOptions = [
    { value: "grade_10", label: "Kelas 10" },
    { value: "grade_11", label: "Kelas 11" },
    { value: "grade_12", label: "Kelas 12" },
  ];

  const tahunOptions = [];
  const currentYear = new Date().getFullYear();
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    tahunOptions.push(i);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // ✅ Fix validation field names
  const validateForm = () => {
    const newErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Nama lengkap harus diisi";
    }

    if (!formData.NIS.trim()) {
      newErrors.NIS = "NIS harus diisi";
    } else if (!/^\d+$/.test(formData.NIS)) {
      newErrors.NIS = "NIS harus berupa angka";
    }

    if (!formData.class_name) {
      newErrors.class_name = "Kelas harus dipilih";
    }

    if (!formData.graduation_year) {
      newErrors.graduation_year = "Tahun lulus harus dipilih";
    }

    return newErrors;
  };

  // ✅ Pakai React Query mutation
  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // ✅ Pakai mutation yang sudah ada
    create(formData);
  };

  const handleCancel = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang."
      )
    ) {
      // ✅ Tetap pakai window.location.href yang sudah bekerja
      window.location.href = "/admin/student";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => window.history.back()}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Siswa Baru
          </h1>
          <p className="text-gray-600">
            Lengkapi form berikut untuk menambahkan data siswa baru
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Data Pribadi */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Data Pribadi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama Lengkap */}
              <div>
                <label
                  htmlFor="full_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.full_name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan nama lengkap"
                />
                {errors.full_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.full_name}
                  </p>
                )}
              </div>

              {/* NIS */}
              <div>
                <label
                  htmlFor="NIS"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  NIS <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="NIS"
                  name="NIS"
                  value={formData.NIS}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.NIS ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan NIS"
                />
                {errors.NIS && (
                  <p className="mt-1 text-sm text-red-600">{errors.NIS}</p>
                )}
              </div>

              {/* Kelas */}
              <div>
                <label
                  htmlFor="class_name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Kelas <span className="text-red-500">*</span>
                </label>
                <select
                  id="class_name"
                  name="class_name"
                  value={formData.class_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.class_name ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Pilih Kelas</option>
                  {kelasOptions.map((kelas) => (
                    <option key={kelas.value} value={kelas.value}>
                      {kelas.label}
                    </option>
                  ))}
                </select>
                {errors.class_name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.class_name}
                  </p>
                )}
              </div>

              {/* Tahun Lulus */}
              <div>
                <label
                  htmlFor="graduation_year"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Tahun Lulus <span className="text-red-500">*</span>
                </label>
                <select
                  id="graduation_year"
                  name="graduation_year"
                  value={formData.graduation_year}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.graduation_year
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                >
                  {tahunOptions.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.graduation_year && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.graduation_year}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <X className="h-4 w-4 mr-2" />
              Batal
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isPending}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Simpan Data
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
