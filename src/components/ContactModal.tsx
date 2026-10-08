import { FormEvent, useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../lib/firebase";

type Props = {
  open: boolean;
  onClose: () => void;
};

const projectTypes = [
  "Site / Landing page",
  "Aplicativo",
  "Sistema interno / CRM",
  "Automação / Integração",
  "Ainda não sei"
];

export function ContactModal({ open, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) setStatus("idle");
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get("website")) return;

    setStatus("sending");

    try {
      await addDoc(collection(db, "leads"), {
        name: String(data.get("name") || "").trim(),
        phone: String(data.get("phone") || "").trim(),
        projectType: String(data.get("projectType") || "").trim(),
        idea: String(data.get("idea") || "").trim(),
        source: "portfolio",
        status: "new",
        createdAt: serverTimestamp()
      });

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="modal-close" type="button" onClick={onClose} aria-label="Fechar">
          ×
        </button>

        {status === "success" ? (
          <div className="contact-success">
            <div className="success-icon">✓</div>
            <span>Mensagem recebida</span>
            <h2 id="contact-title">Boa! Já tenho o contexto inicial.</h2>
            <p>Seu contato ficou registrado e a ideia do projeto já chegou organizada para a próxima conversa.</p>
            <button className="button button--dark" onClick={onClose}>Fechar</button>
          </div>
        ) : (
          <>
            <span className="eyebrow">Vamos conversar?</span>
            <h2 id="contact-title">Me conta o que você quer tirar do papel.</h2>
            <p className="modal-intro">
              Não precisa chegar com tudo definido. Me dê o contexto e eu te ajudo a transformar a ideia em uma solução viável.
            </p>

            <form className="contact-form" onSubmit={handleSubmit}>
              <input className="hp-field" type="text" name="website" tabIndex={-1} autoComplete="off" />

              <label>
                Seu nome
                <input name="name" type="text" required minLength={2} maxLength={80} placeholder="Como posso te chamar?" />
              </label>

              <label>
                Telefone / WhatsApp
                <input name="phone" type="tel" required minLength={8} maxLength={24} placeholder="(00) 00000-0000" />
              </label>

              <label>
                O que você quer desenvolver?
                <select name="projectType" required defaultValue="">
                  <option value="" disabled>Selecione uma opção</option>
                  {projectTypes.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>

              <label>
                Me explica a ideia
                <textarea
                  name="idea"
                  required
                  minLength={10}
                  maxLength={1500}
                  rows={5}
                  placeholder="Qual problema você quer resolver? Como imagina o projeto?"
                />
              </label>

              <p className="form-note">
                Ao enviar, você concorda com o uso desses dados exclusivamente para retorno sobre o seu projeto.
              </p>

              {status === "error" && (
                <p className="form-error">
                  Não consegui registrar agora. Confira a configuração do Firebase e tente novamente.
                </p>
              )}

              <button className="button button--dark button--full" disabled={status === "sending"}>
                {status === "sending" ? "Enviando..." : "Enviar ideia →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
