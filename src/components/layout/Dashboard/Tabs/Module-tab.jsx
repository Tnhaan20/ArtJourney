import {
  Filter,
  Plus,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Video,
  PlayCircle,
  FileText,
  Clock,
  BookOpen,
  Users,
  Star,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Brain,
  HelpCircle,
} from "lucide-react";
import { StatCard } from "@/components/layout/Dashboard/Stat-card";
import { TailwindStyle } from "@/utils/Enum";
import { useModule } from "@/hooks/Module/use-module";
import { useSubModule } from "@/hooks/SubModule/use-submodule";
import { useLearning } from "@/hooks/LearningContent/use-learning";
import { useState, useMemo } from "react";

export const ModuleTab = ({
  courseId,
  courseTitle = "Course",
  expandedModules,
  setExpandedModules,
  setShowSubModuleModal,
  setSelectedModuleId,
  setShowModuleModal,
  setSelectedCourseId,
  setShowCombineModal = () => {},
  setSelectedSubModuleId,
  setSelectedLearningContentId = () => {},
  setShowQuizModal = () => {}, // Make sure this is properly received
  onBackToCourses,
}) => {
  // All hooks at the top level
  const { getModuleQuery } = useModule();
  const { getSubModuleQuery } = useSubModule();
  const { getLearningContext } = useLearning();

  // State hooks
  const [expandedSubModules, setExpandedSubModules] = useState(new Set());

  // Main data query
  const {
    data: moduleResponse,
    isLoading: isModuleLoading,
    error: isModuleError,
  } = getModuleQuery(courseId);

  // Simple data extraction
  const modules = useMemo(() => {
    return moduleResponse?.data || [];
  }, [moduleResponse]);

  const safeExpandedModules = useMemo(() => {
    return expandedModules || new Set();
  }, [expandedModules]);

  // Loading and error states
  if (isModuleLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading modules...</div>
        </div>
      </div>
    );
  }

  if (isModuleError) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-red-600">Error loading modules</div>
          <p className="text-sm text-gray-500 mt-2">{isModuleError.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {onBackToCourses && (
            <button
              onClick={onBackToCourses}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Module Management
            </h3>
            <p className="text-sm text-gray-600">Course: {courseTitle}</p>
          </div>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
          <button
            onClick={() => {
              if (setSelectedCourseId) setSelectedCourseId(courseId);
              if (setShowModuleModal) setShowModuleModal(true);
            }}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl ${TailwindStyle.HIGHLIGHT_FRAME}`}
          >
            <Plus className="w-4 h-4" />
            <span>Add Module</span>
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Modules"
          value={modules.length.toString()}
          change={0}
          icon={BookOpen}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Sub-Modules"
          value="0"
          change={0}
          icon={FileText}
          color="bg-green-500"
        />
        <StatCard
          title="Learning Contexts"
          value="0"
          change={0}
          icon={Brain}
          color="bg-indigo-500"
        />
        <StatCard
          title="Active Sub-Modules"
          value="0"
          change={0}
          icon={CheckCircle}
          color="bg-emerald-500"
        />
      </div>

      {/* Modules List */}
      <div className="space-y-4">
        {modules && modules.length > 0 ? (
          modules.map((module, index) => (
            <ModuleCard
              key={module.moduleId}
              module={module}
              index={index}
              courseId={courseId}
              isExpanded={safeExpandedModules.has(module.moduleId)}
              onToggleExpanded={() => {
                const newExpanded = new Set(safeExpandedModules);
                if (safeExpandedModules.has(module.moduleId)) {
                  newExpanded.delete(module.moduleId);
                } else {
                  newExpanded.add(module.moduleId);
                }
                if (setExpandedModules) setExpandedModules(newExpanded);
              }}
              expandedSubModules={expandedSubModules}
              setExpandedSubModules={setExpandedSubModules}
              setSelectedModuleId={setSelectedModuleId}
              setShowSubModuleModal={setShowSubModuleModal}
              setSelectedSubModuleId={setSelectedSubModuleId}
              setSelectedCourseId={setSelectedCourseId}
              setShowCombineModal={setShowCombineModal}
              setSelectedLearningContentId={setSelectedLearningContentId}
              setShowQuizModal={setShowQuizModal} // Pass it down
              getSubModuleQuery={getSubModuleQuery}
              getLearningContext={getLearningContext}
            />
          ))
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-500 text-lg mb-4">
              No modules available for this course yet.
            </div>

            <button
              onClick={() => {
                if (setSelectedCourseId) setSelectedCourseId(courseId);
                if (setShowModuleModal) setShowModuleModal(true);
              }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl mx-auto ${TailwindStyle.HIGHLIGHT_FRAME}`}
            >
              <Plus className="w-4 h-4" />
              <span>Create Your First Module</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ModuleCard component
const ModuleCard = ({
  module,
  index,
  courseId,
  isExpanded,
  onToggleExpanded,
  expandedSubModules,
  setExpandedSubModules,
  setSelectedModuleId,
  setShowSubModuleModal,
  setSelectedSubModuleId,
  setSelectedCourseId,
  setShowCombineModal = () => {},
  setSelectedLearningContentId = () => {},
  setShowQuizModal = () => {}, // Make sure this is received
  getSubModuleQuery,
  getLearningContext,
}) => {
  // Hook calls in separate component - always same number
  const subModuleQuery = getSubModuleQuery(module.moduleId);
  const {
    data: subModuleResponse,
    isLoading: isSubModuleLoading,
    error: subModuleError,
  } = subModuleQuery;

  // Extract sub-modules
  const moduleSubModules = useMemo(() => {
    if (
      subModuleResponse?.status === 0 &&
      subModuleResponse?.data &&
      Array.isArray(subModuleResponse.data)
    ) {
      return subModuleResponse.data.sort(
        (a, b) => (a.displayOrder || 0) - (b.displayOrder || 0)
      );
    }
    return [];
  }, [subModuleResponse]);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      {/* Module content */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center">
            <div className="text-white font-bold text-lg">{index + 1}</div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-lg font-semibold text-gray-900">
                {module.moduleTitle}
              </h4>
              <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                {moduleSubModules.length} Sub-Modules
              </span>
            </div>
            <p className="text-gray-600 mb-2 line-clamp-2">
              {module.description}
            </p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>
                Created: {new Date(module.createdAt).toLocaleDateString()}
              </span>
              {module.createdBy && (
                <>
                  <span>•</span>
                  <span>Created by: {module.createdBy}</span>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleExpanded}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            {isExpanded ? (
              <ChevronDown className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Edit className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Module Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {moduleSubModules.length}
          </div>
          <div className="text-sm text-gray-600">Sub-Modules</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">
            {moduleSubModules.filter((sm) => sm.isActive).length}
          </div>
          <div className="text-sm text-gray-600">Active</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-600">Learning Contexts</div>
        </div>
      </div>

      {/* Expanded Module Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h5 className="font-semibold text-gray-900">
              Sub-Modules ({moduleSubModules.length})
              {isSubModuleLoading && (
                <span className="ml-2 text-sm text-gray-500">Loading...</span>
              )}
            </h5>
            <button
              onClick={() => {
                if (setSelectedModuleId) setSelectedModuleId(module.moduleId);
                if (setShowSubModuleModal) setShowSubModuleModal(true);
              }}
              className={`flex items-center space-x-2 px-3 py-1 text-sm rounded-md cursor-pointer ${TailwindStyle.HIGHLIGHT_FRAME}`}
            >
              <Plus className="w-3 h-3" />
              <span>Add Sub-Module</span>
            </button>
          </div>

          {/* Sub-Modules List */}
          {isSubModuleLoading ? (
            <div className="text-center py-8 text-gray-500">
              <div className="text-lg">Loading sub-modules...</div>
            </div>
          ) : subModuleError ? (
            <div className="text-center py-8 text-red-500">
              <div className="text-lg">Error loading sub-modules</div>
              <p className="text-sm mt-2">{subModuleError.message}</p>
            </div>
          ) : moduleSubModules.length > 0 ? (
            <div className="space-y-3">
              <div className="text-xs text-gray-500 mb-2">
                Ordered by Display Order
              </div>
              {moduleSubModules.map((subModule) => (
                <SubModuleCard
                  key={subModule.subModuleId}
                  subModule={subModule}
                  courseId={courseId}
                  isExpanded={expandedSubModules.has(subModule.subModuleId)}
                  onToggleExpanded={() => {
                    const newExpanded = new Set(expandedSubModules);
                    if (expandedSubModules.has(subModule.subModuleId)) {
                      newExpanded.delete(subModule.subModuleId);
                    } else {
                      newExpanded.add(subModule.subModuleId);
                    }
                    setExpandedSubModules(newExpanded);
                  }}
                  setSelectedSubModuleId={setSelectedSubModuleId}
                  setSelectedCourseId={setSelectedCourseId}
                  setShowCombineModal={setShowCombineModal}
                  setSelectedLearningContentId={setSelectedLearningContentId}
                  setShowQuizModal={setShowQuizModal} // Pass it down
                  getLearningContext={getLearningContext}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No sub-modules yet</p>
              <p className="text-sm">
                Add sub-modules to organize learning content within this module
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// SubModuleCard component with improved key generation
const SubModuleCard = ({
  subModule,
  courseId,
  isExpanded,
  onToggleExpanded,
  setSelectedSubModuleId,
  setSelectedCourseId,
  setShowCombineModal = () => {},
  setSelectedLearningContentId = () => {},
  setShowQuizModal = () => {},
  getLearningContext,
}) => {
  // Hook calls in separate component - always same number
  const learningContextQuery = getLearningContext
    ? getLearningContext(subModule.subModuleId)
    : null;
  const { data: learningContextResponse } = learningContextQuery || {};

  // Extract learning contexts with better validation and filtering
  const learningContexts = useMemo(() => {
    if (
      learningContextResponse?.status === 0 &&
      learningContextResponse?.data &&
      Array.isArray(learningContextResponse.data)
    ) {
      return learningContextResponse.data
        .filter((context) => {
          // More strict validation
          return (
            context &&
            typeof context === "object" &&
            (context.learningContextId ||
              context.learningContentId ||
              context.id)
          );
        })
        .map((context, fallbackIndex) => ({
          ...context,
          // Ensure we have some form of unique identifier
          uniqueId:
            context.learningContextId ||
            context.learningContentId ||
            context.id ||
            `fallback-${subModule.subModuleId}-${fallbackIndex}`,
        }))
        .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    }
    return [];
  }, [learningContextResponse, subModule.subModuleId]);

  return (
    <div className="space-y-2">
      {/* Sub-Module Card */}
      <div
        className={`bg-white border rounded-lg p-4 ${
          subModule.isActive
            ? "border-gray-200 bg-white"
            : "border-gray-300 bg-gray-50 opacity-75"
        }`}
      >
        <div className="flex items-start justify-between">
          <div className="flex space-x-3">
            <div
              className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                subModule.isActive
                  ? "bg-gradient-to-br from-green-400 to-blue-500"
                  : "bg-gray-400"
              }`}
            >
              <div className="text-white font-bold text-sm">
                {subModule.displayOrder || 0}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h6 className="font-medium text-gray-900">
                  {subModule.subModuleTitle}
                </h6>
                <span
                  className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-full ${
                    subModule.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {subModule.isActive ? (
                    <>
                      <CheckCircle className="w-3 h-3" />
                      <span>Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-3 h-3" />
                      <span>Inactive</span>
                    </>
                  )}
                </span>
                <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
                  {learningContexts.length} Learning Contexts
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">
                {subModule.description}
              </p>
              <div className="flex items-center space-x-3 text-xs text-gray-500">
                <span>
                  Created: {new Date(subModule.createdAt).toLocaleDateString()}
                </span>
                <span>•</span>
                <span>By: {subModule.createdBy}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            {/* Add Content Button - Opens CombineModal */}
            <button
              onClick={() => {
                if (setSelectedSubModuleId)
                  setSelectedSubModuleId(subModule.subModuleId);
                if (setSelectedCourseId) setSelectedCourseId(courseId);
                if (setSelectedLearningContentId)
                  setSelectedLearningContentId(null);
                if (setShowCombineModal) setShowCombineModal(true);
              }}
              className="p-1 text-gray-400 hover:text-indigo-600 rounded transition-colors"
              title="Add Learning Content or Quiz"
            >
              <Brain className="w-3 h-3" />
            </button>
            {/* Expand/Collapse Button */}
            <button
              onClick={onToggleExpanded}
              className="p-1 text-gray-400 hover:text-gray-600"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
            <button className="p-1 text-gray-400 hover:text-gray-600">
              <Edit className="w-3 h-3" />
            </button>
            <button className="p-1 text-gray-400 hover:text-red-600">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Learning Contexts List (when expanded) */}
      {isExpanded && (
        <div className="ml-8 space-y-2">
          {learningContexts.length > 0 ? (
            learningContexts.map((context, index) => {
              // Generate truly unique key using multiple fallbacks
              const generateUniqueKey = () => {
                if (
                  context.learningContextId &&
                  context.learningContextId !== "undefined"
                ) {
                  return `context-${context.learningContextId}`;
                }
                if (
                  context.learningContentId &&
                  context.learningContentId !== "undefined"
                ) {
                  return `content-${context.learningContentId}`;
                }
                if (context.id && context.id !== "undefined") {
                  return `id-${context.id}`;
                }
                if (context.uniqueId && context.uniqueId !== "undefined") {
                  return `unique-${context.uniqueId}`;
                }
                // Final fallback with timestamp to ensure uniqueness
                return `fallback-${
                  subModule.subModuleId
                }-${index}-${Date.now()}-${Math.random()}`;
              };

              const uniqueKey = generateUniqueKey();

              // Debug log to check for duplicates
              console.log(`Generated key: ${uniqueKey} for context:`, {
                learningContextId: context.learningContextId,
                learningContentId: context.learningContentId,
                id: context.id,
                title: context.title,
                index,
              });

              return (
                <div
                  key={uniqueKey}
                  className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-indigo-400 to-purple-500 rounded flex items-center justify-center">
                        <div className="text-white font-bold text-xs">
                          {context.displayOrder || index + 1}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h6 className="font-medium text-gray-900 text-sm">
                            {context.title || "Untitled Content"}
                          </h6>
                          {context.video && (
                            <span className="inline-flex items-center space-x-1 px-1 py-0.5 text-xs font-medium rounded bg-purple-100 text-purple-800">
                              <Video className="w-2 h-2" />
                              <span>Video</span>
                            </span>
                          )}
                          {context.timeLimit && (
                            <span className="inline-flex items-center space-x-1 px-1 py-0.5 text-xs font-medium rounded bg-orange-100 text-orange-800">
                              <Clock className="w-2 h-2" />
                              <span>Timed</span>
                            </span>
                          )}
                          {/* Show Quiz badge if contentType is 2 */}
                          {context.contentType === 2 && (
                            <span className="inline-flex items-center space-x-1 px-1 py-0.5 text-xs font-medium rounded bg-green-100 text-green-800">
                              <HelpCircle className="w-2 h-2" />
                              <span>Quiz</span>
                            </span>
                          )}
                        </div>
                        {context.content && (
                          <p className="text-xs text-gray-600 mb-1">
                            {context.content.substring(0, 100)}
                            {context.content.length > 100 && "..."}
                          </p>
                        )}
                        {/* Debug info - remove in production */}
                        <p className="text-xs text-blue-600 bg-blue-50 p-1 rounded mt-1">
                          ID:{" "}
                          {context.learningContextId ||
                            context.learningContentId ||
                            context.id ||
                            "No ID"}{" "}
                          | Type: {context.contentType || "Unknown"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {/* Show Add Quiz Questions button only if contentType is 2 and has valid ID */}
                      {context.contentType === 2 &&
                        (context.learningContextId ||
                          context.learningContentId) && (
                          <button
                            onClick={() => {
                              const validId =
                                context.learningContextId ||
                                context.learningContentId;
                              console.log("=== QUIZ BUTTON CLICKED ===");
                              console.log("Learning context:", context);
                              console.log("Valid ID found:", validId);
                              console.log("Content type:", context.contentType);
                              console.log("Available setters:", {
                                setSelectedLearningContentId:
                                  typeof setSelectedLearningContentId,
                                setShowQuizModal: typeof setShowQuizModal,
                              });

                              if (setSelectedLearningContentId && validId) {
                                setSelectedLearningContentId(validId);
                                console.log(
                                  "✅ Set learning content ID to:",
                                  validId
                                );
                              } else {
                                console.error(
                                  "❌ Cannot set learning content ID - missing setter or ID"
                                );
                              }

                              if (setShowQuizModal) {
                                setShowQuizModal(true);
                                console.log("✅ Opening QuizModal");
                              } else {
                                console.error(
                                  "❌ Cannot open QuizModal - missing setter"
                                );
                              }
                            }}
                            className="p-1 text-green-600 hover:text-green-800 rounded transition-colors bg-green-50 hover:bg-green-100"
                            title="Add Quiz Questions"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        )}
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit className="w-2 h-2" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 className="w-2 h-2" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-gray-500">
              <Brain className="w-8 h-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm">No learning contexts yet</p>
              <button
                onClick={() => {
                  if (setSelectedSubModuleId)
                    setSelectedSubModuleId(subModule.subModuleId);
                  if (setSelectedCourseId) setSelectedCourseId(courseId);
                  if (setSelectedLearningContentId)
                    setSelectedLearningContentId(null);
                  if (setShowCombineModal) setShowCombineModal(true);
                }}
                className={`inline-flex items-center space-x-1 px-2 py-1 mt-2 text-xs rounded ${TailwindStyle.HIGHLIGHT_FRAME}`}
              >
                <Plus className="w-2 h-2" />
                <span>Add Learning Content</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
