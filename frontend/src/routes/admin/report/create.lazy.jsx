import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  ArrowLeft,
  Save,
  X,
  FileText,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { createReport } from "../../../service/report";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/report/create")({
  component: CreateReport,
});

function CreateReport() {
  const navigate = useNavigate();

  const { mutate: create, isPending } = useMutation({
    mutationFn: (request) => createReport(request),
    onSuccess: () => {
      toast.success("Report berhasil disimpan!");
      navigate({ to: "/admin/report" });
    },
    onError: (error) => {
      toast.error(error?.message || "Terjadi kesalahan saat menyimpan report");
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: "",
  });

  const [errors, setErrors] = useState({});

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nama harus diisi";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nama minimal 2 karakter";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Nama maksimal 50 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email harus diisi";
    } else if (formData.email.trim().length > 50) {
      newErrors.email = "Email maksimal 50 karakter";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = "Format email tidak valid";
      }
    }

    if (!formData.text.trim()) {
      newErrors.text = "Teks laporan harus diisi";
    } else if (formData.text.trim().length < 10) {
      newErrors.text = "Teks laporan minimal 10 karakter";
    } else if (formData.text.trim().length > 255) {
      newErrors.text = "Teks laporan maksimal 255 karakter";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // create({
    //   name: formData.name.trim(),
    //   email: formData.email.trim(),
    //   text: formData.text.trim(),
    // });
    create(formData);
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Data yang sudah diisi akan hilang.",
      navigateTo: "/admin/report",
      navigate,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate({ to: "/admin/report" })}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tambah Report Baru
          </h1>
          <p className="text-gray-600">
            Lengkapi form berikut untuk menambahkan report baru 
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Data Report */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Informasi Report
            </h2>

            <div className="grid grid-cols-1 gap-6">
              {/* Nama */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <User className="h-4 w-4 inline mr-1" />
                  Nama <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan nama pelapor"
                  maxLength={50}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.name.length}/50 karakter
                </p>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <Mail className="h-4 w-4 inline mr-1" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan email pelapor"
                  maxLength={50}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.email.length}/50 karakter
                </p>
              </div>

              {/* Text */}
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  <MessageSquare className="h-4 w-4 inline mr-1" />
                  Teks Laporan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="text"
                  name="text"
                  value={formData.text}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                    errors.text ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Masukkan detail laporan..."
                  maxLength={255}
                />
                {errors.text && (
                  <p className="mt-1 text-sm text-red-600">{errors.text}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.text.length}/255 karakter
                </p>
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
              disabled={
                isPending ||
                (!formData.name.trim() ||
                  !formData.email.trim() ||
                  !formData.text.trim())
              }
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
                  Simpan Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
