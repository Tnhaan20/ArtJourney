import { Trash2, Upload } from "lucide-react"


export const CourseModal = ({ course, onClose, onSave }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-primary-black">
          {course ? "Edit Course" : "Create New Course"}
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              Category
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow">
              <option>Fundamentals</option>
              <option>Advanced</option>
              <option>Contemporary</option>
              <option>Traditional</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              Level
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-black mb-2">
              Status
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow">
              <option>Draft</option>
              <option>Published</option>
              <option>Archived</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary-black mb-2">
            Course Thumbnail
          </label>
          <div className="border-2 border-dashed border-primary-yellow border-opacity-50 rounded-lg p-6 text-center hover:border-primary-yellow hover:bg-primary-yellow hover:bg-opacity-5 transition-colors">
            <Upload className="w-8 h-8 text-primary-yellow mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              Click to upload or drag and drop
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
            Save Course
          </button>
        </div>
      </form>
    </div>
  </div>
);
