import { Trash2, Video, X } from "lucide-react";
import { useModuleForm } from "@/hooks/Module/use-module-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TailwindStyle } from "@/utils/Enum";

export const ModuleModal = ({ courseId, onClose }) => {
  
  const { form, onSubmit, isLoading } = useModuleForm({
    courseId,
  });


  return (
    <div className="fixed inset-0 bg-[#1b1919b9] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary-black">
            Create New Module
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
            {/* Module Title */}
            <div>
              <label className="block text-sm font-medium text-primary-black mb-2">
                Module Title <span className="text-red-500">*</span>
              </label>
              <FormField
                control={form.control}
                name="moduleTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        placeholder="Enter module title"
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
                        placeholder="Enter module description"
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

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-1 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <Button
                type="submit"
                disabled={isLoading}
                className={`px-4 transition-colors cursor-pointer ${TailwindStyle.HIGHLIGHT_FRAME} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? "Saving..." : "Save Module"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};
