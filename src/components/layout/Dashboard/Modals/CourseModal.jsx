import { Trash2, Upload, X, Plus } from "lucide-react";

export const CourseModal = ({
  course,
  onClose,
  onSave,
  historicalPeriods = [],
  regions = [],
  onCreateHistoricalPeriod,
  onCreateRegion,
}) => (
  <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary-black">
          {course ? "Edit Course" : "Create New Course"}
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
            Course Title
          </label>
          <input
            type="text"
            placeholder="Enter course title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            defaultValue={course?.title || ""}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-black mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter course description"
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            defaultValue={course?.description || ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-primary-black">
                Historical Period
              </label>
              <button
                type="button"
                onClick={onCreateHistoricalPeriod}
                className="text-primary-yellow hover:text-secondary-yellow text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
              defaultValue={course?.historical_period_id || ""}
            >
              <option value="">Select Historical Period</option>
              {historicalPeriods.map((period) => (
                <option
                  key={period.historical_period_id}
                  value={period.historical_period_id}
                >
                  {period.historical_period_name} ({period.start_year} -{" "}
                  {period.end_year})
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-primary-black">
                Region
              </label>
              <button
                type="button"
                onClick={onCreateRegion}
                className="text-primary-yellow hover:text-secondary-yellow text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            </div>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
              defaultValue={course?.region_id || ""}
            >
              <option value="">Select Region</option>
              {regions.map((region) => (
                <option key={region.region_id} value={region.region_id}>
                  {region.region_name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              Level
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
              defaultValue={course?.level || ""}
            >
              <option value="">Select Level</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              Status
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
              defaultValue={course?.status || ""}
            >
              <option value="">Select Status</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-black mb-2">
            Course Thumbnail
          </label>
          <div className="border-2 border-dashed border-primary-yellow border-opacity-50 rounded-lg p-6 text-center hover:border-primary-yellow hover:bg-primary-yellow hover:bg-opacity-5 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-primary-yellow mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, WebP up to 10MB
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
            Save Course
          </button>
        </div>
      </form>
    </div>
  </div>
);
