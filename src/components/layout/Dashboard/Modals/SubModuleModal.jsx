import { X } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TailwindStyle } from "@/utils/Enum";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSubModuleSchema } from "@/domains/schema/Sub-Module/submodule.schema";
import { useState } from "react";
import { useSubModuleForm } from "@/hooks/SubModule/use-submodule-form";

export const SubModuleModal = ({ moduleId, onClose }) => {

  const { form, onSubmit, isLoading } = useSubModuleForm({ moduleId });

  // Check for moduleId
  if (!moduleId && moduleId !== 0) {
    return (
      <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-600 mb-4">
              No module selected. Please select a module first.
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary-black">
            Create New Sub-Module
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
            {/* Sub-Module Title */}
            <div>
              <label className="block text-sm font-medium text-primary-black mb-2">
                Sub-Module Title <span className="text-red-500">*</span>
              </label>
              <FormField
                control={form.control}
                name="subModuleTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Enter sub-module title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-primary-black mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <textarea
                        placeholder="Enter sub-module description"
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Display Order */}
            <div>
              <label className="block text-sm font-medium text-primary-black mb-2">
                Display Order <span className="text-red-500">*</span>
              </label>
              <FormField
                control={form.control}
                name="displayOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="number"
                        min="1"
                        placeholder="Enter display order"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 1)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Hidden Module ID */}
            <FormField
              control={form.control}
              name="moduleId"
              render={({ field }) => (
                <FormItem className="hidden">
                  <FormControl>
                    <input type="hidden" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Debug Info */}
            <div className="bg-gray-100 p-3 rounded-lg text-xs text-gray-600">
              <strong>Debug Info:</strong> Module ID: {moduleId}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <Button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 transition-colors cursor-pointer ${TailwindStyle.HIGHLIGHT_FRAME} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? "Saving..." : "Save Sub-Module"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};