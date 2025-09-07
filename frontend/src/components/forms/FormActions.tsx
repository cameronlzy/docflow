"use client"

interface FormActionsProps {
  isCreating: boolean
  canSubmit: boolean
  onCancel: () => void
  onSubmit: () => void
  filesCount: number
  hasTitle: boolean
  hasDescription: boolean
}

export function FormActions({
  isCreating,
  canSubmit,
  onCancel,
  onSubmit,
  filesCount,
  hasTitle,
  hasDescription,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-between pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-300 font-medium rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
      >
        Cancel
      </button>

      <div className="flex items-center space-x-4">
        {/* Progress Indicator */}
        <div className="text-sm text-gray-400">
          {canSubmit ? "Ready to create" : "Fill in all fields"}
        </div>

        <button
          type="submit"
          disabled={!canSubmit || isCreating}
          onClick={onSubmit}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-700 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:opacity-50"
        >
          {isCreating ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating Project...</span>
            </div>
          ) : (
            "Create Project"
          )}
        </button>
      </div>
    </div>
  )
}
