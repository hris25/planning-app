import { useEffect } from "react";

export function useTelegramButton(options = {}) {
  const {
    text = "NOUVELLE TÂCHE",
    onClick,
    visible = true,
    color = "#2481cc", // Couleur par défaut
  } = options;

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    // Configuration du bouton
    tg.MainButton.setParams({
      text: text,
      color: color,
    });

    if (visible) {
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }

    // Gestionnaire d'événements
    if (onClick) {
      tg.MainButton.onClick(onClick);
    }

    // Nettoyage
    return () => {
      tg.MainButton.offClick(onClick);
    };
  }, [text, onClick, visible, color]);
}
