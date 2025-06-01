import { X } from "lucide-react";

export const HistoricalPeriodModal = ({ historicalPeriod, onClose, onSave }) => (
  <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary-black">
          {historicalPeriod ? "Edit Historical Period" : "Create New Historical Period"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-primary-black"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary-black mb-2">
            Historical Period Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Renaissance, Baroque, Impressionism"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            defaultValue={historicalPeriod?.historical_period_name || ""}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-black mb-2">
            Description
          </label>
          <textarea
            placeholder="Describe the characteristics and significance of this historical period"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            defaultValue={historicalPeriod?.description || ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              Start Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 1400, 500 BCE"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
              defaultValue={historicalPeriod?.start_year || ""}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use BCE/CE format if needed
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              End Year <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., 1600, Present"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
              defaultValue={historicalPeriod?.end_year || ""}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Use "Present" for ongoing periods
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-4 py-2 bg-primary-yellow text-primary-black rounded-lg hover:bg-secondary-yellow transition-colors"
          >
            Save Historical Period
          </button>
        </div>
      </form>
    </div>
  </div>
);