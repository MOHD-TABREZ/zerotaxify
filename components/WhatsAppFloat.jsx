export default function WhatsAppFloat() {
  const number = process.env.WHATSAPP_NUMBER || '919052029525';
  const text = encodeURIComponent('Hi ZeroTaxify, I need help with tax filing and planning.');

  return (
    <a
      className="whatsapp-float"
      href={`https://wa.me/${number}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="whatsapp-tip">Chat on WhatsApp</span>
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M16 3.2c-7 0-12.8 5.6-12.8 12.6 0 2.2.6 4.3 1.6 6.2L3 28.8l7-1.8c1.8 1 3.8 1.6 6 1.6 7 0 12.8-5.6 12.8-12.6S23 3.2 16 3.2zm0 22.8c-1.9 0-3.7-.5-5.3-1.5l-.4-.2-4.1 1 1.1-3.9-.3-.4c-1.1-1.6-1.7-3.4-1.7-5.4 0-5.8 4.8-10.6 10.7-10.6s10.7 4.8 10.7 10.6S21.9 26 16 26zm5.9-7.7c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.1-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.8-1.6-1.8-1.8-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7 0 1.6 1.2 3.2 1.3 3.4.2.2 2.3 3.5 5.5 4.8.8.3 1.4.5 1.9.7.8.2 1.4.2 2 .1.6-.1 1.8-.8 2.1-1.5.3-.7.3-1.4.2-1.5 0-.2-.3-.3-.6-.4z" />
      </svg>
    </a>
  );
}
