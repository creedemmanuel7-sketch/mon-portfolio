import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type ToastKind = 'success' | 'error' | 'info'

type Toast = {
  id: number
  message: string
  kind: ToastKind
}

type ToastContextValue = {
  push: (message: string, kind?: ToastKind) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

let toastId = 0

function toneClass(kind: ToastKind): string {
  switch (kind) {
    case 'error':
      return 'border-red-200 bg-red-50 text-red-900'
    case 'info':
      return 'border-indigo/30 bg-indigo text-white'
    case 'success':
      return 'border-emerald-200 bg-emerald-50 text-emerald-950'
    default: {
      const _exhaustive: never = kind
      return _exhaustive
    }
  }
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((message: string, kind: ToastKind = 'success') => {
    const id = ++toastId
    setToasts((prev) => [...prev.slice(-3), { id, message, kind }])
  }, [])

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const value = useMemo(() => ({ push }), [push])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(92vw,22rem)] flex-col gap-2"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDone={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onDone }: { toast: Toast; onDone: () => void }) {
  useEffect(() => {
    const t = window.setTimeout(onDone, 3200)
    return () => window.clearTimeout(t)
  }, [onDone])

  return (
    <div
      className={`pointer-events-auto animate-[sikaToast_0.35s_ease] rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg ${toneClass(toast.kind)}`}
      role="status"
    >
      {toast.message}
    </div>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
