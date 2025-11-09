import { useState, useEffect } from 'react'
import { Download, X } from 'lucide-react'

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

export const InstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Verificar si ya fue descartado en esta sesión
    const wasDismissed = sessionStorage.getItem('pwa-install-dismissed')
    if (wasDismissed) {
      setDismissed(true)
      return
    }

    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallButton(true)
    }

    window.addEventListener('beforeinstallprompt', handler)

    // Ocultar si ya está instalada
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowInstallButton(false)
    }

    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === 'accepted') {
      console.log('Usuario instaló la PWA')
    }

    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  const handleDismiss = () => {
    setDismissed(true)
    setShowInstallButton(false)
    sessionStorage.setItem('pwa-install-dismissed', 'true')
  }

  if (!showInstallButton || dismissed) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm animate-slide-up">
      <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-600 rounded-2xl shadow-2xl p-1">
        <div className="bg-white rounded-xl p-4 relative">
          {/* Botón cerrar */}
          <button
            onClick={handleDismiss}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>

          {/* Contenido */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-2xl font-bold text-white">V</span>
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-bold text-gray-900 text-sm mb-1">
                Instalar VotApp
              </h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Accede rápido desde tu pantalla de inicio
              </p>
            </div>
          </div>

          {/* Botón instalar */}
          <button
            onClick={handleInstallClick}
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 text-sm"
          >
            <Download size={18} />
            <span>Instalar Aplicación</span>
          </button>

          {/* Características rápidas */}
          <div className="mt-3 flex items-center justify-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              Rapida
            </span>
            <span className="flex items-center gap-1">
              Offline
            </span>
            <span className="flex items-center gap-1">
              Segura
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}