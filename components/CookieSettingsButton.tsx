"use client";

export default function CookieSettingsButton() {
  const reset = () => {
    localStorage.removeItem("cookie-consent");
    window.location.reload();
  };

  return (
    <button
      onClick={reset}
      style={{
        background: "transparent",
        border: "1px solid var(--color-primary)",
        color: "var(--color-primary)",
        padding: "0.5rem 1.25rem",
        borderRadius: "4px",
        fontSize: "0.875rem",
        cursor: "pointer",
        marginTop: "0.75rem",
        display: "inline-block",
      }}
    >
      Cookie-Einstellungen zurücksetzen
    </button>
  );
}
