import { useState } from "react";
import { useListBookings, useUpdateBooking, getListBookingsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Calendar, Phone, User, Clock, CheckCircle, XCircle, Loader2, Filter, Download } from "lucide-react";

function exportToCsv(bookings: Array<{
  id: number;
  name: string;
  phone: string;
  service?: string | null;
  preferredDate?: string | null;
  status: string;
  createdAt: string;
}>) {
  const SERVICE_LABELS_LOCAL: Record<string, string> = {
    aroma: "Аромамасаж усього тіла",
    stone: "Стоун-терапія",
    face: "Релакс масаж обличчя",
    deep: "Глибокий масаж тканин",
  };
  const STATUS_LABELS_LOCAL: Record<string, string> = {
    new: "Нова",
    confirmed: "Підтверджена",
    done: "Виконана",
    cancelled: "Скасована",
  };

  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`;

  const header = ["ID", "Ім'я", "Телефон", "Послуга", "Бажана дата", "Статус", "Дата заявки"];
  const rows = bookings.map((b) => [
    String(b.id),
    b.name,
    b.phone,
    b.service ? (SERVICE_LABELS_LOCAL[b.service] ?? b.service) : "",
    b.preferredDate ?? "",
    STATUS_LABELS_LOCAL[b.status] ?? b.status,
    new Date(b.createdAt).toLocaleDateString("uk-UA"),
  ]);

  const csv = [header, ...rows].map((row) => row.map(escape).join(",")).join("\n");
  const bom = "\uFEFF"; // UTF-8 BOM for correct display in Excel
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `bookings_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const STATUS_LABELS: Record<string, string> = {
  new: "Нова",
  confirmed: "Підтверджена",
  done: "Виконана",
  cancelled: "Скасована",
};

const STATUS_COLORS: Record<string, string> = {
  new: "bg-blue-100 text-blue-800",
  confirmed: "bg-amber-100 text-amber-800",
  done: "bg-green-100 text-green-800",
  cancelled: "bg-gray-100 text-gray-500",
};

const SERVICE_LABELS: Record<string, string> = {
  aroma: "Аромамасаж усього тіла",
  stone: "Стоун-терапія",
  face: "Релакс масаж обличчя",
  deep: "Глибокий масаж тканин",
};

const STATUSES = ["new", "confirmed", "done", "cancelled"] as const;

export default function AdminPage() {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");

  const queryClient = useQueryClient();
  const { data: bookings, isLoading } = useListBookings();
  const updateMutation = useUpdateBooking();

  const handleStatusChange = (id: number, status: string) => {
    updateMutation.mutate(
      { id, data: { status } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListBookingsQueryKey() });
        },
      }
    );
  };

  const filtered = (bookings ?? []).filter((b) => {
    if (filterStatus !== "all" && b.status !== filterStatus) return false;
    if (filterDate && b.preferredDate !== filterDate) return false;
    return true;
  });

  const counts = {
    all: (bookings ?? []).length,
    new: (bookings ?? []).filter((b) => b.status === "new").length,
    confirmed: (bookings ?? []).filter((b) => b.status === "confirmed").length,
    done: (bookings ?? []).filter((b) => b.status === "done").length,
    cancelled: (bookings ?? []).filter((b) => b.status === "cancelled").length,
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF9F6", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <header
        className="border-b px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm"
        style={{ backgroundColor: "#2E2A27", borderColor: "#3a3530" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase tracking-[3px] font-semibold" style={{ color: "#A38A75" }}>
            Relax Studio
          </span>
          <span className="text-white/30">|</span>
          <h1 className="text-white font-light text-lg">Адмін-панель</h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => exportToCsv(bookings ?? [])}
            disabled={!bookings || bookings.length === 0}
            className="flex items-center gap-2 text-sm font-medium px-4 py-2 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: "#A38A75", color: "white" }}
            data-testid="button-export-csv"
          >
            <Download size={14} />
            Експорт CSV
          </button>
          <a
            href="/"
            className="text-sm font-light transition-colors"
            style={{ color: "#A38A75" }}
            data-testid="link-admin-back"
          >
            ← На сайт
          </a>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10" data-testid="section-stats">
          {(["all", "new", "confirmed", "done", "cancelled"] as const).map((key) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              data-testid={`button-filter-${key}`}
              className="rounded-none border px-4 py-5 text-left transition-all duration-200"
              style={{
                backgroundColor: filterStatus === key ? "#2E2A27" : "white",
                borderColor: filterStatus === key ? "#2E2A27" : "#e5e0db",
                color: filterStatus === key ? "white" : "#2E2A27",
              }}
            >
              <div className="text-2xl font-light mb-1">{counts[key]}</div>
              <div className="text-xs uppercase tracking-wider font-medium opacity-70">
                {key === "all" ? "Всього" : STATUS_LABELS[key]}
              </div>
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <div className="flex items-center gap-2">
            <Filter size={16} style={{ color: "#A38A75" }} />
            <span className="text-sm font-medium" style={{ color: "#5C554F" }}>Фільтр за датою:</span>
          </div>
          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-3 py-2 border text-sm focus:outline-none transition-colors"
            style={{ borderColor: "#e5e0db", backgroundColor: "white", color: "#2E2A27" }}
            data-testid="input-filter-date"
          />
          {filterDate && (
            <button
              onClick={() => setFilterDate("")}
              className="text-sm underline"
              style={{ color: "#A38A75" }}
              data-testid="button-clear-date"
            >
              Скинути
            </button>
          )}
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="flex items-center justify-center py-24" data-testid="status-loading">
            <Loader2 size={32} className="animate-spin" style={{ color: "#A38A75" }} />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24" style={{ color: "#5C554F" }} data-testid="status-empty">
            <XCircle size={40} className="mx-auto mb-4 opacity-30" />
            <p className="font-light">Заявок не знайдено</p>
          </div>
        ) : (
          <div className="space-y-3" data-testid="list-bookings">
            {filtered.map((booking) => (
              <div
                key={booking.id}
                className="bg-white border p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 transition-shadow hover:shadow-md"
                style={{ borderColor: "#e5e0db" }}
                data-testid={`card-booking-${booking.id}`}
              >
                {/* ID */}
                <div className="text-xs font-mono opacity-40 md:w-8 shrink-0" style={{ color: "#2E2A27" }}>
                  #{booking.id}
                </div>

                {/* Client info */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="flex items-center gap-2">
                    <User size={14} style={{ color: "#A38A75" }} />
                    <span className="text-sm font-medium" style={{ color: "#2E2A27" }} data-testid={`text-name-${booking.id}`}>
                      {booking.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={14} style={{ color: "#A38A75" }} />
                    <span className="text-sm" style={{ color: "#5C554F" }} data-testid={`text-phone-${booking.id}`}>
                      {booking.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} style={{ color: "#A38A75" }} />
                    <span className="text-sm" style={{ color: "#5C554F" }} data-testid={`text-service-${booking.id}`}>
                      {booking.service ? SERVICE_LABELS[booking.service] ?? booking.service : "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} style={{ color: "#A38A75" }} />
                    <span className="text-sm" style={{ color: "#5C554F" }} data-testid={`text-date-${booking.id}`}>
                      {booking.preferredDate ?? "Не вказана"}
                    </span>
                  </div>
                </div>

                {/* Created at */}
                <div className="flex items-center gap-1 shrink-0" style={{ color: "#A38A75" }}>
                  <Clock size={12} />
                  <span className="text-xs">
                    {new Date(booking.createdAt).toLocaleDateString("uk-UA", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Status badge */}
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full shrink-0 ${STATUS_COLORS[booking.status] ?? "bg-gray-100 text-gray-600"}`}
                  data-testid={`badge-status-${booking.id}`}
                >
                  {STATUS_LABELS[booking.status] ?? booking.status}
                </span>

                {/* Status selector */}
                <select
                  value={booking.status}
                  onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                  disabled={updateMutation.isPending}
                  className="text-sm border px-3 py-2 focus:outline-none shrink-0 transition-colors disabled:opacity-50 cursor-pointer"
                  style={{ borderColor: "#e5e0db", backgroundColor: "white", color: "#2E2A27" }}
                  data-testid={`select-status-${booking.id}`}
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
