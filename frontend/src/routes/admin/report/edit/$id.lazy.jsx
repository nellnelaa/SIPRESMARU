import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
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
import { useMutation, useQuery } from "@tanstack/react-query";
import { getReportById, updateReport } from "../../../../service/report";
import ConfirmationDialog from "../../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/report/edit/$id")({
  component: EditReport,
});

function EditReport() {
  const navigate = useNavigate();
  const { id } = Route.useParams();

  const {
    data: report,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["report", id],
    queryFn: () => getReportById(id),
    enabled: !!id,
  });

  const { mutate: update, isPending } = useMutation({
    mutationFn: (request) => updateReport(id, request),
    onSuccess: () => {
      toast.success("Report berhasil diperbarui!");
      navigate({ to: "/admin/report" });
    },
    onError: (error) => {
      toast.error(
        error?.message || "Terjadi kesalahan saat memperbarui report"
      );
    },
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    text: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (report) {
      setFormData({
        name: report.name || "",
        email: report.email || "",
        text: report.text || "",
      });
    }
  }, [report]);

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

    // update({
    //   name: formData.name.trim(),
    //   email: formData.email.trim(),
    //   text: formData.text.trim(),
    // });
    update(formData);
  };

  const handleCancel = () => {
    ConfirmationDialog.showWithNavigation({
      title: "Konfirmasi Batal",
      message:
        "Apakah Anda yakin ingin membatalkan? Perubahan yang sudah dibuat akan hilang.",
      navigateTo: "/admin/report",
      navigate,
    });
  };

  const isFormValid =
    formData.name.trim() && formData.email.trim() && formData.text.trim();
  const hasChanges =
    report &&
    (formData.name !== report.name ||
      formData.email !== report.email ||
      formData.text !== report.text);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat data report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <X className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Gagal Memuat Data
          </h2>
          <p className="text-red-600 mb-4">
            {error?.message || "Gagal memuat data report"}
          </p>
          <div className="space-x-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Coba Lagi
            </button>
            <button
              onClick={() => navigate({ to: "/admin/report" })}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Report Tidak Ditemukan
          </h2>
          <p className="text-gray-600 mb-4">
            Report dengan ID tersebut tidak ditemukan dalam sistem
          </p>
          <button
            onClick={() => navigate({ to: "/admin/report" })}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Kembali ke Daftar Report
          </button>
        </div>
      </div>
    );
  }

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Edit Report</h1>
              <p className="text-gray-600">
                Perbarui informasi report pada form berikut
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">ID: #{report.id}</p>
              {report.created_at && (
                <p className="text-sm text-gray-500">
                  Dibuat:{" "}
                  {new Date(report.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
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
                  maxLength={255}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.name.length}/255 karakter
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
                  maxLength={255}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  {formData.email.length}/255 karakter
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
              disabled={isPending || !isFormValid || !hasChanges}
              className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              {isPending ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Memperbarui...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Perbarui Report
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
