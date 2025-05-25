export const SettingsTab = () => (
  <div className="space-y-6">
    <h3 className="text-lg font-semibold text-gray-900">Settings</h3>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-900 mb-4">Platform Settings</h4>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-700">User Registration</span>
            <button className="w-12 h-6 bg-purple-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Email Notifications</span>
            <button className="w-12 h-6 bg-purple-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-700">Public Gallery</span>
            <button className="w-12 h-6 bg-gray-300 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute left-1 top-1"></div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h4 className="font-semibold text-gray-900 mb-4">Security</h4>
        <div className="space-y-4">
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="font-medium text-gray-900">
              Two-Factor Authentication
            </div>
            <div className="text-sm text-gray-600">
              Enhance account security
            </div>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="font-medium text-gray-900">API Keys</div>
            <div className="text-sm text-gray-600">Manage integration keys</div>
          </button>
          <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="font-medium text-gray-900">Backup & Export</div>
            <div className="text-sm text-gray-600">Download platform data</div>
          </button>
        </div>
      </div>
    </div>
  </div>
);
