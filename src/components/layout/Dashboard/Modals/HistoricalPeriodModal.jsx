import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useHistoricalPeriodsForm } from "@/hooks/Historical/use-historical-form";
import { useRegion } from "@/hooks/Regions/use-regions";
import { TailwindStyle } from "@/utils/Enum";
import { X, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function HistoricalPeriodModal({ historicalPeriod, onClose }) {
  const { form, onSubmit, isLoading } = useHistoricalPeriodsForm();
  const { getAllRegionQuery } = useRegion();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Get regions data
  const regions = getAllRegionQuery.data?.data?.items || [];

  // Handle region toggle
  const handleRegionToggle = (regionId) => {

    const currentValues = form.getValues("CreateRequestRegionIds") || [];
    const newValues = currentValues.includes(regionId)
      ? currentValues.filter((id) => id !== regionId)
      : [...currentValues, regionId];

    // Set value sau khi event handler hoàn thành
    setTimeout(() => {
      form.setValue("CreateRequestRegionIds", newValues);
      // Trigger validation sau khi set value
      form.trigger("CreateRequestRegionIds");
    }, 0);

  };

  

  return (
    <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary-black">
            {historicalPeriod
              ? "Edit Historical Period"
              : "Create New Historical Period"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-primary-black"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-primary-black mb-2">
                Historical Period Name <span className="text-red-500">*</span>
              </label>
              <FormField
                control={form.control}
                name="HistoricalPeriodName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="e.g., Renaissance, Baroque, Impressionism"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-primary-black mb-2">
                Description
              </label>
              <FormField
                control={form.control}
                name="Description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        placeholder="Describe the characteristics and significance of this historical period"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <p className="text-xs text-gray-500 mt-1">
                      Include cultural, historical context that defines this
                      period
                    </p>
                  </FormItem>
                )}
              />
            </div>

            {/* Regions Selection */}
            <div>
              <label className="block text-sm font-medium text-primary-black mb-2">
                Regions <span className="text-red-500">*</span>
              </label>
              <FormField
                control={form.control}
                name="CreateRequestRegionIds"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow text-left flex items-center justify-between"
                        >
                          <span className="text-gray-700">
                            {(field.value || []).length > 0
                              ? `${
                                  (field.value || []).length
                                } region(s) selected`
                              : "Select regions..."}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              isDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {isDropdownOpen && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                            {getAllRegionQuery.isLoading ? (
                              <div className="px-3 py-2 text-gray-500">
                                Loading regions...
                              </div>
                            ) : regions.length === 0 ? (
                              <div className="px-3 py-2 text-gray-500">
                                No regions available
                              </div>
                            ) : (
                              regions.map((region) => (
                                <div
                                  key={region.regionId}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleRegionToggle(region.regionId);
                                  }}
                                  className="px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center justify-between select-none"
                                >
                                  <span className="text-black">
                                    {region.regionName}
                                  </span>
                                  {(field.value || []).includes(
                                    region.regionId
                                  ) && (
                                    <Check className="w-4 h-4 text-primary-yellow" />
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                    {(field.value || []).length > 0 && (
                      <p className="text-md text-gray-500 mt-1">
                        Selected:{" "}
                        {regions
                          .filter((region) =>
                            (field.value || []).includes(region.regionId)
                          )
                          .map((region) => region.regionName)
                          .join(", ")}
                      </p>
                    )}
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-primary-black mb-2">
                  Start Year <span className="text-red-500">*</span>
                </label>
                <FormField
                  control={form.control}
                  name="StartYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="e.g., 1400 BCE, 500 EC"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">
                        Format: number + space + BCE/CE
                      </p>
                    </FormItem>
                  )}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-black mb-2">
                  End Year <span className="text-red-500">*</span>
                </label>
                <FormField
                  control={form.control}
                  name="EndYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <input
                          type="text"
                          placeholder="e.g., 1400 BCE, 500 EC"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                      <p className="text-xs text-gray-500 mt-1">
                        Format: number + space + BCE/CE
                      </p>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg transition-colors"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 transition-colors cursor-pointer ${TailwindStyle.HIGHLIGHT_FRAME}`}
                onClick={(e) => {
                  console.log("Submit button clicked");
                  console.log("Current form state:", form.getValues());
                }}
              >
                {isLoading ? "Saving..." : "Save Historical Period"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
