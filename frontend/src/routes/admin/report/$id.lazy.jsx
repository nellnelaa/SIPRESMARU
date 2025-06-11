import { createLazyFileRoute } from "@tanstack/react-router";
import React from "react";
import {
  ArrowLeft,
  Edit,
  Calendar,
  Mail,
  User,
  FileText,
  Trash2,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getReportById, deleteReport } from "../../../service/report";
import { toast } from "react-toastify";
import ConfirmationDialog from "../../../components/CancelConfirmation";

export const Route = createLazyFileRoute("/admin/report/$id")({
  component: ReportDetailPage,
});

function ReportDetailPage() {
  const { id } = Route.useParams();
  const navigate = Route.useNavigate(); 
  const queryClient = useQueryClient();

  const { mutate: deleting, isPending: isDeleteProcessing } = useMutation({
    mutationFn: (reportId) => deleteReport(reportId),
    onSuccess: () => {
      toast.success("Report berhasil dihapus.");
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      navigate({ to: "/admin/report" });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const {
    data: report,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["report", id],
    queryFn: () => getReportById(id),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    );
  }

  const handleDelete = (reportId, reportName) => {
    ConfirmationDialog.showWithAction({
      title: "Konfirmasi Hapus",
      message: `Apakah Anda yakin ingin menghapus report dari "${reportName}"?`,
      onConfirm: () => deleting(reportId),
      confirmLabel: "Ya, Hapus",
    });
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Error Loading Report
            </h2>
            <p className="text-gray-600">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Report Not Found
            </h2>
            <p className="text-gray-600">
              Report yang Anda cari tidak ditemukan
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <a
              href="/admin/report"
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Kembali
            </a>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            Detail Report
          </h1>
          <p className="text-gray-600">Informasi lengkap laporan</p>
        </div>

        {/* Report Detail Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Informasi Pelapor */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                  Informasi Pelapor
                </h3>

                <div className="flex items-start space-x-3">
                  <User className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Nama
                    </label>
                    <p className="text-gray-900 font-medium">
                      {report.name || "Tidak ada nama"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p className="text-gray-900 font-medium">{report.email}</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Tanggal Laporan
                    </label>
                    <p className="text-gray-900 font-medium">
                      {new Date(report.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Status/Info Tambahan */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
                  Informasi Tambahan
                </h3>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FileText className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-blue-800">
                        Report ID
                      </p>
                      <p className="text-sm text-blue-600">#{report.id}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Isi Laporan */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
                Isi Laporan
              </h3>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {report.text}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href={`/admin/report/edit/${report.id}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Report
              </a>
              <button
                onClick={() =>
                  handleDelete(report.id, report.name || "Report Tanpa Nama")
                }
                disabled={isDeleteProcessing}
                className="inline-flex items-center justify-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                title="Hapus"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                {isDeleteProcessing ? "Menghapus..." : "Hapus Report"}
              </button>
              <a
                href="/admin/report"
                className="inline-flex items-center justify-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Daftar
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
