import { X } from "lucide-react";

export const RegionModal = ({ region, onClose, onSave }) => (
  <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary-black">
          {region ? "Edit Region" : "Create New Region"}
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
            Region Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Western Europe, East Asia, Ancient Greece"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            defaultValue={region?.region_name || ""}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-black mb-2">
            Description
          </label>
          <textarea
            placeholder="Describe the geographical and cultural characteristics of this region"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            defaultValue={region?.description || ""}
          />
          <p className="text-xs text-gray-500 mt-1">
            Include cultural, geographical, or historical context that defines this region
          </p>
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
            Save Region
          </button>
        </div>
      </form>
    </div>
  </div>
);