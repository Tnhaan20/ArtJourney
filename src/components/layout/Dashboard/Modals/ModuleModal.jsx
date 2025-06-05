import { Trash2, Video } from "lucide-react";

export const ModuleModal = ({ module, courseId, onClose, onSave }) => (
  <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary-black">
          {module ? "Edit Module" : "Create New Module"}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-primary-black"
        >
          <Trash2 className="w-6 h-6" />
        </button>
      </div>

      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-primary-black mb-2">
            Module Title
          </label>
          <input
            type="text"
            placeholder="Enter module title"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
            defaultValue={module?.title || ""}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              Type
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow">
              <option>video</option>
              <option>interactive</option>
              <option>assignment</option>
              <option>quiz</option>
              <option>reading</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              Duration
            </label>
            <input
              type="text"
              placeholder="e.g., 45 min"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
              defaultValue={module?.duration || ""}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-black mb-2">
            Content
          </label>
          <div className="border-2 border-dashed border-primary-yellow border-opacity-50 rounded-lg p-6 text-center hover:border-primary-yellow hover:bg-primary-yellow hover:bg-opacity-5 transition-colors">
            <Video className="w-8 h-8 text-primary-yellow mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Upload video, documents, or interactive content
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="px-4 py-2 bg-primary-yellow text-primary-black rounded-lg hover:bg-secondary-yellow"
          >
            Save Module
          </button>
        </div>
      </form>
    </div>
  </div>
);
